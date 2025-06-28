// Game Engine用のタッチシステム（既存コードとの互換性のため）
export const TouchSystem = (entities: any, { touches }: any) => {
  const { raceData } = entities;
  if (!raceData || !raceData.playableRunner) return entities;
  
  const { playableRunner } = raceData;
  
  touches.forEach((e: {id: any, type: string, event: TouchEvent}) => {
  
    if (e.type === "end") {
      // 各エレメントボタンに対して、タッチイベントをチェック
      playableRunner.crawl();
    }
  });

  return entities;
};
