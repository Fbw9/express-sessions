const mongoose = require('mongoose')

const SessionSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: 'You must provide a valid email here',
    unique: true,
    trim: true
  },
  user_id: {
    type: mongoose.Schema.ObjectId,
  },
})

module.exports = SessionSchema;
