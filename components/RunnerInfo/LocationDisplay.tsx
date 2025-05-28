import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Location } from '../../domain/models/valueObjects/location';
import { ThemedText } from '../ThemedText';

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
      <View style={styles.barContainer}>
        <View style={styles.barBackground}>
          <View 
            style={[
              styles.barFill, 
              { width: `${(current / max) * 100}%` }
            ]} 
          />
        </View>
      </View>
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
    backgroundColor: '#e67e22',
    borderRadius: 4,
  },
});
