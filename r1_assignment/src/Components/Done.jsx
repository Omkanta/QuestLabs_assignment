import { Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  Box, HStack, Text, VStack, useDisclosure 
} from '@chakra-ui/react'
import { CloseIcon, EditIcon } from '@chakra-ui/icons'

import React, { useState } from 'react'

export const Done = ({props,HandleAdd}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [new_task_title,setnew_task_title]=useState("")
  const [new_task_desc,setnew_task_desc]=useState("")

  const user_mail=localStorage.getItem("user_mail")

const AddTask=()=>{
  let newObj={
    user_mail,
    title:new_task_title,
    description:new_task_desc,
    status:"done"
  }
  HandleAdd(newObj);
  onClose()
}

  return (<>
    <Box bg={'grey'} borderRadius={'10px'} p={'2'}>
      <Text fontWeight={'bold'}>Done</Text>

      <VStack>
        {props.map((el) => {
          return <>
            <Box m={'auto'} p={'3'} key={el.id} w={'90%'} borderRadius={'10px'} bg={'white'} mb={'2'}>
              <HStack>
                <Text fontWeight={'bold'} >{el.title}</Text>
                <HStack>
                  <EditIcon />
                  <CloseIcon color={'red.400'} />
                </HStack>
              </HStack>
              <Text>{el.description}</Text>

            </Box>
          </>
        })}
        <Button onClick={onOpen}>Add Task</Button>
      </VStack>
    </Box>


    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <FormControl>
          <FormLabel>Task Title</FormLabel>
          <Input onChange={(e)=>{setnew_task_title(e.target.value)}} type='text' />
          <FormLabel>Task Description</FormLabel>
          <Input onChange={(e)=>{setnew_task_desc(e.target.value)}} type='text' />
        </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={AddTask} variant='ghost'>ADD</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  </>
  )
}
