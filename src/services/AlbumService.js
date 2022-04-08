import axios from 'axios';
const ALBUM_API_BASE_URL = "https://jsonplaceholder.typicode.com/users/";

class CommentService {

    getAlbums(userId) {
        return axios.get(ALBUM_API_BASE_URL +  userId + '/albums');
    }

    getPhotoUrl(albumId) {
        return axios.get("https://jsonplaceholder.typicode.com/albums/" +  albumId + '/photos');
    }

}

export default new CommentService();