import React from 'react';
import { View } from 'react-native';
import { Runner } from '../../domain/models/entities/runner';

interface RunnerEntityProps {
  runner: Runner;
  isPlayable: boolean;
  x: number;
  y: number;
  size: number;
}

export function RunnerEntity({ runner, isPlayable, x, y, size }: RunnerEntityProps) {
  const backgroundColor = isPlayable ? '#FFFFFF' : getRunnerColor(runner);
  
  return (
    <View
      style={{
        position: 'absolute',
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        backgroundColor,
        borderColor: '#000',
        borderWidth: 1,
      }}
    />
  );
}

function getRunnerColor(runner: Runner): string {
  // ランナーのインデックスに基づいて色を決定
  const colors = [
    '#ffffff', // 白 プレイヤー固定
    '#FF6B6B', // 赤
    '#4ECDC4', // 青緑
    '#45B7D1', // 青
    '#96CEB4', // 緑
    '#FFEAA7', // 黄
    '#DDA0DD', // 紫
  ];
  
  return colors[runner.id % colors.length];
}
