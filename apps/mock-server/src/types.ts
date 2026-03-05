export type DemoMode = 'interval' | 'replay';
export type RunState = 'idle' | 'running' | 'paused'

export interface Player {
    Name: string;
    Kills: number;
    Deaths: number;
}

export interface TeamTotal {
    Kills: number;
    Deaths: number;
}

export interface Team {
    TeamName: string;
    Result: string;
    Total: TeamTotal;
    Players: Player [];
}

export interface BattleInfo {
    Setting: string;
    Date: string;
    Time: string;
}

export interface LivePayload {
    Battle: BattleInfo;
    Teams: [Team, Team];
}

export interface EngineStatus {
    state: RunState;
    mode: DemoMode;
    replayFile: string;
    replayIndex: number;
    tickMs: number;
    lastTickAt: string | null;
}

export interface StartCommand {
    mode?: DemoMode;
    replayFile?: string;
    tickMs?: number;
}

export interface EngineOptions {
    mode: DemoMode;
    replayFile: string;
    tickMs: number;
}
