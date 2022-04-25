import { useState ,useEffect} from 'react'
import './App.css'
// importing components
import Form from "./components/form"
import Todolist from './components/todolist'


function App() {
  

  
  const [inputText,setInputText] = useState("");
  const [todos,setTodos] = useState([]);
  const [status,setStatus] =useState("all");
  const [filteredTodos,setFilteredTodos] = useState([]);


  useEffect(() => {
    getLocalTodos();
  },[]);
  //use effect

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  },[todos,status]);
  
  // functions
const filterHandler = () =>{
 switch (status) {
    case 'completed':
      setFilteredTodos(todos.filter(todo => todo.completed === true));
      
      break;
      case'uncompleted':
      setFilteredTodos(todos.filter(todo => todo.completed === false));
  
    default:
      setFilteredTodos(todos);
      break;
  }
};
const saveLocalTodos = () => {

 localStorage.setItem('todos',JSON.stringify(todos));
  
};
const getLocalTodos = () => {
  if(localStorage.getItem('todos') ===null){
    localStorage.setItem('todos',JSON.stringify([]));

  }else{
   let todoLocal = JSON.parse(localStorage.getItem('todos'))
   setTodos(todoLocal)
  }

};

   return (
    <div className="App">
      <header>
      <h1>MY TO DO LISt </h1>
      </header>
      <Form  inputText={inputText} todos={todos} setTodos={setTodos}  setInputText={setInputText} setStatus={setStatus}
      />

      <Todolist filteredTodos={filteredTodos}
       setTodos={setTodos} 
       todos={todos}
        />
      
    </div>
  )
}

export default App
