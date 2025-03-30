'use server';

import { revalidatePath } from 'next/cache';
import { Prisma, PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';

/** タスク更新処理 */
export async function updateTask(_: { code: string; message: string }, formData: FormData) {
  const data = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    status: formData.get('status') as string,
    deadline: formData.get('deadline') as string,
  };

  const prisma = new PrismaClient();

  try {
    await prisma.task.update({
      where: { id: formData.get('id') as string },
      data,
    });
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
  redirect(`/task/${formData.get('id')}`);
}

/** タスク削除処理 */
export async function deleteTask(_: { code: string; message: string }, id: string) {
  const prisma = new PrismaClient();

  try {
    await prisma.task.delete({ where: { id } });
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
