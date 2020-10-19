import React from 'react';
import { toast } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './styles/global';
import Routes from './routes';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
const App: React.FC = () => (
  <>
    <GlobalStyles />
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </>
);

export default App;
