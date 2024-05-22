import Link from "next/link";
// import { names } from "@/lib/popolate";
import { db } from "@/lib/db";
import { countTodos } from "@/lib/dbUtils";
import SearchBar from "@/components/SearchBar";
import TodosList from "@/components/TodosList";
import { faker } from "@faker-js/faker";

type RecType = {
  title: string;
  complete: boolean;
};
const populateList = async () => {
  let list: RecType[] = [];
  for (let i = 0; i < 200; i++) {
    list.push({
      title: faker.word.words({ count: { min: 1, max: 4 } }),
      complete: false,
    });
  }

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
  // console.log(await populateList())
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
