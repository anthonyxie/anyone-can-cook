import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import TextInput from '@/components/TextInput'
import MainImage from '../components/MainImage'
import ChatBubble from '../components/ChatBubble'
import {
  useCallback,
  useEffect,
  useState,
} from 'react';
const inter = Inter({ subsets: ['latin'] })
import { useQuery } from 'react-query';
import TextInput from '../components/TextInput';

//to be rewritten and stuff later but idc atm

export default function Home() {
  const [userId, setUserId ] = useState('643b3c1307292b3c1e22d2cc');

  return (
    <>
      <Head>
        <title>anyone can cook!</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Dongle" rel="stylesheet" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          anyone can cook!
        </h1>
        
        <MainImage src="./images/main.png" alt="main" />

        <div className={styles.chat}>
        <ChatBubble placeholder="enter your text here" />
        </div>

        <div className={styles.input}>
        <TextInput placeholder="enter your text here" />
        </div>
        <p className={styles.description}>
          <code className={styles.code}>tired of instant ramen, ubereats, and dining hall food? colette is here to help you meal prep and cook delicious meals at home!</code>
        </p>
      </main>
    </>
  )
}
