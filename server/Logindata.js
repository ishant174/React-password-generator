const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (value) => {
        // Custom validation logic for email format
        // You can use regular expressions or a library like validator.js
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Passwords do not match",
    },
  },
});

const passwordSchema = new mongoose.Schema({
  websitelink: {
    type: String,
    required: true,
  },
  savedpassword: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});
const User = mongoose.model("login_data", userSchema);
const SavedPass = mongoose.model("saved_data", passwordSchema);

const addUser = async (data) => {
  const newUser = new User(data);
  await newUser
    .save()
    .then((res) => {
      const userdatareturn = [
        { status: 200, message: "User added successfully!", savedUser: res },
      ];
      return userdatareturn;
    })
    .catch((err) => {
      console.log(err);
      if (err.code === 11000) {
        throw {
          status: 403,
          error: "Error retrieving data",
          message: "Email already exist!",
        };
      } else {
        throw {
          status: 403,
          error: "Error retrieving data",
          message: err.message,
        };
      }
    });
};

const checkUserLogin = async (logindata) => {
  const useremail = logindata.email;
  try {
    // Find a user with the provided email
    const allusers = await User.findOne({ email: useremail });
    if (allusers) {
      // User found, compare the provided password with the stored hash
      const isPasswordCorrect = await bcrypt.compare(
        logindata.password,
        allusers.password
      );

      if (isPasswordCorrect) {
        console.log("Login successful");
        const status = {
          status: 200,
          msg: "Login successfull!",
          userdetails: allusers,
        };
        return status;
      } else {
        const status = { status: 500, msg: "Password is wrong!" };
        throw status;
      }
    } else {
      const status = { status: 500, msg: "User not found!" };
      throw status;
    }
  } catch (error) {
    console.error("An error occurred:", error);
    // Handle the error accordingly
    throw error;
  }
};
const checkUserexist = async (email) => {
  const useremail = email;
  try {
    // Find a user with the provided email
    const allusers = await User.findOne({ email: useremail });
    if (allusers) {
      return allusers;
    } else {
      return false;
    }
  } catch (error) {
    console.error("An error occurred:", error);
    // Handle the error accordingly
  }
};

const saveuserpass = async (weblink, data, email) => {
  const newsaveddata = {
    websitelink: weblink,
    savedpassword: data,
    email: email,
  };
  try {
    const newsaved_pass = new SavedPass(newsaveddata);
    await newsaved_pass
      .save()
      .then((res) => {
        return "saved";
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    return error;
  }
};

const getuserpass = async (email) => {
  try {
    const data = await SavedPass.find({ email });
    return data;
  } catch (error) {
    return error;
  }
};

module.exports = {
  User,
  SavedPass,
  addUser,
  checkUserLogin,
  checkUserexist,
  saveuserpass,
  getuserpass,
};
