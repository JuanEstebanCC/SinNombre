const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new Schema({

  full_name:{
	type: String,
	required: true,
	maxLength: 80,
	minLength: 3
  }
  email: {
	type: String,
	unique: true,
	pattern: "^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$",
  }
  password: {
	type: String,
	required: true,
	maxLength: 12,
	minLength: 4
  }
  photo: {
	type: String
  }
  usertype: {
	type: Number,
	enum: ['1','2','3'] // 1 = Admin, 2 = Normal User, 3 = Doctor
	required: true,
  }
  specialization: {
	type: String,
	required: true,
	default: null
  }
})

userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = model('User', userSchema);
