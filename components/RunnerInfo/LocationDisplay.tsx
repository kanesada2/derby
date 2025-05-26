import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '../ThemedText';
import { Location } from '../../domain/models/valueObjects/location';

interface LocationDisplayProps {
  location: Location;
}

export function LocationDisplay({ location }: LocationDisplayProps) {
  const [current, setCurrent] = useState(location.current);
  const max = location.max;

  useEffect(() => {
    const handleChange = (value: number) => {
      setCurrent(value);
    };

    location.addListener('change', handleChange);
    
    return () => {
      // EventEmitterのクリーンアップは、コンポーネントのアンマウント時に自動的に処理される
    };
  }, [location]);

  return (
    <View style={styles.container}>
      <ThemedText style={styles.label} type="default">キョリ:</ThemedText>
      <ThemedText style={styles.value} type="default">
        {Math.round(current)}/{Math.round(max)}
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
