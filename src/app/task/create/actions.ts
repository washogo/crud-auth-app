'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { Prisma, PrismaClient } from '@prisma/client';

/** タスク作成処理 */
export async function createTask(_: { code: string; message: string }, formData: FormData) {
  const supabase = await createClient();

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error('ログインしてください');

  const data = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    status: '未着手',
    deadline: formData.get('deadline') as string,
    authorId: userData.user.id,
  };

  const prisma = new PrismaClient();

  try {
    await prisma.task.create({ data });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        code: e.code,
        message: e.message,
      };
    }
    throw e;
  }

  revalidatePath('/', 'layout');
  redirect('/task');
}
