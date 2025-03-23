import Button from '@/components/Button';
import Input from '@/components/Input';
import PageTitle from '@/components/PageTitle';
import { createTask } from './actions';

// タスク作成画面
export default function CreateTaskPage() {
  return (
    <>
      <PageTitle title="タスク作成" />
      <form className="flex flex-col gap-3" action={createTask}>
        <Input label="タイトル" type="text" name="title" placeholder="タイトル" required />
        <div className="flex flex-row gap-2 w-full">
          <label className="w-1/8" htmlFor="description">
            詳細
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="詳細"
            required
            className="w-full max-w-2xs h-full max-h-24 border-1 bg-white p-1"
          ></textarea>
        </div>
        <div className="flex flex-row gap-2 w-full">
          <label className="w-1/8" htmlFor="deadline">
            期限
          </label>
          <input className="max-w-7xl border-1 bg-white" type="date" id="deadline" name="deadline" required />
        </div>
        <Button type="submit">作成する</Button>
      </form>
    </>
  );
}
