"use server";
import { db } from "./db";

export async function getTodos(
  search?: string,
  filter?: string,
  page: number = 1
) {
  let filterType: boolean | undefined;
  if (filter === "active") {
    filterType = false;
  } else if (filter === "completed") {
    filterType = true;
  }

  return await db.todo.findMany({
    orderBy: {
      title: "asc",
    },
    skip: (page - 1) * 14,
    take: 14,
    where: {
      title: {
        contains: search,
      },
      AND: {
        complete: filterType,
      },
    },
  });
}

export async function countTodos(search?: string, filter?: string) {
  let filterType: boolean | undefined;
  if (filter === "active") {
    filterType = false;
  } else if (filter === "completed") {
    filterType = true;
  }
  return db.todo.count({
    where: {
      title: {
        contains: search,
      },
      AND: {
        complete: filterType,
      },
    },
  });
}

export async function toggleTodo(id: string, complete: boolean) {
  await db.todo.update({ where: { id }, data: { complete } });
}

export const deleteByCiteria = async (search?: string, filter?: string) => {
  let filterType: boolean | undefined;
  if (filter === "active") {
    filterType = false;
  } else if (filter === "completed") {
    filterType = true;
  }
  await db.todo.deleteMany({
    where: {
      title: {
        contains: search,
      },
      AND: {
        complete: filterType,
      },
    },
  });
};

export const deleteOneById = async (id: string) => {
  await db.todo.delete({
    where: { id },
  });
};

export const deleteAll = async () => {
  await db.todo.deleteMany();
};
