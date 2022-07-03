import type { NextPage } from 'next'
import Head from 'next/head'
import HomeTemplate from '../src/template/Home'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Are you tibas?</title>
        <meta name="description" content="Internal tibas labs authentication factory" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <HomeTemplate />
    </>
  )
}

export default Home
