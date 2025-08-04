import { useQuery } from "@tanstack/react-query";

function UsersList() {
  const { data: users, isLoading, error } = useQuery(["users"], () =>
    fetch("http://localhost:3000/users").then((res) => res.json())
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.fullname} ({user.email})</li>
      ))}
    </ul>
  );
}
