import React from 'react'
import Link from 'next/link'

import { Grid, Breadcrumbs, Container } from '@mui/material'

import LargeHeading from 'components/atoms/LargeHeading/LargeHeading'
import Typography from 'components/atoms/Typography/Typography'
import ContentBlock from 'components/molecules/ContentBlock/ContentBlock'

const GreetingPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ marginTop: '30px' }}>
        <Link color="inherit" href="/">
          TOP
        </Link>
        <Link color="inherit" href="/greeting">
          ご挨拶
        </Link>
      </Breadcrumbs>

      <LargeHeading text="ご挨拶" />

      <Typography className="font">
        令和4年4月から島本町の地で、民間事業ビッキーことば塾を開設することとなりました。
        <br />
        障害の有無に関わらず、お子様方が自分らしく生活の質を高めていけるようにサポートさせて頂きたいと考えています。
        <br />
        ことば塾は、親御様の相談所の役割もあります。
        <br />
        ひとりひとりに合う子育てを一緒に考えていきましょう。
      </Typography>

      <Grid container>
        <Grid item xs={12}>
          <ContentBlock title="方針">
            {`最近、ニュースでよく取り上げられている「虐待」に対する課題は増える一方です。
            虐待は親御様が一生懸命しつけや子育てをしていく中で生まれるものもあります。
            「言う事を聞いてくれない」という悩みはどのご家庭でもあるかと思います。
            核家族化が進み子育ての仕方が分からない方や、一人で子育てをして孤独を感じている方も少なくはありません。
            大切なお子様を「楽しく育てたい」という思いは誰もが願っていることだと思います。
            そのためには、お子様の性格や特性の理解、発達段階に応じた手助けが必要になってきます。
            まずは、お子様を育てやすくする環境を作っていくことが大切です。
            そうすることが、お子様にとっても生活しやすくなります。
            「子供がいうことを聞いてくれない」と親御様が思っているように子供たちもまた「誰も自分のことを分かってくれない。」と嘆いている可能性もあります。
            ビッキーことば塾は障がいの有無に関係なく訓練を受けていただくことができます。
            多くのことを吸収できるこの大切な時期に、将来の見通しを立てながら計画的に子育てしていきましょう。
            ビッキーことば塾では、得意なことを伸ばして苦手なことにもチャレンジできる強い心と安定した心を養い人間力（社会で生きていくための力）を鍛えます。
            それぞれの能力が最大限引き出せるよう、個別指導及びペアレント指導ではマンツーマンの訓練を行います。
            集団指導では、小集団での遊びを通して対人コミュニケーション力を身に付けてもらいます。`}
          </ContentBlock>
        </Grid>

        <Grid item xs={12}>
          <ContentBlock title="民間事業のメリット">
            {`・一人でも多くのお子様が適切な時期に言語訓練を受ける環境を作るため。
            ・年齢や障がいの有無に関わらず言語訓練が受けられるようにするため。
            ・療育の並行利用を可能にするため。（同日に利用可能）
            `}
          </ContentBlock>
        </Grid>

        <Grid item xs={12}>
          <ContentBlock title="事業の目的">
            {`・生活の質の向上
            ・自己肯定感を養い、安定した精神状態で生活することができる。
            ・小学校等での学習の遅れを支援する。
            ・自らの特性等を理解し、想定外の出来事にも対応できる力を育てる。
            ・自分らしく生きる力を育てる。
            ・将来の就労に繋がる特技（能力）を見つける。
            `}
          </ContentBlock>
        </Grid>
      </Grid>
    </Container>
  )
}

export async function getStaticProps() {
  return {
    props: {},
  }
}

export default GreetingPage
