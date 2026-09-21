import fs from 'fs/promises'

// 记录Agent每一轮思考、工具调用日志，写入agent-run.log文件
export async function writeLog(logInfo: {
  round: number;
  llmThought: string;
  toolName?: string;
  toolResult?: string;
}){
  const time = new Date().toISOString();
  const logLine = `[${time}] 第${logInfo.round}轮 | 思考内容：${logInfo.llmThought} | 工具：${logInfo.toolName ?? "无"}\n`;
  await fs.appendFile("./agent-run.log", logLine, "utf-8");
  console.log(logLine);
}
