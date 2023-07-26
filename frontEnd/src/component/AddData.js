import axios from 'axios'
import { React, useState, useEffect } from 'react'
import Navbar from './Navbar'
import Form from './Form'

const AddData = () => {

  const [getUser, setUser] = useState([])
 
  const getUserData = async () => {

    let token = JSON.parse(localStorage.getItem("token"))
    await axios({
      method: "GET",
      url: 'http://localhost:7000/api/getprofile',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    }).then((res) => {
      setUser(res.data.getprofile[0])
    }).catch((error) => {
      console.log(error)
    })

  }

  useEffect(() => {
    getUserData()
  }, [])


  return (
    <div>
      <Navbar/>
      <Form />

    </div>
  )
}

export default AddData;