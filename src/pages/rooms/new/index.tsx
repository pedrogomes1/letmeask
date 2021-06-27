import { useContext, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';

import { Button } from '../../../components/Button';
import { AuthContext } from '../../../contexts/AuthContext';

import illustrationImg from '../../../assets/svgs/illustration.svg';
import logoImg from '../../../assets/svgs/logo.svg';

import styles from '../../../styles/auth.module.scss';

export default function NewRoom() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) Router.push('/');
  }, [user]);

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
          <h2>Criar uma nova sala</h2>
          <form>
            <input type="text" placeholder="Nome da sala" />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link href="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
