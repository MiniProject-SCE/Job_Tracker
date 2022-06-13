import React from 'react'

export default function NotesCard(props) {
  const bg = `bg-${props.note.color}-500 `
  console.log(bg)
  return (
      <div className={`${bg} rounded shadow border p-6 w-64`}>
        <h5 className="text-3xl font-bold mb-4 mt-0">{props.note.title}</h5>
        <p className="text-gray-700 text-sm">{props.note.descriptions}</p>
      </div> 
  )
}
