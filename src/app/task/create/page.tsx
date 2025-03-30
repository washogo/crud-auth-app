import PageTitle from '@/components/PageTitle';
import Form from '@/features/task/create/Form';

// タスク作成画面
export default function CreateTaskPage() {
  return (
    <>
      <PageTitle title="タスク作成" />
      <Form />
    </>
  );
}
