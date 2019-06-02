import React from 'react';
import Header from '../src/components/header';
import SideBar from '../src/components/sideBar';
import LoginPage from '../src/components/login';
import 'bootstrap-css-only/css/bootstrap.min.css';
import { Route, Link } from "react-router-dom";
import '@progress/kendo-theme-default/dist/all.css';

class App extends React.Component {

  render() {
    return (
      <div>
        <LoginPage />
        <Header />
        <SideBar />
      </div>
    );
  }
}

export default App;
