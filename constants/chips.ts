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
    new Enhancement(1, 4, 2),
    [], // スキルは後で実装
    ''
  ),
  new Chip(
    'homura',
    'ホムラ',
    3,
    parseElements('火'),
    new Enhancement(6, 3, 2),
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
    new Enhancement(0, 3, 1),
    [],
    ''
  ),
  new Chip(
    'gouka',
    'ゴウカ',
    3,
    parseElements('火'),
    new Enhancement(3, 5, 3),
    [{
      name: SkillNames.gouka,
      condition: ConditionNames.always,
      timing: TimingNames.concentratedMotivating,
      effects: [{
        name: EffectNames.modifyBaseSpeed,
        parameters: [0.03],
      }]
    }],
    'バチバチかつガムシャラの間、スバヤサ3%増加'
  ),
  new Chip(
    'yukemuri',
    'ユケムリ',
    1,
    parseElements('火', '水'),
    new Enhancement(2, 0, 1),
    [],
    ''
  ),
  new Chip(
    'hibana',
    'ヒバナ',
    1,
    parseElements('火', '雷'),
    new Enhancement(0, 3, 0),
    [],
    ''
  ),
  new Chip(
    'tobihi',
    'トビヒ',
    1,
    parseElements('火', '風'),
    new Enhancement(0, 1, 2),
    [],
    ''
  ),
  new Chip(
    'magma',
    'マグマ',
    3,
    parseElements('火', '土'),
    new Enhancement(3, 4, 1),
    [{
      name: SkillNames.magma,
      condition: ConditionNames.always,
      timing: TimingNames.concentrated,
      effects: [{
        name: EffectNames.modifyTargetSpeedLevel,
        parameters: [0.1],
      }]
    }],
    'バチバチになった時、相手のカケアシレベルが10%増える'
  ),
  new Chip(
    'ryougen',
    'リョウゲン',
    2,
    parseElements('火', '土'),
    new Enhancement(0, 3, 2),
    [],
    ''
  ),
  new Chip(
    'tomoshibi',
    'トモシビ',
    1,
    parseElements('火', '光'),
    new Enhancement(1, 1, 1),
    [],
    ''
  ),
  new Chip(
    'taiyou',
    'タイヨウ',
    3,
    parseElements('火', '光'),
    new Enhancement(5, 0, 3),
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
    new Enhancement(0, 2, 3),
    [],
    ''
  ),
  new Chip(
    'rengoku',
    'レンゴク',
    4,
    parseElements('火', '闇'),
    new Enhancement(2, 9, 2),
    [
      {
        name: SkillNames.rengoku,
        condition: ConditionNames.always,
        timing: TimingNames.concentrated,
        effects: [{
          name: EffectNames.modifyTargetHealthSpan,
          parameters: [0.05],
        }]
      }
    ],
    'バチバチな相手のコンジョー消費が5%増える'
  ),
  new Chip(
    'shizuku',
    'シズク',
    1,
    parseElements('水'),
    new Enhancement(0, 0, 4),
    [],
    ''
  ),
  new Chip(
    'uruoi',
    'ウルオイ',
    1,
    parseElements('水'),
    new Enhancement(4, 0, 0),
    [],
    ''
  ),
  new Chip(
    'unabara',
    'ウナバラ',
    3,
    parseElements('水'),
    new Enhancement(7, 0, 4),
    [
      {
        name: SkillNames.unabara,
        condition: ConditionNames.always,
        timing: TimingNames.pleasant,
        effects: [{
          name: EffectNames.modifyMotivationSpan,
          parameters: [0.03],
        }]
      }
    ],
    'ノリノリ中、ドロンゲージ増加量+3%'
  ),
  new Chip(
    'gekiryuu',
    'ゲキリュウ',
    3,
    parseElements('水'),
    new Enhancement(0, 7, 4),
    [
      {
        name: SkillNames.gekiryuu,
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
    'raiu',
    'ライウ',
    2,
    parseElements('水', '雷'),
    new Enhancement(2, 2, 1),
    [],
    ''
  ),
  new Chip(
    'arashi',
    'アラシ',
    2,
    parseElements('水', '風'),
    new Enhancement(0, 3, 2),
    [],
    ''
  ),
  new Chip(
    'unkai',
    'ウンカイ',
    1,
    parseElements('水', '風'),
    new Enhancement(2, 0, 1),
    [],
    ''
  ),
  new Chip(
    'seimei',
    'セイメイ',
    3,
    parseElements('水', '土'),
    new Enhancement(4, 0, 4),
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
    'ノリノリになる幅が5%増加'
  ),
  new Chip(
    'minasoko',
    'ミナソコ',
    1,
    parseElements('水', '闇'),
    new Enhancement(1, 0, 2),
    [],
    ''
  ),
  new Chip(
    'seiryuu',
    'セイリュウ',
    2,
    parseElements('水', '光'),
    new Enhancement(1, 3, 1),
    [],
    ''
  ),
  new Chip(
    'wadatsumi',
    'ワダツミ',
    4,
    parseElements('水', '光'),
    new Enhancement(7, 4, 2),
    [
      {
        name: SkillNames.wadatsumi,
        condition: ConditionNames.firstTimeSkillInteracted,
        timing: TimingNames.skillInteracted,
        effects: [{
          name: EffectNames.addMotivation,
          parameters: [3000],
        }]
      }
    ],
    '最初のヨウジュツ発動時、ドロンゲージを1本回復'
  ),
  new Chip(
    'ikazuchi',
    'イカヅチ',
    2,
    parseElements('雷'),
    new Enhancement(0, 5, 2),
    [],
    ''
  ),
  new Chip(
    'hekireki',
    'ヘキレキ',
    3,
    parseElements('雷'),
    new Enhancement(4, 7, 4),
    [
      {
        name: SkillNames.hekireki,
        condition: ConditionNames.always,
        timing: TimingNames.skillInteracted,
        effects: [{
          name: EffectNames.fixSpeedLevelToMaxRate,
          parameters: [1],
        }]
      }
    ],
    'ヨウジュツを発動した時、カケアシを最大レベルまで上げる'
  ),
  new Chip(
    'raimei',
    'ライメイ',
    1,
    parseElements('雷'),
    new Enhancement(0, 3, 1),
    [],
    ''
  ),
  new Chip(
    'dengeki',
    'デンゲキ',
    1,
    parseElements('雷'),
    new Enhancement(0, 1, 3),
    [],
    ''
  ),
  new Chip(
    'raiden',
    'ライデン',
    3,
    parseElements('雷'),
    new Enhancement(6, 5, 0),
    [
      {
        name: SkillNames.raiden,
        condition: ConditionNames.always,
        timing: TimingNames.concentrated,
        effects: [{
          name: EffectNames.addMaxSpeedLevel,
          parameters: [SpeedLevel.INCREASE_SPAN],
        }]
      }
    ],
    'バチバチの間だけ、カケアシの最大値が1ガンバリ分増加する'
  ),
  new Chip(
    'shippuu',
    'シップウ',
    3,
    parseElements('風'),
    new Enhancement(4, 7, 0),
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
    new Enhancement(4, 0, 7),
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
    new Enhancement(4, 0, 4),
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
    new Enhancement(0, 5, 0),
    [],
    ''
  ),
  new Chip(
    'shiden',
    'シデン',
    2,
    parseElements('雷', '闇'),
    new Enhancement(2, 0, 3),
    [],
    ''
  ),
  new Chip(
    'raijin',
    'ライジン',
    4,
    parseElements('雷', '光'),
    new Enhancement(3, 7, 3),
    [
      {
        name: SkillNames.raijin,
        condition: ConditionNames.always,
        timing: TimingNames.pleasant,
        effects: [{
          name: EffectNames.modifyCrawlHealthSpan,
          parameters: [-1],
        }]
      }
    ],
    'ノリノリ中、ガンバリによるコンジョー消費が0'
  ),
  new Chip(
    'oikaze',
    'オイカゼ',
    1,
    parseElements('風'),
    new Enhancement(0, 2, 2),
    [],
    ''
  ),
  new Chip(
    'ibuki',
    'イブキ',
    1,
    parseElements('風'),
    new Enhancement(1, 0, 3),
    [],
    ''
  ),
  new Chip(
    'toppuu',
    'トップウ',
    2,
    parseElements('風'),
    new Enhancement(0, 4, 3),
    [],
    ''
  ),
  new Chip(
    'tatsumaki',
    'タツマキ',
    2,
    parseElements('風'),
    new Enhancement(2, 3, 2),
    [],
    ''
  ),
  new Chip(
    'yamaoroshi',
    'ヤマオロシ',
    2,
    parseElements('風', '土'),
    new Enhancement(4, 1, 0),
    [],
    ''
  ),
  new Chip(
    'daishizen',
    'ダイシゼン',
    4,
    parseElements('風', '土'),
    new Enhancement(8, 0, 5),
    [
      {
        name: SkillNames.daishizen,
        condition: ConditionNames.hasMotivation,
        timing: TimingNames.exhausted,
        effects: [{
          name: EffectNames.addHealth,
          parameters: [500],
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
    new Enhancement(5, 0, 3),
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
    new Enhancement(0, 5, 3),
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
    new Enhancement(9, 0, 2),
    [
      {
        name: SkillNames.daichi,
        condition: ConditionNames.always,
        timing: TimingNames.healthIncreased,
        effects: [{
          name: EffectNames.modifyMotivationSpan,
          parameters: [0.01],
        }]
      }
    ],
    'コンジョーが回復する度、ドロンを+1%'
  ),
  new Chip(
    'mebuki',
    'メブキ',
    1,
    parseElements('土'),
    new Enhancement(2, 0, 2),
    [],
    ''
  ),
  new Chip(
    'shinryoku',
    'シンリョク',
    2,
    parseElements('土'),
    new Enhancement(4, 0, 3),
    [],
    ''
  ),
  new Chip(
    'hachiku',
    'ハチク',
    1,
    parseElements('土'),
    new Enhancement(0, 0, 4),
    [],
    ''
  ),
  new Chip(
    'konoha',
    'コノハ',
    1,
    parseElements('土'),
    new Enhancement(3, 1, 0),
    [],
    ''
  ),
  new Chip(
    'mononoke',
    'モノノケ',
    2,
    parseElements('土', '闇'),
    new Enhancement(0, 2, 3),
    [],
    ''
  ),
  new Chip(
    'kongou',
    'コンゴウ',
    3,
    parseElements('土', '光'),
    new Enhancement(6, 0, 2),
    [
      {
        name: SkillNames.kongou,
        condition: ConditionNames.always,
        timing: TimingNames.skillInteracted,
        effects: [{
          name: EffectNames.addHealth,
          parameters: [300],
        }]
      }
    ],
    'ヨウジュツを使用する度、コンジョーが少し回復'
  ),
  new Chip(
    'shinobi',
    'シノビ',
    1,
    parseElements('闇'),
    new Enhancement(0, 3, 1),
    [],
    ''
  ),
  new Chip(
    'kurayami',
    'クラヤミ',
    2,
    parseElements('闇'),
    new Enhancement(3, 2, 2),
    [],
    ''
  ),
  new Chip(
    'ankoku',
    'アンコク',
    3,
    parseElements('闇'),
    new Enhancement(4, 2, 5),
    [
      {
            name: SkillNames.ankoku,
            condition: ConditionNames.always,
            timing: TimingNames.concentrated,
            effects: [{
                name: EffectNames.addTargetMaxSpeedLevel,
                parameters: [-0.05],
            }]
        }
    ],
    'バチバチな相手のカケアシレベル最大値を少し減少'
  ),
  new Chip(
    'kageboshi',
    'カゲボウシ',
    1,
    parseElements('闇'),
    new Enhancement(0, 1, 3),
    [],
    ''
  ),
  new Chip(
    'ushimitsu',
    'ウシミツ',
    2,
    parseElements('闇'),
    new Enhancement(3, 0, 4),
    [],
    ''
  ),
  /* enhancementの適用整理したあとに追加する
  new Chip(
    'konton',
    'コントン',
    3,
    parseElements('闇', '光'),
    new Enhancement(0, 0, 0),
    [],
    '全てのメダルの効果を、セットされているメダルの属性の数×5%増加'
  ),*/
  new Chip(
    'shinsei',
    'シンセイ',
    2,
    parseElements('光'),
    new Enhancement(2, 1, 4),
    [],
    ''
  ),
  new Chip(
    'okiyome',
    'オキヨメ',
    1,
    parseElements('光'),
    new Enhancement(1, 0, 3),
    [],
    ''
  ),
  new Chip(
    'senkou',
    'センコウ',
    2,
    parseElements('光'),
    new Enhancement(0, 7, 0),
    [],
    ''
  ),
  new Chip(
    'misogi',
    'ミソギ',
    1,
    parseElements('光'),
    new Enhancement(2, 0, 2),
    [],
    ''
  ),
].sort((a, b) => b.rank - a.rank);
