import { userRepository } from "../db/repositories/users";
import type { User } from "@prisma/client";
import { UserCreationData } from "../db/repositories/users";
import { utils } from "../utils/utils";
import type { Response } from "../utils/utils";

export const userServices = {
  createUser: async (
    data: UserCreationData
  ): Promise<Response<User | null, Error | null>> => {
    const callback = async (input: UserCreationData) => {
      return await userRepository.create(input);
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
  findAll: async (): Promise<Response<User[] | null, Error | null>> => {
    const callback = async () => {
      return await userRepository.findAll();
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
