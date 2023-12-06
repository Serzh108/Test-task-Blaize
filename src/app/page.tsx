import Image from 'next/image';
import styles from './page.module.css';

import Wrapper from '@/components/Wrapper';
import Connection from '../components/Connection';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className={styles.main}>
      <span className={styles.bg_1}></span>
      <span className={styles.bg_2}></span>
      <Wrapper>
        <Header />
        <Connection />
      </Wrapper>

      <Footer />
    </main>
  );
}
