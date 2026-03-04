import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { LivePayload } from '../types';

export const loadReplayFrames = (replayFile: string): LivePayload[] => {
  const filePath = resolve(process.cwd(), 'replays', replayFile);
  
  // ИСПРАВЛЕНИЕ 1: Добавлены обратные кавычки  
  console.log(`[Loader] Читаю файл: ${filePath}`);

  try {
    const rawText = readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(rawText);

    if (!Array.isArray(parsed)) {
      throw new Error('Файл реплея должен содержать массив кадров!');
    }
    
    return parsed as LivePayload[];
  } catch (error) {
    console.error(`[Loader] Ошибка чтения файла ${replayFile}:`, error);
    throw error;
  }
}; 