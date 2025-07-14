import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SpeedLevel } from '../../domain/models/valueObjects/parameters/speedLevel';
import { ThemedText } from '../ThemedText';

interface SpeedLevelDisplayProps {
  speedLevel: SpeedLevel;
}

export function SpeedLevelDisplay({ speedLevel }: SpeedLevelDisplayProps) {
  const [current, setCurrent] = useState(speedLevel.current.value);
  const [max, setMax] = useState(speedLevel.max.value);
  const [pleasantMin, setPleasantMin] = useState(speedLevel.pleasantMin.value);
  const [pleasantMax, setPleasantMax] = useState(speedLevel.pleasantMax.value);
  const [motivatingMin, setMotivatingMin] = useState(speedLevel.motivatingMin);

  useEffect(() => {
    const handleChange = (value: number) => {
      setCurrent(value);
      setMax(speedLevel.max.value);
      
      // pleasantMin/Maxが変更された時だけ更新
      if (speedLevel.pleasantMin.value !== pleasantMin) {
        setPleasantMin(speedLevel.pleasantMin.value);
      }
      if (speedLevel.pleasantMax.value !== pleasantMax) {
        setPleasantMax(speedLevel.pleasantMax.value);
      }
      // motivatingMinが変更された時だけ更新
      if (speedLevel.motivatingMin !== motivatingMin) {
        setMotivatingMin(speedLevel.motivatingMin);
      }
    };

    speedLevel.addListener('change', handleChange);
    
    return () => {
      // EventEmitterのクリーンアップは、コンポーネントのアンマウント時に自動的に処理される
    };
  }, [speedLevel, pleasantMin, pleasantMax, motivatingMin]);

  // pleasant範囲の表示位置を計算
  const pleasantMinPosition = ((pleasantMin - 1) / (max - 1)) * 100;
  const pleasantMaxPosition = ((pleasantMax - 1) / (max - 1)) * 100;
  const pleasantWidth = pleasantMaxPosition - pleasantMinPosition;
  
  // motivatingMinの表示位置を計算
  const motivatingMinPosition = ((motivatingMin - 1) / (max - 1)) * 100;

  return (
    <View style={styles.container}>
      <ThemedText style={styles.label} type="default">カケアシ:</ThemedText>
      <View style={styles.barContainer}>
        <View style={styles.barBackground}>
          {/* Pleasant範囲のボーダー */}
          <View style={[
            styles.pleasantRange,
            {
              left: `${pleasantMinPosition}%`,
              width: `${pleasantWidth}%`,
            }
          ]} />
          {/* MotivatingMinのライン */}
          <View style={[
            styles.motivatingLine,
            {
              left: `${motivatingMinPosition}%`,
            }
          ]} />
          {/* 現在値のバー */}
          {current > 1 && (
            <View style={[
              styles.barFill, 
              {  width: `${((current - 1) / (max - 1)) * 100}%` }
            ]} 
          />)}
          </View>
        <ThemedText style={styles.value} type="default">
          {current.toFixed(3)}/{max.toFixed(3)}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  label: {
    width: 80,
    fontSize: 12,
  },
  barContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  barBackground: {
    flex: 1,
    height: 8,
    backgroundColor: '#ddd',
    borderRadius: 4,
    marginRight: 8,
  },
  barFill: {
    height: '100%',
    backgroundColor: '#ff0000',
    borderRadius: 4,
    zIndex: 1,
  },
  pleasantRange: {
    position: 'absolute',
    height: '100%',
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: '#32CD32',
    borderStyle: 'solid',
    zIndex: 2,
  },
  motivatingLine: {
    position: 'absolute',
    height: '100%',
    width: 2,
    backgroundColor: '#0000ff',
    zIndex: 3,
  },
  value: {
    fontSize: 12,
    flex: 1,
  },
});
