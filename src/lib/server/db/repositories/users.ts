import prisma from "../db";
import type { User } from "@prisma/client";

export type UserCreationData = {
    firstName: string;
    lastName: string;
    hashedPassword: string;
    email: string;
  }

export const userRepository = {
  create: async (data: UserCreationData) => {
    return prisma.user.create({ data });
  },

  findById: async (id: string): Promise<User | null> => {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  findAll: async (): Promise<User[] | null> => {
    return prisma.user.findMany();
  },

  update: async (
    id: string,
    data: Partial<Omit<User, "id" | "created_at">>
  ): Promise<User | null> => {
    return prisma.user.update({
      where: { id },
      data,
    });
  },

  delete: async (id: string): Promise<User | null> => {
    return prisma.user.delete({
      where: { id },
    });
  },
};
