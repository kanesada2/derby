import { Runner } from "@/domain/models/entities/runner";
import { Dimensions } from "react-native";
import { ElementButtonEntityProps } from "./ElementButtonEntity";

export const TouchSystem = (entities: any, { touches }: any) => {
  // ボタンサイズ
  const BUTTON_SIZE = 60;
  const { raceData } = entities;
  if (!raceData || !raceData.playableRunner) return entities;
  
  const { playableRunner } = raceData;
  
  // デバイスの画面サイズを取得
  const { width, height } = Dimensions.get("screen");
  // タッチイベントを処理する
  touches.forEach((e: {id: any, type: string, event: TouchEvent}) => {
    let isOnButton = false;
    if (e.type === "end") {
      // 各エレメントボタンに対して、タッチイベントをチェック
      Object.keys(entities).forEach(key => {
        if (key.startsWith('element_button_')) {
          const buttonEntity: ElementButtonEntityProps = entities[key];
          buttonEntity.onPress = () => {
            isOnButton = true;
            // ボタンがすでに使用済みか無効な場合は何もしない
            if (buttonEntity.disabled) return;
            
            // このボタンを使用済みにする
            buttonEntity.used = true;
            buttonEntity.disabled = true;
            
            // 実際のスキル発動ロジックはここに追加
            // 例えば、ランナーのスキル発動メソッドを呼び出す
            (playableRunner as Runner).interactElementSkill(buttonEntity.element);
          };
        }
      });
      if(!isOnButton) {
        playableRunner.crawl();
      }
    }
  });

  return entities;
};
