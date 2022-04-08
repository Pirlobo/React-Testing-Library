import axios from 'axios';
const USER_API_BASE_URL = "https://jsonplaceholder.typicode.com/users";

class UserService {

    getUsers(){
        return axios.get(USER_API_BASE_URL);
    }

    getUserById(userId){
        return axios.get(USER_API_BASE_URL + '/' + userId);
    }

    getUserPostsById(userId){
        return axios.get(USER_API_BASE_URL + '/' + userId + '/posts');
    }

    updatePostById(post, postId){
        return axios.put(USER_API_BASE_URL + '/' + postId, post);
    }

}

export default new UserService()