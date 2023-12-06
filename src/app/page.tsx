import Image from 'next/image';
import styles from './page.module.css';

import Connection from '../components/Connection';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <Connection />
      <Footer />
    </main>
  );
}
