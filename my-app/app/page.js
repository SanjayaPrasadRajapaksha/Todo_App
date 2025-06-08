"use client"
import Todo from "@/Components/Todo";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [todoData, setTodoData] = useState([]);

  const fetchTodos = async () => {
    const response = await axios.get('/api');
    console.log("data", response)
    setTodoData(response.data.todos)
  }

  const deleteTodo = async (id) => {
    const response = await axios.delete('/api', {
      params: {
        mongoId: id
      }
    })
    toast.success(response.data.msg);
    fetchTodos();
  }
 const completeTodo = async (id) => {
    const response = await axios.put('/api',{}, {
      params: {
        mongoId: id
      }
    })
    toast.success(response.data.msg);
    fetchTodos();
  }


  useEffect(() => {
    fetchTodos();
  }, [])
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData(form => ({ ...form, [name]: value }));
    console.log(formData)
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api', formData);
      toast.success(response.data.msg);
      setFormData({
        title: "",
        description: "",
      })
      await fetchTodos();
    } catch (error) {
      toast.error("Error")
    }
  }
  return (
    <>
      <ToastContainer theme="dark" />
      <form onSubmit={onSubmitHandler} className="relative overflow-x-auto mt-24 w-[60%] mx-auto">
        <input value={formData.title} onChange={onChangeHandler} type="text" name="title" placeholder="Enter Title" className="px-3 py-2 border-2 w-full" />
        <textarea onChange={onChangeHandler} name="description" placeholder="Enter Description" className="px-3 py-2 border-2 w-full" />
        <button type="submit" className="bg-orange-600 py-3 px-11">Add Todo</button>
      </form>


      <div className="mt-8">
        <table id="search-table" className="min-w-full divide-y divide-gray-200 rounded-md overflow-hidden shadow-md">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {todoData.map((item, index) => {
              return <Todo key={index} id={index} title={item.title} description={item.description} complete={item.isCompleted} mongoId={item._id} deleteTodo={deleteTodo} completeTodo={completeTodo}/>
            })}
          </tbody>
        </table>
      </div>


    </>
  );
}
