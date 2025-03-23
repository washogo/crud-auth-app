import { createClient } from '@/utils/supabase/server';
import { PrismaClient } from '@prisma/client';

// タスク詳細取得処理
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { error } = await supabase.auth.getUser();
  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  const prisma = new PrismaClient();
  const { id } = await params;
  const task = await prisma.task.findUnique({
    where: {
      id: id,
    },
  });

  return Response.json(task, { status: 200, headers: { 'Content-Type': 'application/json' } });
}
