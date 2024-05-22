"use client";
import { countTodos, getTodos } from "@/lib/dbUtils";
import React, { useEffect, useState } from "react";
import FilterButton from "./FilterButton";
import { Todo } from "@prisma/client";
import { TodoItem } from "./TodoItem";
import DeleteAllButton from "./DeleteAllButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Pagination from "./Pagination";

const FILTER_NAMES = ["all", "active", "completed"];

const TodosList = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get("search") || "";
  const filter = searchParams.get("filter") || "all";
  const page = Number(searchParams.get("page")) || 1;
  const [todos, setTodos] = useState<Todo[]>([]);
  const [pageCount, setPageCount] = useState(0);

  if (page > pageCount || page < 1) {
    const param = new URLSearchParams(searchParams);
    param.set("page", "1");
    router.replace(`${pathname}?${param.toString()}`);
  }

  useEffect(() => {
    try {
      countTodos(search, filter).then((count) => {
        setPageCount(Math.ceil(count / 14));
      });
      getTodos(search, filter, page).then((todo) => {
        setTodos(todo);
      });
    } catch (error) {
      console.error(error);
    }
  }, [search, filter, page]);

  const FilterButtons = FILTER_NAMES.map((name, index) => (
    <FilterButton
      key={index}
      name={name}
      filter={filter}
    />
  ));

  return (
    <>
      <div className="flex justify-between mt-10 ">
        <div>{FilterButtons}</div>
        <DeleteAllButton />
      </div>
      <div className="mt-5 max-h-3/4">
        {todos.length > 0 && (
          <>
            {/* <h2>{todos.length} Todos </h2> */}
            <ul className="pl-4 space-y-2 min-h-[445px] max-h-[445px] overflow-auto">
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  {...todo}
                />
              ))}
            </ul>
          </>
        )}
      </div>
      <Pagination
        pageNum={pageCount}
        page={page}
      />
    </>
  );
};

export default TodosList;
