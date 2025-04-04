import { taskRepository } from "../db/repositories/tasks";
import type { Task } from "@prisma/client";
import type { TaskCreationData } from "../db/repositories/tasks";
import { utils } from "../utils/utils";
import type { Response } from "../utils/utils";

export const taskServices = {
  createTask: async (
    data: TaskCreationData
  ): Promise<Response<Task | null, Error | null>> => {
    const callback = async (input: TaskCreationData) => {
      return await taskRepository.create(input);
    };

    const [response, error] = await utils.tryCatch(callback, data);
    if (error) {
      return {
        data: null,
        error,
      };
    }
    return {
      data: response,
      error: null,
    };
  },
  findAll: async (): Promise<Response<Task[] | null, Error | null>> => {
    const callback = async () => {
      return await taskRepository.findAll();
    };

    const [response, error] = await utils.tryCatch(callback);
    if (error) {
      return {
        data: null,
        error,
      };
    }
    return {
      data: response,
      error: null,
    };
  },
};
