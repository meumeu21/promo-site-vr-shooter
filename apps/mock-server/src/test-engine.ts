import { MockEngine } from './scheduler/engine';
import { EngineStore } from './state/store';

const store = new EngineStore({
  mode: 'replay',
  replayFile: 'demo-match.json',
  tickMs: 2000 
});

const engine = new MockEngine(store);

engine.start();

setTimeout(() => {
  engine.pause();
  console.log('Тест завершен успешно.');
}, 11000);