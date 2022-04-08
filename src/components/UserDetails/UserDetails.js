import React, { useState, useEffect } from "react";
import UserService from "../../services/UserService";
import PostService from "../../services/PostService";
import AlbumService from "../../services/AlbumService";
import "antd/dist/antd.css";
import ViewComments from "../modals/ViewComments";
import UpdatePost from "../modals/UpdatePost";

const UserDetails = (props) => {
  const [user, setUser] = useState({});
  const [address, setAddress] = useState({});
  const [geo, setGeo] = useState({});
  const [company, setCompany] = useState({});
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([{}]);
  const [isViewComments, setIsViewComments] = useState(false);
  const [isUpdatePost, setIsUpdatePost] = useState(false);
  const [updatedPost, setUpdatedPost] = useState({});
  const [albums, setAlbums] = useState([]);
  const handleClick = (id) => {
    props.history.push('/albums/' + id + '/photos');
  };
  const onCreateComment = (postId) => {
    props.history.push('/posts/' + postId + '/comments');
  }
  const updatePostOnModal = (post) => {
    setUpdatedPost(post);
    setIsUpdatePost(true);
  }
  const updatePostFunc = (post, postId) => {
    let objIndex = posts.findIndex((post => post.id === postId));
    posts[objIndex].id = post.id
    posts[objIndex].userId = post.userId
    posts[objIndex].title = post.title
    posts[objIndex].body = post.body
    setPosts(posts);
  }
  
  const cancelUpdatePost = () => {
      setIsUpdatePost(false);
  }

  const viewCommentsModal = (postId) => {
    PostService.getCommentsByPostId(postId).then((res) => {
        console.log(res.data)
        setComments(res.data)
      });
    setIsViewComments(true);
  }
  const deletePost = (postId) => {
    PostService.deletePostById(postId).then(res => {
        console.log(res.data)
        setPosts(posts.filter(post => post.id !== postId))
    });
}
  const cancelViewComments = () => {
    setIsViewComments(false);
  }

  

  useEffect(() => {
    UserService.getUserPostsById(props.match.params.id).then((res) => {
      setPosts(res.data);
    });
    AlbumService.getAlbums(props.match.params.id).then((res) => {
        setAlbums(res.data);
    })
  }, []);
  useEffect(() => {
    UserService.getUserById(props.match.params.id).then((res) => {
      setUser(res.data);
      setAddress(res.data.address);
      setCompany(res.data.company);
      setGeo(res.data.address.geo);
    });
  }, []);
  return (
    <div className="vertical">
        <div className="flex">
    <ViewComments 
    comments = {comments}
    isViewComments = {isViewComments} 
    onCancel = {cancelViewComments}>
    </ViewComments>
    <UpdatePost
    updatedPostObject = {props.validatedValues}
    updatePostFunc = {updatePostFunc}
    updatedPost = {updatedPost}
    isUpdatePost = {isUpdatePost} 
    onCancel = {cancelUpdatePost}
    ></UpdatePost>
      <div className="created-card" data-testid={`user-details-${user.id}`}>
        <h3 className="text-center">User Profile</h3>
        <div className="card-body">
          <div className="row">
            <label> Id: </label>
            <div id="detail"> {user.id}</div>
          </div>
          <div className="row">
            <label> Fullname: </label>
            <div id="detail"> {user.name}</div>
          </div>
          <div className="row">
            <label> Username: </label>
            <div id="detail"> {user.username}</div>
          </div>
          <div className="row">
            <label> Email: </label>
            <div id="detail"> {user.email}</div>
          </div>

          <div className="row">
            <label> Phone: </label>
            <div id="detail"> {user.phone}</div>
          </div>
          <div className="row">
            <label> Website: </label>
            <div id="detail"> {user.website}</div>
            <div id="detail"> {}</div>
          </div>
          <div className="row">
            <h6> Address: </h6>
            <ul>
              <li>Street: {address.street}</li>
              <li>Suite: {address.suite}</li>
              <li>City: {address.city}</li>
              <li>Zipcode: {address.zipcode}</li>
              <div className="row">
                <h6>Geometry: </h6>
                <ul>
                  <li>lat: {geo.lat}</li>
                  <li>lng: {geo.lng}</li>
                </ul>
              </div>
            </ul>
          </div>

          <div className="row">
            <h6> Company: </h6>
            <ul>
              <li>Street: {company.name}</li>
              <li>Catch Phrase: {company.catchPhrase}</li>
              <li>BS: {company.bs}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="posts-section">
      <h3 className="text-center">User Posts</h3>
        <div className="search-container">
          <form action="/search" method="get">
            <input
              className="search"
              id="searchleft"
              type="search"
              name="q"
              placeholder="Search"
            ></input>
            <label className="button searchbutton" for="searchleft">
              <span className="mglass">&#9906;</span>
            </label>
          </form>
        </div>

        <div className="row">
          <div className="scrollable">
            <table
              id="post"
              style={{ height: "300px" }}
              className="table table-striped table-bordered"
            >
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Title</th>
                  <th>Body</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, index) => (
                  <tr data-testid={`post-item-${post.id}`} key={index}>
                    <td className="has-details"> {post.id} </td>
                    <td className="has-details"> {post.title} </td>
                    <td className="has-details"> {post.body} </td>
                    <td>
                    <button
                        id="postbtn"
                        onClick={() => onCreateComment(post.id)}
                        className="btn btn-info"
                      >
                        Create comment{" "}
                      </button>
                      <button
                        data-testid={`update-btn-${post.id}`}
                        id="postbtn"
                        onClick={() => updatePostOnModal(post, post.id)}
                        className="btn btn-info"
                      >
                        Update
                      </button>
                      <button
                        data-testid={`delete-btn-${post.id}`}
                        id="postbtn"
                        onClick={() => deletePost(post.id)}
                        className="btn btn-info"
                      >
                        Delete{" "}
                      </button>
                      <button
                        id="postbtn"
                        onClick={() => viewCommentsModal(post.id)}
                        className="btn btn-info"
                      >
                        Comments{" "}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>


    <div>
        
    </div>



    <div style={{ marginTop: "4rem" }} className="scrollable">
    <h3 className="text-center">User Albums</h3>
    <table
              id="post"
              style={{ height: "300px" }}
              className="table table-striped table-bordered"
            >
              <thead>
                <tr>
                  {/* <th>UserId</th> */}
                  <th>Id</th>
                  <th>Title</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {albums.map((album, index) => (
                  <tr data-testid={`album-item-${album.id}`} key={index}>
                    {/* <td className="has-details"> {album.userId} </td> */}
                    <td className="has-details"> {album.id} </td>
                    <td className="has-details"> {album.title} </td>
                    <td>
                  
                      <button
                        id="postbtn"
                        onClick={() => handleClick(album.id)}
                        className="btn btn-info"
                      >
                         Photos{" "}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    </div>
  );
};

export default UserDetails;
