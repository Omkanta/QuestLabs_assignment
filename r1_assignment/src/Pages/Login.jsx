'use client'

import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email,setEmail]=useState("");
    const [pass,setPass]=useState("");
    const navigate = useNavigate();


    const handleLogin = () => {

        const loginData = {
            email,
            password:pass
        };
      let flag=false
        fetch('https://rm-mock4-server.onrender.com/users')
        .then((response) => response.json())
        .then((users) => {
          for(let i=0;i<users.length;i++){
            if(users[i]["email"]==loginData['email'] && users[i]["password"]==loginData["password"]){
                localStorage.setItem('user_mail', loginData.email);
                flag=true;
                navigate('/dashboard')
                alert("Login Successfull!!")
            }            
          }    
          if(!flag){
            alert("Please chcek your credentails")
          }  
          })
          .catch((error) => {
            console.error('Error while logging in:', error);
          });
      };
      

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Log in to your account</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input onChange={(e)=>setEmail(e.target.value)} type="email" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input onChange={(e)=>setPass(e.target.value)} type="password" />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox>Remember me</Checkbox>
              <Text color={'blue.500'}>Forgot password?</Text>
            </Stack>
            <Button onClick={handleLogin} colorScheme={'blue'} variant={'solid'}>
              Log in
            </Button>
            <Text color={'blue.500'} textAlign={'center'} onClick={()=>{    navigate('/signup');
}}>Are you new User?</Text>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
          }
        />
      </Flex>
    </Stack>
  )
}