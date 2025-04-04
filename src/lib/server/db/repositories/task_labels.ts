import prisma from "../db";
import type { Task_Label } from "@prisma/client";

export type TaskLabelCreationData = {
    task_id: string;
    label_id: string;
  };
  
  export const taskLabelRepository = {
    create: async (data: TaskLabelCreationData): Promise<Task_Label> => {
      return prisma.task_Label.create({ data });
    },

  findByTaskId: async (task_id: string): Promise<Task_Label[] | null> => {
    return prisma.task_Label.findMany({
      where: { task_id },
      include: {
        label: true,
        task: true,
      },
    });
  },

  findByLabelId: async (label_id: string): Promise<Task_Label[] | null> => {
    return prisma.task_Label.findMany({
      where: { label_id },
      include: {
        label: true,
        task: true,
      },
    });
  },

  delete: async (task_id: string, label_id: string): Promise<Task_Label | null> => {
    return prisma.task_Label.delete({
      where: {
        task_id_label_id: {
          task_id,
          label_id,
        },
      },
    });
  },
};
