import React from "react";
import { Modal } from "antd";

const ViewComments = (props) => {
  const handleOk = () => {
    props.onCancel()
  };

  return (
    <div>
        <Modal title="View Comments" visible={props.isViewComments} onOk={handleOk} onCancel={props.onCancel}>
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
                  <th>Name</th>
                  <th>Body</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {props.comments.map((comment) => (
                  <tr key={comment.id}>
                    <td className="has-details"> {comment.id} </td>
                    <td className="has-details"> {comment.name} </td>
                    <td className="has-details"> {comment.body} </td>
                    <td className="has-details"> {comment.email} </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default ViewComments;
