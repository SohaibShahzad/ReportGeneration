const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  googleId: {
    type: String,
    required: false,
  },
  templates: [
    {
      name: {
        type: String,
        required: true,
      },
      content: {
        type: String, // JSON string representing the fields of the template
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      // You can add other fields for each template as needed
    },
  ],
});

export default mongoose.models.Template ||
  mongoose.model("Template", templateSchema);
