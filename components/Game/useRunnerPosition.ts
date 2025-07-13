import { useMemo } from 'react';
import { Dimensions } from 'react-native';
import { Race } from '../../domain/models/entities/race';
import { Runner } from '../../domain/models/entities/runner';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface RunnerPosition {
  x: number;
  y: number;
  isVisible: boolean;
}

export function useRunnerPosition(runner: Runner, playableRunner: Runner, race: Race): RunnerPosition {
  const runnerLocation = runner.location.current;
  const playableLocation = playableRunner.location.current;
  const runnerId = runner.id;
  const isPlayable = runner === playableRunner;
  
  return useMemo(() => {
    const RUNNER_SIZE = 20;
    const CAMERA_RANGE = 600; // カメラの上下範囲
    const HORIZONTAL_SPACING = 40; // ランナー間の横間隔
    
    const locationDiff = runnerLocation - playableLocation;
    const centerY = SCREEN_HEIGHT / 2;
    
    // 可視性判定
    const isVisible = Math.abs(locationDiff) <= CAMERA_RANGE;
    
    // X座標: プレイヤブルランナーは常に画面左端から一定距離
    const x = isPlayable ? 50 : 50 + (runnerId + 1) * HORIZONTAL_SPACING;
    
    // Y座標: location差に基づいてカメラ位置を計算
    const y = centerY - (locationDiff / CAMERA_RANGE) * (SCREEN_HEIGHT / 2);
    
    // 画面境界での可視性チェック
    const visibleInScreen = y >= -RUNNER_SIZE && y <= SCREEN_HEIGHT + RUNNER_SIZE;
    
    return {
      x,
      y,
      isVisible: isVisible && visibleInScreen,
    };
  }, [runnerLocation, playableLocation, runnerId, isPlayable]);
}