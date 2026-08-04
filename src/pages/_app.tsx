import '@/styles/globals.css';
import Head from 'next/head';

import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Proxlox</title>
        <meta
          name="description"
          content="Proxlox connects buyers with trusted resellers and personal shoppers for limited-edition drops."
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
 