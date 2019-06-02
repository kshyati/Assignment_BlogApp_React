
import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput, MDBFormInline } from 'mdbreact';
import '../assets/css/common.css';
import { connect } from 'react-redux';
import { addNewBlog } from '../actions';
import Header from '../components/header';
import SideBar from '../components/sideBar';

class AddBlog extends Component {

  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      status: true,
      errMessage: ''
    };
    this.handlePwdKeyUp = this.keyUpHandler.bind(this, 'PwdInput');
  }
  componentDidMount() {
    var getToken = localStorage.getItem('%temp%');
    if (getToken === null) {
      this.props.history.push('/');
    }
  }

  keyUpHandler = (refName, e) => {
    var length = e.target.value.length;
    if (length === 0) {
      this.setState({ errMessage: 'Title/Description should not be empty!' });
    }
    else {
      this.setState({ errMessage: '' });
    }
  }

  handleAddBlog = () => {
    var getToken = localStorage.getItem('%temp%');
    var blogDetails = {
      "name": this.state.title,
      "description": this.state.description
    };
    this.props.addNewBlog(getToken, blogDetails, (res) => {
      this.props.history.push('/home');
    });
  }
  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  }

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });

  }
  onClick = nr => () => {
    this.setState({
      status: nr
    });
  }
  render() {
    return (
      <div>
        <Header />
        <SideBar />
        <MDBContainer className="d-flex justify-content-center alignAddBlog">

          <MDBRow>
            <MDBCol md="20">
              <MDBCard>
                <div className="header pt-3 grey lighten-2">
                  <MDBRow className="d-flex justify-content-start">
                    <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                      Add Your Blog
                </h3>
                  </MDBRow>
                </div>
                <MDBCardBody className="mx-4 mt-4">
                  <MDBInput label="Your Blog Title" group type="text" validate value={this.state.title} onChange={this.handleTitleChange} onKeyUp={this.handlePwdKeyUp} ref="titleInput" />
                  <MDBInput
                    label="Your Blog Description"
                    group
                    type="text"
                    validate
                    containerClass="mb-0"
                    value={this.state.description} onKeyUp={this.handlePwdKeyUp} onChange={this.handleDescriptionChange}
                    ref="descriptionInput"
                  />
                  <p className="errMessageAddBlog">{this.state.errMessage}</p>
                  <div className="text-center mb-3 mt-3">
                    <MDBFormInline className="radio-spacing-addblog">
                      <MDBBtn
                        color="success"
                        type="button"
                        className="z-depth-2"
                        onClick={this.handleAddBlog}
                        disabled={!this.state.title || !this.state.description}
                      >
                        Add Blog
                </MDBBtn>
                      <MDBBtn
                        color="danger"
                        type="button"
                        className="z-depth-2"
                      >
                        Reset
          </MDBBtn>
                    </MDBFormInline>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  };
};

export default connect(null, { addNewBlog })(AddBlog);


