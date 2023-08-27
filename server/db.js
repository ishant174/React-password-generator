const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.DATABASE;
const connectToDatabase = async () => {
  try {
    const dbconn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (dbconn) {
      return true;
      // Your application logic here, after a successful connection
    }
  } catch (error) {
    // console.error("Error connecting to MongoDB Atlas:", error);
    return false;
  }
};

module.exports = connectToDatabase;
