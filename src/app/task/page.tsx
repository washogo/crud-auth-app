import PageTitle from '@/components/PageTitle';
// import Tasks from '@/components/Tasks';
import { createClient } from '@/utils/supabase/server';
import { PrismaClient } from '@prisma/client';

// タスク一覧画面
export default async function TasksPage() {
  const supabase = await createClient();
  const { data: userData, error } = await supabase.auth.getUser();
  if (error) {
    console.error(error.message);
    return [];
  }

  const prisma = new PrismaClient();
  const tasks = await prisma.task.findMany({
    where: {
      authorId: userData.user.id,
    },
  });

  return (
    <>
      <PageTitle title="タスク一覧" />
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-2 w-full border-b border-blue-800">
          <p className="w-1/10">タイトル</p>
          <p className="w-2/3">詳細</p>
          <p className="w-1/10">ステータス</p>
          <p className="w-1/10">期限</p>
        </div>
        {/* <Tasks /> */}
        {tasks.length > 0 &&
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex flex-row gap-3 hover:cursor-pointer border-b border-blue-800"
              // onClick={() => router.push(`/task/${task.id}`)}
            >
              <div className="w-1/10 group">
                <p className="truncate group-hover:whitespace-normal group-hover:opacity-80">{task.title}</p>
              </div>
              <div className="w-2/3 group">
                <p className="truncate group-hover:whitespace-normal group-hover:opacity-80">{task.description}</p>
              </div>
              <div className="w-1/10 group">
                <p className="truncate group-hover:whitespace-normal">{task.status}</p>
              </div>
              <div className="w-1/10 group">
                <p className="truncate group-hover:whitespace-normal">{task.deadline}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
