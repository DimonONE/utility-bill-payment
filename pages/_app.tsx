import Container from '@root/components/container/Container';
import type {AppProps} from 'next/app';
import '../styles/globals.css';

export default function App({Component, pageProps}: AppProps) {
  return (
    <Container>
      <Component {...pageProps} />
    </Container>
  );
}
