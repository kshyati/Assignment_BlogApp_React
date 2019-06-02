import React from 'react';
import ReactDOM from 'react-dom';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput, MDBIcon, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBFormInline } from 'mdbreact';
import '../assets/css/kendo.css';
import { Route, Link } from "react-router-dom";
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import '../assets/css/common.css';
import { connect } from 'react-redux';
import { fetchAllBlog, fetchBlogForBlogManagement, fetchBlogById, editBlog, deleteBlog } from '../actions';
import _ from 'lodash';
import Header from '../components/header';
import SideBar from '../components/sideBar';

class BlogList extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            total: 0,
            skip: 0, take: 10, modal: false, deleteAlert: false,
            name: '',
            description: '',
            currentId: ''
        };

    }
    componentDidMount() {
        var getToken = localStorage.getItem('%temp%');
        if (getToken === null) {
            this.props.history.push('/');
        }
        this.props.fetchBlogForBlogManagement(getToken, (res) => {
            var arr = _.values(res.data.data);
            this.setState({ data: arr, total: arr.length });
        });
    }

    updatePagerState(key, value) {
        const newPageableState = Object.assign({}, this.state.pageable, { [key]: value });
        this.setState(Object.assign({}, this.state, { pageable: newPageableState }));
    }
    pageChange = (event) => {
        this.setState({
            skip: event.page.skip,
            take: event.page.take
        });
    }
    toggle = nr => () => {
        let modalNumber = 'modal';
        this.setState({
            [modalNumber]: !this.state[modalNumber],
            name: nr.name,
            description: nr.description,
            currentId: nr._id
        });
        var body = {
            "id": nr
        };
    }
    toggleDelete = nr => () => {
        let modalNumber = 'deleteAlert'
        this.setState({
            [modalNumber]: !this.state[modalNumber],
            currentId: nr
        });
    }
    saveChanges = () => {
        var body = {
            'name': this.state.name,
            'description': this.state.description
        };
        var id = this.state.currentId;
        this.props.editBlog(body, id, (res) => {
            this.componentDidMount();
            this.setState({
                modal: !this.state.modal
            });
        });
    }
    removeBlog = () => {
        var id = this.state.currentId;
        this.props.deleteBlog(id, (res) => {
            this.componentDidMount();
            this.setState({
                deleteAlert: !this.state.deleteAlert
            });
        });
    }
    handleNameChange = (e) => {
        this.setState({ name: e.target.value });
    }

    handleDescriptionChange = (e) => {
        this.setState({ description: e.target.value });
    }
    render() {
        return (
            <div>
                <SideBar />
                <Header />
                <div className="commonAlign">
                    <MDBBtn color="primary"  size="sm" className="float-right" >
                    <Link className="text-white" to="/addblog">
                        Add Blog
                        </Link>
              </MDBBtn>
                    <br /><br /><br />
                    <Grid
                        style={{ height: '400px' }}
                        data={this.state.data}
                        skip={this.state.skip}
                        take={this.state.take}
                        total={this.state.total}
                        pageable={true}
                        onPageChange={this.pageChange}
                    >
                        <GridColumn field="name" width="300" title="Blog Title" />
                        <GridColumn field="description" title="Blog Description" />
                        <GridColumn field="_id" width="120px" title="Actions"
                            cell={(props) => (
                                <td>
                                    &nbsp; &nbsp;

                            <MDBIcon icon="pencil-alt" onClick={this.toggle(props.dataItem)} />


                                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            <MDBIcon icon="trash-alt" onClick={this.toggleDelete(props.dataItem[props.field])} />

                                </td>
                            )} />
                    </Grid>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggle(14)} centered>
                        <MDBModalHeader color="success" toggle={this.toggle(14)}>Edit Blog</MDBModalHeader>

                        <MDBContainer className="d-flex justify-content-center">
                            <MDBRow>
                                <MDBCol md="20">

                                    <MDBInput label="Your Blog Title" onChange={this.handleNameChange} group type="text" validate value={this.state.name} ref="titleInput" />
                                    <MDBInput
                                        label="Your Blog Description"
                                        group
                                        validate
                                        type="textarea"
                                        containerClass="mb-0"
                                        value={this.state.description}
                                        onChange={this.handleDescriptionChange}
                                        ref="descriptionInput"
                                    />

                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                        <MDBModalFooter>

                            <MDBBtn color="success" onClick={this.saveChanges}>Save changes</MDBBtn>
                            <MDBBtn color="danger" onClick={this.toggle(14)}>Close</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>

                    <MDBModal isOpen={this.state.deleteAlert} toggle={this.toggleDelete(14)} centered>
                        <MDBModalHeader toggle={this.toggleDelete(14)}>Confirmation!!!</MDBModalHeader>
                        <MDBModalBody>
                            Are you sure you want to delete this blog ?
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="success" onClick={this.removeBlog}>Delete</MDBBtn>
                            <MDBBtn color="danger" onClick={this.toggleDelete(14)}>Close</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                </div >
            </div>
        );
    }

}
// function mapStateToProps(state) {

//     return {
//         posts: state.posts
//     };
// }
export default connect(null, { fetchBlogForBlogManagement, fetchBlogById, editBlog, deleteBlog })(BlogList);