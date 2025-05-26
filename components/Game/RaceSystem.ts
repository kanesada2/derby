import { updateGameEntities } from './GameEntities';

export function RaceSystem(entities: any, { time, dispatch }: any) {
  const race = entities.raceData?.race;
  const playableRunner = entities.raceData?.playableRunner;
  
  if (!race || !playableRunner) {
    return entities;
  }
  race.update(time.deltaTime);

  // エンティティの位置を更新
  return updateGameEntities(entities, race, playableRunner);
}
