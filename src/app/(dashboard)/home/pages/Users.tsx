// src\app\(dashboard)\home\pages\Users.tsx
// src/app/(dashboard)/home/pages/Users.tsx
"use client";

export default function UsersPage() {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Bob Wilson", email: "bob@example.com", role: "User" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold">Users</h1>
      <p className="mt-2 text-muted-foreground">Manage your users</p>

      <div className="mt-6 rounded-lg border">
        <table className="w-full">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b last:border-0">
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}