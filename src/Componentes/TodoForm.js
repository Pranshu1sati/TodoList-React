import React, { useState ,  useEffect } from 'react'

const TodoForm = (props) => {
    const {getNewlyCreatedTodoItem, editData}=props;
    const [inputValue, setInputValue] = useState("");
    const [isEdit,setIsEdit] = useState(false);

    const handleInputChange = (e) => {
        const {value} = e.target
        setInputValue(value);
        
    };
    const handleSubmit =(event)=>
    {
        event.preventDefault();
        const newlyCreatedTodo =
        {
        id : isEdit ? editData.id : Math.floor(Math.random()*1000),
        text: inputValue
        };
       getNewlyCreatedTodoItem(newlyCreatedTodo);
       setInputValue("");
       setIsEdit(false)
    };
    useEffect(()=>{
      if(editData && Object.keys(editData).length !==0) {
        setInputValue(editData.text); 
        setIsEdit(true);
      }
    },[editData])
  return (
    <form className='todo-form' onSubmit={handleSubmit}>
        <input name="input" type="text" onChange={handleInputChange} placeholder="Enter todo here" className='todo-input' value ={inputValue}/>
        <button className="todo-button" type='submit'>{isEdit? "Edit Todo" : "Add todo"}</button>
    </form>
  )
}

export default TodoForm