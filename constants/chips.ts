import { SpeedLevel } from '@/domain/models/valueObjects/parameters/speedLevel';
import { Chip, Element, ElementType } from '../domain/models/entities/chip';
import { Enhancement } from '../domain/models/valueObjects/enhancement';
import { ConditionNames, EffectNames, RistrictionNames, SkillNames, TimingNames } from './SkillNames';

// 属性名を日本語からElementTypeに変換するマッピング
const elementMap: { [key: string]: ElementType } = {
  '火': Element.FIRE,
  '水': Element.WATER,
  '風': Element.WIND,
  '雷': Element.THUNDER,
  '土': Element.EARTH,
  '光': Element.LIGHT,
  '闇': Element.DARK,
};

// 日本語属性名をElementTypeに変換する関数
const parseElements = (element1?: string, element2?: string): ElementType[] => {
  const elements: ElementType[] = [];
  if (element1 && elementMap[element1]) {
    elements.push(elementMap[element1]);
  }
  if (element2 && elementMap[element2]) {
    elements.push(elementMap[element2]);
  }
  return elements;
};

export const chips: Chip[] = [
  new Chip(
    'honoo',
    'ホノオ',
    2,
    parseElements('火'),
    new Enhancement(1, 4, 2, -3),
    [], // スキルは後で実装
    ''
  ),
  new Chip(
    'homura',
    'ホムラ',
    3,
    parseElements('火'),
    new Enhancement(6, 3, 2, -4),
    [
      {
        name: SkillNames.homura,
        condition: ConditionNames.always,
        timing: TimingNames.always,
        effects: [{
          name: EffectNames.modifyCrawlSpeedLevel,
          parameters: [-0.5],
        },{
          name: EffectNames.modifyCrawlHealthSpan,
          parameters: [-0.5],
        }
      ]
      }
    ],
    'カケアシをした時のカケアシレベルの増加量とコンジョーの減少量を半分にする'
  ),
  new Chip(
    'hinotama',
    'ヒノタマ',
    1,
    parseElements('火'),
    new Enhancement(0, 3, 1, -4),
    [],
    ''
  ),
  new Chip(
    'gouka',
    'ゴウカ',
    3,
    parseElements('火'),
    new Enhancement(3, 5, 3, -12),
    [{
      name: SkillNames.gouka,
      condition: ConditionNames.always,
      timing: TimingNames.concentratedMotivating,
      effects: [{
        name: EffectNames.modifyBaseSpeed,
        parameters: [0.02],
      }]
    }],
    'バチバチかつガムシャラの間、スバヤサ2%増加'
  ),
  new Chip(
    'yukemuri',
    'ユケムリ',
    1,
    parseElements('火', '水'),
    new Enhancement(2, 0, 1, 6),
    [],
    ''
  ),
  new Chip(
    'hibana',
    'ヒバナ',
    1,
    parseElements('火', '雷'),
    new Enhancement(0, 3, 0, -5),
    [],
    ''
  ),
  new Chip(
    'tobihi',
    'トビヒ',
    1,
    parseElements('火', '風'),
    new Enhancement(0, 1, 2, 4),
    [],
    ''
  ),
  new Chip(
    'magma',
    'マグマ',
    3,
    parseElements('火', '土'),
    new Enhancement(3, 4, 1, 3),
    [{
      name: SkillNames.magma,
      condition: ConditionNames.always,
      timing: TimingNames.always,
      effects: [{
        name: EffectNames.expandConcetrateRange,
        parameters: [0.2],
      }]
    }],
    'バチバチになるキョリの範囲が20%拡大'
  ),
  new Chip(
    'ryougen',
    'リョウゲン',
    2,
    parseElements('火', '土'),
    new Enhancement(0, 3, 2, -5),
    [],
    ''
  ),
  new Chip(
    'tomoshibi',
    'トモシビ',
    1,
    parseElements('火', '光'),
    new Enhancement(1, 1, 1, 2),
    [],
    ''
  ),
  new Chip(
    'taiyou',
    'タイヨウ',
    3,
    parseElements('火', '光'),
    new Enhancement(5, 0, 3, 7),
    [
      {
        name: SkillNames.taiyou,
        condition: ConditionNames.always,
        timing: TimingNames.concentrated,
        effects: [{
          name: EffectNames.modifyMotivationSpan,
          parameters: [0.05],
        }]
      }
    ],
    'バチバチ中、ドロンゲージ増加量+5%'
  ),
  new Chip(
    'onibi',
    'オニビ',
    2,
    parseElements('火', '闇'),
    new Enhancement(0, 2, 3, -8),
    [],
    ''
  ),
  new Chip(
    'houou',
    'ホウオウ',
    4,
    parseElements('火', '風'),
    new Enhancement(4, 5, 4, 0),
    [
      {
        name: SkillNames.houou,
        condition: ConditionNames.firstTimeSkillInteracted,
        timing: TimingNames.skillInteracted,
        effects: [{
          name: EffectNames.addMotivation,
          parameters: [1500],
        }]
      }
    ],
    '最初のヨウジュツ発動時、ドロンゲージを0.5本回復'
  ),
  new Chip(
    'shizuku',
    'シズク',
    1,
    parseElements('水'),
    new Enhancement(0, 0, 4, 7),
    [],
    ''
  ),
  new Chip(
    'uruoi',
    'ウルオイ',
    1,
    parseElements('水'),
    new Enhancement(4, 0, 0, 9),
    [],
    ''
  ),
  new Chip(
    'unabara',
    'ウナバラ',
    3,
    parseElements('水'),
    new Enhancement(7, 0, 4, 2),
    [
      {
        name: SkillNames.unabara,
        condition: ConditionNames.always,
        timing: TimingNames.pleasant,
        effects: [{
          name: EffectNames.modifyMotivationSpan,
          parameters: [0.04],
        }]
      }
    ],
    'ノリノリ中、ドロンゲージ増加量+4%'
  ),
  new Chip(
    'gekiryuu',
    'ゲキリュウ',
    3,
    parseElements('水'),
    new Enhancement(0, 7, 4, 5),
    [
      {
        name: SkillNames.gekiryuu,
        condition: ConditionNames.always,
        timing: TimingNames.speedLevelMoreThanPlesantMax,
        effects: [{
          name: EffectNames.modifyBaseSpeed,
          parameters: [0.02],
        }]
      }
    ],
    'カケアシレベルがノリノリゾーンよりも高いとき、スバヤサが2%増加'
  ),
  new Chip(
    'raiu',
    'ライウ',
    2,
    parseElements('水', '雷'),
    new Enhancement(2, 2, 1, 1),
    [],
    ''
  ),
  new Chip(
    'arashi',
    'アラシ',
    2,
    parseElements('水', '風'),
    new Enhancement(0, 3, 2, -2),
    [],
    ''
  ),
  new Chip(
    'unkai',
    'ウンカイ',
    1,
    parseElements('水', '風'),
    new Enhancement(2, 0, 1, 4),
    [],
    ''
  ),
  new Chip(
    'seimei',
    'セイメイ',
    3,
    parseElements('水', '土'),
    new Enhancement(4, 0, 4, 0),
    [
      {
        name: SkillNames.seimei,
        condition: ConditionNames.always,
        timing: TimingNames.always,
        effects: [{
          name: EffectNames.modifyPleasantRange,
          parameters: [0, 0.05],
        }]
      }
    ],
    'ノリノリゾーンの幅が5%増加'
  ),
  new Chip(
    'minasoko',
    'ミナソコ',
    1,
    parseElements('水', '闇'),
    new Enhancement(1, 0, 2, 3),
    [],
    ''
  ),
  new Chip(
    'seiryuu',
    'セイリュウ',
    2,
    parseElements('水', '光'),
    new Enhancement(1, 3, 1, -4),
    [],
    ''
  ),
  new Chip(
    'wadatsumi',
    'ワダツミ',
    4,
    parseElements('水', '光'),
    new Enhancement(7, 4, 2, 6),
    [
      {
        name: SkillNames.wadatsumi,
        condition: ConditionNames.always,
        timing: TimingNames.pleasant,
        effects: [{
          name: EffectNames.modifyCrawlHealthSpan,
          parameters: [-1],
        }]
      }
    ],
    'ノリノリな間、ガンバリによるコンジョー消費が0'
  ),
  new Chip(
    'ikazuchi',
    'イカヅチ',
    2,
    parseElements('雷'),
    new Enhancement(0, 5, 2, -5),
    [],
    ''
  ),
  new Chip(
    'hekireki',
    'ヘキレキ',
    3,
    parseElements('雷'),
    new Enhancement(2, 7, 2, -8),
    [
      {
        name: SkillNames.raiden,
        condition: ConditionNames.always,
        timing: TimingNames.concentrated,
        effects: [{
          name: EffectNames.addMaxSpeedLevel,
          parameters: [SpeedLevel.INCREASE_SPAN / 2],
        }]
      }
    ],
    'バチバチの間だけ、カケアシの最大値が0.5ガンバリ分増加する'
  ),
  new Chip(
    'raimei',
    'ライメイ',
    1,
    parseElements('雷'),
    new Enhancement(0, 3, 1, -3),
    [],
    ''
  ),
  new Chip(
    'dengeki',
    'デンゲキ',
    1,
    parseElements('雷'),
    new Enhancement(0, 1, 3, 3),
    [],
    ''
  ),
  new Chip(
    'raiden',
    'ライデン',
    3,
    parseElements('雷'),
    new Enhancement(6, 5, 0, -10),
    [
      {
        name: SkillNames.hekireki,
        condition: ConditionNames.always,
        timing: TimingNames.skillInteracted,
        effects: [{
          name: EffectNames.movePleasantRange,
          parameters: [0.01],
        }]
      }
    ],
    'ヨウジュツを発動するたび、ノリノリゾーンが0.1ガンバリ分上がる'
  ),
  new Chip(
    'shippuu',
    'シップウ',
    3,
    parseElements('風'),
    new Enhancement(4, 7, 0, 4),
    [
      {
        name: SkillNames.shippuu,
        condition: ConditionNames.always,
        timing: TimingNames.always,
        effects: [{
          name: EffectNames.modifyDecreaseSpan,
          parameters: [-0.5],
        }]
      }
    ],
    'カケアシの減りが50%減少'
  ),
  new Chip(
    'jinrai',
    'ジンライ',
    3,
    parseElements('雷'),
    new Enhancement(4, 0, 7, -5),
    [
      {
        name: SkillNames.jinrai,
        condition: ConditionNames.always,
        timing: TimingNames.motivating,
        effects: [{
          name: EffectNames.modifyBaseSpeed,
          parameters: [0.01],
        }]
      }
    ],
    'ガムシャラな時、スバヤサが1%増加'
  ),
  new Chip(
    'aurora',
    'オーロラ',
    3,
    parseElements('雷', '風'),
    new Enhancement(4, 0, 4, -5),
    [
      {
        name: SkillNames.aurora,
        condition: ConditionNames.exhausted,
        timing: TimingNames.always,
        effects: [{
          name: EffectNames.fixSpeedLevelToMaxRate,
          parameters: [0.5],
        }],
        ristriction: RistrictionNames.never
      }
    ],
    'ヘトヘトになった時のカケアシレベルが高い'
  ),
  new Chip(
    'inazuma',
    'イナヅマ',
    2,
    parseElements('雷', '土'),
    new Enhancement(0, 5, 0, -4),
    [],
    ''
  ),
  new Chip(
    'shiden',
    'シデン',
    2,
    parseElements('雷', '闇'),
    new Enhancement(2, 0, 3, 5),
    [],
    ''
  ),
  new Chip(
    'raijin',
    'ライジン',
    4,
    parseElements('雷', '光'),
    new Enhancement(3, 7, 3, -6),
    [
      {
        name: SkillNames.raijin,
        condition: ConditionNames.always,
        timing: TimingNames.motivating,
        effects: [{
          name: EffectNames.modifyCrawlHealthSpan,
          parameters: [-1],
        }]
      }
    ],
    'ガムシャラな間、ガンバリによるコンジョー消費が0'
  ),
  new Chip(
    'oikaze',
    'オイカゼ',
    1,
    parseElements('風'),
    new Enhancement(0, 2, 2, -3),
    [],
    ''
  ),
  new Chip(
    'ibuki',
    'イブキ',
    1,
    parseElements('風'),
    new Enhancement(1, 0, 3, 2),
    [],
    ''
  ),
  new Chip(
    'toppuu',
    'トップウ',
    2,
    parseElements('風'),
    new Enhancement(0, 4, 3, -4),
    [],
    ''
  ),
  new Chip(
    'tatsumaki',
    'タツマキ',
    2,
    parseElements('風'),
    new Enhancement(2, 3, 2, 2),
    [],
    ''
  ),
  new Chip(
    'yamaoroshi',
    'ヤマオロシ',
    2,
    parseElements('風', '土'),
    new Enhancement(4, 1, 0, 5),
    [],
    ''
  ),
  new Chip(
    'bunpuku',
    'ブンプク',
    4,
    parseElements('土', '闇'),
    new Enhancement(8, 0, 5, -5),
    [
      {
        name: SkillNames.bunpuku,
        condition: ConditionNames.hasMotivation,
        timing: TimingNames.exhausted,
        effects: [{
          name: EffectNames.addHealth,
          parameters: [400],
        },{
          name: EffectNames.addMotivation,
          parameters: [-3000],
        }],
        ristriction: RistrictionNames.never
      }
    ],
    'コンジョーが尽きたとき、ドロンゲージを一本使って少しだけ回復する'
  ),
  new Chip(
    'akatsuki',
    'アカツキ',
    3,
    parseElements('風', '光'),
    new Enhancement(5, 0, 3, -3),
    [
      {
        name: SkillNames.akatsuki,
        condition: ConditionNames.always,
        timing: TimingNames.healthMte80,
        effects: [{
          name: EffectNames.modifyMotivationSpan,
          parameters: [0.07],
        }]
      }
    ],
    'コンジョーが80%以上の時、ドロン+7%'
  ),
  new Chip(
    'tasogare',
    'タソガレ',
    3,
    parseElements('風', '闇'),
    new Enhancement(0, 5, 3, 3),
    [
      {
        name: SkillNames.tasogare,
        condition: ConditionNames.always,
        timing: TimingNames.healthLte20,
        effects: [{
          name: EffectNames.modifyBaseSpeed,
          parameters: [0.01],
        }]
      }
    ],
    'コンジョーが20%以下の時、スバヤサが1%上昇'
  ),
  new Chip(
    'daichi',
    'ダイチ',
    3,
    parseElements('土'),
    new Enhancement(9, 0, 2, 5),
    [
      {
        name: SkillNames.daichi,
        condition: ConditionNames.always,
        timing: TimingNames.healthIncreased,
        effects: [{
          name: EffectNames.modifyMotivationSpan,
          parameters: [0.02],
        }]
      }
    ],
    'コンジョーが回復する度、ドロンを+2%'
  ),
  new Chip(
    'mebuki',
    'メブキ',
    1,
    parseElements('土'),
    new Enhancement(2, 0, 2, 3),
    [],
    ''
  ),
  new Chip(
    'shinryoku',
    'シンリョク',
    2,
    parseElements('土'),
    new Enhancement(4, 0, 3, 6),
    [],
    ''
  ),
  new Chip(
    'hachiku',
    'ハチク',
    1,
    parseElements('土'),
    new Enhancement(0, 0, 4, -5),
    [],
    ''
  ),
  new Chip(
    'konoha',
    'コノハ',
    1,
    parseElements('土'),
    new Enhancement(3, 1, 0, 6),
    [],
    ''
  ),
  new Chip(
    'mononoke',
    'モノノケ',
    2,
    parseElements('土', '闇'),
    new Enhancement(0, 2, 3, 5),
    [],
    ''
  ),
  new Chip(
    'kongou',
    'コンゴウ',
    3,
    parseElements('土', '光'),
    new Enhancement(6, 0, 2, 7),
    [
      {
        name: SkillNames.kongou,
        condition: ConditionNames.always,
        timing: TimingNames.skillInteracted,
        effects: [{
          name: EffectNames.addHealth,
          parameters: [200],
        }]
      }
    ],
    'ヨウジュツを使用する度、コンジョーが200回復'
  ),
  new Chip(
    'shinobi',
    'シノビ',
    1,
    parseElements('闇'),
    new Enhancement(0, 3, 1, -6),
    [],
    ''
  ),
  new Chip(
    'kurayami',
    'クラヤミ',
    2,
    parseElements('闇'),
    new Enhancement(3, 2, 2, 6),
    [],
    ''
  ),
  new Chip(
    'ankoku',
    'アンコク',
    3,
    parseElements('闇'),
    new Enhancement(4, 2, 5, 5),
    [
      {
            name: SkillNames.ankoku,
            condition: ConditionNames.always,
            timing: TimingNames.skillInteracted,
            effects: [{
                name: EffectNames.addLocation,
                parameters: [180],
            }]
        }
    ],
    'ヨウジュツを発動するたび、3m前にワープする'
  ),
  new Chip(
    'kageboshi',
    'カゲボウシ',
    1,
    parseElements('闇'),
    new Enhancement(0, 1, 3, 2),
    [],
    ''
  ),
  new Chip(
    'ushimitsu',
    'ウシミツ',
    2,
    parseElements('闇'),
    new Enhancement(3, 0, 4, 4),
    [],
    ''
  ),
  new Chip(
    'konton',
    'コントン',
    3,
    parseElements('闇', '光'),
    new Enhancement(3, 0, 5, -2),
    [
      {
        name: SkillNames.konton,
        condition: ConditionNames.always,
        timing: TimingNames.skillInteracted,
        effects: [{
          name: EffectNames.modifyBaseSpeed,
          parameters: [0.01],
        }]
      }
    ],
    'ヨウジュツを発動するたびにスバヤサが1%増加'
  ),
  new Chip(
    'shinsei',
    'シンセイ',
    2,
    parseElements('光'),
    new Enhancement(2, 1, 4, 2),
    [],
    ''
  ),
  new Chip(
    'okiyome',
    'オキヨメ',
    1,
    parseElements('光'),
    new Enhancement(1, 0, 3, 5),
    [],
    ''
  ),
  new Chip(
    'senkou',
    'センコウ',
    2,
    parseElements('光'),
    new Enhancement(0, 7, 0, -8),
    [],
    ''
  ),
  new Chip(
    'misogi',
    'ミソギ',
    1,
    parseElements('光'),
    new Enhancement(2, 0, 2, -2),
    [],
    ''
  ),
].sort((a, b) => b.rank - a.rank);
