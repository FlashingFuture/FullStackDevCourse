import { useQuery } from "@tanstack/react-query";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const fetchTodos = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  return res.json();
};

function App() {
  const { data, isLoading, error } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 1000 * 10,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생</p>;

  return (
    <div>
      <h1>할 일 목록</h1>
      <ul>
        {data?.slice(0, 5).map((todo) => (
          <li key={todo.id}>
            {todo.title} {todo.completed ? "✅" : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
