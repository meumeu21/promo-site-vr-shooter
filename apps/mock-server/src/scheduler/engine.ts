import { generateIntervalFrame } from '../generator/intervalGenerator';
import { loadReplayFrames } from '../replay/replayLoader';
import { EngineStore } from '../state/store';
import { LivePayload, StartCommand } from '../types';

export class MockEngine {
  private timer: NodeJS.Timeout | null = null;
  private intervalTick = 0;
  private replayFrames: LivePayload[] = [];
  private loadedReplayFile: string | null = null;

  constructor(private readonly store: EngineStore) {}


  start(command: StartCommand = {}): void {
    this.store.updateFromStartCommand(command);
    
    if (this.timer) clearInterval(this.timer);

    this.store.setState('running');
    console.log(`------------Движок запущен! Режим: ${this.store.getStatus().mode}------------`);
    
    this.ensureReplayLoaded();
    this.runScheduler();       
  }

  pause(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.store.setState('paused');
    console.log('------------Движок на паузе------------');
  }

  private runScheduler(): void {
    const options = this.store.getOptions();

    this.timer = setInterval(() => {
      this.tick();
    }, options.tickMs);

    this.tick();
  }

  private tick(): void {
    const nowIso = new Date().toISOString();
    this.store.markTick(nowIso);

    const payload = this.nextPayload();
    if (!payload) return;

    const redScore = payload.Teams[0].Total.Kills;
    const blueScore = payload.Teams[1].Total.Kills;
    console.log(`[TICK ${nowIso}] 🔴 Красные: ${redScore} | 🔵 Синие: ${blueScore} | Карта: ${payload.Battle.Setting}`);
  }

  private nextPayload(): LivePayload | null {
    const options = this.store.getOptions();

    if (options.mode === 'interval') {
      this.intervalTick += 1;
      return generateIntervalFrame(this.intervalTick);
    }


    this.ensureReplayLoaded();
    if (this.replayFrames.length === 0) return null;

    let index = this.store.getStatus().replayIndex;
    
    if (index >= this.replayFrames.length) {
      console.log('------------Реплей закончился, начинаем сначала...------------');
      index = 0;
    }

    const frame = this.replayFrames[index];
    this.store.setReplayIndex(index + 1);
    return frame;
  }

  private ensureReplayLoaded(): void {
    const options = this.store.getOptions();
    if (options.mode !== 'replay') return;

    if (this.loadedReplayFile !== options.replayFile) {
      try {
        this.replayFrames = loadReplayFrames(options.replayFile);
        this.loadedReplayFile = options.replayFile;
        console.log(`Загружен реплей: ${options.replayFile} (${this.replayFrames.length} кадров)`);
      } catch (e) {
        console.error('Ошибка загрузки реплея, переключаюсь в режим генерации');
        this.store.updateFromStartCommand({ mode: 'interval' });
      }
    }
  }
}