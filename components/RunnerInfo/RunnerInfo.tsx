import { Race } from '@/domain/models/entities/race';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Runner } from '../../domain/models/entities/runner';
import { BaseSpeedDisplay } from './BaseSpeedDisplay';
import { HealthDisplay } from './HealthDisplay';
import { LocationDisplay } from './LocationDisplay';
import { MotivationDisplay } from './MotivationDisplay';
import { PositionDisplay } from './PositionDisplay';
import { RaceTimer } from './RaceTimer';
import { SpeedLevelDisplay } from './SpeedLevelDisplay';
import { StatusDisplay } from './StatusDisplay';

interface RunnerInfoProps {
  race: Race;
  runner: Runner;
}

export function RunnerInfo({ race, runner }: RunnerInfoProps) {
  return (
    <View style={styles.container}>
      <HealthDisplay health={runner.health} />
      <MotivationDisplay motivation={runner.motivation} />
      <SpeedLevelDisplay speedLevel={runner.speedLevel} />
      <BaseSpeedDisplay baseSpeed={runner.baseSpeed} />
      <LocationDisplay location={runner.location} />
      <PositionDisplay race={race} runner={runner} />
      <StatusDisplay 
        pleasant={runner.pleasant} 
        concentrated={runner.concentrated} 
        motivating={runner.motivating}
        exhausted={runner.exhausted} 
      />
      <RaceTimer race={race} playableRunner={runner}></RaceTimer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 8,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    elevation: 5,
    zIndex: 100,
  },
});
