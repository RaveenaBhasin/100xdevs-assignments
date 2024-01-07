const express = require('express');
const routes = express.Router();
const adminMiddleWare = require("../middleware/admin");
const { Admin, Course } = require("../db");

routes.post('/signup', function(req, res) {
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

routes.post('/courses', adminMiddleWare, async function(req, res) {
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

routes.get('/courses', adminMiddleWare, async function(req, res) {
  const courses = await Course.find({})
  res.json({
    courses
  })
})

module.exports = routes;
