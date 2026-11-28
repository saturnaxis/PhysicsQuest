import {describe,expect,it} from 'vitest';import {CHECKPOINT_XS,GROUND_SEGMENTS,MAX_HEALTH,MAX_JUMPS,TOKEN_GOAL,TRANSIT_CHECKPOINTS,WORLD_WIDTH} from './gameData';describe('game tuning',()=>{it('supports complete beginner-friendly levels',()=>{expect(TOKEN_GOAL).toBeGreaterThanOrEqual(10);expect(MAX_HEALTH).toBe(3);expect(MAX_JUMPS).toBe(2);expect(WORLD_WIDTH).toBeGreaterThan(8000)});it('places ground checkpoints safely away from gaps',()=>{for(const x of CHECKPOINT_XS){const segment=GROUND_SEGMENTS.find(([start,end])=>x>=start+100&&x<=end-100);expect(segment,`checkpoint ${x} must be at least 100 px from a gap`).toBeDefined()}});it('places transit flags on the three upper photon-climb platforms',()=>{expect(TRANSIT_CHECKPOINTS).toEqual([[3165,270,250],[5865,270,250],[8565,270,250]])})});
import {SECRET_SITES, VOLUME_STEP, adjustVolume} from './gameData';
describe('version 15 mechanics',()=>{
  it('steps volume by five percentage points and clamps at the limits',()=>{expect(adjustVolume(.1,VOLUME_STEP)).toBeCloseTo(.15);expect(adjustVolume(.1,-VOLUME_STEP)).toBeCloseTo(.05);expect(adjustVolume(0,-VOLUME_STEP)).toBe(0);expect(adjustVolume(1,VOLUME_STEP)).toBe(1)});
  it('puts secret ledges above safe ground, within double-jump reach',()=>{for(const [x,y] of SECRET_SITES){expect(GROUND_SEGMENTS.some(([a,b])=>x>a+100&&x<b-100)).toBe(true);expect(578-y).toBeLessThan(250)}});
});
import {RESEARCH_WORLDS} from './gameData';
import {makeResearchLedges,EXPERIMENTS} from './researchData';
describe('version 16 research worlds',()=>{
  it('offers eight unique levels in three areas',()=>{expect(RESEARCH_WORLDS.map(w=>w.levels.length)).toEqual([4,2,2]);expect(new Set(RESEARCH_WORLDS.flatMap(w=>w.levels.map(l=>l.scene))).size).toBe(8)});
  it('keeps the new regular samples above safe ground and within double-jump reach',()=>{for(let v=0;v<4;v++){const ledges=makeResearchLedges(v);expect(ledges.length).toBeGreaterThanOrEqual(TOKEN_GOAL);for(const [x,y,m] of ledges){expect(GROUND_SEGMENTS.some(([a,b])=>x-m>a&&x+m<b)).toBe(true);expect(578-y).toBeLessThan(250)}}});
  it('puts experiments over solid ground with valid answers',()=>{for(const e of EXPERIMENTS){expect(GROUND_SEGMENTS.some(([a,b])=>e.x>a+100&&e.x<b-100)).toBe(true);expect(e.options[e.correct]).toBeTruthy();expect(e.explanations[e.answer]).toBeTruthy()}});
});
import {AVATARS,POWERUPS,powerKind,layoutSeed,seededRandom,protectedXs,safeGroundX,variedPlatformX} from './variety';
describe('version 17 replay and customization',()=>{
  it('offers four avatars and nine unique power-up textures',()=>{expect(AVATARS.length).toBe(4);expect(new Set(Object.values(POWERUPS).map(p=>p.texture)).size).toBe(9);expect(['gravity','shield','speed'].map(k=>powerKind('CM-1',k))).toEqual(['energy','exciton','mobility']);expect(['gravity','shield','speed'].map(k=>powerKind('PER-2',k))).toEqual(['spring','evidence','motion'])});
  it('repeats layouts for the same run and varies them after completion',()=>{const make=(run:number)=>{const rng=seededRandom(layoutSeed('CM-1',run));const used:number[]=[];for(const x of [1550,4100,6000,1650,3300,5000,7850])used.push(safeGroundX(x,rng,protectedXs('CM-1'),used));return used};expect(make(0)).toEqual(make(0));expect(make(1)).not.toEqual(make(0));for(let run=0;run<50;run++){const xs=make(run);for(const x of xs){expect(GROUND_SEGMENTS.some(([a,b])=>x>=a+110&&x<=b-110)).toBe(true);expect(protectedXs('CM-1').every(p=>Math.abs(x-p)>=125)).toBe(true)}expect(new Set(xs).size).toBe(xs.length)}});
  it('never relocates high platforms or gap bridges, and keeps varied ledges on safe ground',()=>{for(let seed=0;seed<50;seed++){const rng=seededRandom(seed);expect(variedPlatformX(1000,440,0,rng,[],[])).toBe(1000);expect(variedPlatformX(3500,300,0,rng,[],[])).toBe(3500);const x=variedPlatformX(1500,440,65,rng,protectedXs('CM-1'),[]);expect(x-65).toBeGreaterThanOrEqual(1080+65);expect(x+65).toBeLessThanOrEqual(1840-65)}});
});
import {RAYS,RESEARCH_ENEMIES,rayPhase,rayProgress,secretCollisionEnabled} from './radiation';
describe('version 18 scanner and radiation hazards',()=>{
  it('never enables hidden collision before reveal',()=>{expect(secretCollisionEnabled(false)).toBe(false);expect(secretCollisionEnabled(true)).toBe(true)});
  it('provides the five recognizable radiation categories across education levels',()=>{const kinds=new Set([...RESEARCH_ENEMIES['PER-1'],...RESEARCH_ENEMIES['PER-2']].map(x=>x.kind));expect(kinds.size).toBe(5);expect(Object.keys(RAYS).length).toBe(5)});
  it('warns before fictional emissions and provides a recovery interval',()=>{expect(rayPhase(0)).toBe('rest');expect(rayPhase(2600)).toBe('warning');expect(rayPhase(3700)).toBe('active');expect(rayPhase(4700)).toBe('recovery');expect(rayPhase(6000)).toBe('rest');expect(rayProgress(4200)).toBe(.5);expect(rayPhase(2400,1300)).toBe('active')});
  it('uses distinct movements in each non-astronomy area',()=>{for(const level of ['CM-1','CM-2','PER-1','PER-2'])expect(new Set(RESEARCH_ENEMIES[level].map(e=>e.motion)).size).toBeGreaterThanOrEqual(3)});
});
