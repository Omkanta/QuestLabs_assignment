import { Box, Button, HStack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Upcoming } from '../Components/Upcoming'
import { Inprogress } from '../Components/Inprogress'
import { Toreview } from '../Components/Toreview'
import { Done } from '../Components/Done'
import { Tracking } from '../Components/Tracking'
import { useNavigate } from 'react-router-dom'

export const Dashboard = () => {
  const [data,setData]=useState([])
  const [upcoming,setupcoming]=useState([])
  const [inprogress,setinprogress]=useState([])
  const [review,setreview]=useState([])
  const [done,setdone]=useState([])
  const [tracking,settracking]=useState([])
  const [refresh,setRefresh]=useState(false)
  const navigate = useNavigate();


  const HandleLogout=()=>{
    localStorage.removeItem("user_mail");
    alert("Logout Successfull!!")
    navigate('/')

  }

  const HandleAdd=(newObj)=>{
    fetch('https://rm-mock4-server.onrender.com/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newObj),
    })
      .then((response) => response.json())
      .then(() => {
        setRefresh(!refresh)
        alert('Task added successfully!');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const HandleEdit=(updatedObj,id)=>{

fetch(`https://rm-mock4-server.onrender.com/tasks/${id}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(updatedObj),
})
  .then((response) => {
    if (response.ok) {
      setRefresh(!refresh)
      alert('Task updated successfully.');
    } else {
      console.error('Error in updating task.');
    }
  })
  .catch((error) => {
    console.error('Network error:', error);
  });
  }

  const HandleDelete=(id)=>{

fetch(`https://rm-mock4-server.onrender.com/tasks/${id}`, {
  method: 'DELETE',
})
  .then((response) => {
    if (response.ok) {
      setRefresh(!refresh)
      alert('Task deleted successfully.');
    } else {
      alert('Error in deleting task.');
    }
  })
  .catch((error) => {
    console.error('Network error:', error);
  });

  }

  useEffect(()=>{
    fetch('https://rm-mock4-server.onrender.com/tasks')
    .then((response) => response.json())
    .then((data) => {
      setData(data)
      if(data.length!=0){

        const filtered_review=data.filter((el) => el.status == "to-review");
        setreview(filtered_review)
        const filtered_inprogress=data.filter((el) => el.status == "in-progress");
        setinprogress(filtered_inprogress)
        const filtered_upcoming=data.filter((el) => el.status == "up-coming");
        setupcoming(filtered_upcoming)
        const filtered_done=data.filter((el) => el.status == "done");
        setdone(filtered_done)
        const filtered_tracking=data.filter((el) => el.status =="tracking");
        settracking(filtered_tracking)
      }
      }
    )

  },[refresh])
  console.log(data);
  return (<>
    <Text mt={'5'} textAlign={'center'} fontSize={'30'} fontWeight={'semibold'}>DashBoard</Text>
    <Box display={'flex'} justifyContent={'flex-end'}>
      <Button mr={'10'} mb={'5'} bg={'red.500'} color={'white'} _hover={{bg:"red.600"}} onClick={HandleLogout}>Logout</Button>
    </Box>
    <HStack justifyContent={'space-evenly'}>
      <Upcoming props={upcoming} HandleAdd={HandleAdd} HandleEdit={HandleEdit} HandleDelete={HandleDelete}/>
      <Inprogress props={inprogress} HandleAdd={HandleAdd} HandleEdit={HandleEdit} HandleDelete={HandleDelete} />
      <Toreview props={review} HandleAdd={HandleAdd} HandleEdit={HandleEdit} HandleDelete={HandleDelete} />
      <Done props={done} HandleAdd={HandleAdd} HandleEdit={HandleEdit} HandleDelete={HandleDelete} />
      <Tracking props={tracking} HandleAdd={HandleAdd} HandleEdit={HandleEdit} HandleDelete={HandleDelete} />
    </HStack>
  </>)
}
