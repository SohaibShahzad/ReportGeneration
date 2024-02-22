import Template from "@/model/templateModel"; // Adjust the path as needed
import connectToDb from "@/lib/connectToDb";
import mongoose from "mongoose";

const isValidMongoId = (id) => {
  return id.match(/^[0-9a-fA-F]{24}$/);
};
const template = async (req, res) => {
  await connectToDb();

  if (req.method === "POST") {
    try {
      const { userId, template } = req.body;
      let query;
      if (isValidMongoId(userId)) {
        query = { userId: userId };
      } else {
        query = { googleId: userId };
      }

      try {
        const templateBook = await Template.findOneAndUpdate(
          query,
          { $push: { templates: template } },
          { new: true, upsert: true }
        );

        res.status(201).json(templateBook);
      } catch (dbError) {
        res.status(500).json({
          message: "Database operation failed",
          error: dbError.message,
        });
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else if (req.method === "GET") {
    try {
      const { userId } = req.query;
      let query;
      if (isValidMongoId(userId)) {
        const user_Id = mongoose.Types.ObjectId(userId);
        query = { userId: user_Id };
      } else {
        query = { googleId: userId };
      }

      // Find templates for a specific doctor
      const templates = await Template.findOne(query);

      res.json(templates);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else if (req.method === "PUT") {
    console.log("inhere template put");
    try {
      const { userId, templateId, updatedTemplate } = req.body;
      const user_Id = mongoose.Types.ObjectId(userId);
      const tempId = mongoose.Types.ObjectId(templateId);

      const updatedDoc = await Template.findOneAndUpdate(
        { userId: user_Id, "templates._id": tempId },
        { $set: { "templates.$": updatedTemplate } },
        { new: true }
      );

      res.json(updatedDoc);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else if (req.method === "DELETE") {
    try {
      const { userId, templateId } = req.body;
      const user_Id = mongoose.Types.ObjectId(userId);
      const tempId = mongoose.Types.ObjectId(templateId);

      const updatedDoc = await Template.findOneAndUpdate(
        { userId: user_Id },
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
};

export default template;
