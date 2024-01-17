import React, { useEffect, useState } from 'react'
import './App.css';
import { MdCheck, MdDelete } from "react-icons/md";


function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setnewTitle] = useState("");
  const [description, setnewDescription] = useState("");
  const [completedTodos,setcompletedTodos] =useState([]);

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: description
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr));
    setnewDescription('');
    setnewTitle('');
  };

const handleDeletetodo=(index)=>{
  let reducedTodo=[...allTodos];
  reducedTodo.splice(index);
  localStorage.setItem('todolist',JSON.stringify(reducedTodo));
  setTodos(reducedTodo);
}

const handlecomplete=(index)=>{
  let now=new Date();
  let dd=now.getDate();
  let mm=now.getMonth() + 1;
  let yyyy=now.getFullYear();
  let h=now.getHours();
  let m=now.getMinutes();
  let s=now.getSeconds();

  let completedOn = dd+ '-' +mm + '-' + yyyy + ' ' + 'at' + ' '+h + ':'+m+':'+s;

  let filteredItem={
    ...allTodos[index],
    completedOn:completedOn
  };

  let updatedcompletedarr =[...completedTodos];
  updatedcompletedarr.push(filteredItem);
  setcompletedTodos(updatedcompletedarr);
  handleDeletetodo(index);
  localStorage.setItem('completedTodos',JSON.stringify(updatedcompletedarr)
  );
};

const handleDeletecompletedtodo=(index)=>{
  let reducedTodo=[...completedTodos];
  reducedTodo.splice(index);
  localStorage.setItem('completedTodos',JSON.stringify(reducedTodo));
  setcompletedTodos(reducedTodo);
};


useEffect(()=>{
   let savedtodo=JSON.parse(localStorage.getItem('todolist'));
   let savedCompletedTodo=JSON.parse(localStorage.getItem('completedTodos'));

   if (savedtodo) {
    setTodos(savedtodo);
   }
   if (savedCompletedTodo) {
    setcompletedTodos(savedCompletedTodo);
   }
},[]);

  return (
    <div className="App">
      <h1>My To-do-list</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e) => setnewTitle(e.target.value)} placeholder="what's the task title?"></input>
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input type="text" value={description} onChange={(f) => setnewDescription(f.target.value)} placeholder="what's the task description?"></input>
          </div>
          <div className="todo-input-item">
            <button type="button" onClick={handleAddTodo} className="primaryBtn">Add</button>
          </div>
        </div>

        <div className="buttonarea">
          <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} onClick={() => setIsCompleteScreen(false)}>Todo</button>
          <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`}
            onClick={() => setIsCompleteScreen(true)}>Completed</button>
        </div>

        <div className="todo-list">
          {isCompleteScreen === false  && allTodos.map((item, index) => {
            return (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.Description}</p>
                </div>
                <div>
                  <MdDelete className='icon' onClick={()=>handleDeletetodo(index)}/>
                  <MdCheck className='check-icon' onClick={()=>handlecomplete(index)} title='complete?'/>
                </div>
              </div>)
          })}

          {isCompleteScreen === true  && completedTodos.map((item, index) => {
            return (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.Description}</p>
                  <p><small>Completed on :{item.completedOn}</small></p>
                </div>
                <div>
                  <MdDelete className='icon' onClick={()=>handleDeletecompletedtodo(index)}/>
                </div>
              </div>)
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
