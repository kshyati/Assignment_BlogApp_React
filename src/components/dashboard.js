import React, { Component } from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMedia, MDBIcon, MDBMask, MDBContainer, MDBInput, MDBView, MDBBtn, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBModal } from "mdbreact";
import CommentInbox from '../components/comment';
import '../assets/css/common.css';
import { connect } from 'react-redux';
import { fetchAllBlog, fetchBlogById, addComment, fetchAllComments, deleteComment, addLike } from '../actions';
import _ from 'lodash';
import Header from '../components/header';
import SideBar from '../components/sideBar';
class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
      show: false,
      deleteAlert: false,
      name: '',
      description: '',
      currentID: '',
      errMessage: '',
      commentDescription: '',
      comments: [],
      isLike: null,
      isEdit: false,
      posts: []
    };
  }

  componentWillMount() {
    var getToken = localStorage.getItem('%temp%');
    if (getToken === null) {
      this.props.history.push('/');
    }
    this.props.fetchAllBlog(getToken);
  }
  handleDetail = (e) => {
    this.setState({
      showComponent: !this.state.showComponent,
      commentDescription: ''
    });
  }
  commonFetchComments = () => {
    const userId = localStorage.getItem('%ud%');
    const values =
      {
        "blogId": this.state.currentID,
        "userId": userId
      };

    this.props.fetchAllComments(values, (res) => {
      this.setState({
        comments: res.data.data
      });
    });
  }
  handleAddComment = (e) => {
    e.preventDefault();
    if (this.state.commentDescription == '') {
      this.setState({ errMessage: 'Comment should not be empty!' });
    }
    else {
      const commentDetails = {
        "blogId": this.state.currentID,
        "description": this.state.commentDescription
      }
      this.props.addComment(commentDetails, (res) => {
        const values =
          {
            "blogId": this.state.currentID
          }
        this.commonFetchComments();
        this.setState({
          errMessage: '',
          showComponent: false
        });
      });
    }
  }
  handleCancelComment = () => {
    this.setState({ showComponent: false });
  }
  changeHandlerComment = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  changeHandlerLike = (event, cId, isLike) => {
    const userId = localStorage.getItem('%ud%');
    if (isLike === undefined) {
      isLike = true;
    }
    else {
      if (isLike) isLike = false;
      else isLike = true;
    }
    const values = {
      "isLike": isLike,
      "userId": userId,
      "blogId": this.state.currentID
    }
    this.props.addLike(cId, values, (res) => {
      this.commonFetchComments();
    });
  }
  editCommentHandler = (event, commentId) => {
    if (this.state.isEdit) {
      this.setState({ isEdit: false });
    }
    else {
      this.setState({ isEdit: true });
    }
  }
  deleteCommentHandler = (e, commentId) => {
    e.preventDefault()
    this.props.deleteComment(commentId, (res) => {
      this.commonFetchComments();
    });
  }
  toggleBlog = nr => () => {
    let modalNumber = 'deleteAlert'
    this.setState({
      [modalNumber]: !this.state[modalNumber],
      name: nr.name,
      description: nr.description,
      currentID: nr._id
    });
    const userId = localStorage.getItem('%ud%');
    const values =
      {
        "blogId": nr._id,
        "userId": userId
      }
    if (!this.state.deleteAlert) {
      this.props.fetchAllComments(values, (res) => {
        this.setState({
          comments: res.data.data
        });
      });
    }
  }
  renderPosts() {
    return this.props.posts.map((post, index) => {
      return (
        <div key={index}>
          {post !== null ?

            <MDBCol md="12" className="mb-md-12 mb-12">
              <h4 className="font-weight-bold dark-grey-text my-4">
                {post.name}
              </h4>
              <MDBBtn color="primary" size="sm" onClick={this.toggleBlog(post)}>
                More Details
              </MDBBtn>
            </MDBCol>
            : <h1>Loading.........</h1>
          }
        </div >
      )
    });
  }

  renderComments() {
    if (this.state.comments !== undefined) {
      return this.state.comments.map((comment, index) => {
        return (
          <div key={index}>
            <br />
            <h6 className="font-weight-bold mb-3">
              {
                this.state.isEdit ?
                  <span> <MDBInput type="textarea" name="commentDescription" outline value={comment.description} id="materialFormRegisterNameEx" onChange={this.changeHandlerComment} required /> </span>
                  :
                  <span>{comment.description}</span>
              }
              <span className="float-right">
                {/* <MDBIcon icon="pencil-alt" size="1x" className="indigo-text pr-3 " onClick={(e) => this.editCommentHandler(e, comment._id)} />  */}
                {
                  comment.isUser === true ? <MDBIcon icon="thumbs-up" size="1x" value={comment.isUser} className="green-text pr-3 " onClick={(e) => this.changeHandlerLike(e, comment._id, comment.isUser)} />
                    :
                    <MDBIcon icon="thumbs-down" size="1x" value={comment.isUser} className="red-text pr-3 " onClick={(e) => this.changeHandlerLike(e, comment._id, comment.isUser)} />
                }
                <MDBIcon icon="trash-alt" size="1x"
                  onClick={(e) => this.deleteCommentHandler(e, comment._id)} className="red-text pr-3" />
              </span>

            </h6>
          </div>
        )
      });
    }
  }
  render() {
    return (
      <div>
        <SideBar />
        <Header />
        <MDBContainer className="d-flex comonAlign justify-content-center">
          <MDBCard className="my-5 px-1 pb-5 text-center alignCard">
            <MDBCardBody>
              <h2 className="h1-responsive font-weight-bold my-5">
                Our Amarzing Blogs
          </h2>
              <p className="grey-text w-responsive mx-auto mb-5">
                Do whatever you want to do.You can do delete,add,edit of blogs with adding comments as well.
          </p>
              <MDBRow>
                {this.renderPosts()}
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
        <MDBModal isOpen={this.state.deleteAlert} toggle={this.toggleBlog(14)} centered>
          <MDBModalHeader toggle={this.toggleBlog(14)}>Current Blog!!!</MDBModalHeader>
          <MDBModalBody>
            <MDBRow>
              <MDBCol lg="12" md="12" className="mb-lg-8 mb-6">
                <MDBView hover className="rounded z-depth-2 mb-4" waves>
                  <img
                    className="img-fluid"
                    src="https://mdbootstrap.com/img/Photos/Others/images/81.jpg"
                    alt=""
                  />
                  <MDBMask overlay="white-slight" />
                </MDBView>
                <a href="#!" className="pink-text">
                  <h6 className="font-weight-bold mb-3">
                    Blog App
              </h6>
                </a>
                <h4 className="font-weight-bold mb-3">
                  <strong>{this.state.name}</strong>
                </h4>
                <p className="dark-grey-text">
                  {this.state.description}
                </p>
                <h5 className="font-weight-bold mb-3">
                  <strong>Please check out the comments below!</strong>
                </h5>
                {this.renderComments()}
                <MDBBtn color="primary" size="md" onClick={this.handleDetail}>

                  Add Comment
            </MDBBtn>
                {this.state.showComponent ?

                  <div>
                    <form
                      onSubmit={this.handleAddComment}
                    >
                      <MDBInput type="textarea" label="Write Your Comments" name="commentDescription" outline value={this.state.commentDescription} id="materialFormRegisterNameEx" onChange={this.changeHandlerComment} required />
                      <span>{this.state.errMessage}</span>

                      <MDBBtn
                        className="w-5 p-2"
                        color="success"
                        type="submit"
                      >
                        Add
                      </MDBBtn>
                      <MDBBtn
                        className="w-5 p-2"
                        color="danger"
                        type="button"
                        onClick={this.handleCancelComment}
                      >
                        Cancel
                      </MDBBtn>

                    </form>
                  </div> :
                  null
                }
              </MDBCol>
            </MDBRow>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="danger" onClick={this.toggleBlog(14)}>Close</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </div>
    );
  };
};
function mapStateToProps(state) {
  return {
    posts: state.posts.allBlog
  };
}
export default connect(mapStateToProps, { fetchAllBlog, addLike, fetchAllComments, fetchBlogById, addComment, deleteComment })(Dashboard);
