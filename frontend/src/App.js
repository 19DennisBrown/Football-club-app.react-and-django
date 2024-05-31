
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const App = () => {
  const [items, setItems] = useState([])
  const [name, setName] = useState('')
  // const [initials, setInitials] = useState('')
  // const [titles, setTitle] = useState('')
  const [year, setYear] = useState()
  // const [editingId, setEditingId] = useState(null)
  useEffect(()=>{
    fetchData()
  },[])

  const fetchData = async ()=>{
    try{
      const response = await axios.get('http://127.0.0.1:8000/')
      setItems(response.data)
    } catch(error){
      console.error(`Error fetching data ${error}`)
    }
  }

  const handleAddItem = async ()=>{
    try{
      const newItem = {name, year}
      const response = await axios.post('http://127.0.0.1:8000/', {name, year})
      setItems([...items, response.items])
      // fetchData()
      setName('')
      setYear()
      console.log(newItem)
    } catch(error){
      console.error(`Error creating new item ${error}`)
    }
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    handleAddItem()
  }
  return (
    <div>
      <div>
        <h2>add new data</h2>
        <form onSubmit={handleSubmit} >
          <input
            type='text'
            placeholder='enter name here'
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
          />
          <br/>
          <input 
            type='number'
            placeholder='enter year founded'
            value={year}
            onChange={(e)=>setYear(e.target.value)}
            required
            /><br/><hr/>
            <input type='submit'/>

        </form>
      </div>
      <div>
        <h2>data from django Backend</h2>
        <ul>
          {items.map((item)=>(
            <li key={item.id}>
              {item.name}
              <button>edit</button>
              <button>delete</button>
              <hr/>
            </li>
          ))}
        </ul>
      </div>
    </div>

  )
}

export default App