import { chips } from '@/constants/chips';
import { useChips } from '@/contexts/ChipsContext';
import { Health } from '@/domain/models/valueObjects/parameters/health';
import { Motivation } from '@/domain/models/valueObjects/parameters/motivation';
import { SpeedLevel } from '@/domain/models/valueObjects/parameters/speedLevel';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import MaterialIcons from '../../constants/MaterialIcons';
import { Chip, ChipCollection, Element, ElementType } from '../../domain/models/entities/chip';

const { width } = Dimensions.get('window');
const maxWidth = Math.min(width, 1024);
const costLimit = 30;

// 属性別ツールチップテキスト
const getElementTooltip = (element: ElementType): string => {
  switch (element) {
    case Element.FIRE:
      return '【FIRE】バチバチの間、カケアシレベルが下がらず、スバヤサがレベル×3%上昇する。【1レベル/3個】';
    case Element.WATER:
      return '【WATER】コンジョーの消費量がレベル×6%減少する。【1レベル/2個】';
    case Element.WIND:
      return '【WIND】ガムシャラの時にノリノリになるようになり、ガムシャラになる幅がレベル×20%増加【1レベル/3個】';
    case Element.LIGHT:
      return '【LIGHT】ドロンの貯まるスピードがレベル×100%増加する。【1レベル/4個】';
    case Element.DARK:
      return '【DARK】コンジョーの現在値が40÷レベル%減少するかわりに、スバヤサが10%上昇する。【1レベル/4個】';
    case Element.EARTH:
      return '【EARTH】コンジョーをレベル×600回復する。【1レベル/2個】';
    case Element.THUNDER:
      return '【THUNDER】カケアシの最大値をレベル×1ガンバリ分増加させる。【1レベル/2個】';
    default:
      return '';
  }
};

// レスポンシブなカラム数を計算
const getColumnCount = (): number => {
  if (maxWidth >= 800) return 4;
  if (maxWidth >= 600) return 3;
  return 2;
};

// チップをグリッド形式で表示するためのチャンクを作成
const createChunks = <T,>(array: T[], chunkSize: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

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

interface ChipItemProps {
  chip: Chip;
  isSelected: boolean;
  onPress: (chip: Chip) => void;
}

const ChipItem: React.FC<ChipItemProps> = ({ chip, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.chipItem, isSelected && styles.chipItemSelected]}
      onPress={() => onPress(chip)}
    >
      <View style={styles.chipHeader}>
        <ThemedText type="defaultSemiBold" style={styles.chipName}>
          {chip.name}
        </ThemedText>
        <View style={styles.rankContainer}>
          <ThemedText style={styles.rankText}>★{chip.rank}</ThemedText>
        </View>
      </View>
      
      <View style={styles.chipContent}>
        <View style={styles.elementContainer}>
          {chip.element.map((element, index) => (
            <View style={styles.eachElement} key={index}>
              <MaterialIcons
                key={index}
                name={getElementIcon(element) as any}
                size={16}
                color={getElementColor(element)}
              />
              <ThemedText style={[styles.elementText, { color: getElementColor(element) }]}>
                {element.toUpperCase()}
              </ThemedText>
            </View>
          ))}
        </View>
        
        <ThemedText style={styles.enhancementText}>
          コンジョー: {chip.enhancement.health} カケアシ: {chip.enhancement.speedLevel} ドロン: {chip.enhancement.motivation} ノリノリ: {chip.enhancement.pleasantDiff}
        </ThemedText>
      </View>
      
      <ThemedText style={styles.descriptionText}>
        {chip.description}
      </ThemedText>
    </TouchableOpacity>
  );
};

interface RunnerStatsProps {
  selectedChips: Chip[];
  onElementIconPress: (element: ElementType) => void;
}

const RunnerStats: React.FC<RunnerStatsProps> = ({ selectedChips, onElementIconPress }) => {
  // 合計能力を計算
  const totalStats = selectedChips.reduce(
    (acc, chip) => ({
      health: acc.health + chip.enhancement.health,
      speedLevel: acc.speedLevel + chip.enhancement.speedLevel,
      motivation: acc.motivation + chip.enhancement.motivation,
      pleasantDiff: acc.pleasantDiff + chip.enhancement.pleasantDiff,
      cost: acc.cost + chip.cost,
    }),
    { health: 0, speedLevel: 0, motivation: 0, pleasantDiff: 0, cost: 0 }
  );

  // 属性ごとの枚数を計算
  const elementCounts: Record<ElementType, number> = Object.values(Element).reduce(
    (acc, element) => ({ ...acc, [element]: 0 }),
    {} as Record<ElementType, number>
  );
  
  selectedChips.forEach(chip => {
    chip.element.forEach(element => {
      if (elementCounts[element] !== undefined) {
        elementCounts[element]++;
      }
    });
  });

  return (
    <ThemedView style={styles.statsContainer}>
      <ThemedText type="subtitle" style={styles.statsTitle}>
        コスト: {totalStats.cost}/{costLimit}
      </ThemedText>
      
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <ThemedText type="defaultSemiBold">コンジョー</ThemedText>
          <ThemedText style={styles.statValue}>
            {Health.calculateMaxWithEnhancement(totalStats.health).toFixed()}(+{totalStats.health}%)
          </ThemedText>
        </View>
        <View style={styles.statItem}>
          <ThemedText type="defaultSemiBold">カケアシ</ThemedText>
          <ThemedText style={styles.statValue}>
            {SpeedLevel.calculateMaxWithEnhancement(totalStats.speedLevel).toFixed(3)}(+{totalStats.speedLevel}%)
          </ThemedText>
        </View>
        <View style={styles.statItem}>
          <ThemedText type="defaultSemiBold">ドロン</ThemedText>
          <ThemedText style={styles.statValue}>
            {Motivation.calculateSpanWithEnhancement(totalStats.motivation).toFixed(3)}(+{totalStats.motivation}%)
          </ThemedText>
        </View>
        <View style={styles.statItem}>
          <ThemedText type="defaultSemiBold">ノリノリ</ThemedText>
          <ThemedText style={styles.statValue}>
            {SpeedLevel.calculatePleasantMinWithEnhancement(totalStats.pleasantDiff).toFixed(2)} - {(SpeedLevel.INCREASE_SPAN +  SpeedLevel.calculatePleasantMinWithEnhancement(totalStats.pleasantDiff)).toFixed(2)}
            ({totalStats.pleasantDiff > 0 && '+'}{totalStats.pleasantDiff}%)
          </ThemedText>
        </View>
      </View>

      <ThemedText type="defaultSemiBold" style={styles.elementCountTitle}>
        属性枚数
      </ThemedText>
      <View style={styles.elementCountsRow}>
        {Object.values(Element).map(element => (
          <TouchableOpacity
            key={element}
            style={styles.elementCountItem}
            onPress={() => onElementIconPress(element as ElementType)}
          >
            <MaterialIcons 
              name={getElementIcon(element as ElementType) as any}
              size={16}
              color={getElementColor(element as ElementType)}
            />
            <ThemedText style={styles.elementCountNumber}>
              {elementCounts[element]}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>
    </ThemedView>
  );
};

export default function BuildScreen() {
  const [mockChips] = useState<Chip[]>(chips);
  const [selectedChips, setSelectedChips] = useState<Chip[]>([]);
  const [tooltip, setTooltip] = useState<{ visible: boolean; text: string; element: ElementType | null }>({
    visible: false,
    text: '',
    element: null
  });
  const { setChips } = useChips();
  const columnCount = getColumnCount();

  // selectedChipsが変更されるたびにEnhancementコンテキストを更新
  useEffect(() => {
    setChips(new ChipCollection(selectedChips));

  }, [selectedChips, setChips]);

  const handleElementIconPress = (element: ElementType) => {
    const tooltipText = getElementTooltip(element);
    setTooltip({
      visible: true,
      text: tooltipText,
      element: element
    });
  };

  const hideTooltip = () => {
    setTooltip({
      visible: false,
      text: '',
      element: null
    });
  };

  const handleChipPress = (chip: Chip) => {
    const isAlreadySelected = selectedChips.some(selected => selected.id === chip.id);
    
    if (isAlreadySelected) {
      // チップの選択を解除
      setSelectedChips(prev => prev.filter(selected => selected.id !== chip.id));
    } else if (selectedChips.length < 10) {
      // コスト制限をチェック
      const currentTotalCost = selectedChips.reduce((total, selectedChip) => total + selectedChip.cost, 0);
      const newTotalCost = currentTotalCost + chip.cost;
      
      if (newTotalCost > costLimit) {
        // コスト上限を超える場合は警告を表示
        Alert.alert(
          'コスト上限超過',
          `このヤキモノを選択するとコストが${newTotalCost}になり、上限を超えてしまいます。`,
          [{ text: 'OK', style: 'default' }]
        );
        return;
      }
      
      // チップを選択に追加（10枚まで、かつコスト20以下）
      setSelectedChips(prev => [...prev, chip]);
    }
  };

  // チップをグリッド形式で表示するためのチャンク
  const chipRows = createChunks(mockChips, columnCount);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.mainContent}>
        {/* オーバーレイ：選択中のチップと能力表示 */}
        <View style={styles.overlay}>
          {/* 選択中のチップ（左側） */}
          <ThemedView style={styles.selectedChipsContainer}>
            <ThemedText type="defaultSemiBold" style={styles.selectedTitle}>
              選択中のヤキモノ ({selectedChips.length}/10)
            </ThemedText>
            <View style={styles.selectedChipsGrid}>
              {Array.from({ length: 10 }, (_, index) => {
                const chip = selectedChips[index];
                return (
                  <View key={index} style={styles.selectedChipSlot}>
                    {chip ? (
                      <TouchableOpacity
                        style={styles.selectedChipItem}
                        onPress={() => handleChipPress(chip)}
                      >
                        <View style={styles.selectedChipIconContainer}>
                          {chip.element.map((element, elementIndex) => (
                            <MaterialIcons
                              key={elementIndex}
                              name={getElementIcon(element) as any}
                              size={16}
                              color={getElementColor(element)}
                            />
                          ))}
                        </View>
                        <ThemedText style={styles.selectedChipName}>
                          {chip.name}
                        </ThemedText>
                        <ThemedText style={styles.selectedChipRank}>
                          ★{chip.rank}
                        </ThemedText>
                      </TouchableOpacity>
                    ) : (
                      <View style={styles.emptyChipSlot}>
                        <ThemedText style={styles.emptySlotText}>空</ThemedText>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </ThemedView>
          
          {/* ランナー能力（右側） */}
          <RunnerStats selectedChips={selectedChips} onElementIconPress={handleElementIconPress} />
        </View>

        {/* ツールチップ表示領域 */}
        {tooltip.visible && (
          <TouchableOpacity 
            style={styles.tooltipContainer}
            onPress={hideTooltip}
            activeOpacity={1}
          >
            <ThemedView style={styles.tooltipBox}>
              <ThemedText style={styles.tooltipText}>
                {tooltip.text}
              </ThemedText>
            </ThemedView>
          </TouchableOpacity>
        )}

        {/* チップ一覧（グリッド表示） */}
        <View style={styles.chipListContainer}>
          <ScrollView style={styles.chipList} showsVerticalScrollIndicator={false}>
            {chipRows.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.chipRow}>
                {row.map(chip => (
                  <View key={chip.id} style={[styles.chipItemWrapper, { width: `${100 / columnCount}%` }]}>
                    <ChipItem
                      chip={chip}
                      isSelected={selectedChips.some(selected => selected.id === chip.id)}
                      onPress={handleChipPress}
                    />
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
        </View>

      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: maxWidth,
    alignSelf: 'center',
    width: '100%',
  },
  mainContent: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    flexDirection: 'row',
    zIndex: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  chipListContainer: {
    flex: 1,
    paddingTop: 300, // overlayの高さ分のパディング
  },
  chipList: {
    flex: 1,
    padding: 16,
  },
  chipRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  chipItemWrapper: {
    paddingHorizontal: 4,
  },
  chipItem: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    minHeight: 120,
    height: '100%',
    minWidth: 120
  },
  chipItemSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#E6F3FF',
  },
  chipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  chipName: {
    color: '#333',
    flex: 1,
    fontSize: 12,
  },
  rankContainer: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  rankText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  chipContent: {
    marginBottom: 6,
  },
  elementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  eachElement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 4,
  },
  elementText: {
    marginLeft: 6,
    fontWeight: 'bold',
    fontSize: 10,
  },
  enhancementText: {
    fontSize: 10,
    color: '#666',
  },
  descriptionText: {
    fontSize: 9,
    color: '#888',
    fontStyle: 'italic',
  },
  selectedChipsContainer: {
    padding: 12,
    elevation: 4,
    width: '50%',
    maxHeight: 300,
    overflow: 'scroll',    
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  selectedTitle: {
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
  },
  selectedChipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  selectedChipSlot: {
    width: '18%',
    minWidth: 48,
    aspectRatio: 1,
    marginBottom: 4,
  },
  selectedChipItem: {
    backgroundColor: '#fff',
    padding: 2,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    height: '100%',
  },
  selectedChipName: {
    fontSize: 6,
    color: '#333',
    textAlign: 'center',
    lineHeight: 8,
    marginTop: 1,
  },
  selectedChipIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 4,
  },
  selectedChipRank: {
    fontSize: 6,
    color: '#FFD700',
    fontWeight: 'bold',
    lineHeight: 8,
  },
  emptyChipSlot: {
    backgroundColor: '#e0e0e0',
    padding: 2,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'dashed',
  },
  emptySlotText: {
    fontSize: 8,
    color: '#999',
  },
  statsContainer: {
    padding: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    flex: 1,
  },
  statsTitle: {
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  statsGrid: {
    marginBottom: 8,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  statValue: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  elementCountTitle: {
    marginBottom: 6,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
  },
  elementCountsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  elementCountItem: {
    alignItems: 'center',
    flex: 1,
  },
  elementCountNumber: {
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 1,
  },
  tooltipContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1001,
  },
  tooltipBox: {
    backgroundColor: '#333333',
    borderRadius: 8,
    padding: 16,
    maxWidth: '90%',
    minWidth: 200,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  tooltipText: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 18,
  },
});
