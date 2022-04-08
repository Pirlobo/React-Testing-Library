import React, { useEffect } from "react";
import { Form, Modal, Input } from "antd";
import PostService from "../../services/PostService"

const UpdatePost = (props) => {
  const [form] = Form.useForm();

  const updatePost = (validatedValues) => {
    PostService.updatePost(validatedValues, props.updatedPost.id).then((res) => {
      props.updatePostFunc(res.data, props.updatedPost.id)
      props.onCancel()
    });
  }
  const handleOk = () => {
    form.validateFields().then((validatedValues) => {
      validatedValues = props.updatedPostObject != null ? props.updatedPostObject : validatedValues
      updatePost(validatedValues);
    }).catch((error) => {
      console.log(error)
    })  
  };

  useEffect(() => {
    form.setFieldsValue({
      id: props.updatedPost.id,
      title: props.updatedPost.title,
      body: props.updatedPost.body,
    });
  }, [props.updatedPost]);

  return (
    <div>
      <Modal
        title="Update post"
        visible={props.isUpdatePost}
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
            label="Title"
            name="title"
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
        </Form>
      </Modal>
    </div>
  );
};
export default UpdatePost;