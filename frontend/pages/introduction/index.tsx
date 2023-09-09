import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Grid, Breadcrumbs, Container, Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material'

import LargeHeading from 'components/atoms/LargeHeading/LargeHeading'
import ContentBlock from 'components/molecules/ContentBlock/ContentBlock'

import styles from './IntroductionPage.module.css'

const IntroductionPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ marginTop: '30px' }}>
        <Link color="inherit" href="/">
          TOP
        </Link>
        <Link color="inherit" href="/introduction">
          指導員紹介
        </Link>
      </Breadcrumbs>

      <LargeHeading text="指導員紹介" />

      <Box className={styles.icon}>
        <Image
          src="/staff.png"
          alt="icon"
          width={200} // 適切な幅を指定してください
          height={100} // 適切な高さを指定してください
          quality={100}
          priority
        />
      </Box>

      <Grid container>
        <Grid item xs={12} sm={12}>
          <ContentBlock title="プロフィール">
            <TableContainer component={Paper} className={styles.customTable}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className={styles.tableHeader}>氏名</TableCell>
                    <TableCell>常深夏子（つねみなつこ）</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className={styles.tableHeader}>免許・資格</TableCell>
                    <TableCell>言語聴覚士、保育士、高等学校教諭、介護福祉士</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className={styles.tableHeader}>学歴</TableCell>
                    <TableCell>関西学院大学卒業</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </ContentBlock>
        </Grid>

        <Grid item xs={12} sm={12}>
          <ContentBlock title="経歴">
            {`小学校から始めた剣道を20年間続ける。
          中学校では近畿大会、
          高等学校では全国大会、
          大学では都道府県大会の兵庫県代表で出場
          中学校、高等学校、大学で剣道部主将を務める。
          教員退職後は、訪問介護事業の開設に携わる。
          児童発達支援事業で言語聴覚士としてことばの訓練及び療育を行う。
          現在、民間事業ビッキーことば塾でことばの訓練を行う。`}
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

export default IntroductionPage
