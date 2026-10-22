# Joee-Quality 评审报告

- 状态：needs_revision
- 等级：未评级
- 分数：未评分
- 覆盖率：7/7 (100%)

## 发现

### MAJOR · 检测到黑帧区间

发现 1 个持续至少 0.5 秒的黑帧区间。

证据：ev-blackdetect

建议：检查对应时间段素材、转场和导出设置。

复验：重新运行 blackdetect，确认预期外黑帧消失。

### MAJOR · 检测到长静音区间

发现 1 个持续至少 2 秒的静音区间；工具无法判断静音是否为创作意图。

证据：ev-silencedetect

建议：人工试听对应区间，确认是设计留白还是音频缺失。

复验：试听并重新运行 silencedetect。

## 检查项

- **core.artifact-readable**：pass（10/10） — 交付物存在且可读取。

- **motion.video-stream**：pass（10/10） — 检测到视频流。

- **motion.required-audio**：pass（10/10） — 检测到必需音频流。

- **motion.black-frames**：fail（4/10） — 发现 1 个持续至少 0.5 秒的黑帧区间。

- **motion.silence**：fail（6/10） — 发现 1 个持续至少 2 秒的静音区间。

- **motion.keyframe-samples**：pass（10/10） — 已按时长 10%、50%、90% 抽取三张样本帧；抽样不能代表全部画面。

- **motion.subtitle-timeline**：pass（10/10） — 字幕时间轴未发现重叠、反向区间或超出媒体时长。

## 限制

- 黑帧、静音和关键帧均为抽样或阈值检测，不能替代逐帧观看与人工试听。

- 未进行视觉高级感、叙事或声音美学判断。

## 证据索引

- **ev-file** direct_observation · D:\wk\joee-motion\examples\airplane\out\final.mp4 · available

- **ev-ffprobe** automated_test · D:\wk\joee-motion\examples\airplane\out\final.mp4 · available

- **ev-blackdetect** automated_test · D:\wk\joee-motion\examples\airplane\out\final.mp4 · available

- **ev-silencedetect** automated_test · D:\wk\joee-motion\examples\airplane\out\final.mp4 · available

- **ev-keyframes** automated_test · D:\wk\joee-motion\examples\airplane\qa\jqs\evidence · available

- **ev-subtitles** automated_test · examples/airplane/subtitles.srt · available
