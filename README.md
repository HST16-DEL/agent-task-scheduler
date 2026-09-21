# AI Agent任务调度与断点快照系统
基于TypeScript + Node.js开发的轻量级智能任务调度Agent。

项目亮点
1. 读写分离调度：read任务并行执行，write任务串行排队，防止并发数据冲突
2. Checkpoint断点快照：任务状态保存为JSON文件，程序中断后可恢复任务进度
3. 上下文管理模块：自动裁剪对话历史，避免上下文溢出
4. 日志系统：自动记录运行日志，便于调试追踪

技术栈
TypeScript、Node.js、文件IO、任务调度、Git

运行方式
```bash
# 安装依赖
npm install
# 启动项目
npm start
## 模块说明

- checkpoint.ts：断点快照模块
- taskScheduler.ts：核心任务调度器
- contextEngine.ts：上下文裁剪模块
- logger.ts：日志记录模块
- main.ts：程序入口