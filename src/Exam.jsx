import {useEffect,useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Exam(){

const [questions,setQuestions]=useState([]);
const [answers,setAnswers]=useState({});
const [time,setTime]=useState(120);

const navigate=useNavigate();

useEffect(()=>{

axios.get(
"http://localhost:5000/questions"
)
.then(res=>{

setQuestions(res.data);

});

},[]);


useEffect(()=>{

const interval=setInterval(()=>{

setTime(prev=>{

if(prev<=1){

clearInterval(interval);

submitExam();

return 0;

}

return prev-1;

});

},1000);

return ()=>clearInterval(interval);

},[]);



const handleOption=(id,opt)=>{

setAnswers({

...answers,

[id]:opt

})

}



const submitExam=async()=>{

let correct=0;

questions.forEach(q=>{

if(
answers[q.id]===q.answer
){

correct++

}

});

const answered=
Object.keys(
answers
).length;

const notAnswered=
questions.length-
answered;

const incorrect=
answered-correct;

const score=correct;

await axios.post(
"http://localhost:5000/submit",
{
name:"Anusha",
score
}
);

navigate("/result",{

state:{
score,
correct,
incorrect,
answered,
notAnswered,
total:questions.length
}

});

};



return(

<div>

<h1>
Online Exam
</h1>

<h2>
Time Left:
{time}
</h2>

{

questions.map((q)=>(

<div
key={q.id}
style={{
margin:"20px",
padding:"10px",
border:"1px solid gray"
}}
>

<h3>

{q.question}

</h3>

{

q.options.map(opt=>(

<label
key={opt}
style={{
display:"block",
margin:"10px"
}}
>

<input
type="radio"
name={q.id}
onChange={()=>
handleOption(
q.id,
opt
)
}
/>

{opt}

</label>

))

}

</div>

))

}

<button
onClick={submitExam}

style={{

padding:"15px 40px",
fontSize:"20px",
marginTop:"30px",
borderRadius:"10px",
cursor:"pointer"

}}
>

End Test

</button>

</div>

)

}

export default Exam