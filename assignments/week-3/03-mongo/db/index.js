const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://Raveena:n1Hwyv2hZQoVpQUq@apps.ccl2kpy.mongodb.net/courses");

const AdminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  coursesPurchased: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  }]
});

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  price: Number,
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
  Admin,
  User,
  Course
}
