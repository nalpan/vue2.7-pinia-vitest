export type task = {
  id: number;
  description: string;
};

export async function fetchTasks() {
  return await new Promise<task[]>((res) => {
    setTimeout(() => {
      res([
        {
          id: 1,
          description: "task1",
        },
        {
          id: 2,
          description: "task2",
        },
        {
          id: 3,
          description: "task3",
        },
      ]);
    }, 500);
  });
}
