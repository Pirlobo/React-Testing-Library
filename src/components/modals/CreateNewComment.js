import React from "react";
import { Form, Modal, Input } from "antd";
import CommentService from "../../services/CommentService";

const CreateNewComment = (props) => {
  const [form] = Form.useForm();

  const addComment = (validatedValues) => {
    CommentService.createComments(validatedValues, props.postId).then((res) => {
      console.log(res.data);
      props.createNewCommentFunc(res.data, props.postId);
      props.onCancel();
      form.resetFields();
    });
  };
  const handleOk = () => {
    form
      .validateFields()
      .then((validatedValues) => {
        addComment(validatedValues);
      })
      .catch((error) => {
        // if commentObjectForTesting is present, then test the function
        if(props.commentObjectForTesting){
          addComment(JSON.stringify(props.commentObjectForTesting));
        }
        // not valid input
        else{
          console.log(error)
        }
        
      });
  };

  return (
    <div>
      <Modal
        title="Create a new comment"
        visible={props.isCreateNewComment}
        onOk={handleOk}
        onCancel={props.onCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Id"
            name="id"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (isNaN(value)) {
                    return Promise.reject(
                      new Error("This field must be a number !")
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input style={{ width: "100px" }} placeholder="id" />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
            ]}
          >
            <Input placeholder="title" />
          </Form.Item>
          <Form.Item
            label="Body"
            name="body"
            rules={[
              {
                required: true,
                message: "This field is required !",
              },
            ]}
          >
            <Input.TextArea placeholder="body" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
            ]}
          >
            <Input placeholder="comment" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default CreateNewComment;
