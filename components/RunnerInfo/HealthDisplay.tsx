import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Health } from '../../domain/models/valueObjects/parameters/health';
import { ThemedText } from '../ThemedText';

interface HealthDisplayProps {
  health: Health;
}

export function HealthDisplay({ health }: HealthDisplayProps) {
  const [current, setCurrent] = useState(health.current.value);
  const max = health.max.value;

  useEffect(() => {
    const handleChange = (value: number) => {
      setCurrent(value);
    };

    health.addListener('change', handleChange);
    
    return () => {
      // EventEmitterのクリーンアップは、コンポーネントのアンマウント時に自動的に処理される
    };
  }, [health]);

  return (
    <View style={styles.container}>
      <ThemedText style={styles.label} type="default">コンジョー:</ThemedText>
      <View style={styles.barContainer}>
        <View style={styles.barBackground}>
          <View 
            style={[
              styles.barFill, 
              { width: `${(current / max) * 100}%` }
            ]} 
          />
        </View>
        <ThemedText style={styles.value} type="default">
          {Math.round(current)}/{Math.round(max)}
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
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  value: {
    fontSize: 10,
    minWidth: 60,
  },
});
