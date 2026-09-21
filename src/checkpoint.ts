// Checkpoint 断点快照模块：实现任务可中断、保存快照、恢复任务
export type AgentState = {
  taskId: string;
  currentStep: number;
  contextHistory: string[]; // 对话上下文历史
  pendingTasks: TaskItem[];
  createdAt: number;
}

export type TaskItem = {
  id: string;
  type: "read" | "write"; // read只读任务，write写入修改任务
  description: string;
  status: "pending" | "running" | "done";
}

// 保存快照，把当前Agent状态写入json文件
export async function saveCheckpoint(state: AgentState, filePath: string) {
  const fs = require('fs/promises');
  await fs.writeFile(filePath, JSON.stringify(state, null, 2), "utf-8");
  console.log(`[Checkpoint] 已保存任务快照, 文件路径:${filePath}`);
}

// 读取快照，从文件恢复之前保存的任务状态
export async function loadCheckpoint(filePath: string): Promise<AgentState> {
  const fs = require('fs/promises');
  const rawText = await fs.readFile(filePath, "utf-8");
  const state = JSON.parse(rawText);
  console.log(`[Checkpoint] 加载快照成功，当前步骤:${state.currentStep}`);
  return state;
}
