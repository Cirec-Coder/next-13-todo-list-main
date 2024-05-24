import Link from "next/link";
import { db } from "@/lib/db";
import { countTodos } from "@/lib/dbUtils";
import SearchBar from "@/components/SearchBar";
import TodosList from "@/components/TodosList";
import Populate from "@/components/Populate";

type SearchParamsProps = {
  searchParams: {
    search: string;
    filter: string;
  };
};

export default async function Home({ searchParams }: SearchParamsProps) {
  const count = await countTodos()
  
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
        {count === 0 && <Populate/> }
        <TodosList
        />
      </main>
    </>
  );
}
