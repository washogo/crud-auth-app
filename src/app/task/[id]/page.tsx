import PageTitle from '@/components/PageTitle';
import TaskDetail from '@/features/task/detail/TaskDetail';

// タスク詳細画面
export default async function TaskDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <>
      <PageTitle title="タスク詳細" />
      <TaskDetail id={id} />
    </>
  );
}
