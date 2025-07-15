import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Race } from '../../domain/models/entities/race';
import { Runner } from '../../domain/models/entities/runner';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';

interface RaceTimerProps {
  race: Race;
  playableRunner: Runner;
}

export function RaceTimer({ race, playableRunner }: RaceTimerProps) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRaceStarted, setIsRaceStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const handleRaceTimeChange = () => {
      if (playableRunner.location.isReached && isFinished) {
        setIsFinished(false);
      }
      // playableRunnerがゴールした場合はタイマー停止
      if (playableRunner.location.isReached) {
        if (!isFinished) {
          setIsFinished(true);
        }
        return;
      }
      
      // レース開始判定（カウントダウンが0になった）
      if (race.raceTime.beforeSecond <= 0 && !isRaceStarted) {
        setIsRaceStarted(true);
      }
    };

    const handleLocationChange = () => {
      // playableRunnerがゴールした場合はタイマー停止
      if (playableRunner.location.isReached && !isFinished) {
        setIsFinished(true);
      }
      // レース開始後かつゴール前は経過時間を更新
      if ((isRaceStarted || race.raceTime.beforeSecond <= 0) && !isFinished) {
        setElapsedTime(race.raceTime.fromStart);
      }
    };

    // 初期状態チェック
    if (race.raceTime.beforeSecond <= 0) {
      setIsRaceStarted(true);
      if (!playableRunner.location.isReached) {
        setElapsedTime(race.raceTime.fromStart);
      }
    }

    race.raceTime.addListener('change', handleRaceTimeChange);
    playableRunner.location.addListener('change', handleLocationChange);
    
    return () => {
      //race.raceTime.removeAllListeners('change');
      //playableRunner.location.removeAllListeners('change');
    };
  }, [race, playableRunner, isRaceStarted, isFinished]);

  // 時間をフォーマット（フレーム→秒.ミリ秒）
  const formatTime = (frames: number): string => {
    // 60fps前提で計算
    const totalMilliseconds = Math.floor((frames / 60) * 1000);
    const seconds = Math.floor(totalMilliseconds / 1000);
    const milliseconds = totalMilliseconds % 1000;
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes > 0) {
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}.${Math.floor(milliseconds / 10).toString().padStart(2, '0')}`;
    } else {
      return `${remainingSeconds}.${Math.floor(milliseconds / 10).toString().padStart(2, '0')}`;
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.label}>タイム</ThemedText>
      <ThemedText style={styles.time}>{formatTime(elapsedTime)}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  label: {
    width: 80,
    fontSize: 12,
  },
  time: {
    fontSize: 12,
    flex: 1,
  },
});