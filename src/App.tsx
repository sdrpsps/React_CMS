import 'antd/dist/reset.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import './assets/css/App.css';
import route from './routes';

const App: React.FC = () => useRoutes(route);
export default App;
