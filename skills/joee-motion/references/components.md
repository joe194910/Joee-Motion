# 视觉文法与组件选择

根据知识关系选择组件，不得根据题材套用固定模板：

- 因果或系统关系：`MechanismFlow`
- 误区纠正：`MisconceptionTransform`，用连续变形或划除替代两张卡片
- 总额、扣除项和结果：`DeductionFlow`
- 分档、门槛和累进关系：`ThresholdStaircase`
- 公式：`EquationBuild`
- 带多个来源数字的算例：`CalculationWalkthrough`
- 多个经过核实的数值：`AnimatedChart`
- 单个关键数字：`DataStatement`
- 时间发展：`Timeline`
- 空间与路线：`MapRoute`
- 内部层级与剖面：`ThreeDCutaway`
- 有顺序的操作方法：`ProcessSteps`
- 已授权图片证据：`ImageEvidence`
- AI 生成或自有的内容关键视觉：`CinematicImageScene`，使用全画幅、缓慢推拉和视差，不套卡框
- 已授权视频证据：`VideoEvidence`
- 人物处境与决策：`CharacterScene`
- 产品操作与界面关系：`ProductDemo`
- 有来源的短引语：`QuoteFocus`
- 结尾回收：`VisualRecap`，使用中心命题与空间关联，不使用总结卡片矩阵

每个组件必须读取场景数据、提供故障兜底，并且不能内置特定题材的陈述。没有真实数据时，图表必须阻断或降级，不能填入装饰性数字。`EvidenceCard`、`SummaryCard` 和旧式双栏卡片合计不得超过场景总数的四分之一。
