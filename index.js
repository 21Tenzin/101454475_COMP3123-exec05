const express = require('express');
const app = express();
const router = express.Router();

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req,res) => {
  res.sendFile(__dirname + '/home.html');
});

/*
- Return all details from user.json file to client as JSON format
*/
const userData = require('./user.json');

router.get('/profile', (req,res) => {
  res.json(userData);
}); 


/*
- Modify /login router to accept username and password as JSON body parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
const fs = require('fs');

app.use(express.json());

router.post('/login', (req,res) => {
  const {username, password} = req.body;

  fs.readFile(__dirname + '/user.json', (err, data) => {
    if (err) {
      res.send({status: false, message: "Server Error"});
    } else {
      const uData = JSON.parse(data);
      if (userData.username === username && userData.password === password) {
        res.send({status: true, message: "User Is valid"});
      } else if (userData.username !== username) {
        res.send({status: false, message: "User Name is invalid"});
      } else {
        res.send({status: false, message: "Password is invalid"});
      }   
    }
  });
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/username', (req,res) => {
  const username = req.params.username;
  res.send(`<b>${username} successfully logout.</b>`);
});

/*
Add error handling middleware to handle below error
- Return 500 page with message "Server Error"
*/
app.use((err,req,res,next) => {
  res.status(500).send('Server Error');
});

router.get('/error', (req,res) => {
  throw new Error('Server Error');
});

app.use('/', router);

app.listen(process.env.port || 8082);

console.log('Web Server is listening at port '+ (process.env.port || 8082));