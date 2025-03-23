import PageTitle from '@/components/PageTitle';
import Tasks from '@/components/Tasks';

// タスク一覧画面
export default function TasksPage() {
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
        <Tasks />
      </div>
    </>
  );
}
