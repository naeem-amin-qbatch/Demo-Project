import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from "./redux/store"
// import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <PersistGate persistor={persistor}></PersistGate> */}
    <Provider store={store}>
      <App />
      {/* <PersistGate /> */}
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
