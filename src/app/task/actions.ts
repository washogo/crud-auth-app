'use server';

import { createClient } from "@/utils/supabase/server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/** タスク一覧取得処理 */
export async function getTasks() {
  const supabase = await createClient();
  const { data: userData, error } = await supabase.auth.getUser();
  if (error) {
    console.error(error);
    revalidatePath("/", "layout");
    redirect("/error");
  }

  const prisma = new PrismaClient();
  const tasks = await prisma.task.findMany({
    where: {
      authorId: userData.user.id,
    },
  });

  return tasks;
}