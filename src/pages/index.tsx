import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';

import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';

import illustrationImg from '../assets/svgs/illustration.svg';
import logoImg from '../assets/svgs/logo.svg';
import googleIconImg from '../assets/svgs/google-icon.svg';

import styles from '../styles/auth.module.scss';

export default function Home() {
  const { signWithGoogle, user } = useAuth();

  async function handleCreateRoom() {
    if (!user) await signWithGoogle();
    Router.push('/rooms/new');
  }

  return (
    <div className={styles.pageAuth}>
      <aside>
        <Image
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className={styles.mainContent}>
          <Image src={logoImg} alt="Logo Letmeask" />
          <Link href="/rooms/new" passHref>
            <button className={styles.createRoom} onClick={handleCreateRoom}>
              <Image src={googleIconImg} alt="Logo google" />
              Crie sua sala com o Google
            </button>
          </Link>
          <div className={styles.separator}>ou entre em uma sala</div>
          <form>
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
