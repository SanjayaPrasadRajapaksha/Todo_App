import React from 'react'

const Todo = ({ id, title, description, complete, mongoId, deleteTodo, completeTodo }) => {
    return (
        <tr className="hover:bg-gray-50">
            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{id + 1}</th>
            <td className={`px-6 py-4 ${complete ? "line-through" : ""}`}>{title}</td>
            <td className={`px-6 py-4 ${complete ? "line-through" : ""}`}>{description}</td>
            <td className="px-6 py-4">{complete ? "Completed" : "Pending"}</td>
            <td className="px-6 py-4">
                <div className="flex gap-2">
                    <button onClick={() => deleteTodo(mongoId)} className='py-2 px-4 bg-red-500 text-white'>Delete</button>
                    <button
                        onClick={() => completeTodo(mongoId)}
                        disabled={complete}
                        className={`py-2 px-4 text-white 
    ${complete ? "bg-green-300 cursor-not-allowed opacity-1" : "bg-green-500 hover:bg-green-600"}
  `}
                    >
                        Done
                    </button>

                </div>
            </td>
        </tr>
    )
}

export default Todo
