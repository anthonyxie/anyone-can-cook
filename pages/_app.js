import '@/styles/globals.css'
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';

const queryclient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryclient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  ) 
}
