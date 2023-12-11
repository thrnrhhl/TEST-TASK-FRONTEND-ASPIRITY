import { api } from "../../../shared/api";
import { Task } from "@/src/shared/config/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IIS = {
    list: Task[];
    selectedTasks: Task['id'][];
}

const initialState: IIS = {
    list: [],
    selectedTasks: []
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: () => {},
        selectTask: (state, action:PayloadAction<Task['id']>) => {
            if(state.selectedTasks.includes(action.payload)) {
                state.selectedTasks = state.selectedTasks.filter(taskId => taskId !== action.payload)
            } else {
                state.selectedTasks.push(action.payload);
            }
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(api.endpoints.getTasks.matchFulfilled, (state, action) => {
            state.list = action.payload.data;
        }),
        builder.addMatcher(api.endpoints.addTask.matchFulfilled, (state, action) => {
            state.list.unshift(action.payload.data);
        }),
        builder.addMatcher(api.endpoints.updateTask.matchFulfilled,(state, action) => {
            const itemToUpdate = state.list.find(task => task.id === action.payload.data.id);
            if(itemToUpdate) {
                itemToUpdate.description = action.payload.data.description;
            }
        })
    }
});



export const { selectTask } = taskSlice.actions;