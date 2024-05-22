import { db } from "@/lib/db";
import { faker } from "@faker-js/faker";
import { NextResponse } from "next/server";

type RecType = {
    title: string;
    complete: boolean;
  };
  
export async function POST(req: Request) {
    try {
        let list: RecType[] = [];
        for (let i = 0; i < 200; i++) {
          list.push({
            title: faker.word.words({ count: { min: 1, max: 4 } }),
            complete: false,
          });
        }
      
        const todos = await db.todo.createMany({
          data: list,
        });
              return NextResponse.json({ status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'could not create todos'}, { status: 500 });
    }
}