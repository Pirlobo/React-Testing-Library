import React, { useState, useEffect } from "react";
import CommentService from "../../services/CommentService";
import CreateNewComment from "../modals/CreateNewComment";

const CreateComment = (props) => {
  const [comments, setComments] = useState([]);
  const [isCreateNewComment, setIsCreateNewComment] = useState(false);
  useEffect(() => {
    CommentService.getCommentsByPostId(props.match.params.id).then((res) => {
      setComments(res.data);
    });
  }, []);

  const createNewCommentOnModal = () => {
    setIsCreateNewComment(true);
  };

  const createNewCommentFunc = (comment, postId) => {  
    let obArr = [];
    comments.map((comment) => {
        obArr.push(comment);
    })
    obArr.push(comment);
    setComments(obArr);
  };

  const onCancel = () => {
    setIsCreateNewComment(false);
  };

  return (
    <div>
      <button
        style={{ marginTop: "1rem", marginBottom: "1rem" }}
        onClick={() => createNewCommentOnModal(props.match.params.id)}
        className="btn btn-info"
      >
        Create{" "}
      </button>
      <div className="row">
        <CreateNewComment
          commentObjectForTesting = {props.validatedValues != null ? props.validatedValues : null}
          postId={props.match.params.id}
          isCreateNewComment={isCreateNewComment}
          onCancel={onCancel}
          createNewComment={createNewCommentOnModal}
          createNewCommentFunc={createNewCommentFunc}
        ></CreateNewComment>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Body</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => (
              <tr data-testid={`comment-item-${comment.id}`} key={index}>
                <td> {comment.id} </td>
                <td> {comment.name} </td>
                <td> {comment.body}</td>
                <td> {comment.email}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateComment;
