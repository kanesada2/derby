import { Race } from '@/domain/models/entities/race';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Runner } from '../../domain/models/entities/runner';
import { ThemedText } from '../ThemedText';

interface PositionDisplayProps {
  race: Race;
  runner: Runner;
}

export function PositionDisplay({ race, runner}: PositionDisplayProps) {
  const [position, setPosition] = useState(race.indexOf(runner) + 1);

  useEffect(() => {
    const handleRaceChange = () => {
      setPosition(race.indexOf(runner) + 1);
    };

    runner.location.addListener('change', handleRaceChange);
    
    return () => {
      // EventEmitterのクリーンアップは、コンポーネントのアンマウント時に自動的に処理される
    };
  }, [race, runner]);

  return (
    <View style={styles.container}>
      <ThemedText style={styles.label} type="default">ジュンイ:</ThemedText>
      <ThemedText style={styles.value} type="default">
        {position}位
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
    fontWeight: 'bold',
  },
});
