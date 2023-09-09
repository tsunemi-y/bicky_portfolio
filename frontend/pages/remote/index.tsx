import React from 'react'
import Link from 'next/link'

import { Grid, Breadcrumbs, Container, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material'

import LargeHeading from 'components/atoms/LargeHeading/LargeHeading'
import ContentBlock from 'components/molecules/ContentBlock/ContentBlock'

import styles from './remotePage.module.css'

const RemotePage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ marginTop: '30px' }}>
        <Link color="inherit" href="/">
          TOP
        </Link>
        <Link color="inherit" href="/remote">
          遠方の方へ
        </Link>
      </Breadcrumbs>

      <LargeHeading text="遠方の方へ" />

      <Typography component="div">
        北海道や沖縄など遠方のために、月1回の来所ができない方や、ご家庭の都合で定期的に来所することが困難な方は、LINEやテレビ電話、Zoomなどのオンラインでのご相談や評価等をさせて頂きます。
        <TableContainer component={Paper} className={styles.customTable}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className={styles.tableHeader}>メリット</TableCell>
                <TableCell>
                  ・すぐに相談できる。
                  <br />
                  ※役場等で専門家支援を受けるまでに時間がかかる場合にオススメ
                  <br />
                  ・具体的な関わりがすぐに知れる。
                  <br />
                  ・継続的に支援を受けられる。
                  <br />
                  ・直訓訓練に比べると、料金が安い。
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={styles.tableHeader}>デメリット</TableCell>
                <TableCell>
                  ・直訓訓練に比べると、効果が出るのに時間がかかる場合がある。
                  <br />
                  ・動画視聴による分析のため、評価の正確性に欠ける場合がある。
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Typography>

      <Grid container>
        <Grid item xs={12}>
          <ContentBlock title="お支払い方法">
            {`ご利用になる前月の末までにお振込みをお願い致します。
          銀行口座はご登録いただいたメールアドレス宛に送信させていただきます。`}
          </ContentBlock>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <ContentBlock title="LINEでの訓練内容">
            <TableContainer component={Paper} className={styles.customTable}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className={styles.tableHeader}>ご利用方法</TableCell>
                    <TableCell>
                      1. 会員登録画面にて、「ご利用プラン」の「LINE相談」にチェックして新規登録
                      <br />
                      2. ご登録頂いたメールアドレス宛に銀行口座を送信
                      <br />
                      3. 振込み確認後、ご登録頂いた電話番号からLINEを送信
                      <br />
                      ※ご登録いただく電話番号はLINEを使用できるものをお願い致します
                      <br />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className={styles.tableHeader}>ご利用料金</TableCell>
                    <TableCell>
                      4400円(税込み)
                      <br />
                      ※紹介して頂いた方には、1000円割引させていただきます。
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className={styles.tableHeader}>ご利用回数</TableCell>
                    <TableCell>週1回(やりとりが終わるまでを1回とします。)</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className={styles.tableHeader}>ご利用を終了したい場合</TableCell>
                    <TableCell>
                      いつでも終了いただけます。
                      <br />
                      ※お月謝の返金はございませんので、予めご了承ください
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </ContentBlock>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <ContentBlock title="テレビ電話・Zoomでの訓練内容">
            <TableContainer component={Paper} className={styles.customTable}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className={styles.tableHeader}>ご利用方法</TableCell>
                    <TableCell>
                      ご希望の方のみ受け付けます。
                      <br />
                      LINEにて、ご利用希望の旨をお伝えください。
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className={styles.tableHeader}>ご利用料金</TableCell>
                    <TableCell>
                      別途1100円(税込み)
                      <br />
                      例）4400円（LINE相談）+ 1100円（テレビ電話・Zoom）の計5500円
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className={styles.tableHeader}>ご利用回数</TableCell>
                    <TableCell>月一回のみ</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className={styles.tableHeader}>ご利用を終了したい場合</TableCell>
                    <TableCell>
                      いつでも終了いただけます。
                      <br />
                      ※お月謝の返金はございませんので、予めご了承ください
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className={styles.tableHeader}>注意点</TableCell>
                    <TableCell>
                      週4回のLINE相談一回分がテレビ電話・Zoom相談になる形になります。
                      <br />
                      1100円のお支払い毎に、利用できるわけではございません。
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
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

export default RemotePage
