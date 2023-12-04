import mongoose from "mongoose";

const connection = {};
async function connectToDb() {
  if (connection.isConnected) {
    // Use existing database connection
    console.log("Using existing connection");
    return;
  }

  const db = await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("DB Connected");

  connection.isConnected = db.connections[0].readyState;
}

export default connectToDb;
