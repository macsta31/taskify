import prisma from "../db";
import type { Project } from "@prisma/client";

export type ProjectCreationData = {
    title: string;
    description?: string;
    deadline?: Date;
    user_id: string;
  };
  
  export const projectRepository = {
    create: async (data: ProjectCreationData): Promise<Project> => {
      return prisma.project.create({ data });
    },
  findById: async (id: string): Promise<Project | null> => {
    return prisma.project.findUnique({
      where: { id },
      include: { task: true },
    });
  },
  findAll: async (): Promise<Project[] | null> => {
    return prisma.project.findMany({
      include: { task: true },
    });
  },
  update: async (
    id: string,
    data: Partial<Omit<Project, "id" | "created_at" | "updatedAt">>
  ): Promise<Partial<Project> | null> => {
    return prisma.project.update({
      where: { id },
      data,
    });
  },
  delete: async (id: string): Promise<Project | null> => {
    return prisma.project.delete({
      where: { id },
    });
  },
};
