
import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';
import '../assets/css/common.css';
import { connect } from 'react-redux';
import { userLogin } from '../actions';


class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errMessage: ''
    };
    this.handlePwdKeyUp = this.keyUpHandler.bind(this, 'PwdInput');
  }

  keyUpHandler = (refName, e) => {
    var length = e.target.value.length;
    if (length === 0) {
      this.setState({ errMessage: 'Email Should not be empty!' });
    }
  }

  handleLogin = () => {
    var userDetails = {
      "email": this.state.email,
      "password": this.state.password
    };
    this.props.userLogin(userDetails, (res) => {
      if(res.data){
        localStorage.setItem('%temp%', res.data.data);
        this.props.history.push('/home');
      }
      else{
        this.setState({ errMessage: 'Authentication Failed!' });
      }
     });
  }

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange = (e) => {
    if (e.target.value == '') {
      this.setState({ errMessage: 'Password Should not be empty!' });
    }
    else {
      this.setState({ errMessage: '' });
      this.setState({ password: e.target.value });
    }
  }

  render() {
    return (
      <MDBContainer className="d-flex justify-content-center alignLogin">
        <MDBRow>
          <MDBCol md="20">
            <MDBCard className="cardSize">
              <div className="header pt-3 grey lighten-2">
                <MDBRow className="d-flex justify-content-start">
                  <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                    Log In
                </h3>
                </MDBRow>
              </div>
              <MDBCardBody className="mx-4 mt-4">
                <MDBInput label="Your email" group type="text" validate value={this.state.email} onChange={this.handleEmailChange} onKeyUp={this.handlePwdKeyUp} ref="PwdInput" />
                <MDBInput
                  label="Your password"
                  group
                  type="password"
                  validate
                  containerClass="mb-0"
                  value={this.state.password} onChange={this.handlePasswordChange}

                />
                {/* <p className="font-small grey-text d-flex justify-content-end">
                  Forgot
                <a
                    href="#!"
                    className="dark-grey-text font-weight-bold ml-1"
                  >
                    Password?
                </a>
                </p> */}
                <p className="text-danger">{this.state.errMessage}</p>
                <div className="text-center mb-4 mt-5">
                  <MDBBtn
                    color="success"
                    type="button"
                    className="btn-block z-depth-2"
                    onClick={this.handleLogin}
                    disabled={!this.state.email || !this.state.password}
                  >
                    Log in
                </MDBBtn>
                </div>
                <p className="font-small grey-text d-flex justify-content-center">
                  Don't have an account?
                <Link
                    to="/register"
                    className="dark-grey-text font-weight-bold ml-1"
                  >
                    Sign up
                                    </Link>
                </p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      
    );
  };
};
export default connect(null, { userLogin })(LoginPage);

