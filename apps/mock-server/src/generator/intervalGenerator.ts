import { LivePayload, Team } from '../types';

const RED_PLAYERS = ['RedWolf', 'Blaze', 'Raptor', 'Magma', 'Vortex'];
const BLUE_PLAYERS = ['Frost', 'Storm', 'Shadow', 'Pulse', 'Nova'];
const SETTINGS = ['Dust Arena', 'Cyber Yard', 'Factory 9', 'Neon Core'];

const seeded = (tick: number, salt: number): number => {
  const x = (tick * 9301 + salt * 49297 + 233280) % 233280;
  return x / 233280;
};

const pad2 = (value: number): string => String(value).padStart(2, '0');
const formatDate = (date: Date): string => `${pad2(date.getDate())}.${pad2(date.getMonth() + 1)}.${date.getFullYear()}`;
const formatTime = (date: Date): string => `${pad2(date.getHours())}:${pad2(date.getMinutes())}`;

const buildTeam = (tick: number, teamName: string, names: string[], saltBase: number): Team => {
  const players = names.map((name, index) => {
    const kills = Math.floor(seeded(tick + index, saltBase + index) * 20);
    const deaths = Math.floor(seeded(tick + index, saltBase + 20 + index) * 20);

    return { Name: name, Kills: kills, Deaths: deaths };
  });

  const totalKills = players.reduce((sum, p) => sum + p.Kills, 0);
  const totalDeaths = players.reduce((sum, p) => sum + p.Deaths, 0);

  return {
    TeamName: teamName,
    Result: 'Ничья', 
    Total: { Kills: totalKills, Deaths: totalDeaths },
    Players: players
  };
};

export const generateIntervalFrame = (tick: number): LivePayload => {
  const now = new Date();
  
  const redTeam = buildTeam(tick, 'Красные', RED_PLAYERS, 10);
  const blueTeam = buildTeam(tick, 'Синие', BLUE_PLAYERS, 50);


  if (redTeam.Total.Kills > blueTeam.Total.Kills) {
    redTeam.Result = 'Победа';
    blueTeam.Result = 'Поражение';
  } else if (blueTeam.Total.Kills > redTeam.Total.Kills) {
    blueTeam.Result = 'Победа';
    redTeam.Result = 'Поражение';
  }

  return {
    Battle: {
      Setting: SETTINGS[tick % SETTINGS.length],
      Date: formatDate(now),
      Time: formatTime(now)
    },
    Teams: [redTeam, blueTeam]
  };
};