import React from 'react'
import Link from 'next/link'

import { Grid, Breadcrumbs, Container, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material'

import LargeHeading from 'components/atoms/LargeHeading/LargeHeading'
import ContentBlock from 'components/molecules/ContentBlock/ContentBlock'

import styles from './trainingCoontentPage.module.css'

const GreetingPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ marginTop: '30px' }}>
        <Link color="inherit" href="/">
          TOP
        </Link>
        <Link color="inherit" href="/training-content">
          訓練内容
        </Link>
      </Breadcrumbs>

      <LargeHeading text="訓練内容" />

      <Typography className="font">
        LINEやメールで状況確認を致します。
        <br />
        直接訓練後の経過を週に1度観察し、次回の訓練時までに環境の調整を行っていきます。
        <br />
        評価表の作成には1週間前後かかります。
        <br />
        作成した文書はメール（PDF）にて送信致します。
        <br />
        遠方からのご利用の方やコロナ渦ということを考慮致しまして、 安全に訓練を受けて頂きたいと考えています。
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={12}>
          <ContentBlock title="訓練詳細">
            <TableContainer component={Paper} className={styles.customTable}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className={styles.tableHeader}>訓練曜日</TableCell>
                    <TableCell>月~日</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={styles.tableHeader}>訓練回数</TableCell>
                    <TableCell>月1回または2回</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={styles.tableHeader}>訓練時間</TableCell>
                    <TableCell>
                      1時間
                      <br />
                      ※兄弟利用の場合は1時間半
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={styles.tableHeader}>開所時間</TableCell>
                    <TableCell>10時~14時</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={styles.tableHeader}>LINE相談</TableCell>
                    <TableCell>
                      お子様の1週間のご様子を報告していただきます
                      <br />
                      動画を添付してご送信ください
                      <br />
                      指導員が返答致します
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={styles.tableHeader}>LINE相談回数</TableCell>
                    <TableCell>
                      週に1回
                      <br />
                      ※月の訓練回数によって変動あり
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </ContentBlock>
        </Grid>

        <Grid item xs={12} sm={12}>
          <ContentBlock title="予約方法">
            {`本ホームページの予約画面から空いている日時をクリックしてご予約を取って頂きます。
            当日キャンセルは、お電話でのご連絡をお願い致します。`}
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
