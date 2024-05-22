import Link from "next/link";
import { names } from "@/lib/popolate";
import { db } from "@/lib/db";
import { countTodos, getTodos } from "@/lib/dbUtils";
import SearchBar from "@/components/SearchBar";
import TodosList from "@/components/TodosList";

type RecType = {
  title: string;
  complete: boolean;
};
const populateList = async () => {
  let list: RecType[] = [];
  names.map((name) => list.push({ title: name, complete: false }));

  await db.todo.createMany({
    data: list,
  });

  return list;
};

type SearchParamsProps = {
  searchParams: {
    search: string;
    filter: string;
  };
};

export default async function Home({ searchParams }: SearchParamsProps) {
  // let todos = await getTodos("ad","active");
  // console.log(todos)

  // console.log(populateList())
  // console.log(populateList())
  // console.log(populateList())
  // console.log(populateList())
  return (
    <>
      <header className="flex gap-5 justify-between items-center mb-4">
        <h1 className="text-xl text-center font-bold w-2/12 ">
          {await countTodos(searchParams.search, searchParams.filter)} Todos
        </h1>
        <SearchBar />
        <Link
          className="btn btn-ghost"
          href="/new"
        >
          New
        </Link>
      </header>
      <main>
        <TodosList
        //  {/* searchParams={searchParams} */}
        />
      </main>
    </>
  );
}
