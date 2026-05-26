import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");

  const navigate=useNavigate();

  const login=async()=>{

    try{

      const res=await axios.post(
        "http://3.109.62.17:5000/login",
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

    catch(err){

      console.log(err);

      alert("Backend connection error");

    }

  };

  return(

    <div>

      <h1>
        Online Exam Login
      </h1>

      <input
      placeholder="Username"
      value={username}
      onChange={(e)=>
      setUsername(e.target.value)}
      />

      <br/><br/>

      <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e)=>
      setPassword(e.target.value)}
      />

      <br/><br/>

      <button onClick={login}>
      Login
      </button>

    </div>

  );

}

export default Login;