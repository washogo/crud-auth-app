'use client';

import { Task } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}/api/task`);
  return await response.json();
};

/** タスク一覧 */
export default function Tasks() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks()
      .then((data) => setTasks(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {tasks.length > 0 &&
        tasks.map((task) => (
          <div
            key={task.id}
            className="flex flex-row gap-3 hover:cursor-pointer border-b border-blue-800"
            onClick={() => router.push(`/task/${task.id}`)}
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
    </>
  );
}
