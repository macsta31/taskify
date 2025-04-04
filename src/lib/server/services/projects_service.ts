import { projectRepository } from "../db/repositories/projects";
import type { Project } from "@prisma/client";
import type { ProjectCreationData } from "../db/repositories/projects";
import { utils } from "../utils/utils";
import type { Response } from "../utils/utils";

export const projectServices = {
    createProject: async (data: ProjectCreationData): Promise<Response<Project|null, Error|null>> => {
        const callback = async (input: ProjectCreationData) => {
            return await projectRepository.create(input)
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
    findAll: async (): Promise<Response<Project[]|null, Error | null>> => {
        const callback = async () => {
          return await projectRepository.findAll();
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
}
