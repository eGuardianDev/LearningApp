//libraries
import { useState,setState, useEffect, useCallback  } from 'react';
import { BrowserRouter as Router, Route,  Link,Switch,Redirect } from "react-router-dom";
import axios, {callback} from 'axios';
import bcrypt from 'bcryptjs';
//css
import "./index.css";
//components
import Timer from "./Components/Timer";
import Navigation from "./Components/Navigation";

const saltRounds = 10;
const myPlaintextPassword = 'bacon';
const someOtherPlaintextPassword = 'not_bacon';
function App() {

  // bcrypt.genSalt(saltRounds, function(err, salt) {
  //   bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
  //     console.log(hash);
  //       // Store hash in your password DB.
  //   });
  // });
  // console.log(bcrypt.compareSync(myPlaintextPassword, "$2a$10$BqOTnPky1S73GwC6apgPT.Qm3jmgiPiP4FaGWTUOd55RiR7D94/se"));
  return (
    <Router>
      <div className="App">
        <Navigation />
        <div className="content">
          <Switch>
            <Route path="/" exact component ={Default} />
            <Route path="/info" component={Info} />
            <Route path="/login" component={LogIn} />
            <Route path="/register" component={Register} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}


const Default = ()=>{
  if(sessionStorage.getItem('logged') != "true")
  {
    return(
    <Redirect to="/login" />
      )  }

  return(
    <div>
      <div className="Account">
        <h1>Account info</h1>
        <h3>Username: {sessionStorage.getItem("name")}</h3>
      </div>
      <div className="Information">
        <h3>This is app for organization, but for now is chat</h3>
      </div>
    </div>
  )
}   
let data = {
  input:'',
};

//INFO

let jsondata = ""
const Info = () =>{
  
  const [name, setName] = useState("");
  function handleClick(e){
    data.input = sessionStorage.getItem('name') +": "+ name;
    axios
    .post('http://212.21.151.98:5000/create', data)
    .catch(err => {
      console.error(err);
    });
    document.getElementById('textInput').value = ''
    //window.location.reload(false);
  }
  console.log("request is being made");
  if(sessionStorage.getItem('logged') != "true")
  {
    return(
    <Redirect to="/login" />
      )  }

      function ClickD(e){
        if(e.key =="Enter"){
          handleClick();
        }
      }
    

  return(
    <div>
      <h1>public Chat room (n2)</h1>
        <div className="TextSend">
      <Timer oldJson={jsondata} />
        </div>
        <input type="text" id="textInput"  value={name} onChange={(e) => setName(e.target.value)} onKeyDown={ClickD} />
        <button onClick={handleClick}>Send!</button><br/>

    </div>
    )
}

//LOG IN


const LogIn = () =>{
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [reconnect, setReconnect] = useState("");
  async function handleClick(){
    let Data = {
      username: username,
      password: password,
    };
    const returnedData =await axios
    .post('http://212.21.151.98:5000/login', {
      username: Data.username,
    }).then(response =>response.data);
    //fetch('http://212.21.151.98:5000/login').then(response => response.json()).then(thisdata => data = thisdata);
    //<Redirect to="/"/>
    if(bcrypt.compareSync(Data.password, returnedData)){
      sessionStorage.setItem("name", username);
      sessionStorage.setItem("logged", true);
      setReconnect(true);
    }
  }
  if(reconnect){
    return (<Redirect to="/"/>)
  }
  return(
    <div>
      <h1>Please log in</h1>
      <h3>Username:</h3>
        <input type="text"  value={username} onChange={(e) => setName(e.target.value)} /><br/>
      <h3>Password:</h3>
        <input type="password"  value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
        <button onClick={handleClick}>Log in</button>
        <Link to="/Register"><button>Register</button></Link>
    </div>
  )
   
}
const Register = () =>{
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [reconnect, setReconnect] = useState("");
  
  function handleClick(e){
    let Data = {
      username: username,
      password: password,
    };
    const toHashPass = Data.password;
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(toHashPass, salt, function(err, hash) {
        
    
        axios
        .post('http://212.21.151.98:5000/createAccount', {
          username: Data.username,
          password: hash,

        })
        .catch(err => {
          console.error(err);
        });
        setReconnect(true)  
      
      });
   });
  }
  if(reconnect)
  {
    return( <Redirect to="/login"/>)
  }
  return(
    <div>
      <h1>Register</h1>
      <input type = "text" value={username} onChange={(e) => setUsername(e.target.value)}/><br/>
      <input type = "password" value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
      <button onClick={handleClick}>Register</button>
    </div>
  )

}


export default App;