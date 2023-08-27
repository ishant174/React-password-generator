const express = require("express");
const app = express();
require("dotenv").config();
const generator = require("generate-password");
const db = require("./db.js");
const database_fxns = require("./Logindata.js");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const { response } = require("express");
var jwt = require("jsonwebtoken");
app.use(bodyParser.json());

app.get("/checkconnection", async (req, res) => {
  await db()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
      res.send(false);
    });
});
app.post("/signup", (req, res) => {
  try {
    let err = {
      errcode: "",
      errmsg: "",
    };
    if (
      req.body.fullName == "" ||
      req.body.email == "" ||
      req.body.password == "" ||
      req.body.confirmPassword == ""
    ) {
      res
        .status(500)
        .json({ message: "Please fill all the details in the form!" });
      return false;
    }
    if (req.body.password != req.body.confirmPassword) {
      res
        .status(500)
        .json({ message: "Password and Confirm Password does not match!" });
      return false;
    }

    bcrypt.hash(
      req.body.password,
      process.env.SALT_ROUNDS,
      function (err, hash) {
        const newUserdata = {
          fullName: req.body.fullName,
          email: req.body.email,
          password: hash,
          confirmPassword: hash,
        };

        database_fxns
          .addUser(newUserdata)
          .then((response) => {
            console.log(response);
            res.status(200).json({ message: "User Added successfully!" });
          })
          .catch((error) => {
            console.log("here error coming");
            console.log(error);
            res.status(error.status).json({ message: error.message });
          });
      }
    );
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ message: "Failed to insert data" });
  }
});

app.post("/logincheck", async (req, res) => {
  const userLoginData = {
    email: req.body.email,
    password: req.body.password,
  };

  database_fxns
    .checkUserLogin(userLoginData)
    .then((result) => {
      if (result.status == 200) {
        const userData = {
          fullname: result.userdetails.fullName,
          email: result.userdetails.email,
        };
        jwt.sign(userData, process.env.PRIVATE_KEY, function (err, token) {
          if (token) {
            res.send({ token: token, res: result });
          } else {
            console.log(err);
          }
        });
      } else {
        res.send(result);
      }
    })
    .catch((err) => {
      console.log("throwing error here");
      console.log(err);

      res.send(err);
    });
});
async function unassignJWTToken(userjwtdata, privateKey) {
  const getdata = new Promise((resolve, reject) => {
    jwt.verify(userjwtdata, process.env.PRIVATE_KEY, (error, decoded) => {
      if (error) {
        console.error("Error verifying JWT:", error);
      } else {
        resolve(decoded);
      }
    });
  });
  const userdata = await getdata;
  console.log(userdata);
  return userdata;
}
async function fetchSavedpass(savedpassData, privateKey) {
  const getjwttoken = new Promise((resolve, reject) => {
    jwt.sign(savedpassData, process.env.PRIVATE_KEY, function (err, token) {
      resolve(token);
    });
  });
  const token = await getjwttoken;
  console.log(token);
  return token;
}
const savenewpassword = async (weblink, val, email) => {
  const savepass = new Promise((resolve, reject) => {
    database_fxns
      .saveuserpass(weblink, val, email)
      .then((checkres) => {
        resolve(true);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  const savedreturn = await savepass;
  return savedreturn;
};
app.post("/checkuser", (req, res) => {
  const userToken = req.body.user_id;
  console.log(userToken);
  jwt.verify(userToken, process.env.PRIVATE_KEY, (error, decoded) => {
    if (error) {
      console.error("Error verifying JWT:", error);
    } else {
      database_fxns
        .checkUserexist(decoded.email)
        .then((userres) => {
          if (userres) {
            res.send(userres);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});
app.post("/getuserdata", async (req, res) => {
  const userToken = req.body.user_id;
  const userData = await unassignJWTToken(userToken, process.env.PRIVATE_KEY);
  console.log("here is data");
  console.log(userData);
  database_fxns
    .getuserpass(userData.email)
    .then((userres) => {
      console.log(userres);
      res.send(userres);
    })
    .catch((err) => {
      console.log(err);
    });
  return false;
});
app.post("/savenewpass", async (req, res) => {
  // Verifying a JWT
  console.log(req.body);
  jwt.verify(req.body.usertoken, process.env.PRIVATE_KEY, (error, decoded) => {
    if (error) {
      console.error("Error verifying JWT:", error);
    } else {
      database_fxns
        .checkUserexist(decoded.email)
        .then((userres) => {
          if (userres) {
            const savedpassData = {
              email: decoded.email,
              weblink: req.body.weblink,
              password: req.body.password,
            };

            const saveNewPassword = savenewpassword(
              savedpassData.weblink,
              savedpassData.password,
              decoded.email
            );
            saveNewPassword.then((result) => {
              res.send(result);
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  // const savedData = {
  //   ...req.body,
  //   u_id:
  // };
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/getpass", (req, res) => {
  const password = generator.generate({
    length: 15,
    numbers: true,
    symbols: true,
    uppercase: true,
    lowercase: true,
  });
  res.send(password);
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
