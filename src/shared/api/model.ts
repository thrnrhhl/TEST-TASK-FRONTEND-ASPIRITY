import { Task } from "../config/models";

export interface ApiResponse<T> {
    ok: 0 | 1;
    message?: string;
    data: T;
}


export interface IGetTasks extends Task {};

export interface IAddTask extends Task {};
export interface IAddTaskForm extends Pick<Task, 'description'> {}

export interface IUpdateTask extends Task {};