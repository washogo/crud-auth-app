'use client';

import { useEffect, useState } from 'react';
import Button from './Button';
import { Task } from '@prisma/client';
import Input from './Input';
import { updateTask } from '@/app/task/[id]/actions';

type TaskDetailProps = {
  id: string;
};

const Row = ({ title, content }: { title: string; content: string }) => {
  return (
    <div className="flex flex-row gap-2 w-full">
      <p className="w-20">{title}</p>
      <p className="border py-1 px-2 bg-white">{content}</p>
    </div>
  );
};

const fetchTask = async (id: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}/api/task/${id}`);
  return await response.json();
};

/** タスク詳細 */
export default function TaskDetail({ id }: TaskDetailProps) {
  const [task, setTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchTask(id)
      .then((data) => setTask(data))
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <>
      {(task && isEditing && (
        <form className="flex flex-col gap-5" action={updateTask}>
          <input type="hidden" name="id" value={id} />
          <Input
            label="タイトル"
            type="text"
            name="title"
            value={task.title}
            required
            onChange={(e) => setTask((prevState) => prevState && { ...prevState, title: e.target.value })}
          />
          <div className="flex flex-row gap-2 w-full">
            <label className="w-1/8" htmlFor="description">
              詳細
            </label>
            <textarea
              id="description"
              name="description"
              value={task.description}
              required
              className="w-full max-w-2xs h-full max-h-24 border-1 bg-white p-1"
              onChange={(e) => setTask((prevState) => prevState && { ...prevState, description: e.target.value })}
            ></textarea>
          </div>
          <div className="flex flex-row gap-2 w-full">
            <label className="w-1/8" htmlFor="status">
              ステータス
            </label>
            <select
              id="status"
              name="status"
              value={task.status}
              required
              className="max-w-7xl border-1 bg-white"
              onChange={(e) => setTask((prevState) => prevState && { ...prevState, status: e.target.value })}
            >
              <option value="未着手">未着手</option>
              <option value="進行中">進行中</option>
              <option value="完了">完了</option>
            </select>
          </div>
          <div className="flex flex-row gap-2 w-full">
            <label className="w-1/8" htmlFor="deadline">
              期限
            </label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={task.deadline}
              required
              className="max-w-7xl border-1 bg-white"
              onChange={(e) => setTask((prevState) => prevState && { ...prevState, deadline: e.target.value })}
            />
          </div>
          <div className="flex flex-row gap-3">
            <Button type="submit">更新</Button>
            <Button color="secondary" onClick={() => setIsEditing((prevState) => !prevState)}>
              キャンセル
            </Button>
          </div>
        </form>
      )) ||
        (task && !isEditing && (
          <div className="flex flex-col gap-5">
            <Row title="タイトル" content={task.title} />
            <Row title="詳細" content={task.description} />
            <Row title="ステータス" content={task.status} />
            <Row title="期限" content={task.deadline} />
            <div className="flex flex-row gap-3">
              <Button color="secondary" onClick={() => setIsEditing((prevState) => !prevState)}>
                編集
              </Button>
              <Button color="danger">削除</Button>
            </div>
          </div>
        ))}
    </>
  );
}
