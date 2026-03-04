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