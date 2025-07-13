import React from 'react';
import { View } from 'react-native';
import { Runner } from '../../domain/models/entities/runner';
import { Race } from '../../domain/models/entities/race';
import { useRunnerPosition } from './useRunnerPosition';

interface RunnerComponentProps {
  runner: Runner;
  playableRunner: Runner;
  race: Race;
}

export function RunnerComponent({ runner, playableRunner, race }: RunnerComponentProps) {
  const position = useRunnerPosition(runner, playableRunner, race);
  
  if (!position.isVisible) {
    return null;
  }
  
  const RUNNER_SIZE = 20;
  const isPlayable = runner === playableRunner;
  const backgroundColor = getRunnerColor(runner, isPlayable);
  
  return (
    <View
      style={{
        position: 'absolute',
        left: position.x - RUNNER_SIZE / 2,
        top: position.y - RUNNER_SIZE / 2,
        width: RUNNER_SIZE,
        height: RUNNER_SIZE,
        backgroundColor,
        borderColor: '#000',
        borderWidth: 1,
      }}
    />
  );
}

function getRunnerColor(runner: Runner, isPlayable: boolean): string {
  if (isPlayable) {
    return '#FFFFFF'; // プレイヤブルランナーは白
  }
  
  // ランナーのIDに基づいて色を決定
  const colors = [
    '#FF6B6B', // 赤
    '#4ECDC4', // 青緑
    '#45B7D1', // 青
    '#96CEB4', // 緑
    '#FFEAA7', // 黄
    '#DDA0DD', // 紫
    '#FFA07A', // サーモンピンク
    '#98FB98', // ペールグリーン
  ];
  
  return colors[runner.id % colors.length];
}
