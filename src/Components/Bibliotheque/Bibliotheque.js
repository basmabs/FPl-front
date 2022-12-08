import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
function Bibliotheque() {
  const [Livre, setLivre] = useState([])
  const Data = async () => {
    const data = await axios.get('http://localhost:3000/getLivre')
    setLivre(data.data)
  }
  useEffect(() => {
    Data()
  }, [])
  const upload = async (id) => {
    try {
      await axios.get(`http://localhost:3000/getLivrebyid/${id}`)
      Data();
    
    }
    catch (errors) { console.log(errors) }
  }
  return (
    <div>
      <div><h4>Bibliothèque des livres</h4></div>
      <table className='table table-hover'>
        <thead>
          <tr>
            <th>#</th>
            <th>nom de livre</th>
            <th>description</th>
          </tr>
        </thead>
        <tbody>
          {Livre.map((livre) => {
            return (
              <tr key={livre.id}>
                <td>{livre.title}</td>
                <td>{livre.description}</td>
                <td>
                  <button onClick={() => upload(livre.id)} className="btn btn-primary" type='button'>upload</button>
                </td>
              </tr>)
          })}
        </tbody>
      </table>
    </div>
  )
}
export default Bibliotheque;