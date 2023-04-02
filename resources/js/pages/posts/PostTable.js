import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "../../css/app.css";
import {Link, useNavigate} from "react-router-dom";
import {FormatToDb} from "../../utils/helpers/Dt";
import React, {useMemo, useState} from "react";
import {useDeletePostMutation} from "../../redux/post_store/PostSlice";
import ToastPost from "../../components/ToastComponent";

const PostTable = ({posts}) => {
  console.log("%cPostTable Posts items: ", "background:orange;", posts);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [deletePost] = useDeletePostMutation();

  const tableClicked = (e, item, action = "view") => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.target, item, posts);
    const url =
      action === "view"
        ? `/posts/${item.id}?page=${posts.current_page}`
        : `/posts/${item.id}/edit-post?page=${posts.current_page}`;
    navigate(url);
  };

  const onDeletePost = async (e, postId) => {
    e.preventDefault();
    e.stopPropagation();

    const postData = {
      id: postId,
      pageId: posts.current_page,
    };

    const response = await deletePost(postData).unwrap();
    console.log("response: ", response);
    if (response.status === true) setShow(true);
  };

  return (
    <>
      <ToastPost
        show={show}
        setShow={setShow}
        masseges={{
          header: "Post",
          body: "Post Was deleted Succesfully!",
        }}
      />
      <Table responsive striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Log in</th>
            <th>Log out</th>
            <th>Total</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {posts &&
            posts.data.map((post) => (
              <tr
                key={post.id}
                onClick={(e) => tableClicked(e, post)}
                style={{
                  cursor: "pointer",
                }}
              >
                <td dir="rtl" className="text-start">
                  {FormatToDb(new Date(post.login_at), true)}
                </td>
                <td>{post.logout_at}</td>
                <td>{post.total}</td>
                <td>
                  <Button
                    to={`${post.id}/edit-post?page=${posts.current_page}`}
                    as={Link}
                    size="sm"
                    variant="outline-warning"
                    onClick={(e) =>
                      tableClicked(e, post, "edit")
                    }
                  >
                    Edit
                  </Button>{" "}
                </td>
                <td>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={(e) =>
                      onDeletePost(e, post.id)
                    }
                  >
                    Danger
                  </Button>{" "}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default PostTable;
