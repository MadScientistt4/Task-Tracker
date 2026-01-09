import React, {useEffect, useState} from 'react';
import './App.css';
import { MdDelete } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false); 
  const [allTodos, setTodos] = useState([]); 
  const [newTitle, setNewTitle] = useState(""); 
  const [newDescription, setNewDescription] = useState(""); 
  const [completedTodos, setCompletedTodos] = useState([]); 
  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditedItem, setCurrentEditedItem] = useState("");
  const [data, setData] = useState([{}]);
  const handleAddTodo = ()=>{
    let newTodoItem = {
      title: newTitle,
      description: newDescription
    }
    let updateTodoArr = [...allTodos];
    updateTodoArr.push(newTodoItem);
    setTodos(updateTodoArr);
    localStorage.setItem('todoList', JSON.stringify(updateTodoArr));
    setNewTitle("");
    setNewDescription("");
  } 

  const handleDeleteTodo = (index)=>{
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem('todoList',JSON.stringify(reducedTodo));
    setTodos(reducedTodo);

  }

  const handleComplete = (index)=>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth();
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completeOn = dd+'-'+mm+'-'+yyyy+" at "+h+':'+m+':'+s;

    let filteredItem = {
      ...allTodos[index],
      completeOn: completeOn
    }

    let updateCompletedArr =[...completedTodos];
    updateCompletedArr.push(filteredItem);
    setCompletedTodos(updateCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodo', JSON.stringify(updateCompletedArr));
  }

  const handleDeleteCompletedTodo = (index)=>{
    let reducedCompletedTodo = [...completedTodos];
    reducedCompletedTodo.splice(index,1);
    localStorage.setItem('completedTodo',JSON.stringify(reducedCompletedTodo));
    setCompletedTodos(reducedCompletedTodo);
  }

  const handleEdit = (index, item)=>{
    setCurrentEdit(index);
    setCurrentEditedItem(item);
  }
  const handleUpdatedTitle = (value)=>{
    setCurrentEditedItem((prev)=>{
      return {...prev, title:value}
    })
  }
  const handleUpdatedDesciption = (value)=>{
    setCurrentEditedItem((prev)=>{
      return {...prev, description:value}
    })
  }
  const handleUpdateTodo = ()=>{
    let newTodo = [...allTodos];
    newTodo[currentEdit] = currentEditedItem;
    setTodos(newTodo);
    setCurrentEdit("");
  }


  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todoList'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodo'));
    if(savedTodo){
      setTodos(savedTodo);
    }
    if(savedCompletedTodo){
      setCompletedTodos(savedCompletedTodo);
    }
    fetch("/projects").then(
        res => res.json()
    ).then(
      data => {
          setData(data)
          console.log(data)
      }
    )
  },[])

  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className='todo-wrapper'> 

        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title:</label>
            <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="What's the task title" />
          </div>
          <div className='todo-input-item'>
            <label>Description:</label>
            <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="What's the task description" />
          </div>
          <div className='todo-input-item'>
            <button type="button" onClick={handleAddTodo} className='primarybtn'>Add</button>
          </div>
        </div>

        <div className='btn-area'>
          <button 
            className={`secondaryBtn ${isCompleteScreen === false && 'active'}` }
            onClick = {() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button 
            className={`secondaryBtn ${isCompleteScreen === true && 'active'}` }
            onClick = {() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className='todo-list'>
          {isCompleteScreen===false && allTodos.map((item, index)=>{
            if(currentEdit===index){
              return (
              <div className='edit_wrapper' key={index}>
                <input placeholder='Updated Title' 
                onChange={(e)=>handleUpdatedTitle(e.target.value)}
                value={currentEditedItem.title}/>

                <textarea placeholder='Updated Description' 
                rows={4}
                onChange={(e)=>handleUpdatedDesciption(e.target.value)}
                value={currentEditedItem.description}/>
                
                <button type='button'
                onClick={handleUpdateTodo}
                className='primarybtn'
                >
                  Update
                </button>
              </div>

          )}
            else{
              return(
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <div>
                  <MdDelete 
                  className='icon-delete' 
                  onClick={()=>handleDeleteTodo(index)}
                  title='Delete?'/>
                  <BsCheckLg 
                  className='icon-check' 
                  onClick={()=>handleComplete(index)}
                  title='Complete?'/>
                  <AiOutlineEdit
                  className='icon-check'
                  onClick={()=>handleEdit(index, item)}
                  title='Edit?'/>
                </div>

              </div>
            )}
          })}
          {isCompleteScreen===true && completedTodos.map((item, index)=>{
            return(
            <div className="todo-list-item" key={index}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p><small>Completed on: {item.completeOn}</small></p>
              </div>
              <div>
                <MdDelete 
                className='icon-delete' 
                onClick={()=>handleDeleteCompletedTodo(index)}
                title='Delete?'/>
              </div>

            </div>
            )
          })}
        </div>
        
      </div>
    </div>
  )
}

export default App;
