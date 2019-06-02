import React, { Component } from "react";
import 'mdbreact/dist/css/mdb.css';
import { Route, Link } from "react-router-dom";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav,MDBBtn, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import '../assets/css/common.css'
import { userLogOut } from '../actions';
import { connect } from 'react-redux';

class NavbarPage extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}


render() {
  return (
      <div id="header">
      <MDBNavbar color="indigo" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">Blogger's Home</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
          </MDBNavbarNav>
            <MDBNavbarNav right>
              <MDBNavItem >
               <Link  to="/logout"><span className="white-text">Logout</span></Link>               
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
      </div>
    );
  }
}

export default connect(null, { userLogOut })(NavbarPage);

