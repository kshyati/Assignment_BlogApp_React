import React from 'react';
import 'bootstrap-css-only/css/bootstrap.min.css';
import { Route, Link } from "react-router-dom";
import Login from './login';
import Register from './register';
import BlogManagement from './blogManagement';
import Dashboard from './dashboard';
import AddBlog from './addBlog';
import '@progress/kendo-theme-default/dist/all.css';
import '../App.css'

class SideNavPage extends React.Component {
  render() {
    return (
      <div id="mySidenav" className="sidenav">
        <Link to="/home"><span>Home</span></Link>
        <Link to="/blogmanagement"><span>Blog Management</span></Link>
        <Link to="/addblog"><span>Add Blog</span></Link>
      </div>);
  }
}
export default SideNavPage;
