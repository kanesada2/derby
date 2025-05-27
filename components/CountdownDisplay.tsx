import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Race } from '../domain/models/entities/race';
import { ThemedText } from './ThemedText';

interface CountdownDisplayProps {
  race: Race;
}

export function CountdownDisplay({ race }: CountdownDisplayProps) {
  const [beforeSecond, setBeforeSecond] = useState(race.raceTime.beforeSecond);
  const [opacity] = useState(new Animated.Value(1));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleRaceTimeChange = (newBeforeSecond: number) => {
      setBeforeSecond(newBeforeSecond);
      
      if (newBeforeSecond > 0) {
        // カウントダウン表示開始
        setIsVisible(true);
        opacity.setValue(1);
        
        // 0.5秒後にフェードアウト開始
        setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start();
        }, 500);
      } else {
        // カウントダウン終了
        setIsVisible(false);
      }
    };

    race.raceTime.addListener('change', handleRaceTimeChange);
    
    return () => {
      // EventEmitterのクリーンアップは、コンポーネントのアンマウント時に自動的に処理される
    };
  }, [race, opacity]);

  if (!isVisible || beforeSecond <= 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.countdownContainer, { opacity }]}>
        <ThemedText style={styles.countdownText} type="title">
          {beforeSecond}
        </ThemedText>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  countdownContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  countdownText: {
    fontSize: 80,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },
});
