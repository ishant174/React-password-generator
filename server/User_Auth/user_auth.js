const express = require('express')
const app = express()
const loginschema = require('../Logindata');
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.post('/signup', (req, res) => {
    try {

      let err = {
        errcode:"",
        errmsg:""
      };
      if(req.body.fullName == "" || req.body.email == "" || req.body.password == "" || req.body.confirmPassword == ""  ){
        err.errmsg = "Please fill all the details above!";
        err.errcode = 500;
        res.send(err);  
        return false;
      }
      if(req.body.password != req.body.confirmPassword){
        err.errmsg = "Please check the password again!";
        err.errcode = 500;
        res.send(err);  
        return false;
      }
      bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
          
          const newUserdata = {
            fullName:req.body.fullName,
            email:req.body.email,
            password:hash,
            confirmPassword:hash,
          }
          console.log(newUserdata);
          loginschema.addUser(newUserdata);
          res.status(200).json({ message: 'Data inserted successfully' });
      });
      
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ message: 'Failed to insert data' });
    }
  });