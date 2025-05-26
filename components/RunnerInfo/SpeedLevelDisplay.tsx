import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SpeedLevel } from '../../domain/models/valueObjects/parameters/speedLevel';
import { ThemedText } from '../ThemedText';

interface SpeedLevelDisplayProps {
  speedLevel: SpeedLevel;
}

export function SpeedLevelDisplay({ speedLevel }: SpeedLevelDisplayProps) {
  const [current, setCurrent] = useState(speedLevel.current.value);
  const max = speedLevel.max.value;

  useEffect(() => {
    const handleChange = (value: number) => {
      setCurrent(value);
    };

    speedLevel.addListener('change', handleChange);
    
    return () => {
      // EventEmitterのクリーンアップは、コンポーネントのアンマウント時に自動的に処理される
    };
  }, [speedLevel]);

  return (
    <View style={styles.container}>
      <ThemedText style={styles.label} type="default">カケアシ:</ThemedText>
      <View style={styles.barContainer}>
        <View style={styles.barBackground}>
          {current >= 1 && (
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
  },
  value: {
    fontSize: 12,
    flex: 1,
  },
});
