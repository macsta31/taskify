import prisma from "../db";
import type { Task } from "@prisma/client";

export type TaskCreationData = {
    title: string;
    parent_task_id?: string;
    project_id?: string;
    priority?: number;
    description?: string;
    status?: string;
    start_date?: Date;
    end_date?: Date;
    estimated_duration_hours?: number;
    actual_duration_hours?: number;
    user_id: string;
  };
  
  export const taskRepository = {
    create: async (data: TaskCreationData): Promise<Task> => {
      return prisma.task.create({ data });
    },

  findById: async (id: string): Promise<Task | null> => {
    return prisma.task.findUnique({
      where: { id },
      include: {
        parent_task: true,
        child_tasks: true,
        project: true,
        labels: {
          include: {
            label: true
          }
        }
      },
    });
  },

  findAll: async (): Promise<Task[] | null> => {
    return prisma.task.findMany({
      include: {
        parent_task: true,
        child_tasks: true,
        project: true,
        labels: {
          include: {
            label: true
          }
        }
      },
    });
  },

  update: async (
    id: string,
    data: Partial<Omit<Task, "id" | "created_at" | "update_at">>
  ): Promise<Task | null> => {
    return prisma.task.update({
      where: { id },
      data,
    });
  },

  delete: async (id: string): Promise<Task | null> => {
    return prisma.task.delete({
      where: { id },
    });
  },
};
