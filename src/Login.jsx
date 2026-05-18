import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Login(){

const [username,setUsername]=useState("");
const [password,setPassword]=useState("");

const navigate=useNavigate();

const login=async()=>{

try{

const res=await axios.post(
"http://localhost:5000/login",
{
username,
password
}
);

if(res.data.success){

alert("Login Success");

navigate("/exam");

}

else{

alert("Invalid credentials");

}

}

catch{

alert("Backend not running");

}

};

return(

<div>

<h1>Online Exam Login</h1>

<input
placeholder="Username"
onChange={(e)=>setUsername(e.target.value)}
/>

<br/><br/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<br/><br/>

<button onClick={login}>
Login
</button>

</div>

)

}

export default Login;