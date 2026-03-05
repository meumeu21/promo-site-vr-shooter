import { EngineOptions, EngineStatus, StartCommand } from '../types';

export class EngineStore {
  private status: EngineStatus;

  constructor(private readonly options: EngineOptions) {
    this.status = {
      state: 'idle',
      mode: options.mode,
      replayFile: options.replayFile,
      replayIndex: 0,
      tickMs: options.tickMs,
      lastTickAt: null
    };
  }

  getOptions(): EngineOptions {
    return { ...this.options };
  }

  getStatus(): EngineStatus {
    return { ...this.status };
  }

  updateFromStartCommand(command: StartCommand): void {
    if (command.mode) {
      this.options.mode = command.mode;
      this.status.mode = command.mode;
    }
    if (command.replayFile) {
      this.options.replayFile = command.replayFile;
      this.status.replayFile = command.replayFile;
      this.status.replayIndex = 0;
    }
    if (command.tickMs) {
      this.options.tickMs = command.tickMs;
      this.status.tickMs = command.tickMs;
    }
  }

  setState(state: EngineStatus['state']): void {
    this.status.state = state;
  }

  setReplayIndex(index: number): void {
    this.status.replayIndex = index;
  }

  markTick(at: string): void {
    this.status.lastTickAt = at;
  }
}