import ListGroup from "react-bootstrap/ListGroup";
import {Link} from "react-router-dom";

function WriterLinks() {
  return (
    <ListGroup horizontal defaultActiveKey="#link1">
      <ListGroup.Item as={Link} to="/writers" action href="#link1">
        Writers
      </ListGroup.Item>
      <ListGroup.Item as={Link} to="/writers/writer" action href="#link2">
        New Writer
      </ListGroup.Item>
      <ListGroup.Item as={Link} to="/login" action href="#link3">
        Sort Writer
      </ListGroup.Item>
    </ListGroup>
  );
}
export default WriterLinks;
