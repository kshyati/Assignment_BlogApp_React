// Libraries
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './App';
import Register from './components/register';
import BlogManagement from './components/blogManagement';
import Dashboard from './components/dashboard';
import AddBlog from './components/addBlog';
import LoginPage from './components/login';
import Logout from './components/logout';


// Added routes here
class Routes extends React.Component {
    render() {
      return (
        <div>
          <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/register" component={Register} />
          <Route path="/blogmanagement" component={BlogManagement} />
          <Route path="/addblog" component={AddBlog} />
          <Route path="/home" component={Dashboard} />
          <Route path="/logout" component={Logout} />
          </Switch>
        </div>
      );
    }
  }
  
  export default Routes;
