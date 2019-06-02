import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';

import Login from '../components/login';
import { Route, Link } from "react-router-dom";
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { userLogOut } from '../actions';

import '../assets/css/common.css';
class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentWillMount() {
        this.props.userLogOut((res) => {
            localStorage.clear('%temp%');
            this.props.history.push('');
        });
    }

    render() {
        return (null);
    };

}
export default connect(null, { userLogOut })(Logout);
