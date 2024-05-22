// import { db } from "@/db"
// 'use client'
import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";

async function createTodo(data: FormData) {
  "use server";

  const id: string = data.get("id")?.valueOf() as string;
  const title = data.get("title")?.valueOf();
  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid Title");
  }

  // const todo = await db.todo.findFirst({
  //   where: { id: id },
  // });

  // if (todo) {
    await db.todo.update({
      where: { id: id },
      data: { title },
    });
    redirect("/");
  // }
}

type EditTodoProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: EditTodoProps) {
  const { id } = params;
  // console.log(id);
  const todo = await db.todo.findFirst({
    where: { id: id },
  });

  return (
    <div className="container">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Edit</h1>
      </header>
      {todo ? (
        <form
          action={createTodo}
          className="flex gap-2 flex-col"
        >
          <input
            type="text"
            name="id"
            defaultValue={id}
            hidden
          />
          <input
            type="text"
            name="title"
            defaultValue={todo.title}
            className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
          />
          <div className="flex gap-1 justify-end mt-5">
            <Link
              href=".."
              className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
            >
              Update
            </button>
          </div>
        </form>
      ) : (
        <h2>Wrong id</h2>
      )}
    </div>
  );
}
