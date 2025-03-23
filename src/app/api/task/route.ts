import { createClient } from '@/utils/supabase/server';
import { PrismaClient } from '@prisma/client';

// タスク一覧取得処理
export async function GET() {
  const supabase = await createClient();
  const { data: userData, error } = await supabase.auth.getUser();
  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  const prisma = new PrismaClient();
  const tasks = await prisma.task.findMany({
    where: {
      authorId: userData.user.id,
    },
  });

  return Response.json(tasks, { status: 200, headers: { 'Content-Type': 'application/json' } });
}
