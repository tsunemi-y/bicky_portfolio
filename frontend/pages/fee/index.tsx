import React from 'react'
import Link from 'next/link'

import { Grid, Breadcrumbs, Container, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material'

import LargeHeading from 'components/atoms/LargeHeading/LargeHeading'
import ContentBlock from 'components/molecules/ContentBlock/ContentBlock'

import styles from './feePage.module.css'

const FeePage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ marginTop: '30px' }}>
        <Link color="inherit" href="/">
          TOP
        </Link>
        <Link color="inherit" href="/fee">
          料金
        </Link>
      </Breadcrumbs>

      <LargeHeading text="料金" />

      <Typography className="font">
        ビッキーことば塾では、訓練中に評価した内容を文書にしてお渡ししております。
        <br />
        下記記載の料金は、評価書作成代も含めての料金になります。
      </Typography>

      <Grid container>
        <Grid item xs={12}>
          <ContentBlock title="プラン">
            <Typography sx={{ marginBottom: '8px' }}>
              訓練回数は月1回または2回のどちらかをご選択いただけます。
              <br />
              月2回の場合は、月1回の倍の料金になります。
              <br />
              月2回の場合は、来所での訓練が月2回（隔週）、評価表が2回分になります。
              <br />
              LINEでの相談は、2回以上で4回までご利用可能です。
            </Typography>
            <TableContainer component={Paper} className={styles.customTable}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell className={styles.tableHeader}>平日利用</TableCell>
                    <TableCell className={styles.tableHeader}>休日利用</TableCell>
                    <TableCell className={styles.tableHeader}>兄弟同時利用</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={styles.tableHeader}>月1回</TableCell>
                    <TableCell>7,700円</TableCell>
                    <TableCell>8,800円</TableCell>
                    <TableCell>13,200円（6,600円/人）</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={styles.tableHeader}>月2回</TableCell>
                    <TableCell>15,400円</TableCell>
                    <TableCell>17,600円</TableCell>
                    <TableCell>26,400円（13,200円/人）</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </ContentBlock>

          <ContentBlock title="お支払い方法">現金のみ受け付けております。 来所時にお支払いをよろしくお願い致します。</ContentBlock>
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

export default FeePage
