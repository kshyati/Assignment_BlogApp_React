// import React, { Component } from 'react';
// import { MDBInput,MDBFormInline,MDBBtn } from "mdbreact";

// class CommentPage extends Component {

//   constructor() {
//     super();
//     this.state = {
//       title: '',
//       description: '',
//       status: true,
//       errMessage: '',
//       commentDescription:''
//     };
//   }
//   handleAddComment = () => {
    
//     if (this.state.commentDescription == '') {
//       this.setState({ errMessage:'Comment should not be empty!'});
//     }
//     else {
//       console.log(this.state.commentDescription);
      
//       this.setState({ errMessage:''});
//       this.props.handleChange();
//     }
//   }
//   handleCancelComment = () => {

//   }
//   changeHandler = (event) => {
    
//     this.setState({ [event.target.name]: event.target.value });
//   }
//   render() {
//     return (
//       <div>
//       <form
//       onSubmit={this.handleAddComment}
//         >
//           <MDBInput type="textarea" label="Write Your Comments" name="commentDescription" outline value={this.state.commentDescription} id="materialFormRegisterNameEx" onChange={this.changeHandler} required />
//         <span>{this.state.errMessage}</span>

//           <MDBBtn
//             className="w-5 p-2"
//             color="success"
//             type="submit"
//           >
//             Add
//     </MDBBtn>
//           <MDBBtn
//             className="w-5 p-2"
//             color="danger"
//             type="button"
//             onClick={this.props.handleChange}
//           >
//             Cancel
//     </MDBBtn>

//           </form>
//       </div>
//     );
//   }
// }

// export default CommentPage;
