'use server';

import { revalidatePath } from 'next/cache';

import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';

/** タスク更新処理 */
export async function updateTask(formData: FormData) {
  const data = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    status: formData.get('status') as string,
    deadline: formData.get('deadline') as string,
  };

  const prisma = new PrismaClient();

  await prisma.task.update({
    where: { id: formData.get('id') as string },
    data,
  });

  revalidatePath('/', 'layout');
  redirect(`/task/${formData.get('id')}`);
}

/** タスク削除処理 */
export async function deleteTask(id: string) {
  const prisma = new PrismaClient();

  await prisma.task.delete({ where: { id } });

  revalidatePath('/', 'layout');
  redirect('/task');
}
