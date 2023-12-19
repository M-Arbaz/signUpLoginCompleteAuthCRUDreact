const express = require('express');
const mongodb = require("mongodb")
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const key = "content"
const cors = require('cors');
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, `file-${Date.now()}${path.extname(file.originalname)}`)
  }
})
const upload = multer({ storage: storage })
app.use(cors())
app.use(express.json())
app.use('/data', express.static('uploads'))
const parent = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  }
});

const model = mongoose.model('data1', parent);
const child = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  JD: {
    type: String,
    required: true,
  },
  u_m: {
    type: String,
    required: true,
  },
  a_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "parent",
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
});

const student = mongoose.model('student', child);

{
  mongoose.connect('mongodb+srv://admin:admin@cluster0.ezsgqkf.mongodb.net/login')
    .then(() => {
      console.log('connection succesful');
    })
    .catch(error => {
      console.log('connections failed', error);
    });
}

app.post('/signup', (req, res) => {
  const { name, email, pass } = req.body;
  const data = new model({
    name: name,
    email: email,
    pass: pass
  })
  model.find().then(usr => {
    const alredy = usr.find(b => b.name === data.name || b.email === data.email)
    console.log(alredy)
    if (alredy) {
      console.log("user already exsist.")
      res.send('user alredy exsist')
      return;
    }
    data.save()
    res.json({ message: 'data added succesful', data: data })
  }).catch(error => {
    console.log(error)
  })
})
app.post('/login', (req, res) => {
  const { email, pass } = req.body;
  const is = {
    email: email,
    pass: pass
  }
  model.find().then(usr => {
    const is_usr = usr.find(b => b.email === is.email && b.pass === is.pass)
    if (!is_usr) {
      res.send('wrong')
      return;
    }
    const token = jwt.sign({ is }, key)
    res.json({ token })
  }).catch(error => {
    console.log(error);
  })
})
app.post('/verified', (req, res) => {

  const token = req.body.token;
  jwt.verify(token, key, (err, result) => {
    if (err) {
      console.log("token is not valid", err)
      res.json({ message: "token is not valid" });
      return;
    }
    res.json({ message: "succesful", result: result });
  });
});
app.get('/super', (req, res) => {
  model.find().then(usr => {
    res.json({ message: 'record', persons: usr })
  }).catch(error => {
    console.log(error)
  })
})
// CRUD
app.post("/create", upload.single(key), async (req, res) => {
  try {
    const { id, name, JD, u_m, a_id } = req.body;
    const data = new student({
      id: id, name: name, JD: JD, u_m: u_m, a_id: a_id,
      file: `http://localhost:3001/data/${req.file.filename}`
    });

    student.find().then(frnd => {
      const alredy = frnd.find(frnd => frnd.id === data.id || frnd.name === data.name);
      if (alredy) {
        res.json({ message: `you enter same friend name: ${req.body.name} or id:${req.body.id} visit: http://localhost:3001/update to update`, warn: "same" });
        return;
      }
      data.save();
      res.json({
        message: "data uploaded successful",
        data: data
      })
    }).catch(error => {
      console.log(error)
    })

  } catch (error) {
    console.log("failed to upload data", error);
    res.send("failed to upload Data")
  }
})
app.put('/update:id', async (req, res) => {
  try {

    const i = req.params.id;
    console.log(typeof (i), i);
    const { name, JD } = req.body;

    await student.updateOne({ id: i }, { $set: { name, JD } })
    res.json({ message: "data updated succesful" })
  }
  catch (error) {
    console.log(error)
    res.send("couldn't update at this moment")
  }
})
app.delete('/delete:id', async (req, res) => {
  try {
    const i = req.params.id;
    console.log(i)
    student.find().then(async d => {
      const f_index = d.findIndex((fr) => fr.id == i);

      if (f_index >= 0) {
        fs.unlinkSync(`./uploads/${path.basename(d[f_index].file)}`)
        await student.deleteOne({ id: i })
        res.json({ message: 'Deleted successfully', data: d[f_index] })
        return;
      } else {
        res.send("alredy deleted")
      }
    })
  } catch (error) {
    console.log(error);
    res.send("Couldn't delete");
  }
});
app.get('/read', async (req, res) => {
  try {
    student.find().then(
      a => {
        console.log(a)
        res.send(a);
      }
    ).catch(err => {
      console.log(err)
    })
  } catch (error) {
    console.log("failed to connect to database", error);
    res.send("failed to connect to database.")
  }
});
app.listen(3001, () => {
  console.log('Listening on 3001');
});
