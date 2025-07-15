import { useChips } from "@/contexts/ChipsContext";
import { Runner } from "@/domain/models/entities/runner";
import { useFocusEffect } from "expo-router";
import React, { useRef, useState } from "react";
import { AppRegistry, Pressable, StyleSheet } from "react-native";
import { ElementType } from "../domain/models/entities/chip";
import { Race } from "../domain/models/entities/race";
import { AnimationLoop, AnimationLoopRef } from "./AnimationLoop";
import { CountdownDisplay } from "./CountdownDisplay";
import { ElementButtons } from "./ElementButtons";
import { RaceCanvas } from "./Game/RaceCanvas";
import { OkModal } from "./OkModal";
import { RunnerInfo } from "./RunnerInfo/RunnerInfo";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export default function RaceGame() {
  const [modalVisible, setModalVisible] = useState(true);
  const [race, setRace] = useState<Race | null>(null);
  const [playableRunner, setPlayableRunner] = useState<Runner | null>(null);
  const [, setUpdateCounter] = useState(0);
  const [raceKey, setRaceKey] = useState(0);
  const { chips } = useChips();
  const animationLoopRef = useRef<AnimationLoopRef>(null);
  const raceRef = useRef<Race | null>(null);
  const playableRunnerRef = useRef<Runner | null>(null);

  const handleElementPress = (elementType: ElementType) => {
    if (playableRunner) {
      playableRunner.interactElementSkill(elementType);
    }
  };

  const handleTouch = () => {
    if (playableRunner) {
      playableRunner.crawl();
    }
  };

  const handleGameFrame = (deltaTime: number, totalTime: number) => {
    if (!raceRef.current || !playableRunnerRef.current) return;
    
    // RaceSystemの処理を移植
    raceRef.current.update(deltaTime);
    
    // 強制的に再レンダーを発生させる
    setUpdateCounter(prev => prev + 1);
  };

  const handleOk = () => {
    // レースとランナーを初期化
    const newRace = new Race();
    const newPlayableRunner = Runner.createWithChips(chips, newRace, 0);
    newRace.addPlayableRunner(newPlayableRunner);
    newRace.summonRunners();
    
    setRace(newRace);
    setPlayableRunner(newPlayableRunner);
    raceRef.current = newRace;
    playableRunnerRef.current = newPlayableRunner;
    setModalVisible(false);
    
    // RunnerInfoの再レンダーを強制
    setUpdateCounter(prev => prev + 1);
    setRaceKey(prev => prev + 1);
    
    // アニメーションループを開始
    animationLoopRef.current?.start();
  };

  useFocusEffect(
    React.useCallback(() => {
      setModalVisible(true);
      // アニメーションループを停止
      animationLoopRef.current?.stop();
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
      
      <AnimationLoop
        ref={animationLoopRef}
        onFrame={handleGameFrame}
        targetFPS={60}
        autoStart={false}
      >
        {race && playableRunner ? (
          <Pressable onPress={handleTouch} style={styles.gameLoop}>
            <RaceCanvas race={race} playableRunner={playableRunner} />
            <RunnerInfo key={raceKey} race={race} runner={playableRunner} />
            <CountdownDisplay race={race} />
            <ElementButtons 
              playableRunner={playableRunner}
              onElementPress={handleElementPress}
            />
          </Pressable>
        ) : (
          <ThemedView style={styles.gameLoop}>
            {/* ゲーム開始前の状態 */}
          </ThemedView>
        )}
      </AnimationLoop>
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
