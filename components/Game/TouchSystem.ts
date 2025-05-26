export const TouchSystem = (entities: any, { touches }: any) => {
  // タッチイベントを処理する
  touches.forEach((e: any) => {
    if (e.type === "end") {
      // タッチされた時の処理
      if (entities.raceData && entities.raceData.playableRunner) {
        entities.raceData.playableRunner.crawl();
        return true;
      }
    }
  });

  return entities;
};
