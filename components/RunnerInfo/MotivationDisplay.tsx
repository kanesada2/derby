import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Motivation } from '../../domain/models/valueObjects/parameters/motivation';
import { ThemedText } from '../ThemedText';

interface MotivationDisplayProps {
  motivation: Motivation;
}

export function MotivationDisplay({ motivation }: MotivationDisplayProps) {
  const [current, setCurrent] = useState(motivation.current.value);

  useEffect(() => {
    const handleChange = (value: number) => {
      setCurrent(value);
    };

    motivation.addListener('change', handleChange);
    
    return () => {
      // EventEmitterのクリーンアップは、コンポーネントのアンマウント時に自動的に処理される
    };
  }, [motivation]);

  // 5本のゲージの状態を計算
  const gaugeSteps = 5;
  const stepSize = Motivation.MAX / gaugeSteps;
  
  const renderGauges = () => {
    const gauges = [];
    for (let i = 0; i < gaugeSteps; i++) {
      const stepMin = i * stepSize;
      const isActive = current > stepMin;
      const fillRatio = isActive ? Math.min((current - stepMin) / stepSize, 1) : 0;
      
      gauges.push(
        <View key={i} style={styles.gaugeContainer}>
          <View style={styles.gaugeBackground}>
            <View 
              style={[
                styles.gaugeFill, 
                { width: `${fillRatio * 100}%` }
              ]} 
            />
          </View>
        </View>
      );
    }
    return gauges;
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.label} type="default">ドロン:</ThemedText>
      <View style={styles.barContainer}>
        <View style={styles.gaugesContainer}>
          {renderGauges()}
        </View>
        <ThemedText style={styles.value} type="default">
          {Math.round(current)}/{Motivation.MAX}
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
  gaugesContainer: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 8,
    gap: 2,
  },
  gaugeContainer: {
    flex: 1,
  },
  gaugeBackground: {
    height: 8,
    backgroundColor: '#ddd',
    borderRadius: 4,
  },
  gaugeFill: {
    height: '100%',
    backgroundColor: '#2196F3',
    borderRadius: 4,
  },
  value: {
    fontSize: 10,
    minWidth: 60,
  },
});
