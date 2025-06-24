import { Element, ElementType } from '@/domain/models/entities/chip';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../ThemedText';

// StyleSheetを使用して型安全なスタイルを定義
const styles = StyleSheet.create({
  elementButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  elementButtonDisabled: {
    backgroundColor: 'rgba(240, 240, 240, 0.7)',
    opacity: 0.7,
  },
  elementTierText: {
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 5,
    right: 10,
  },
});

// 属性アイコンの取得
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

// 属性の色を取得
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


export interface ElementButtonEntityProps {
  x: number;
  y: number;
  element: ElementType;
  tier: number;
  disabled: boolean;
  used?: boolean;
  onPress: () => void;
}

export function ElementButtonEntity(props: ElementButtonEntityProps) {
  const { x, y, element, tier, disabled, onPress } = props;

  return (
    <View style={{
      position: 'absolute',
      right: x,
      bottom: y,
      zIndex: 1000,
    }}>
      <TouchableOpacity
        style={[
          styles.elementButton,
          { borderColor: disabled ? '#CCCCCC' : getElementColor(element) },
          disabled ? styles.elementButtonDisabled : undefined
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        <MaterialIcons
          name={getElementIcon(element) as any}
          size={30}
          color={disabled ? '#CCCCCC' : getElementColor(element)}
        />
        <ThemedText style={[
          styles.elementTierText,
          { color: disabled ? '#CCCCCC' : getElementColor(element) }
        ]}>
          {tier}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}
