const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  // date: {
  //   type: String,
  //   default: new Date().toLocaleDateString('en-US', {
  //     month: 'long',
  //     day: 'numeric',
  //     year: 'numeric',
  //   }),
  // },
});

module.exports = mongoose.model('Post', PostSchema);
