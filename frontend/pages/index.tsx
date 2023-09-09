import React from 'react'
import Image from 'next/image'

import { Box, Grid, Container } from '@mui/material'

import ContentBlock from 'components/molecules/ContentBlock/ContentBlock'

import styles from './HomePage.module.css'

const HomePage: React.FC = () => {
  return (
    <>
      <Box className={styles.backgroundImage}>
        <Image
          src="/hero-img.jpg"
          alt="Background"
          width={1920}
          height={1080}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          quality={100}
          priority
        />
      </Box>

      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12} sm={12}>
            <ContentBlock title="コンセプト">
              {`ことばの訓練を通して、自己肯定感を養い、
                社会で自分らしく生きていくスキルを身につけます。
                親子指導や集団指導もあります。`}
            </ContentBlock>
          </Grid>

          <Grid item xs={12} sm={12}>
            <ContentBlock title="対象児童">
              {`障がいの有無は問いません。
                コミュニケーション面や学習面など、
                様々なお悩みに対応しています。`}
            </ContentBlock>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {},
  }
}

export default HomePage
