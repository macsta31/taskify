import { taskLabelRepository } from "../db/repositories/task_labels";
import type { Task_Label } from "@prisma/client";
import type { TaskLabelCreationData } from "../db/repositories/task_labels";
import { utils } from "../utils/utils";
import type { Response } from "../utils/utils";

export const taskLabelServices = {
    createTaskLabel: async (data: TaskLabelCreationData): Promise<Response<Task_Label|null, Error|null>> => {
        const callback = async (input: TaskLabelCreationData) => {
            return await taskLabelRepository.create(input)
        }

        const [response, error] = await utils.tryCatch(callback, data)
        if(error){
            return {
                data: null,
                error
            }
        }
        return {
            data: response,
            error: null
        }
    },
    findAllByTask: async (task_id: string): Promise<Response<Task_Label[]|null, Error|null>> => {
        const callback = async (task_id: string) => {
            return await taskLabelRepository.findByTaskId(task_id)
        }

        const [response, error] = await utils.tryCatch(callback, task_id)
        if(error) {
            return {
                data: null,
                error
            }
        }
        return {
            data: response,
            error: null
        }
    }
} 