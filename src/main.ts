import {saveCheckpoint, loadCheckpoint, AgentState, TaskItem} from "./checkpoint"
import {TaskScheduler} from "./taskScheduler"
import {trimContextHistory} from "./contextEngine"
import {writeLog} from "./logger"

async function main(){
  // 定义测试任务列表
  const taskList: TaskItem[] = [
    {id:"t1", type:"read", description:"读取文档A", status:"pending"},
    {id:"t2", type:"read", description:"读取文档B", status:"pending"},
    {id:"t3", type:"write", description:"修改文档C", status:"pending"},
    {id:"t4", type:"write", description:"新增文档D", status:"pending"},
  ]

  const scheduler = new TaskScheduler();
  const agentState: AgentState = {
    taskId:"demo-001",
    currentStep:1,
    contextHistory:["用户需求：读取两份文档，修改并新增一份文档"],
    pendingTasks: taskList,
    createdAt: Date.now()
  }

  // 裁剪上下文
  agentState.contextHistory = trimContextHistory(agentState.contextHistory);
  // 写入日志
  await writeLog({round:1, llmThought:"解析用户任务，区分读写任务，准备调度执行"});

  // 执行所有任务
  await scheduler.runTasks(taskList);

  // 保存断点快照
  await saveCheckpoint(agentState, "./checkpoint-demo.json");
  // 模拟程序崩溃后，重新加载快照
  const restoreState = await loadCheckpoint("./checkpoint-demo.json");
  console.log("恢复后的Agent状态：", restoreState);
}

// 启动程序，捕获异常
main().catch(err=>console.error("程序异常：",err));
