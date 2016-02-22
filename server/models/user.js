"use strict";

let mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt'),
  SALT_WORK_FACTOR = 10;

let UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  updatedAt: Date
});


UserSchema.methods.hashPassword = function(next){
  var user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
};

UserSchema.methods.comparePassword = function(password) {
  let user = this;
  return new Promise(function(resolve, reject){
    bcrypt.compare(password, user.password, function(err, isMatch) {
      if (err) reject(err);
      if (!isMatch) reject(new Error('invalid'));

      resolve(user);
    });
  });
};

UserSchema.pre('save', function(next){
  this.updatedAt = new Date();
  console.log(this.username);
  this.hashPassword(next);
});

module.exports = mongoose.model('User', UserSchema);
