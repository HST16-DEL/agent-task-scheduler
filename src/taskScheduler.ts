import { TaskItem } from "./checkpoint";

export class TaskScheduler {
  // 执行任务：read任务并行，write任务串行
  async runTasks(tasks: TaskItem[]) {
    const readTasks = tasks.filter(t => t.type === "read");
    const writeTasks = tasks.filter(t => t.type === "write");

    console.log("[调度器] 开始并行执行只读任务");
    const readPromiseList = readTasks.map(async (task) => {
      task.status = "running";
      const res = await this.mockRunSingleTask(task);
      task.status = "done";
      return res;
    });
    await Promise.all(readPromiseList);

    console.log("[调度器] 开始串行执行写入任务");
    for(const task of writeTasks){
      task.status = "running";
      await this.mockRunSingleTask(task);
      task.status = "done";
    }
  }

  // 模拟执行任务，延时0.8秒模拟接口调用耗时
  private async mockRunSingleTask(task: TaskItem){
    console.log(`正在执行：${task.description}，任务类型：${task.type}`);
    await new Promise(resolve => setTimeout(resolve, 800));
    return {ok:true, taskId:task.id};
  }
}
