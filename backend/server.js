const express=require("express");
const cors=require("cors");
const fs=require("fs");

const app=express();

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{

res.send("Server Running")

});

app.post("/login",(req,res)=>{

const {username,password}=req.body;

const users=JSON.parse(
fs.readFileSync("../data/students.json")
);

const found=users.find(
u=>u.username===username &&
u.password===password
);

if(found){

res.json({
success:true
})

}

else{

res.json({
success:false
})

}

});
app.get("/questions",(req,res)=>{

const questions=JSON.parse(
fs.readFileSync("../data/questions.json")
);

res.json(questions);

});
app.post("/submit",(req,res)=>{

const {name,score}=req.body;

const results=JSON.parse(
fs.readFileSync("../data/results.json")
);

results.push({
name,
score
});

fs.writeFileSync(
"../data/results.json",
JSON.stringify(results,null,2)
);

res.json({
message:"Result Saved"
});

});
app.get("/results",(req,res)=>{

const results=JSON.parse(
fs.readFileSync("../data/results.json")
);

res.json(results);

});
app.listen(5000,()=>{

console.log(
"Server running on port 5000"
)

})