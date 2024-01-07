const express = require('express');
const router = express.Router();
const adminMiddleWare = require("../middleware/admin");
const { Admin, Course } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

router.post('/signup', function(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  Admin.create({
    username: username,
    password: password
  }).then(() => {
    res.json({
      msg: "Admin created successfully"
    })
  }).catch(() => {
    res.json({
      msg: "Admin not created"
    })
  })
})

router.post('/signin', async function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const admin = await Admin.findOne({
    username: username,
    password: password
  });

  if (admin) {
    const token = jwt.sign({ username }, JWT_SECRET);
    res.json({
      token: "Bearer " + token
    });
  }
  else {
    res.status(404).json({
      msg: "Admin not found"
    });
  }
})

router.post('/courses', adminMiddleWare, async function(req, res) {
  const { title, description, image, price } = req.body;
  const newCourse = await Course.create({
    title,
    description,
    image,
    price,
  });

  res.json({
    msg: "Course created successfully",
    courseId: newCourse._id,
  })
})

router.get('/courses', adminMiddleWare, async function(req, res) {
  const courses = await Course.find({})
  res.json({
    courses
  })
})

module.exports = router;
