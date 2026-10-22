# 输入与素材

1. 使用 `jm ingest` 解析文本、Markdown、HTML、网页、PDF、DOCX、PPTX、图片、音频或视频。
2. 提取出的文本默认是待核实内容，必须保留原始陈述、数字和专有名词。
3. 使用 `jm asset-add` 或浏览器制作台上传素材时，必须提供明确的权利说明和预期用途。
4. 图片可以在明确确认费用后执行视觉分析；视频通过 FFmpeg 提取代表帧后作为同一素材进行分析。不得推断代表帧之外的事件。
5. 先运行 `jm asset-auto-bind`，再检查每个建议的场景关联；需要时使用 `jm asset-bind` 修正。
6. AI 生成图片必须记录提供方、模型、完整提示词、生成时间、用途和场景。使用 `jm asset-add ... --provider ... --model ... --prompt ...` 导入，再以 `jm asset-bind ... --mode cinematic` 创建全画幅动态图像场景。
7. 图片可进入 `ImageEvidence` 或 `CinematicImageScene`，视频只能交给 `VideoEvidence`。媒体类型不匹配时必须阻断。
8. 缺少权利、生成来源、语境误导、文件丢失或可能造成错误事实暗示的素材必须阻断。
