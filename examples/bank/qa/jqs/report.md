# Joee-Quality 评审报告

- 状态：passed
- 等级：未评级
- 分数：未评分
- 覆盖率：7/7 (100%)

## 发现

未发现确定性硬错误；这不等于已通过专业审美或人工验收。

## 检查项

- **core.artifact-readable**：pass（10/10） — 交付物存在且可读取。

- **motion.video-stream**：pass（10/10） — 检测到视频流。

- **motion.required-audio**：pass（10/10） — 检测到必需音频流。

- **motion.black-frames**：pass（10/10） — 未发现达到阈值的黑帧区间。

- **motion.silence**：pass（10/10） — 未发现达到阈值的静音区间。

- **motion.keyframe-samples**：pass（10/10） — 已按时长 10%、50%、90% 抽取三张样本帧；抽样不能代表全部画面。

- **motion.subtitle-timeline**：pass（10/10） — 字幕时间轴未发现重叠、反向区间或超出媒体时长。

## 限制

- 黑帧、静音和关键帧均为抽样或阈值检测，不能替代逐帧观看与人工试听。

- 未进行视觉高级感、叙事或声音美学判断。

## 证据索引

- **ev-file** direct_observation · D:\wk\joee-motion\examples\bank\out\final.mp4 · available

- **ev-ffprobe** automated_test · D:\wk\joee-motion\examples\bank\out\final.mp4 · available

- **ev-blackdetect** automated_test · D:\wk\joee-motion\examples\bank\out\final.mp4 · available

- **ev-silencedetect** automated_test · D:\wk\joee-motion\examples\bank\out\final.mp4 · available

- **ev-keyframes** automated_test · D:\wk\joee-motion\examples\bank\qa\jqs\evidence · available

- **ev-subtitles** automated_test · examples/bank/subtitles.srt · available
