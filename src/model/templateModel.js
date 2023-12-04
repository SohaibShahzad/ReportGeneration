const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  templates: [{
    name: {
      type: String,
      required: true
    },
    content: {
      type: String, // JSON string representing the fields of the template
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
    // You can add other fields for each template as needed
  }]
  // Add other fields relevant to the doctor if needed
});

export default mongoose.models.Template || mongoose.model('Template', templateSchema);
