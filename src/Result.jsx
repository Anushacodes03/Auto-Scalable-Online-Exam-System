import {useLocation} from "react-router-dom";

function Result(){

const {state}=useLocation();

return(

<div
style={{
textAlign:"center",
marginTop:"50px"
}}
>

<h1>Exam Result</h1>

<h2>Score: {state?.score}</h2>

<h3>Total Questions: {state?.total}</h3>

<h3>Answered: {state?.answered}</h3>

<h3>Not Answered: {state?.notAnswered}</h3>

<h3>Correct: {state?.correct}</h3>

<h3>Incorrect: {state?.incorrect}</h3>

</div>

)

}

export default Result;