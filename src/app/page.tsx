import Wrapper from '../components/Wrapper';
import InfoWidget from '../components/InfoWidget';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <span className={styles.bg_1}></span>
      <span className={styles.bg_2}></span>
      <Wrapper>
        <Header />
        <InfoWidget />
      </Wrapper>

      <Footer />
    </main>
  );
}
