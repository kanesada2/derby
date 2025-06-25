import { Image, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ScrollView } from 'react-native-gesture-handler';

export default function HomeScreen() {
  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.heading}>
          概要
        </ThemedText>
        <ThemedText style={styles.content}>
          体力のようなリソース「コンジョー」をうまく使って、誰よりも早くゴールを駆け抜けることを目的とするレースゲームです。
        </ThemedText>
        <ThemedText style={styles.content}>
          画面下部の「構築」タブで「ヤキモノ」を自由に選択することで、走者の能力やスキルを設定可能です。
        </ThemedText>
        <ThemedText style={styles.content}>
          構築した状態で「レース」タブに遷移することで、その走者でレースを開始できます。
        </ThemedText>
        <ThemedText style={styles.content}>
          選択した「ヤキモノ」に合わせて戦略を立てつつ、「バチバチ」や「ノリノリ」といった状態を駆使してレースを行うゲームです。
        </ThemedText>
        <ThemedText style={styles.heading}>
          用語
        </ThemedText>
        <ThemedText style={styles.subHeading}>
          能力値
        </ThemedText>
        <ThemedText style={styles.content}>
          コンジョー: 体力のようなリソースです。走ることで消費します。
        </ThemedText>
        <ThemedText style={styles.content}>
          カケアシ: 走る速さの段階を表します。画面内の任意の場所をタップすることで一定量増加します。カケアシの段階が高いほど走る速さが上がりますが、コンジョーもより多く消費します。
        </ThemedText>
        <ThemedText style={styles.content}>
          ドロン: MPのようなリソースです。走ることで貯まり、「ヨウジュツ」を使うために使用できます。
        </ThemedText>
        <ThemedText style={styles.content}>
          スバヤサ: 走る速度の基準値です。実際の走る速度は、カケアシの段階とスバヤサの値によって決定されます。
        </ThemedText>
        <ThemedText style={styles.subHeading}>
          状態
        </ThemedText>
        <ThemedText style={styles.content}>
          バチバチ: 他の走者と一定以下の距離にある状態です。コンジョーの消費量が30%軽減されます。
        </ThemedText>
        <ThemedText style={styles.content}>
          ノリノリ: 毎レースランダムに抽選される、一定のカケアシの段階で走っている状態です。コンジョーの消費量が30%軽減されます。
        </ThemedText>
        <ThemedText style={styles.content}>
          ガムシャラ: その走者のカケアシの最大値付近の段階で走っている状態です。ドロンの貯まるスピードにボーナスが付きます。
        </ThemedText>
        <ThemedText style={styles.content}>
          ヘトヘト: コンジョーが0になっている状態です。カケアシの段階が大幅に下がったまま固定されます。ドロンも貯まらなくなり、「ヤキモノ」の多くも効果を失います。
        </ThemedText>
        <ThemedText style={styles.subHeading}>
          ヤキモノ関連
        </ThemedText>
        <ThemedText style={styles.content}>
          ヤキモノ: 構築画面で編成できる、走者の能力を上昇させたり、「ワザ」や「ヨウジュツ」を付与するアイテムです。
        </ThemedText>
        <ThemedText style={styles.content}>
          ワザ: ヤキモノが持つ、走者の能力を変動させるスキルです。レース中、条件を満たした時に自動的に発動します。
        </ThemedText>
        <ThemedText style={styles.content}>
          ヨウジュツ: 編成中のヤキモノが持つ各属性の枚数に応じて発動可能になる、強力なスキルです。レース画面に表示されるボタンをタップすることで発動します。
        </ThemedText>
        <ThemedText style={styles.subHeading}>
          その他
        </ThemedText>
        <ThemedText style={styles.content}>
          ガンバリ: レース画面をタップして加速すること。タップ一回分を「1ガンバリ」という。
        </ThemedText>
        <ThemedText style={styles.heading}>
          画面
        </ThemedText>
        <ThemedText style={styles.subHeading}>
          構築
        </ThemedText>
        <ThemedView style={styles.imageContainer}>
          <Image style={styles.image} source={require('@/assets/images/build.png')}></Image>
        </ThemedView>
        <ThemedText style={styles.content}>
          ヤキモノを編成する画面です。10個以内、コスト30以内という制約があります。
        </ThemedText>
        <ThemedText style={styles.content}>
          ヤキモノにはそれぞれ、各能力（コンジョー/カケアシ/ドロン）の補正値、属性、★といったパラメータがあります。
        </ThemedText>
        <ThemedText style={styles.content}>
          各補正値は、そのヤキモノを編成した際に能力が+何%されるかを示しています。
        </ThemedText>
        <ThemedText style={styles.content}>
          同じ属性のヤキモノを一定数以上編成すると、属性に対応したヨウジュツを発動できるようになります。
        </ThemedText>
        <ThemedText style={styles.content}>
          ヨウジュツの内容と条件となる個数は、画面右上部の現在の属性ごとの編成数が表示されている部分の属性アイコンをタップすることで確認できます。
        </ThemedText>
        <ThemedText style={styles.content}>
          ★3以上のヤキモノはそれぞれ固有のワザを持っています。ワザは条件を満たすと自動的に発動します。
        </ThemedText>
        <ThemedText style={styles.content}>
          ヤキモノのコストは、そのヤキモノの★の数+1となっています。
        </ThemedText>
        <ThemedText style={styles.subHeading}>
          レース
        </ThemedText>
        <ThemedView style={styles.imageContainer}>
          <Image style={styles.image} source={require('@/assets/images/race.png')}></Image>
        </ThemedView>
        <ThemedText style={styles.content}>
          画面上に表示されている四角形の一つ一つが走者です。自分が操作するのは白い四角です。
        </ThemedText>
        <ThemedText style={styles.content}>
          レース中に行う操作は、①画面の任意の場所をタップしてカケアシを調整する②画面右のヨウジュツボタンをタップしてヨウジュツを発動する　の２つです。
        </ThemedText>
        <ThemedText style={styles.content}>
          通常レースゲームにあるコース取りなどの要素はありません。直線のコースをまっすぐ走ります。
        </ThemedText>
        <ThemedText style={styles.content}>
          画面上部には現在のレースや自分の操作キャラの状況が表示されています。キョリが満タンになるまでコンジョーを使い切らないよう注意しつつ、順位を出来るだけ高くするのが目的です。
        </ThemedText>
        <ThemedText style={styles.content}>
          画面右側には、現在のヤキモノ編成で発動可能なヨウジュツが表示されています。発動のために必要なドロンが貯まっているとボタンを押せるようになります。
        </ThemedText>
        <ThemedText style={styles.content}>
          ヨウジュツのアイコンの下に表示されている数字はそのヨウジュツのレベルです。レベルが高いほど強力な効果を発揮しますが、必要なドロンの量も増えます。
        </ThemedText>
        <ThemedText style={styles.content}>
          レベル1のヨウジュツを発動するためには、5本あるドロンゲージのうち1本が必要です。レベル2であれば2本です。
        </ThemedText>
      </ThemedView>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 16,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 24,
  },
  subHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    marginBottom: 8,
  },
  imageContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 320,
    height: 640,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  }
});
