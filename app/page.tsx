export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function createLog(formData: FormData) {
  "use server";

  const title = String(formData.get("title") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const task = String(formData.get("task") || "").trim();
  const dateValue = String(formData.get("date") || "").trim();

  if (!title || !content || !task || !dateValue) {
    return;
  }

  await prisma.workLog.create({
    data: {
      title,
      content,
      task,
      date: new Date(dateValue)
    }
  });

  revalidatePath("/");
}

export default async function HomePage() {
  const logs = await prisma.workLog.findMany({ orderBy: { date: "desc" } });

  return (
    <main className="container">
      <h1>Daily Work Log</h1>
      <p className="sub">Minimal, clean tracking for your daily work updates.</p>

      <section className="card">
        <form action={createLog}>
          <div>
            <label htmlFor="title">Title</label>
            <input id="title" name="title" placeholder="Daily standup summary" required />
          </div>
          <div>
            <label htmlFor="task">Task</label>
            <input id="task" name="task" placeholder="Feature implementation / Bugfix" required />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input id="date" name="date" type="date" required />
          </div>
          <div>
            <label htmlFor="content">Content</label>
            <textarea id="content" name="content" placeholder="What did you accomplish today?" required />
          </div>
          <button type="submit">Save Log</button>
        </form>
      </section>

      <section>
        {logs.length === 0 ? (
          <div className="card empty">No logs yet. Add your first daily work log above.</div>
        ) : (
          logs.map((log: { id: string; title: string; task: string; content: string; date: Date }) => (
            <article key={log.id} className="card">
              <div className="logHeader">
                <h3>{log.title}</h3>
                <span className="badge">{new Date(log.date).toLocaleDateString()}</span>
              </div>
              <p><strong>Task:</strong> {log.task}</p>
              <p className="logText">{log.content}</p>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
