const multer  = require('multer')
import Grid from "gridfs-stream";
import connectToDb from "@/lib/connectToDb";
import mongoose from "mongoose";

const storage = multer.memoryStorage();
const upload = multer({storage: storage})

connectToDb();

let gfs;

mongoose.connection.once('open', () => {
    gfs = Grid(mongoose.connection.db, mongoose.mongo)
    gfs.collection('uploads')
})

export const config= {
    api: {
        bodyParser: false
    }
}

export default async function handler(req, res) {
    try {
      upload.single('file')(req, res);
  
      const result = await extractContentAndSave(req.file);
  
      // Assuming you have a Template model
      const userId = req.user.id; // Replace with your user authentication logic
      const templateData = {
        name: req.body.templateName,
        content: result.content,
      };
  
      // Update the user's templates with the new one
      await mongoose.models.User.findByIdAndUpdate(
        userId,
        { $push: { templates: templateData } },
        { new: true }
      );
  
      res.status(200).json({ success: true, message: 'Template uploaded and content extracted.' });
    } catch (error) {
      console.error(error);
      console.log(error)
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }
  
  async function extractContentAndSave(file) {
    return new Promise((resolve, reject) => {
      const writeStream = gfs.createWriteStream({
        filename: file.originalname,
      });
  
      writeStream.end(file.buffer);
  
      writeStream.on('close', (savedFile) => {
        // Resolve with the extracted content
        resolve({ fileId: savedFile.id, content: 'Your extracted content here' });
      });
  
      writeStream.on('error', (error) => {
        reject(error);
      });
    });
  }