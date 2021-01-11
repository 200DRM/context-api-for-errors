import React from 'react';
import _NextApp, { AppProps } from 'next/app';
import { ErrorModalModule } from './ErrorModalModule';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.scss';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ErrorModalModule>
      <Component {...pageProps} />
    </ErrorModalModule>
  )
}

export default App;
