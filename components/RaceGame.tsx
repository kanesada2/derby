import { useChips } from "@/contexts/ChipsContext";
import { Runner } from "@/domain/models/entities/runner";
import Slider from "@react-native-community/slider";
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
  // 目標タイムのstate（初期値は160秒）
  const [targetTime, setTargetTime] = useState(160);

  // 時間を2分○○秒の形式に変換する関数
  const formatTime = (seconds: number) => {
    const remainingSeconds = seconds - 120;
    return `2分${remainingSeconds.toString().padStart(2, '0')}秒`;
  };

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
    newRace.summonRunners(targetTime);
    
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
        <ThemedView style={styles.targetTimeContainer}>
          <ThemedText style={styles.targetTimeLabel}>
                        NPC目標タイム: {formatTime(targetTime)}
          </ThemedText>
          <Slider
            minimumValue={145}
            maximumValue={160}
            value={targetTime}
            onValueChange={(value: number) => setTargetTime(Math.round(value))}
            style={{
              height: 40
            }}
          />
        </ThemedView>
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
  },
  targetTimeContainer: {
    width: '100%',
    marginTop: 15,
  },
  targetTimeLabel: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderThumb: {
    backgroundColor: '#0a7ea4',
    width: 20,
    height: 20,
  },
  sliderTrack: {
    height: 4,
    borderRadius: 2,
  },
});

AppRegistry.registerComponent("RaceGame", () => RaceGame);
