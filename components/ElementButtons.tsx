import { SkillInteractor } from '@/domain/models/valueObjects/skillInteractor';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import MaterialIcons from '../constants/MaterialIcons';
import { Element, ElementType } from '../domain/models/entities/chip';
import { Runner } from '../domain/models/entities/runner';
import { ThemedText } from './ThemedText';

interface ElementButtonsProps {
  playableRunner: Runner;
  onElementPress: (elementType: ElementType) => void;
}

// 属性アイコンの取得（build.tsxと同じ）
const getElementIcon = (element: ElementType): string => {
  switch (element) {
    case Element.FIRE: return 'local-fire-department';
    case Element.WATER: return 'water-drop';
    case Element.WIND: return 'air';
    case Element.LIGHT: return 'wb-sunny';
    case Element.DARK: return 'nightlight-round';
    case Element.EARTH: return 'landscape';
    case Element.THUNDER: return 'flash-on';
    default: return 'help';
  }
};

// 属性の色を取得（build.tsxと同じ）
const getElementColor = (element: ElementType): string => {
  switch (element) {
    case Element.FIRE: return '#FF6B6B';
    case Element.WATER: return '#4ECDC4';
    case Element.WIND: return '#27ae60';
    case Element.LIGHT: return '#F79F1F';
    case Element.DARK: return '#6C5B7B';
    case Element.EARTH: return '#8D5524';
    case Element.THUNDER: return '#f1c40f';
    default: return '#999999';
  }
};

export const ElementButtons: React.FC<ElementButtonsProps> = ({
  playableRunner,
  onElementPress,
}) => {
  const [interactorStates, setInteractorStates] = useState<Map<ElementType, boolean>>(new Map());

  // availableなSkillInteractorを取得
  const availableInteractors = useMemo(() => {
    return Array.from(playableRunner.skillInteractors.values())
      .filter(interactor => interactor.available)
      .sort((a, b) => a.type.localeCompare(b.type)); // 属性順でソート
  }, [playableRunner]);

  useEffect(() => {
    // 初期状態を設定
    const initialStates = new Map<ElementType, boolean>();
    const cleanupFunctions: (() => void)[] = [];
    
    // playableRunnerから直接取得して処理
    Array.from(playableRunner.skillInteractors.values())
      .filter(interactor => interactor.available)
      .forEach(interactor => {
        initialStates.set(interactor.type, interactor.canInteract);
        
        // change イベントリスナーを追加
        const listener = () => {
          setInteractorStates(prev => {
            const newStates = new Map(prev);
            newStates.set(interactor.type, interactor.canInteract);
            return newStates;
          });
        };
        
        interactor.addListener(SkillInteractor.EVENT_INTERACT_AVAILABLE, listener);
        cleanupFunctions.push(() => interactor.removeAllListeners(SkillInteractor.EVENT_INTERACT_AVAILABLE));
      });
    
    setInteractorStates(initialStates);

    // クリーンアップ
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, [playableRunner]); // playableRunnerが変わった時のみ再実行

  return (
    <View style={styles.container}>
      {availableInteractors.map((interactor) => {
        const elementColor = getElementColor(interactor.type);
        const isDisabled = !interactorStates.get(interactor.type);
        
        return (
          <TouchableOpacity
            key={interactor.type}
            style={[
              styles.button,
              { borderColor: elementColor },
              isDisabled && styles.disabledButton,
            ]}
            onPress={() => onElementPress(interactor.type)}
            disabled={isDisabled}
            activeOpacity={0.7}
          >
            <View style={styles.buttonContent}>
              <MaterialIcons
                name={getElementIcon(interactor.type) as any}
                size={28}
                color={isDisabled ? '#999999' : elementColor}
                style={styles.icon}
              />
              <ThemedText style={[
                styles.tierText,
                { color: isDisabled ? '#999999' : elementColor }
              ]}>
                {interactor.tier}
              </ThemedText>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1001, // RunnerInfoより前面に表示
    gap: 12,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: 'rgba(200, 200, 200, 0.7)',
    borderColor: '#999999',
  },
  buttonContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  icon: {
    position: 'absolute',
  },
  tierText: {
    fontSize: 10,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 4,
    right: 4,
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
    minWidth: 16,
    textAlign: 'center',
  },
});