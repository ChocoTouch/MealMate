import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools'
import App from './App';
import reportWebVitals from './reportWebVitals';

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       refetchOnMount: false,
//       refetchOnReconnect: false,
//       retry: false,
//       staleTime: 5 * 60 * 1000,
//     }
//   }
// })
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <QueryClientProvider client={queryClient}> */}
      <App />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    {/* </QueryClientProvider> */}
  </React.StrictMode>
);




reportWebVitals();
