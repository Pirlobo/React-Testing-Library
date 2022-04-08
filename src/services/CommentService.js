import axios from 'axios';
const POST_API_BASE_URL = "https://jsonplaceholder.typicode.com/posts/";

class CommentService {

    getCommentsByPostId(postId) {
        return axios.get(POST_API_BASE_URL +  postId + '/comments');
    }

    createComments(comment, postId){
        return axios.post(POST_API_BASE_URL +  postId + '/comments', comment);
    }
}

export default new CommentService();