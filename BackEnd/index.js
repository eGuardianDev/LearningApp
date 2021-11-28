const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const { json } = require('express');
const bcrypt = require('bcrypt');


const saltRounds = 10;
const myPlaintextPassword = 'bacon';
const someOtherPlaintextPassword = 'not_bacon';


const port = 5000;
let updated = false;
app.use(cors());
app.use(express.json())
let rawdata = fs.readFileSync('students.json');
let student = JSON.parse(rawdata);
let data = 0;
const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync(myPlaintextPassword, salt);

app.get('/', (req,res) => {
  res.send(hash);

});



app.get('/ned', (req,res) =>{
    rawdata = fs.readFileSync('Test.json');
    student = JSON.parse(rawdata);
    res.json(student)
   // console.log("Request was made!");


});
app.get('/updated', (req,res) =>{
  student = JSON.parse(updated);
  res.json(student)
 // console.log("Request was made!");


});
app.post('/login', function(req, res) {
  const Data = {
    username: req.body.username,
    password: req.body.password,
  };
  const data = fs.readFileSync('./Accounts.json');
  const jsonData = JSON.parse(data);
  console.log(Data.username);
  jsonData.forEach(function(obj) { if(obj.username == Data.username){res.json(obj.password)} });
 
});


app.post('/create', function(req, res) {
    const Data = {
      input: req.body.input,
    };
    const data = fs.readFileSync('./Test.json');
    let newData = data.slice(0, data.length);
    newData = newData.slice(0, -1);
    newData += ",\n" + JSON.stringify(Data) + ']';
    fs.unlinkSync('./Test.json');
    fs.appendFileSync('./Test.json', newData,{ flag: 'wx' });
    console.log(Data);
    updated = true;
    res.end();
});

app.post('/createAccount', function(req, res) {
  const Data = {
    username: req.body.username,
    password: req.body.password,
  };
  const data = fs.readFileSync('./Accounts.json');
  const jsonData = JSON.parse(data);
  let Continue= true;
  jsonData.forEach(function(obj) { if(obj.username == Data.username){Continue = false;}});
  if(Continue){
    let newData = data.slice(0, data.length);
    newData = newData.slice(0, -1);
    newData += ",\n" + JSON.stringify(Data) + ']';
    fs.unlinkSync('./Accounts.json');
    fs.appendFileSync('./Accounts.json', newData,{ flag: 'wx' });
    console.log(Data);
    updated = true;
    console.log("new Account Created");
  }else{
    console.log("account already exist");
  }
  
  res.end("Done!");
});

app.listen(port,() => console.log('Example app listening on port $(port)!'));