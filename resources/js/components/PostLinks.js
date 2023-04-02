import ListGroup from "react-bootstrap/ListGroup";
import {Link} from "react-router-dom";

function PostLinks() {
  return (
    <ListGroup horizontal defaultActiveKey="#link1">
      <ListGroup.Item as={Link} to="/posts" action href="#link1">
        Posts
      </ListGroup.Item>
      <ListGroup.Item as={Link} to="/posts/post" action href="#link2">
        New Post
      </ListGroup.Item>
      <ListGroup.Item as={Link} to="/login" action href="#link3">
        Sort Post
      </ListGroup.Item>
    </ListGroup>
  );
}
export default PostLinks;
