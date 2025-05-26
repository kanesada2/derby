import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Motivation } from '../../domain/models/valueObjects/parameters/motivation';
import { ThemedText } from '../ThemedText';

interface MotivationDisplayProps {
  motivation: Motivation;
}

export function MotivationDisplay({ motivation }: MotivationDisplayProps) {
  const [current, setCurrent] = useState(motivation.current.value);
  const max = 1600;

  useEffect(() => {
    const handleChange = (value: number) => {
      setCurrent(value);
    };

    motivation.addListener('change', handleChange);
    
    return () => {
      // EventEmitterのクリーンアップは、コンポーネントのアンマウント時に自動的に処理される
    };
  }, [motivation]);

  return (
    <View style={styles.container}>
      <ThemedText style={styles.label} type="default">ドロン:</ThemedText>
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
          {Math.round(current)}/{max}
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
    backgroundColor: '#2196F3',
    borderRadius: 4,
  },
  value: {
    fontSize: 10,
    minWidth: 60,
  },
});
