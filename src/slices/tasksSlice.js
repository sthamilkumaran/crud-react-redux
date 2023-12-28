import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    tasksList:[],
    selectedTask:{},
    isLoading : false,
    error : ''
}

const BASE_URL = 'http://localhost:8000/tasks'

//get.......>
export const getTasksFromServer = createAsyncThunk(
    "tasks/getTasksFromServer",
    async (_,{rejectWithValue}) => {
        const response = await fetch(BASE_URL)
        if (response.ok) {
            const jsonResponse = await response.json()
            return jsonResponse
        }else{
            return rejectWithValue({error:'No Tasks Found'})
        }
    }
)

//post.......>
export const addTasksToServer = createAsyncThunk(
    "tasks/addTasksToServer",
    async (task,{rejectWithValue}) => {
        const options = {
            method: 'POST',
            body: JSON.stringify(task),
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        const response = await fetch(BASE_URL,options)
        if (response.ok) {
            const jsonResponse = await response.json()
            return jsonResponse
        }else{
            return rejectWithValue({error:'Task Not Added'})
        }
    }
)

//PATCH.......>
export const updateTasksToServer = createAsyncThunk(
    "tasks/updateTasksToServer",
    async (task,{rejectWithValue}) => {
        const options = {
            method: 'PATCH',
            body: JSON.stringify(task),
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        const response = await fetch(BASE_URL + '/' + task.id,options)
        if (response.ok) {
            const jsonResponse = await response.json()
            return jsonResponse
        }else{
            return rejectWithValue({error:'Task Not Updated'})
        }
    }
)

const tasksSlice = createSlice({
    name:'tasksSlice',
    initialState,
    reducers: {
        addTaskToList:(state,action) => {
            const id = Math.random() * 100; //id create panrom
            let task = {...action.payload,id} // idya add panrom action kka
            state.tasksList.push(task)
        },

        removeTaskFromList:(state,action) => {
            state.tasksList = state.tasksList.filter((task) => task.id !== action.payload.id)
        },

        updateTaskInList:(state,action) => {
            state.tasksList = state.tasksList.map((task) => task.id === action.payload.id ? action.payload : task)
        },

        setSelectedTask:(state,action) => {
            state.selectedTask = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTasksFromServer.pending,(state) => {
                state.isLoading = true
            })
            .addCase(getTasksFromServer.fulfilled,(state,action) => {
                state.isLoading = false
                state.error = ''
                state.tasksList = action.payload
            })
            .addCase(getTasksFromServer.rejected,(state,action) => {
                state.error = action.payload.error
                state.isLoading = false
                state.tasksList = []
            })

            .addCase(addTasksToServer.pending,(state) => {
                state.isLoading = true
            })
            .addCase(addTasksToServer.fulfilled,(state,action) => {
                state.isLoading = false
                state.error = ''
                state.tasksList.push(action.payload)
            })
            .addCase(addTasksToServer.rejected,(state,action) => {
                state.error = action.payload.error
                state.isLoading = false
            })

            .addCase(updateTasksToServer.pending,(state) => {
                state.isLoading = true
            })
            .addCase(updateTasksToServer.fulfilled,(state,action) => {
                state.isLoading = false
                state.error = ''
                state.tasksList = state.tasksList.map((task) => task.id === action.payload.id ? action.payload : task)
            })
            .addCase(updateTasksToServer.rejected,(state,action) => {
                state.error = action.payload.error
                state.isLoading = false
            })
    }
})

export const {addTaskToList,removeTaskFromList,updateTaskInList,setSelectedTask} = tasksSlice.actions
export default tasksSlice.reducer