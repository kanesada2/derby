import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Concentrated } from '../../domain/models/valueObjects/status/concentrated';
import { Exhausted } from '../../domain/models/valueObjects/status/exhausted';
import { Pleasant } from '../../domain/models/valueObjects/status/pleasant';
import { ThemedText } from '../ThemedText';

interface StatusDisplayProps {
  pleasant: Pleasant;
  concentrated: Concentrated;
  exhausted: Exhausted;
}

export function StatusDisplay({ pleasant, concentrated, exhausted }: StatusDisplayProps) {
  const [pleasantActivated, setPleasantActivated] = useState(pleasant.activated);
  const [concentratedActivated, setConcentratedActivated] = useState(concentrated.activated);
  const [exhaustedActivated, setExhaustedActivated] = useState(exhausted.activated);

  useEffect(() => {
    const handlePleasantChange = (activated: boolean) => {
      setPleasantActivated(activated);
    };

    const handleConcentratedChange = (activated: boolean) => {
      setConcentratedActivated(activated);
    };

    const handleExhaustedChange = (activated: boolean) => {
      setExhaustedActivated(activated);
    };

    pleasant.addListener('change', handlePleasantChange);
    concentrated.addListener('change', handleConcentratedChange);
    exhausted.addListener('change', handleExhaustedChange);
    
    return () => {
      // EventEmitterのクリーンアップは、コンポーネントのアンマウント時に自動的に処理される
    };
  }, [pleasant, concentrated, exhausted]);

  const getStatusText = () => {
    const statuses = [];
    if (pleasantActivated) statuses.push('ノリノリ');
    if (concentratedActivated) statuses.push('バチバチ');
    if (exhaustedActivated) statuses.push('ヘトヘト');
    return statuses.length > 0 ? statuses.join(', ') : 'フツウ';
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.label} type="default">キブン:</ThemedText>
      <ThemedText style={styles.value} type="default">
        {getStatusText()}
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
