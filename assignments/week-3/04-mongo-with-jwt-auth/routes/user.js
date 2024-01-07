
const express = require("express");
const router = express.Router();
const { User, Course } = require("../db");
const userMiddleware = require("../middleware/user");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

router.post('/signup', async function(req, res) {
  const { username, password } = req.body;
  await User.create({
    username,
    password
  })
  res.json({
    msg: "User created successfully"
  })
})

router.post('/signin', async function(req, res) {
  const { username, password } = req.body;
  const user = await User.findOne({
    username: username,
    password: password
  });

  if (user) {
    const token = jwt.sign({ username }, JWT_SECRET);
    res.json({
      token: "Bearer " + token
    })
  }
  else {
    res.status(404).json({
      msg: "User not found"
    })
  }

})
router.post('/courses/:courseId', userMiddleware, async function(req, res) {
  const courseId = req.params.courseId;
  const username = req.headers.username;
  await User.updateOne({
    username: username,
  }, {
    "$push": {
      coursesPurchased: courseId
    }
  });
  res.json({
    msg: "Course purchased completed"
  })
})

router.get('/courses', async function(req, res) {
  const courses = await Course.find({});
  res.json({
    courses
  })
})

router.get('/purchasedCourses', userMiddleware, async function(req, res) {
  const user = await User.findOne({
    username: req.headers.username
  });
  console.log(user.coursesPurchased)
  const courses = await Course.find({
    _id: {
      "$in": user.coursesPurchased
    }
  })

  res.json({
    courses
  })
})

module.exports = router;
