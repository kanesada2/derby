import { ElementType } from '@/domain/models/entities/chip';
import { Race } from '../../domain/models/entities/race';
import { Runner } from '../../domain/models/entities/runner';
import { ElementButtonEntity } from './ElementButtonEntity';
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

// 初期エレメントボタンの作成
export function setupElementButtons(entities: any) {
  if (!entities.elementTiers) return entities;

  // エレメントボタンを作成（1ティア以上の属性のみ）
  const activeElements = Object.entries(entities.elementTiers)
    .filter(([_, tier]) => Number(tier) > 0)
    .map(([element, tier]) => ({
      element: element as ElementType,
      tier: Number(tier)
    }));

  // 右下から順番に配置するためのスペース計算
  const buttonSize = 60;
  const buttonMargin = 10;
  let buttonIndex = 0;

  activeElements.forEach(({ element, tier }) => {
    const entityKey = `element_button_${element}`;
    const y = 20 + buttonIndex * (buttonSize + buttonMargin); // 下から上に積み上げる
    
    entities[entityKey] = {
      x: 16, // 右端からの距離
      y: y,  // 下端からの距離
      element,
      tier,
      disabled: true, // 初期状態は無効
      used: false,    // 使用済みフラグ
      renderer: ElementButtonEntity
    };
    
    buttonIndex++;
  });

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

  // エレメントボタンの状態を更新
  Object.keys(newEntities).forEach(key => {
    if (key.startsWith('element_button_')) {
      const buttonEntity = newEntities[key];
      
      // すでに使用済みのボタンは無効のままにする
      if (buttonEntity.used) {
        buttonEntity.disabled = true;
        return;
      }
      
      // ドロン値が足りなければ無効化、足りれば有効化
      const motivationValue = playableRunner.motivation.current.value;
      const requiredMotivation = buttonEntity.tier * 3000; // 1ティアあたり1000必要
      buttonEntity.disabled = motivationValue < requiredMotivation;
    }
  });

  return newEntities;
}
