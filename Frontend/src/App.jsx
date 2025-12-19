import { useState, useEffect } from "react";

function App() {
  const today = new Date().toISOString().split("T")[0];

  const [goals, setGoals] = useState({});
  const [taskInput, setTaskInput] = useState("");

  // Load saved goals
  useEffect(() => {
    const saved = localStorage.getItem("goals");
    if (saved) {
      setGoals(JSON.parse(saved));
    }
  }, []);

  // Save goals
  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  const todayTasks = goals[today]?.tasks || [];

  const addTask = () => {
    if (!taskInput) return;

    const newTask = { text: taskInput, done: false };

    setGoals({
      ...goals,
      [today]: {
        tasks: [...todayTasks, newTask],
      },
    });

    setTaskInput("");
  };

  const toggleTask = (index) => {
    const updatedTasks = todayTasks.map((task, i) =>
      i === index ? { ...task, done: !task.done } : task
    );

    setGoals({
      ...goals,
      [today]: { tasks: updatedTasks },
    });
  };

  // 🔹 Wall helpers
  const last28Days = Array.from({ length: 28 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split("T")[0];
  }).reverse();

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-6 rounded shadow-md w-96 text-center space-y-4">
        <h1 className="text-xl font-bold text-green-700">
          Green Wall 🌱
        </h1>

        {/* 🧱 WALL */}
        <div className="grid grid-cols-7 gap-1 justify-center">
          {last28Days.map((date) => {
            const day = goals[date];
            let color = "bg-gray-200";

            if (day?.tasks?.length) {
              const total = day.tasks.length;
              const doneCount = day.tasks.filter(t => t.done).length;
              const ratio = doneCount / total;

              if (ratio === 0) color = "bg-gray-200";
              else if (ratio < 0.34) color = "bg-green-200";
              else if (ratio < 0.67) color = "bg-green-400";
              else color = "bg-green-700";
            }


            return (
              <div
                key={date}
                title={date}
                className={`w-4 h-4 rounded-sm ${color}`}
              />
            );
          })}
        </div>

        {/* ➕ ADD TASK */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add a task"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className="flex-1 border p-2 rounded"
          />
          <button
            onClick={addTask}
            className="px-3 bg-green-600 text-white rounded"
          >
            Add
          </button>
        </div>

      
        {/* 📋 TODAY TASKS */}
        <div className="space-y-2 text-left">
          {todayTasks.map((task, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(index)}
              />

              <input
                type="text"
                value={task.text}
                onChange={(e) => {
                  const updatedTasks = [...todayTasks];
                  updatedTasks[index].text = e.target.value;

                  setGoals({
                    ...goals,
                    [today]: { tasks: updatedTasks },
                  });
                }}
                className={`flex-1 border-b bg-transparent ${task.done ? "line-through text-gray-400" : ""
                  }`}
              />

              <button
                onClick={() => {
                  const updatedTasks = todayTasks.filter((_, i) => i !== index);
                  setGoals({
                    ...goals,
                    [today]: { tasks: updatedTasks },
                  });
                }}
                className="text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;
