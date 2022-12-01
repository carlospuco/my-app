import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseFill } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import axios from 'axios';

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [listaTipoProducto, setListaTipoProducto] = useState([]);
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  const VerLista = () => {

        axios({
            method:"get",
            url:"https://bp-todolist.herokuapp.com/?id_author=10",
            headers:{
                "Content-Type": "multipart/form-data",
            },
        }).then((result) => {
            console.log(result.data)
            setListaTipoProducto(result.data);
        }).catch((err) => {
            console.log(err)
        });
      }

  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
      key={index}
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </div>
      <div className='icons'>
        <RiCloseFill
          onClick={() => removeTodo(todo.id)}
          className='delete-icon'
        />
        <TiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className='edit-icon'
        />
        <>
        <br></br>
            <button type="submit" onClick={()=>VerLista()}>Author</button>
            <un>
                {
                    listaTipoProducto.map((listItem) => <li key={listItem.id}>
                        IDProducto:{listItem.id}<br></br>Descripcion:{listItem.descripcion}
                        </li>)
                }
            </un>
        </>

      </div>
    </div>
  ));
};

export default Todo;
