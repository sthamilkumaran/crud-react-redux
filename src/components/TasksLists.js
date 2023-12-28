import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import MyVerticallyCenteredModal from './UpdateTask';
import {useSelector,useDispatch} from 'react-redux';
import { setSelectedTask, removeTaskFromList, getTasksFromServer } from '../slices/tasksSlice';

const TasksLists = () => {

    const {tasksList} = useSelector((state) => state.tasks)
    const dispatch = useDispatch()
    const updateTask = (task)=>{
        setModalShow(true)
        console.log('update task')
        dispatch(setSelectedTask(task))
    }

    useEffect(() => {
      dispatch(getTasksFromServer())
    },[dispatch])

    const deleteTask = (task)=>{
      dispatch(removeTaskFromList(task))
        console.log('delete task')
    }

    const [modalShow,setModalShow] = useState(false)
  return (
    <>
    <Table responsive="sm">
        <thead>
          <tr className='text-center'>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            tasksList && tasksList.map((task,index) => {
              return(
                <tr className='text-center' key={task.id}>
                  <td>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>
                      <Button className='mx-2' variant="primary" onClick={() => updateTask(task)}><i className="bi bi-pencil-square"></i></Button>
                      <Button variant="primary" onClick={() => deleteTask(task)}><i className="bi bi-trash3-fill"></i></Button>
                  </td>
              </tr>
              )
            })
          }
        </tbody>
    </Table>
    <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  )
}

export default TasksLists