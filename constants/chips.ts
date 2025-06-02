import { Chip, Element, ElementType } from '../domain/models/entities/chip';
import { Enhancement } from '../domain/models/valueObjects/enhancement';

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
    [],
    'カケアシをした時のカケアシレベルの増加量と体力の減少量を半分にする'
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
    [],
    'バチバチかつガムシャラの間、アシドリ5%増加'
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
    [],
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
    [],
    'バチバチ中、ドロンゲージ増加量+1%'
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
    [],
    'バチバチな相手の体力消費が5%増える'
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
    [],
    'ノリノリ中、ドロンゲージ増加量+1%'
  ),
  new Chip(
    'gekiryuu',
    'ゲキリュウ',
    3,
    parseElements('水'),
    new Enhancement(0, 7, 4),
    [],
    'ヨウジュツを発動するたびにアシドリが1%増加'
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
    [],
    'ノリノリになる幅が10%増加'
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
    [],
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
    new Enhancement(2, 7, 2),
    [],
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
    [],
    'バチバチの時だけ、カケアシの最大値が20%増加する'
  ),
  new Chip(
    'shippuu',
    'シップウ',
    3,
    parseElements('風'),
    new Enhancement(4, 7, 0),
    [],
    'カケアシの減りが50%減少'
  ),
  new Chip(
    'jinrai',
    'ジンライ',
    3,
    parseElements('雷'),
    new Enhancement(4, 0, 7),
    [],
    'ガムシャラな時、アシドリが1%増加'
  ),
  new Chip(
    'aurora',
    'オーロラ',
    3,
    parseElements('雷', '風'),
    new Enhancement(4, 0, 4),
    [],
    'ヘトヘトになった時、アシドリの低下が5%軽減'
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
    [],
    'ノリノリ中、カケアシボタンを押してもコンジョーが減らない'
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
    [],
    'コンジョーが尽きたとき、ドロンゲージを一本使って10%回復'
  ),
  new Chip(
    'akatsuki',
    'アカツキ',
    3,
    parseElements('風', '光'),
    new Enhancement(5, 0, 3),
    [],
    'コンジョーが80%以上の時、ドロンが1%ずつ溜まる'
  ),
  new Chip(
    'tasogare',
    'タソガレ',
    3,
    parseElements('風', '闇'),
    new Enhancement(0, 5, 3),
    [],
    'コンジョーが20%以下の時、アシドリが2%上昇'
  ),
  new Chip(
    'daichi',
    'ダイチ',
    3,
    parseElements('土'),
    new Enhancement(9, 0, 2),
    [],
    'コンジョーが回復する度、ドロンを+5%'
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
    [],
    'ヨウジュツを使用する度、コンジョーが1%回復'
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
    [],
    'バチバチな相手の最大カケアシを10%減少させる'
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
  new Chip(
    'konton',
    'コントン',
    3,
    parseElements('闇', '光'),
    new Enhancement(0, 0, 0),
    [],
    '全てのメダルの効果を、セットされているメダルの属性の数×5%増加'
  ),
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
