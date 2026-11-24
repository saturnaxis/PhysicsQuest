// Fictional arcade telegraphs. All lengths and times below are game units,
// not physical radiation ranges, speeds, doses, or shielding requirements.
export type RayKind='alpha'|'beta'|'gamma'|'infrared'|'xray';
export type EnemyMotion='patrol'|'emerge'|'oscillate'|'blink'|'trap';
export const RAYS:Record<RayKind,{label:string;symbol:string;color:number;shape:'particle'|'wave'|'pulse';description:string}>={
  alpha:{label:'ALPHA',symbol:'α',color:0xffd166,shape:'particle',description:'Alpha particles are helium nuclei.'},
  beta:{label:'BETA',symbol:'β',color:0x5ce1e6,shape:'particle',description:'Beta radiation consists of electrons or positrons.'},
  gamma:{label:'GAMMA',symbol:'γ',color:0xc69cff,shape:'wave',description:'Gamma rays are electromagnetic radiation associated with nuclear transitions.'},
  infrared:{label:'INFRARED',symbol:'IR',color:0xff9860,shape:'wave',description:'Infrared light can reveal molecular vibrations.'},
  xray:{label:'X-RAY',symbol:'X',color:0xaeeaff,shape:'pulse',description:'X-rays can probe material structure.'}
};
export const RESEARCH_ENEMIES:Record<string,ReadonlyArray<{kind:RayKind;motion:EnemyMotion;name:string}>>={
  'CM-1':[{kind:'infrared',motion:'emerge',name:'Molecular vibration'},{kind:'xray',motion:'patrol',name:'Molecular defect'},{kind:'infrared',motion:'oscillate',name:'Vibration probe'},{kind:'xray',motion:'emerge',name:'Structure probe'}],
  'CM-2':[{kind:'infrared',motion:'trap',name:'Charge trap'},{kind:'xray',motion:'oscillate',name:'Recombination hazard'},{kind:'infrared',motion:'emerge',name:'Vibration probe'},{kind:'xray',motion:'patrol',name:'Structure probe'}],
  'PER-1':[{kind:'alpha',motion:'patrol',name:'Rolling cart'},{kind:'beta',motion:'oscillate',name:'Oscillator'},{kind:'gamma',motion:'emerge',name:'Pulsing source'},{kind:'infrared',motion:'blink',name:'Thermal signal'}],
  'PER-2':[{kind:'beta',motion:'patrol',name:'Misconception'},{kind:'xray',motion:'blink',name:'Measurement glitch'},{kind:'alpha',motion:'emerge',name:'Particle source'},{kind:'gamma',motion:'oscillate',name:'Wave signal'}]
};
export const rayPhase=(elapsed:number,offset=0)=>{const elapsedCycle=((elapsed+offset)%6000+6000)%6000;return elapsedCycle<2600?'rest':elapsedCycle<3700?'warning':elapsedCycle<4700?'active':'recovery'};
export const rayProgress=(elapsed:number,offset=0)=>Math.max(0,Math.min(1,((((elapsed+offset)%6000+6000)%6000)-3700)/1000));
export const secretCollisionEnabled=(revealed:boolean)=>revealed;
