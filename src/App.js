import React, { useEffect, useState } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';
import axios from 'axios';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [invites, setInvites] = useState([])
  const [isSuccess, setIsSuccess] = useState(false)


  const handleInvite = (id) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter(_id => _id !== id))
    } else {
      setInvites((prev) => [...prev, id])
    }
  }


  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://reqres.in/api/users')
      setUsers(response.data.data)
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
     
  }

useEffect(() => {
  fetchUsers()
}, [])

  return (
    <div className="App">
      {
        isSuccess?
        <Success count={invites.length} setIsSuccess = {setIsSuccess} /> :
        <Users isLoading={isLoading} handleInvite={handleInvite} invites={invites} setIsSuccess={setIsSuccess} items={users}/>
      }

      {/* <Success /> */}
    </div>
  );
}

export default App;
