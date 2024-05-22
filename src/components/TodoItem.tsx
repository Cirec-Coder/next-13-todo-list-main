"use client";

import { deleteOneById, toggleTodo } from "@/lib/dbUtils";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type TodoItemProps = {
  id: string;
  title: string;
  complete: boolean;
};

export function TodoItem({ id, title, complete }: TodoItemProps) {
  const router = useRouter();
  return (
    <li className="flex gap-1 items-center relative  even:bg-slate-700">
      <input
        id={id}
        type="checkbox"
        className="cursor-pointer peer"
        defaultChecked={complete}
        onChange={async (e) => {
          await toggleTodo(id, e.target.checked);
          router.refresh();
        }}
      />
      <label
        htmlFor={id}
        className="w-full cursor-pointer peer-checked:line-through peer-checked:text-slate-500"
      >
        {title}
      </label>
      <div className="absolute right-0 flex gap-3">
        <Link
        href={`/edit/${id}`}
        >
        <Edit2Icon width="1.2em" height="1.2em" className="text-slate-400"  />
        </Link>
        <button
          type="button"
          onClick={() => {
            deleteOneById(id);
            router.refresh();
          }}
        >
          <Trash2Icon width="1.2em" height="1.2em" className="text-red-400 hover:text-red-500" />
        </button>
      </div>
    </li>
  );
}
