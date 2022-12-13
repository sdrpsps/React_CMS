import 'antd/dist/reset.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './assets/css/App.css';
import NeedAuth from './components/NeedAuth/NeedAuth';
import Dashboard from './pages/Dashboard/Dashboard';
import LoginPage from './pages/LoginPage/LoginPage';

const App: React.FC = () => (
  <div className="App">
    <Routes>
      {/* 登陆 */}
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <NeedAuth>
            <Dashboard>hahahah</Dashboard>
          </NeedAuth>
        }
      />
    </Routes>
  </div>
);

export default App;
