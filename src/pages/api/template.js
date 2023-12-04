import Template from "@/model/templateModel"; // Adjust the path as needed
import connectToDb from "@/lib/connectToDb";
import mongoose from "mongoose";

export default async function handler(req, res) {
  await connectToDb();

  if (req.method === 'POST') {
    try {
      const { doctorId, template } = req.body;
      const docId = mongoose.Types.ObjectId(doctorId); // Convert to ObjectId

      // Find the doctor's template document or create a new one if it doesn't exist
      const docTemplate = await Template.findOneAndUpdate(
        { doctorId: docId },
        { $push: { templates: template } },
        { new: true, upsert: true }
      );

      res.status(201).json(docTemplate);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else if (req.method === 'GET') {
    try {
      const { doctorId } = req.query;
      const docId = mongoose.Types.ObjectId(doctorId); // Convert to ObjectId

      // Find templates for a specific doctor
      const templates = await Template.findOne({ doctorId: docId });

      res.json(templates);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else if (req.method === 'PUT') {
    try {
      const { doctorId, templateId, updatedTemplate } = req.body;
      const docId = mongoose.Types.ObjectId(doctorId);
      const tempId = mongoose.Types.ObjectId(templateId);

      const updatedDoc = await Template.findOneAndUpdate(
        { "doctorId": docId, "templates._id": tempId },
        { $set: { "templates.$": updatedTemplate } },
        { new: true }
      );

      res.json(updatedDoc);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { doctorId, templateId } = req.body;
      const docId = mongoose.Types.ObjectId(doctorId);
      const tempId = mongoose.Types.ObjectId(templateId);

      const updatedDoc = await Template.findOneAndUpdate(
        { doctorId: docId },
        { $pull: { templates: { _id: tempId } } },
        { new: true }
      );

      res.json(updatedDoc);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    // Handle any other HTTP methods
    res.status(405).json({ message: "Method not allowed" });
  }
}