import APIClient from "./api-client";

export interface Todo {
    id: number;
    title: string;
}
export default new APIClient<Todo>('/todos')