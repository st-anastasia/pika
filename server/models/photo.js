'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  title: String,
  description: '',
  updatedAt: Date
});

module.exports = mongoose.model('Photo', PhotoSchema);
