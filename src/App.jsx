import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./Login";
import Exam from "./Exam";
import Result from "./Result";
import Admin from "./Admin";

function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Login/>}/>
<Route path="/exam" element={<Exam/>}/>
<Route path="/result" element={<Result/>}/>
<Route path="/admin" element={<Admin/>}/>

</Routes>

</BrowserRouter>

)

}

export default App;