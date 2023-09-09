import React from 'react'
import Link from 'next/link'

import { Grid, Breadcrumbs, Container, Box } from '@mui/material'

import LargeHeading from 'components/atoms/LargeHeading/LargeHeading'
import ContentBlock from 'components/molecules/ContentBlock/ContentBlock'

import styles from './AccessPage.module.css'

const AccessPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ marginTop: '30px' }}>
        <Link color="inherit" href="/">
          TOP
        </Link>
        <Link color="inherit" href="/access">
          アクセス
        </Link>
      </Breadcrumbs>

      <LargeHeading text="アクセス" />

      <Grid container>
        <Grid item xs={12} sm={12}>
          <ContentBlock title="住所">〒618-0015 大阪府三島郡島本町青葉1-7-6</ContentBlock>
        </Grid>

        <Grid item xs={12} sm={12}>
          <ContentBlock title="電車でお越しの場合">JR島本駅から徒歩5分 阪急水無瀬駅から徒歩9分</ContentBlock>
        </Grid>

        <Grid item xs={12} sm={12}>
          <ContentBlock title="お車でお越しの場合">
            1台分の乗用車駐車スペースがありますが、幅が狭いため、ご注意ください。 利用される方は、事前にお声がけいただきますようお願い致します。
          </ContentBlock>
        </Grid>

        <Grid item xs={12} sm={12}>
          <ContentBlock title="マップ">
            <Box className={styles.mapDiv}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3273.099934029152!2d135.66152621458036!3d34.8788367811657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60010344762683d9%3A0xfdbc7a464365b42c!2z44CSNjE4LTAwMTUg5aSn6Ziq5bqc5LiJ5bO26YOh5bO25pys55S66Z2S6JGJ77yR5LiB55uu77yX4oiS77yW!5e0!3m2!1sja!2sjp!4v1630594432901!5m2!1sja!2sjp"
                className={styles.map}
                aria-hidden="false"
              ></iframe>
            </Box>
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

export default AccessPage
