import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';

import Login from '../components/login';
import { Route, Link } from "react-router-dom";
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { addUser } from '../actions';

import '../assets/css/common.css';
class FormsPage extends React.Component {
  state = {
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    errMessage: "",
    checked: false
  };

  submitHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";

    if (this.state.email === '' || this.state.name === '' || this.state.address === '' || this.state.password === '' || this.state.phone === '' || this.state.checked === false) {
      this.setState({ errMessage: 'Please fill the required details!' });

    }
    else {
      this.setState({ errMessage: '' });
      var userDetails = {
        "name": this.state.name,
        "email": this.state.email,
        "password": this.state.password,
        "address": this.state.address,
        "phone": this.state.phone
      };
      this.props.addUser(userDetails, (res) => {
        this.props.history.push('/');
      });

    };
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
    
    if (event.target.name === 'checked' && event.target.value == true) {
      this.setState({ checked: false });
    }
    this.setState({ checked: true });
  };

  render() {
    return (
      <MDBContainer className="d-flex justify-content-center commonAlign needs-validation">
        <MDBCard className="cardSize">
          <div className="header pt-3 grey lighten-2">
            <MDBRow className="d-flex justify-content-start">
              <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                Register
      </h3>
            </MDBRow>
          </div>
          <MDBCardBody className="mx-4 mt-4">
            <div>
              <form
                className="needs-validation"
                onSubmit={this.submitHandler}
                noValidate
              >
                <MDBInput
                  value={this.state.name}
                  name="name"
                  onChange={this.changeHandler}
                  type="text"
                  id="materialFormRegisterNameEx"
                  label="Your Name"
                  required
                >
                  <div className="valid-feedback">Looks good!</div>
                </MDBInput>
                <MDBInput
                  value={this.state.email}
                  onChange={this.changeHandler}
                  type="email"
                  id="materialFormRegisterConfirmEx3"
                  name="email"
                  label="Your Email Address"
                  required
                >
                
                </MDBInput>
                
                <MDBInput
                  value={this.state.phone}
                  onChange={this.changeHandler}
                  type="text"
                  id="materialFormRegisterPasswordEx4"
                  name="phone"
                  label="Your phone"
                  required
                >
                  <div className="invalid-feedback">
                    Please provide a valid phone.
            </div>
                  <div className="valid-feedback">Looks good!</div>
                </MDBInput>
                <MDBInput
                  value={this.state.address}
                  name="address"
                  onChange={this.changeHandler}
                  type="text"
                  id="materialFormRegisterStateEx"
                  label="Your Address"
                  required
                >
                  <div className="valid-feedback">Looks good!</div>
                </MDBInput>
                <MDBInput
                  value={this.state.password}
                  onChange={this.changeHandler}
                  type="password"
                  id="materialFormRegisterPasswordEx4"
                  name="password"
                  label="Your Password"
                  required
                >
                  <div className="invalid-feedback">
                    Please provide password.
                </div>
                  <div className="valid-feedback">Looks good!</div>
                </MDBInput>
                <MDBCol md="12" className="mb-6">
                  <div className="custom-control custom-checkbox pl-3">
                    <input
                      onChange={this.changeHandler}
                      className="custom-control-input"
                      type="checkbox"
                      value={this.state.checked}
                      name="checked"
                      id="invalidCheck"
                      required
                    />
                    <label className="custom-control-label" htmlFor="invalidCheck">
                      Agree to terms and conditions
              </label>
                    <div className="invalid-feedback">
                      You must agree before submitting.
              </div>
                  </div>
                </MDBCol>
                <span className="invalid-feedback">{this.state.errMessage}</span>
                <div className="text-center mb-4 mt-5">
                  <MDBBtn
                    color="success"
                    type="submit"
                    className="btn-block z-depth-2"
                  >
                    Register
    </MDBBtn>
                </div>
                <p className="font-small grey-text d-flex justify-content-center">
                  Do you have an account?
    <Link
                    to="/"
                    className="dark-grey-text font-weight-bold ml-1"
                  >
                    Log In
                        </Link>
                </p>
              </form>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    );
  }
}
export default connect(null, { addUser })(FormsPage);
