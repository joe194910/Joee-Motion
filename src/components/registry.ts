export type ComponentSpec={id:string;purpose:string;maps:string[];avoid:string[];assetTypes:string[];audioResponse:string;fallback:string};
export const componentRegistry:ComponentSpec[]=[
  {id:'QuestionReveal',purpose:'Open a meaningful question or tension',maps:['question','hook'],avoid:['dense evidence','long quotation'],assetTypes:[],audioResponse:'title hit',fallback:'KineticTypography'},
  {id:'KineticTypography',purpose:'Emphasize a definition or compact claim',maps:['definition','key phrase'],avoid:['complex mechanism','many numbers'],assetTypes:[],audioResponse:'word cues',fallback:'EvidenceCard'},
  {id:'ComparisonSplit',purpose:'Contrast two claims or states',maps:['comparison','misconception'],avoid:['single claim'],assetTypes:['image'],audioResponse:'left/right reveal',fallback:'EvidenceCard'},
  {id:'MechanismFlow',purpose:'Explain cause, flow or system interaction',maps:['cause','mechanism','flow'],avoid:['unverified scientific geometry'],assetTypes:[],audioResponse:'flow cue',fallback:'ProcessSteps'},
  {id:'DataStatement',purpose:'Anchor a claim in one primary number',maps:['number','growth','ratio'],avoid:['number absent','multiple incompatible units'],assetTypes:['document'],audioResponse:'numeric reveal',fallback:'EvidenceCard'},
  {id:'EvidenceCard',purpose:'Present one sourced fact or supporting observation',maps:['fact','evidence'],avoid:['decorative filler'],assetTypes:['document','image'],audioResponse:'evidence cue',fallback:'KineticTypography'},
  {id:'Timeline',purpose:'Show chronological progression',maps:['time','history','sequence'],avoid:['non-chronological relation'],assetTypes:['image'],audioResponse:'step cues',fallback:'ProcessSteps'},
  {id:'MapRoute',purpose:'Show spatial movement or geographic relation',maps:['route','location','distribution'],avoid:['no spatial claim'],assetTypes:['image'],audioResponse:'route cues',fallback:'GeometryExplain'},
  {id:'GeometryExplain',purpose:'Explain proportion, structure or spatial relation',maps:['geometry','structure','scale'],avoid:['false scientific precision'],assetTypes:[],audioResponse:'construction cue',fallback:'MechanismFlow'},
  {id:'ImageEvidence',purpose:'Lead with an owned or licensed visual source',maps:['photo','artifact','screenshot'],avoid:['missing rights','unrelated decoration'],assetTypes:['image','video'],audioResponse:'quiet reveal',fallback:'EvidenceCard'},
  {id:'VideoEvidence',purpose:'Use an owned or licensed moving source as evidence',maps:['video','demonstration','field footage'],avoid:['missing rights','unreviewed source audio'],assetTypes:['video'],audioResponse:'narration-led with optional source sound',fallback:'ImageEvidence'},
  {id:'QuoteFocus',purpose:'Feature an attributed short quotation',maps:['quote','testimony'],avoid:['missing attribution','long paragraphs'],assetTypes:['document'],audioResponse:'pause and focus',fallback:'EvidenceCard'},
  {id:'ProcessSteps',purpose:'Show an ordered operational process',maps:['steps','workflow','method'],avoid:['causal system without discrete steps'],assetTypes:[],audioResponse:'step cues',fallback:'Timeline'}
  ,{id:'AnimatedChart',purpose:'Animate a verified quantitative series',maps:['data series','ranking','trend'],avoid:['unsourced values'],assetTypes:['document'],audioResponse:'value cues',fallback:'DataStatement'}
  ,{id:'ParticleField',purpose:'Show distributed systems or many small agents',maps:['network','distribution','emergence'],avoid:['precise physical simulation'],assetTypes:[],audioResponse:'ambient texture',fallback:'MechanismFlow'}
  ,{id:'CharacterScene',purpose:'Explain a human decision or lived scenario',maps:['person','customer','story'],avoid:['unlicensed likeness','unsupported identity'],assetTypes:['image'],audioResponse:'dialogue focus',fallback:'QuoteFocus'}
  ,{id:'ThreeDCutaway',purpose:'Explain nested spatial layers with a schematic cutaway',maps:['inside','layers','architecture'],avoid:['false scientific precision','performance-critical scenes'],assetTypes:[],audioResponse:'layer reveal',fallback:'GeometryExplain'}
  ,{id:'ProductDemo',purpose:'Demonstrate a product flow or interface concept',maps:['product','feature','workflow'],avoid:['invented product behavior'],assetTypes:['image','video'],audioResponse:'interaction cues',fallback:'ProcessSteps'}
];
export const componentIds=new Set(componentRegistry.map(x=>x.id));
