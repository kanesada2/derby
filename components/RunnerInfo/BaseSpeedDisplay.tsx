import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BaseSpeed } from '../../domain/models/valueObjects/parameters/baseSpeed';
import { ThemedText } from '../ThemedText';

interface BaseSpeedDisplayProps {
  baseSpeed: BaseSpeed;
}

export function BaseSpeedDisplay({ baseSpeed }: BaseSpeedDisplayProps) {
  const [value, setValue] = useState(baseSpeed.current.value);

  useEffect(() => {
    const handleChange = (newValue: number) => {
      setValue(newValue);
    };

    baseSpeed.addListener('change', handleChange);
    
    return () => {
      // EventEmitterのクリーンアップは、コンポーネントのアンマウント時に自動的に処理される
    };
  }, [baseSpeed]);

  return (
    <View style={styles.container}>
      <ThemedText style={styles.label} type="default">アシドリ:</ThemedText>
      <ThemedText style={styles.value} type="default">
        {value.toFixed(2)}
      </ThemedText>
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
  value: {
    fontSize: 12,
    flex: 1,
  },
});
