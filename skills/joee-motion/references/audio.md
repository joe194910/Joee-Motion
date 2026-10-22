# 声音与对齐

合成前先生成 `audio-plan.json`、`music-plan.json` 和 `sfx-plan.json`。口播按句段哈希缓存；合成后使用 FFprobe 测量每个片段的真实时长，再运行 `jm align` 更新场景边界、字幕和语义 cue。

本地系统没有中文音色时必须停止，不得静默改用错误语言。所有片段需要合并为当前项目的 `audio/voice.wav`，激活其他项目时必须清除旧音轨。

句段边界不等于逐字强制对齐。估算关键词 cue 必须标记 `estimated-segment-relative` 和 `verified: false`，经过实际试听校准后才能提升可信度。

口播始终优先。配乐必须记录授权或生成来源，使用自动 ducking；音效只服务关键语义节点。渲染后检查缺失音轨、长静音、削波风险和整体响度。
