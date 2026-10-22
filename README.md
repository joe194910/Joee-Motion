# JOEE Motion V1.0

JOEE Motion 是一个面向中文知识讲解与视觉叙事的视频制作系统。它将内容解析、事实核查、创意方向、素材权利、分镜语义、音频时间轴、Remotion 渲染和质量验收拆分为可检查、可修改、可恢复的生产步骤。

当前 V1.0 已完成静态开发和生产链代码实现，但尚未执行用户授权的端到端媒体生成测试。在真实视频经过正常速度观看和人工审片之前，不得将本项目描述为“已达到商用验收标准”。

## 安装

### 方式一：直接告诉你的 AI（推荐）

把下面这句话发给 WorkBuddy、Codex、Claude Code、Cursor 或其他支持 Agent Skills 的 AI：

```text
帮我安装 joee-motion 这个 skill（github.com/joe194910/Joee-Motion），装好后运行一次 doctor 检查。不要生成视频，等我提供素材。
```

AI 会运行标准 Skills 安装器：

```powershell
npx skills add joe194910/Joee-Motion
```

Skill 内置 `bin/jm.mjs` 自举启动器：克隆完整仓库时直接使用仓库里的 CLI；仅安装 Skill 时自动通过 GitHub npm 包运行 CLI。因此不需要先下载压缩包，也不要求预先全局安装 `jm`。

### 方式二：从 GitHub 安装 CLI

```powershell
# 全局安装后会提供 jm 命令
npm install -g github:joe194910/Joee-Motion

# 检查版本和本机视频制作环境
jm --version
jm doctor
```

也可以只在当前 Node.js 项目中安装：

```powershell
npm install github:joe194910/Joee-Motion
npx jm --help
```

发布到 npm 公共仓库后，可使用更短的命令：

```powershell
npm install -g joee-motion
```

要求 Node.js 20 或更高版本。渲染和媒体检查还需要 FFmpeg、FFprobe 与 Google Chrome。

### WorkBuddy Connector（可选）

仓库根目录已经包含 WorkBuddy CLI Connector 所需的 `connector-meta.json`、`cli.json`、`icon.svg` 和 `skills/joee-motion/SKILL.md`。在 WorkBuddy 中导入该连接器目录或其 ZIP 包后，WorkBuddy 会使用托管的 Node.js 20 环境自动执行 GitHub npm 安装，不需要污染系统级 npm 目录。

连接器启用后，可直接用自然语言要求 WorkBuddy 创建项目、导入资料、规划视频或打开制作台。`jm preview <项目目录>` 会启动 JOEE Motion 制作台和 Remotion Studio，并自动打开 Google Chrome。

### 方式三：手动指定 AI 工具

先安装 CLI，再按目标工具安装同一份标准 Agent Skill：

```powershell
# 推荐：安装到当前项目的通用 .agents/skills 目录
jm install-skill --target agents

# 安装到用户级 Codex 或 Claude Code
jm install-skill --target codex
jm install-skill --target claude

# 安装到当前项目的 Cursor 或 GitHub Copilot
jm install-skill --target cursor
jm install-skill --target copilot

# 安装到用户级 Gemini CLI
jm install-skill --target gemini

# 一次安装到全部内置目标；已有文件不会被静默覆盖
jm install-skill --target all
```

需要覆盖旧版本时添加 `--force`。其他兼容 Agent Skills 的工具可以指定自定义技能根目录：

```powershell
jm install-skill --dir "D:\你的工具\skills"
```

也可以使用通用 Skills 安装器直接从 GitHub 安装 Skill：

```powershell
npx skills add joe194910/Joee-Motion --skill joee-motion
```

CLI 负责视频工程、预览和渲染，Skill 负责告诉 AI 应该如何安全、准确地调用 CLI；实际使用时两者应同时安装。

## 核心目标

- 根据每个项目的内容、受众、素材和传播目标制定独立的视觉方向，避免只替换文字和颜色的模板化结果。
- 保持画面、口播、字幕、事实来源和素材用途之间的语义一致。
- 支持稳定的场景编号、局部修改、缓存失效、版本快照和回滚。
- 对高风险事实、缺少授权的素材、语义不匹配和缺失文件执行硬性阻断。
- 将自动化技术检查与人工创意审片明确分开，不用测试通过代替审美验收。

## 环境要求

- Node.js
- npm
- FFmpeg 与 FFprobe
- Google Chrome
- Windows 本地配音功能仅在系统安装了相应语音时可用

检查本地环境：

```powershell
npm install
npm run doctor
```

## 开发阶段工作流（不生成媒体）

以下命令用于建立项目、解析资料、生成创意规划和执行静态预检，不会主动渲染视频：

```powershell
# 创建项目目录和基础文件
npx tsx src/cli/index.ts init projects/my-film

# 导入 PDF、PPTX、DOCX、网页或文本资料
npx tsx src/cli/index.ts ingest projects/my-film ./source.pdf

# 根据输入内容生成创意方向、分镜、口播稿和字幕草案
npx tsx src/cli/index.ts plan projects/my-film --input projects/my-film/input.md --duration 180 --aspect 16:9

# 可选：显式确认费用后，让外部模型重构视觉方向和场景设计；不会改写口播、事实和数字
npx tsx src/cli/index.ts creative-enhance projects/my-film --model YOUR_MODEL --confirm-cost

# 导入用户拥有或已经取得授权的图片、视频、音频及文档素材
npx tsx src/cli/index.ts asset-add projects/my-film ./owned-image.png --license "用户自有" --usage "用于解释核心机制"

# 使用明确指定的模型分析图片；该命令需要 API Key，并且必须显式确认费用
npx tsx src/cli/index.ts asset-analyze projects/my-film --asset A-... --provider openai --model YOUR_VISION_MODEL --confirm-cost

# 根据素材语义和场景内容尝试自动匹配
npx tsx src/cli/index.ts asset-auto-bind projects/my-film

# 生成配音、音乐和音效规划，不在此步骤合成音频
npx tsx src/cli/index.ts audio-plan projects/my-film

# 可选：导入有明确授权的配乐
npx tsx src/cli/index.ts music-add projects/my-film ./licensed-music.wav --license "已获得项目使用授权"

# 可选：把有授权的音效关联到声音规划中的指定事件
npx tsx src/cli/index.ts sfx-add projects/my-film ./licensed-hit.wav --event SFX-2 --license "已获得项目使用授权"

# 执行创意、语义、素材权利、事实来源和必需文件预检
npx tsx src/cli/index.ts preflight projects/my-film
```

目前支持的输入类型包括：

- 纯文本与 Markdown
- HTML 与 HTTP/HTTPS 网页
- PDF
- DOCX
- PPTX
- 图片
- 音频元数据
- 视频元数据、代表帧提取与经授权的 AI 语义分析

为降低服务端请求伪造风险，网页导入会阻止本机地址和私有网络地址。

## 用户授权后的媒体生成工作流

只有在用户明确要求进行生成测试后，才执行以下命令：

```powershell
# 使用本地系统语音生成分段口播
npx tsx src/cli/index.ts voice projects/my-film --provider local

# 根据实际音频时长重新计算场景、字幕和音频时间轴
npx tsx src/cli/index.ts align projects/my-film

# 启动项目控制页面和 Remotion Studio，并自动打开 Google Chrome
npx tsx src/cli/index.ts preview projects/my-film

# 只渲染指定场景，便于局部检查和修改
npx tsx src/cli/index.ts render-scene projects/my-film --scene S03-example

# 渲染完整视频
npx tsx src/cli/index.ts render projects/my-film

# 检查最终视频文件并生成基础质量报告
npx tsx src/cli/index.ts check projects/my-film
```

`preview` 会启动两个本地页面：

- Remotion Studio：`http://127.0.0.1:3000`
- JOEE Motion 项目控制页面：`http://127.0.0.1:4173`

默认情况下，项目控制页面会自动在 Google Chrome 中打开。无图形界面环境可以使用：

```powershell
npm run studio:no-open
```

项目控制页面支持：

- 上传本地文件并记录授权与用途
- 查看素材清单
- 对图片或视频代表帧执行显式授权的 AI 分析
- 修改指定场景并创建版本快照
- 保存结构化修改意见
- 启动单场景或完整视频渲染
- 查看渲染日志和任务状态
- 下载已经完成的 MP4

## 素材导入与权利记录

每个素材都必须记录：

- 稳定素材 ID
- 原始文件名
- SHA-256 哈希
- 素材类型
- 授权或权利说明
- 预期用途
- 导入时间
- 关联场景 ID
- 分析状态

公开可见不等于可以合法复用。缺少明确权利说明的素材不应进入最终视频。

手动绑定素材与场景：

```powershell
npx tsx src/cli/index.ts asset-bind projects/my-film --asset A-... --scene S03-example
```

## 事实来源

包含数字、科学、医学、金融或法律内容的高风险场景，需要关联来源记录：

```powershell
npx tsx src/cli/index.ts fact-add projects/my-film --scene S03-example --claim "需要验证的陈述" --source "来源名称或地址" --scope "来源适用范围"
```

缺少来源的高风险场景会被项目预检阻断。

## 场景修改与版本恢复

修改指定场景：

```powershell
npx tsx src/cli/index.ts revise projects/my-film --scene S03-example --component ImageEvidence --props '{"layout":"image-led"}'
```

查看版本：

```powershell
npx tsx src/cli/index.ts versions projects/my-film
```

恢复历史版本：

```powershell
npx tsx src/cli/index.ts rollback projects/my-film --version VERSION_ID
```

每次修改前都会保存项目快照，并记录：

- 修改前后的哈希
- 被修改的场景
- 被影响的文件
- 需要失效的缓存层
- 可以继续保留的其他场景缓存

## 合规案例研究与创意规律

案例库只接受用户授权媒体、合法元数据和明确允许使用的文本，不提供绕过平台限制的下载功能。

```powershell
# 添加一个用户授权的研究案例
npx tsx src/cli/index.ts case-add projects/my-film --title "案例名称" --platform owned --source "user:case-01" --access "用户手动导入" --license "用户授权研究" --media ./owned-case.mp4

# 添加候选规律；候选状态不会自动进入新项目规划
npx tsx src/cli/index.ts pattern-add projects/my-film --trigger "机制,因果" --advice "先展示关系变化，再出现解释标签" --supporting "CASE-...,CASE-..." --counter "CASE-..." --evidence cross-case --confidence 0.8 --status verified

# 查看案例规律
npx tsx src/cli/index.ts patterns projects/my-film
```

只有满足支持案例、反例和证据等级要求的 `verified` 规律，才会被新项目规划检索。一次观察或个人偏好不会自动提升为通用导演规则。

## 创意与质量硬门槛

- 每个项目必须具有与内容相关的视觉论点，不能只替换模板文字。
- 在用户没有指定视觉方向时，至少生成两个结构上有明显差异的候选方向。
- 每支视频只能有一个明确设计的 Hero Moment（核心记忆镜头）。
- 可见文字和画面表达必须与对应口播语义一致。
- 可复用组件中不得写死特定行业、主题、数据或结论。
- 所有导入素材必须记录权利、哈希、用途和场景关联。
- 使用真实图片或视频的场景必须关联实际素材。
- 自动规划不得把未经验证的内容描述为已经核实的事实。
- 自动化检查不能代替正常速度观看、声音检查和人工创意审片。

## 项目主要产物

一个完整项目应包含：

- `intent.json`：用户意图与输入判断
- `creative-brief.json` / `creative-brief.md`：创意简报
- `creative-directions.json`：候选创意方向
- `treatment.json` / `treatment.md`：导演处理方案
- `storyboard.json`：经过 Schema 验证的分镜
- `narration.txt`：口播稿
- `alignment.json`：音频与场景对齐信息
- `subtitles.srt`：字幕文件
- `assets/manifest.json`：素材清单及权利信息
- `provenance.json`：来源与生成过程记录
- `versions/manifest.json`：版本信息
- `out/final.mp4`：最终视频
- `qa/report.json`：基础质量报告
- `out/render-manifest.json`：渲染来源、提供方、授权、工具版本与质量检查清单

## 自动化测试与检查

```powershell
# TypeScript 编译检查
npm run build

# 自动化测试
npm test

# 环境检查
npm run doctor

# 指定项目预检
npx tsx src/cli/index.ts preflight projects/my-film
```

测试通过只代表已覆盖的技术条件通过，不代表视频已经达到商业创意、导演、声音或审美标准。

## 已知限制

- 外部 AI 图片分析需要显式指定模型、API Key，并确认可能产生的费用。
- 当前对齐能力是基于实际音频片段时长的句段级对齐，不宣称具备逐字强制对齐能力。
- 图片和视频视觉分析需要显式配置外部模型；音频内容分析仍依赖用户提供文本或后续转写适配器。
- 关键词 cue 是依据实测句段边界计算的估算位置，不伪装成逐字强制对齐结果，正式成片仍需试听校准。
- 9:16 使用确定性的竖屏安全重排模式；高要求竖屏广告仍建议针对关键镜头进行人工二次构图。
- 最终商业品质在真实渲染、正常速度观看和人工审片之前统一标记为 `not_evaluated`。

## 第三方依赖与授权

第三方软件包和授权说明见：

- `LICENSE`
- `THIRD_PARTY.md`

不得复制第三方项目的品牌、受保护设计、专属提示词、视频素材或其他受限制资产。

## Skill 位置

JOEE Motion Skill 位于：

```text
skills/joee-motion/SKILL.md
```

Skill 中规定了输入处理、创意方向、组件选择、声音设计、修改流程、Studio 使用方式和最终质量检查要求。

在 Codex 中使用时，可将 `skills/joee-motion` 复制或链接到个人 Skills 目录；在其他支持 Agent Skill 目录结构的工具中，也应复制完整目录而不是只复制 `SKILL.md`，以便参考资料和界面元数据能够同时生效。

调用示例：

```text
使用 $joee-motion，把这份中文文案和我上传的授权素材制作成一支 3 分钟知识讲解视频。开发完成后先不要生成，等我确认后再测试渲染。
```
