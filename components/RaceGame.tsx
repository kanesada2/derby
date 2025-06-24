import { useChips } from "@/contexts/ChipsContext";
import { Runner } from "@/domain/models/entities/runner";
import { useFocusEffect } from "expo-router";
import React, { useState } from "react";
import { AppRegistry, StyleSheet } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Race } from "../domain/models/entities/race";
import { CountdownDisplay } from "./CountdownDisplay";
import { createGameEntities, setupElementButtons } from "./Game/GameEntities";
import { RaceSystem } from "./Game/RaceSystem";
import { TouchSystem } from "./Game/TouchSystem";
import { OkModal } from "./OkModal";
import { RunnerInfo } from "./RunnerInfo/RunnerInfo";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export default function RaceGame() {
  const [modalVisible, setModalVisible] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [gameEntities, setGameEntities] = useState<any>(null);
  const { chips } = useChips();
  const [gameKey, setGameKey] = useState(0); // 追加

  const handleOk = () => {
    // ゲームエンティティを初期化
    const race = new Race();
    const playableRunner = Runner.createWithChips(chips, race, 0);
    race.addPlayableRunner(playableRunner);
    race.summonRunners();
    
    // ゲームエンティティを作成
    const entities = createGameEntities(race, playableRunner);
    
    // ランナーやレースのデータを保存（他のシステムから参照可能に）
    entities.raceData = { race, playableRunner };
    
    // ChipCollectionからelementTiersを取得してエンティティに設定
    entities.elementTiers = chips.elementTiers;
    
    // エレメントボタンを作成
    setupElementButtons(entities);
    
    setGameEntities(entities);
    setGameKey(prev => prev + 1);
    setModalVisible(false);
    setIsRunning(true);
  };

  useFocusEffect(
    React.useCallback(() => {
      setModalVisible(true);
    }, [])
  );

  return (
    <ThemedView style={styles.container}>
      <OkModal
        visible={modalVisible}
        onOk={handleOk}
        title="確認"
      >
        <ThemedText style={styles.modalText}>
          レースを開始しますか？
        </ThemedText>
      </OkModal>
      {gameEntities ? (
        <GameEngine
          key={gameKey}
          style={styles.gameLoop}
          running={isRunning}
          entities={gameEntities}
          systems={[RaceSystem, TouchSystem]}
        >
          <RunnerInfo race={gameEntities.raceData.race} runner={gameEntities.raceData.playableRunner} />
          <CountdownDisplay race={gameEntities.raceData.race} />
        </GameEngine>
      ) : (
        <ThemedView style={styles.gameLoop}>
          {/* GameEngine無しの状態 */}
          {/* UI components */}
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 1080,
    flex: 1,
    touchAction: "manipulation",
  },
  gameLoop: {
    flex: 1,
    backgroundColor: '#87CEEB', // スカイブルーの背景
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

AppRegistry.registerComponent("RaceGame", () => RaceGame);