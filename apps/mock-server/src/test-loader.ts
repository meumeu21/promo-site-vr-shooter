import { loadReplayFrames } from "./replay/replayLoader";
console.log('Тест загрузчика...');

try {
    const frames = loadReplayFrames('demo-match.json');

    console.log(`Успех! Загружено кадров: ${frames.length}`);
    if (frames.length > 0) {
        console.log('Первый кадр (Battle info):', frames[0].Battle);
    }
} catch (e) {
    console.error('Тест провален.');
}