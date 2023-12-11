import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Task } from "../config/models";
import { ApiResponse, IAddTask, IAddTaskForm, IGetTasks } from "./model";

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://test-task-backend-for-deploy-aspirity.vercel.app'
    }),
    tagTypes: ['Task'],
    endpoints: (builder) => ({
        getTasks: builder.query<ApiResponse<IGetTasks[]>, null>({
            query: () => `/tasks/`,
            providesTags: (result) => result?.data ? [...result.data.map(key => ({ type: 'Task' as const, id: key.id })), 'Task'] : ['Task']
        }),
        addTask: builder.mutation<ApiResponse<IAddTask>, IAddTaskForm>({
            query: (payload) => ({
                url: '/tasks/',
                method: 'POST',
                body: payload
            }),
        }),
        updateTask: builder.mutation<ApiResponse<IAddTask>, Omit<Task, 'createdAt'>>({
            query: (payload) => ({
                url: '/tasks/',
                method: 'PUT',
                body: payload
            }),
        }),
        deleteTask: builder.mutation<ApiResponse<{}>, Task['id'][]>({
            query: (payload) => ({
                url: '/tasks/',
                method: 'DELETE',
                body: payload
            }),
            invalidatesTags: ['Task']
        }),
    })
})