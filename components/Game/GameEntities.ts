import { Race } from '../../domain/models/entities/race';
import { Runner } from '../../domain/models/entities/runner';
import { RaceRenderingSystem } from './RaceRenderingSystem';
import { RunnerEntity } from './RunnerEntity';

export function createGameEntities(race: Race, playableRunner: Runner) {
  const positions = RaceRenderingSystem.calculateRunnerPositions(race, playableRunner);
  const entities: { [key: string]: any } = {
    // RaceGame.tsxでこのプロパティに値が設定される
    elementTiers: {}
  };

  // ランナーエンティティを作成
  positions.forEach((pos) => {
    const entityKey = `runner_${pos.runner.id}`;
    entities[entityKey] = {
      runner: pos.runner,
      x: pos.x,
      y: pos.y,
      isPlayable: pos.isPlayable,
      size: RaceRenderingSystem.getRunnerSize(),
      renderer: RunnerEntity,
    };
  });

  // 重要: globalオブジェクトにentitiesを保存
  // ElementButtonEntityの初期化時にelementTiersが取得できるようにする
  (global as any).entities = entities;

  return entities;
}

export function updateGameEntities(entities: any, race: Race, playableRunner: Runner) {
  const positions = RaceRenderingSystem.calculateRunnerPositions(race, playableRunner);
  const newEntities = { ...entities };

  // 既存のランナーエンティティをクリア
  Object.keys(newEntities).forEach(key => {
    if (key.startsWith('runner_')) {
      delete newEntities[key];
    }
  });

  // 新しい位置でランナーエンティティを更新
  positions.forEach((pos) => {
    const entityKey = `runner_${pos.runner.id}`;
    newEntities[entityKey] = {
      runner: pos.runner,
      x: pos.x,
      y: pos.y,
      isPlayable: pos.isPlayable,
      size: RaceRenderingSystem.getRunnerSize(),
      renderer: RunnerEntity,
    };
  });

  return newEntities;
}
