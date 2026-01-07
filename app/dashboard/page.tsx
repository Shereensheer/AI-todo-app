"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/src/lib/auth";
import { useTasks } from "@/src/lib/tasks";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const {
    tasks,
    isLoading,
    error,
    fetchTasks,
    createTask,
    toggleTaskComplete,
    deleteTask,
  } = useTasks();

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }
    fetchTasks();
  }, [isAuthenticated, fetchTasks, router]);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    setIsCreating(true);
    await createTask({
      title: newTaskTitle.trim(),
      description: newTaskDescription.trim() || undefined,
      is_completed: false,
    });
    setNewTaskTitle("");
    setNewTaskDescription("");
    setIsCreating(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400 bg-gradient-to-br from-emerald-950 to-cyan-950">
        Redirecting to login...
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden min-h-screen bg-gradient-to-br from-emerald-950 via-teal-950 to-cyan-950 text-white">
      {/* Background glow circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 space-y-12">
        {/* Welcome */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
            Dashboard
          </h1>
          <p className="text-white/70 text-lg">
            Welcome back, <span className="font-medium">{user?.email}</span>
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Tasks" value={tasks.length} color="cyan" />
          <StatCard
            title="Completed"
            value={tasks.filter((t) => t.is_completed).length}
            color="green"
          />
          <StatCard
            title="Pending"
            value={tasks.filter((t) => !t.is_completed).length}
            color="emerald"
          />
        </div>

        {/* Create Task */}
        <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-cyan-300">Create New Task</h2>
          <form onSubmit={handleCreateTask} className="space-y-4">
            <input
              type="text"
              placeholder="Task title"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              disabled={isCreating}
            />
            <textarea
              placeholder="Task description (optional)"
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              disabled={isCreating}
            />
            <button
              type="submit"
              disabled={isCreating}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 font-semibold hover:scale-105 transition-transform shadow-lg"
            >
              {isCreating ? "Creating..." : "Add Task"}
            </button>
          </form>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-xl border border-red-600/30 bg-red-600/10 text-red-400 p-4 text-center">
            {error}
          </div>
        )}

        {/* Tasks List */}
        <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-cyan-300">Your Tasks</h2>
          {isLoading ? (
            <p className="text-white/60 text-center py-4">Loading...</p>
          ) : tasks.length === 0 ? (
            <p className="text-white/50 text-center py-4">No tasks yet</p>
          ) : (
            <ul className="space-y-3">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex justify-between items-start p-4 rounded-xl hover:bg-white/10 transition border border-white/10"
                >
                  <div className="flex gap-3 items-start">
                    <input
                      type="checkbox"
                      checked={task.is_completed}
                      onChange={() =>
                        toggleTaskComplete(task.id, !task.is_completed)
                      }
                      className="mt-1 accent-cyan-400 w-5 h-5"
                    />
                    <div>
                      <p
                        className={`font-medium ${
                          task.is_completed
                            ? "line-through text-white/50"
                            : "text-white"
                        }`}
                      >
                        {task.title}
                      </p>
                      {task.description && (
                        <p className="text-sm text-white/60 mt-1">
                          {task.description}
                        </p>
                      )}
                      <p className="text-xs text-white/40 mt-1">
                        {new Date(task.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-400 hover:text-red-500 transition"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

/* 🔹 Modern stat card with gradient accent */
function StatCard({
  title,
  value,
  color = "cyan",
}: {
  title: string;
  value: number;
  color?: "cyan" | "emerald" | "green";
}) {
  const colorClasses = {
    cyan: "text-cyan-400",
    emerald: "text-emerald-400",
    green: "text-green-400",
  };

  return (
    <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg p-6 text-center transition hover:scale-105">
      <div className={`text-3xl font-bold ${colorClasses[color]}`}>{value}</div>
      <div className="text-sm text-white/60 mt-1">{title}</div>
    </div>
  );
}
