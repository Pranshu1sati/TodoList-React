import React,{ useState, useEffect }  from 'react'
import TodoForm from './TodoForm'
import TodoItem from './TodoItem';
const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [editData, setEditData]=useState(null);
    const[searchParam,setSearchParam]=useState("");
    const handelModifyTodos =(getLatestTodoItemDetails)=>{
        const newTodos =[...todos];
        const indexofLatestTodoItem = todos.findIndex(intem => intem.id===getLatestTodoItemDetails.id);
        // console.log(indexofLatestTodoItem);
        if(indexofLatestTodoItem  ===-1){
            newTodos.push(getLatestTodoItemDetails)
        }
        
        else{
            //if the item is allredy present we have to modify item at that index of the array
            newTodos[indexofLatestTodoItem]={
                ...newTodos[indexofLatestTodoItem],
                text: getLatestTodoItemDetails.text
            }
        }
        setTodos(newTodos);
        localStorage.setItem('todoList',JSON.stringify(newTodos));
        };
        const getEditTodoData =(editedData)=>{
            setEditData(editedData);
            
        }
        const handleDelete=(idToBeDeleted)=>{
            console.log(idToBeDeleted);
            let updatedTodos=[...todos];
            updatedTodos = updatedTodos.filter(item=> item.id !== idToBeDeleted);
            setTodos(updatedTodos);
            localStorage.setItem('todoList',JSON.stringify(updatedTodos));  

        }
        useEffect(()=>{
            const extractTodosFromLocalStorage = JSON.parse(localStorage.getItem('todoList'));
            if(extractTodosFromLocalStorage && extractTodosFromLocalStorage.length) setTodos(extractTodosFromLocalStorage);  
        },[])
        const handleOnSearch =(e)=>{
            const {value} =e.target;
            setSearchParam(value.toLowerCase());
        }
        const filteredTodos = todos && todos.length ? todos.filter(item=> item.text.toLowerCase().includes(searchParam)):[];
        // console.log(searchParam);
  return (
    <div className='todo-list'>
        <div className="search-todos-input-wrapper">
            <h3>Search Todos</h3>
            <input name="search" placeholder="Search Todos here" type={'text'} onChange={handleOnSearch} vaule ={searchParam} className='search-input'/>
        </div>

        <TodoForm getNewlyCreatedTodoItem ={handelModifyTodos} editData={editData}/>
        {filteredTodos && filteredTodos.length ?
        <TodoItem getEditTodoData={getEditTodoData} todos={filteredTodos} getIDToBeDeleted={handleDelete} /> : <p className="no-todo">No Todos Found</p>}  
        </div>
  )
}

export default TodoList