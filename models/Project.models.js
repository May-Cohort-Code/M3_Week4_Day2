const mongoose = require('mongoose');
const { Schema, model } = mongoose;
 
const projectSchema = new Schema({
  title: String,
  image:String,
  description: String,
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
  // owner will be added later on
});
 
const Project =model('Project', projectSchema);

module.exports = Project