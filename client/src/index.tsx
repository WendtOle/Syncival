import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthenticationWrapper } from './components/AuthenticationWrapper';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <AuthenticationWrapper>
      <App />
    </AuthenticationWrapper>
  </React.StrictMode>
);
