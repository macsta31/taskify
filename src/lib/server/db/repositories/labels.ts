import prisma from "../db";
import type { Label } from "@prisma/client";

export type LabelCreationData = {
    name: string,
    color: string,
  }

export const labelRepository = {
  create: async (data: LabelCreationData) => {
    return prisma.label.create({ data });
  },

  findById: async (id: string): Promise<Label | null> => {
    return prisma.label.findUnique({
      where: { id },
      include: {
        tasks: {
          include: {
            task: true
          }
        }
      },
    });
  },

  findAll: async (): Promise<Label[] | null> => {
    return prisma.label.findMany({
      include: {
        tasks: {
          include: {
            task: true
          }
        }
      },
    });
  },

  update: async (
    id: string,
    data: Partial<Omit<Label, "id" | "created_at">>
  ): Promise<Label | null> => {
    return prisma.label.update({
      where: { id },
      data,
    });
  },

  delete: async (id: string): Promise<Label | null> => {
    return prisma.label.delete({
      where: { id },
    });
  },
};
