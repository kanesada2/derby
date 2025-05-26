import { Dimensions } from 'react-native';
import { Race } from '../../domain/models/entities/race';
import { Runner } from '../../domain/models/entities/runner';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export class RaceRenderingSystem {
  private static readonly RUNNER_SIZE = 20;
  private static readonly CAMERA_RANGE = 600; // カメラの上下範囲
  private static readonly HORIZONTAL_SPACING = 40; // ランナー間の横間隔

  static calculateRunnerPositions(race: Race, playableRunner: Runner) {
    const playableLocation = playableRunner.location.current;
    const centerY = SCREEN_HEIGHT / 2;
    const positions: {
      runner: Runner;
      x: number;
      y: number;
      isPlayable: boolean;
      visible: boolean;
    }[] = [];

    // すべてのランナーの位置を計算
    race.runners.forEach((runner: Runner) => {
      const locationDiff = runner.location.current - playableLocation;
      const isPlayable = runner === playableRunner;
      
      // X座標: プレイヤブルランナーは常に画面左端から一定距離
      const x = isPlayable ? 50 : 50 + (runner.id + 1) * this.HORIZONTAL_SPACING;
      
      // Y座標: location差に基づいてカメラ位置を計算
      const y = centerY - (locationDiff / this.CAMERA_RANGE) * (SCREEN_HEIGHT / 2);
      
      // 画面内にいるかチェック
      const visible = y >= -this.RUNNER_SIZE && y <= SCREEN_HEIGHT + this.RUNNER_SIZE;
      
      positions.push({
        runner,
        x,
        y,
        isPlayable,
        visible,
      });
    });

    return positions.filter(pos => pos.visible);
  }

  static getRunnerSize(): number {
    return this.RUNNER_SIZE;
  }
}
