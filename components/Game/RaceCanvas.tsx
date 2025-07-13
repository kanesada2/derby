import React from 'react';
import { View } from 'react-native';
import { Race } from '../../domain/models/entities/race';
import { Runner } from '../../domain/models/entities/runner';
import { RunnerComponent } from './RunnerEntity';

interface RaceCanvasProps {
  race: Race;
  playableRunner: Runner;
}

export function RaceCanvas({ race, playableRunner }: RaceCanvasProps) {
  return (
    <View style={{ flex: 1, position: 'relative' }}>
      {race.runners.map((runner) => (
        <RunnerComponent
          key={runner.id}
          runner={runner}
          playableRunner={playableRunner}
          race={race}
        />
      ))}
    </View>
  );
}