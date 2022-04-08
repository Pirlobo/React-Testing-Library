import axios from 'axios';
const POST_API_BASE_URL = "https://jsonplaceholder.typicode.com/posts/";

class PostService {

    getCommentsByPostId(postId) {
        return axios.get(POST_API_BASE_URL +  postId + '/comments');
    }

    deletePostById(postId){
        return axios.delete(POST_API_BASE_URL + postId);
    }

    updatePost(post, postId){
        return axios.put(POST_API_BASE_URL + postId, post);
    }
}

export default new PostService();