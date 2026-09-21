// 上下文工程：裁剪对话历史，防止上下文过长超出token限制
export function trimContextHistory(history: string[], maxLength: number = 2000): string[] {
  let totalSize = 0;
  const result: string[] = [];
  // 从最新消息往前读取，保留最近对话
  for(const msg of history.reverse()){
    totalSize += msg.length;
    if(totalSize > maxLength) break;
    result.push(msg);
  }
  return result.reverse();
}
