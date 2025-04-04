import { labelRepository } from "../db/repositories/labels";
import type { Label } from "@prisma/client";
import type { LabelCreationData } from "../db/repositories/labels";
import { utils } from "../utils/utils";
import type { Response } from "../utils/utils";

export const labelServices = {
  createLabel: async (
    data: LabelCreationData
  ): Promise<Response<Label | null, Error | null>> => {
    const callback = async (input: LabelCreationData) => {
      return await labelRepository.create(input);
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
  findAll: async (): Promise<Response<Label[]|null, Error | null>> => {
    const callback = async () => {
      return await labelRepository.findAll();
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
