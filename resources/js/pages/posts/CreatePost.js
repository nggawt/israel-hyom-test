import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ToastPost from "../../components/ToastComponent";
import {useAddNewPostMutation} from "../../redux/post_store/PostSlice";

function CreatePost() {

  const [addNewPost] = useAddNewPostMutation();
  const [show, setShow] = useState(false);

  {/* define state for form inputs */}
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");

  {/* handle create new post function */}
  const createNewPost = async (e) => {
    e.preventDefault();

    const postData = {
      title,
      content,
      url,
    };

    try {
      const response = await addNewPost(postData).unwrap();
      console.log(response);
      setShow(true);
    } catch (error) {
      console.log(error);
    }
  };

  {/* return create post form with toast masseges */}
  return (
    <>

      {/* show toast masseges when post is succusfully created */}
      <ToastPost
        show={show}
        setShow={setShow}
        masseges={{
          header: "New Post",
          body: "New Post Was Created Succesfully!",
        }}
      />

      {/* use card component to hold create post form */}
      <div className="card">
        <div className="card-header">
          New Post
        </div>
        <div className="card-body">

          {/* create post form */}
          <Form>

            {/* form group for title input */}
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>

              <Form.Control
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </Form.Group>

            {/* form group for Url input */}
            <Form.Group className="mb-3" controlId="Url">
              <Form.Label>Url</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setUrl(e.target.value)}
                value={url}
              />
            </Form.Group>

            {/* form group for Content input */}
            <Form.Group className="mb-3" controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => setContent(e.target.value)}
                value={content}
              />
            </Form.Group>

            {/* submit button */}
            <Button
              variant="primary"
              type="submit"
              onClick={createNewPost}
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
