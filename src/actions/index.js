import axios from 'axios';

export const ADD_USER = 'add_user';
export const USER_LOGIN = 'user_login';
export const CREATE_POSTS = 'create_posts'
export const FETCH_POST = 'fetch_post';
export const DELETE_POST = 'delete_post';
export const FETCH_BLOG = 'fetch_blog';
export const FETCH_BLOG_REQUEST = 'fetch_blog_request';
export const ADD_BLOG = 'add_blog';
export const FETCH_BLOG_AGAIN = 'fetch_blog_again';
export const FETCH_BLOG_BY_ID = 'fetch_blog_by_id';
export const EDIT_BLOG = 'edit_blog';
export const DELETE_BLOG = 'delete_blog';
export const LOG_OUT = 'log_out';
export const ADD_COMMENT = 'add_comment';
export const FETCH_COMMENTS = 'fetch_comments';
export const DELETE_COMMENT = 'delete_comment';
export const ADD_LIKE = 'add_like';






const apiUrl = 'http://localhost:7000';
var getToken = localStorage.getItem('%temp%');

var header = {
    'Content-Type': 'application/json',
    'x-auth': getToken
};


// function request() {
//     console.log("user request")
//     return {
//         type: FETCH_BLOG_REQUEST
//     }
// }

// function receiveData(request) {
//     console.log("user data sucess")
//     return {
//         type: FETCH_BLOG,
//         payload: request
//     }
// }

//new register
export function addUser(values, callback) {
    console.log('fetchposts---')
    const request = axios.post(`${apiUrl}/user/userRegister`, values)
        .then((res) => callback(res));
    return {
        type: ADD_USER,
        payload: request
    }
}

// Login

export function userLogin(values, callback) {
    console.log('fetchposts---')
    const request = axios.post(`${apiUrl}/user/userLogin`, values)
        .then((res) => callback(res),
        (error) => {
            console.log(error)
            callback(error)
        })
    console.log(request)
    return {
        type: USER_LOGIN,
        payload: request
    }
}

//Fatch Blogs
export const fetchAllBlog = (values) => dispatch => {
    const header = {
        'Content-Type': 'application/json',
        'x-auth': values
    };
    axios.get(`${apiUrl}/blog/getAllBlog`, { headers: header })
        .then(res => {
            const request = res.data.data;
            dispatch({
                type: FETCH_BLOG,
                payload: request
            })
        })
};


export function fetchBlogForBlogManagement(values, callback) {
    console.log('fetchallBlog---')
    const request = axios.get(`${apiUrl}/blog/getAllBlog`, { headers: header })
        .then((res) => callback(res));
    console.log(request);
    return {
        type: FETCH_BLOG_AGAIN,
        payload: request
    }
}

//Add New Blog
export function addNewBlog(values, data, callback) {
    console.log(values, data);

    const request = axios.post(`${apiUrl}/blog/addBlog`, data, { headers: header })
        .then((res) => callback(res));
    return {
        type: ADD_BLOG,
        payload: request
    }
}
//Get Blog By Id
export function fetchBlogById(values, callback) {
    console.log('fetch Specific Id---')
    console.log(values, header);
    const request = axios.get(`${apiUrl}/blog/getSpecificBlog`, values, { headers: header })
        .then((res) => callback(res));

    return {
        type: FETCH_BLOG_BY_ID,
        payload: request
    }
}

//Edit Blog
export function editBlog(values, id, callback) {
    console.log('edit Id---')
    console.log(values, header, id);
    const request = axios.put(`${apiUrl}/blog/editBlog`, values, { params: { id }, headers: header })
        .then((res) => callback(res));

    return {
        type: EDIT_BLOG,
        payload: request
    }
}

//Delete Blog
export function deleteBlog(id, callback) {
    console.log('edit Id---')
    console.log(header, id);
    const request = axios.delete(`${apiUrl}/blog/deleteBlog`, { params: { id }, headers: header })
        .then((res) => callback(res));

    return {
        type: DELETE_BLOG,
        payload: request
    }
}

//User Logout
export function userLogOut(callback) {
    console.log('log out---')
    const request = axios.post(`${apiUrl}/user/userLogout`, { headers: header })
        .then((res) => callback(res));

    return {
        type: LOG_OUT,
        payload: request
    }
}


// Add Comment for Specific Blog
export function addComment(values, callback) {
    const request = axios.post(`${apiUrl}/comment/addComment`, values, { headers: header })
        .then((res) => callback(res));
    return {
        type: ADD_COMMENT,
        payload: request
    }
}

//Fetch all Comments by BlogId
export function fetchAllComments(values, callback) {
    console.log('fetchallBlog---')
    const request = axios.post(`${apiUrl}/comment/getComments`, values, { headers: header })
        .then((res) => callback(res));
    console.log(request);
    return {
        type: FETCH_COMMENTS,
        payload: request
    }
}

//Delete Comment By Id
export function deleteComment(id, callback) {
    console.log('edit Id---')
    console.log(header, id);
    const request = axios.delete(`${apiUrl}/comment/deleteComment`, { params: { id }, headers: header })
        .then((res) => callback(res));

    return {
        type: DELETE_COMMENT,
        payload: request
    }
}


//Add like for comment
export function addLike(id, values, callback) {
    console.log('like Id---')
    console.log(header, id);
    const request = axios.post(`${apiUrl}/comment/addLikeDislike`,values, { params: { id }, headers: header })
        .then((res) => callback(res));

    return {
        type: ADD_LIKE,
        payload: request
    }
}

