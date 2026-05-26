import {useEffect,useState} from "react";
import axios from "axios";

function Admin(){

const [results,setResults]=useState([]);

useEffect(()=>{

axios.get(
"http://3.109.62.17:5000"
)
.then((res)=>{

setResults(res.data);

});

},[]);

return(

<div>

<h1>
Admin Dashboard
</h1>

{

results.map((r,index)=>(

<div key={index}>

<h3>

Student:
{r.name}

</h3>

<p>

Score:
{r.score}

</p>

<hr/>

</div>

))

}

</div>

)

}

export default Admin;