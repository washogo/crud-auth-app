'use client';

import { useEffect, useState } from 'react';
import Button from './Button';
import { Task } from '@prisma/client';

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

  useEffect(() => {
    fetchTask(id)
      .then((data) => setTask(data))
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <div className="flex flex-col gap-5">
      {task && (
        <>
          <Row title="タイトル" content={task.title} />
          <Row title="詳細" content={task.description} />
          <Row title="ステータス" content={task.status} />
          <Row title="期限" content={task.deadline} />
        </>
      )}
      <div className="flex flex-row gap-3">
        <Button color="secondary">編集</Button>
        <Button color="danger">削除</Button>
      </div>
    </div>
  );
}
