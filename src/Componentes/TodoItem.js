import React from 'react'
// import TodoForm from './TodoForm'
import {RiCloseCircleLine} from 'react-icons/ri'
import {TiEdit} from 'react-icons/ti';
const TodoItem = (props) => {
    const {todos, getEditTodoData, getIDToBeDeleted} = props;
  return (
    
        todos.map((todoItem, index)=>(
            <div key ={`${todoItem.id}${index}`} className='todo-item-wrapper'>
                <p className="todotext">{todoItem.text}</p>
                <div className='icons'>
                    <RiCloseCircleLine onClick={()=> getIDToBeDeleted(todoItem.id)} className='delete-icon'/>
                    <TiEdit onClick={()=> getEditTodoData({id : todoItem.id, text: todoItem.text})}   className='edit-icons'/> 
                </div>
            </div>
        ))

    
  )
}

export default TodoItem