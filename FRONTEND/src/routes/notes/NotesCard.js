import React from 'react'

export default function NotesCard(props) {
  return (
      <div className={`bg-[${props.note.color}]-500 rounded shadow border p-6 w-64`}>
        <h5 className="text-3xl font-bold mb-4 mt-0">{props.note.title}</h5>
        <p className="text-gray-700 text-sm">{props.note.descriptions}</p>
      </div> 
  )
}
