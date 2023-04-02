import {Card} from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

function PostsCarousel({postsData: posts, onSelectPage}) {
  // define a pagination state varibles
  const last_page = posts.last_page;
  const current_page = posts.current_page;
  let next_page = current_page + 1;
  let next_url = posts.next_page_url;
	const port = process.env.NODE_ENV === "development" ? ":"+window.location.port:null;
	
  // function for transform single dimantion array into multidimantion
  const twoDarray = (arr, totalPerArray) => {
    let i = 0;
    let twoDimension = []; // Store the generated two D array
    let tempArr = [...arr]; // Avoid modifying original array

    while (i < arr.length) {
      let subArray = []; // Store 2D subArray

      for (var j = 0; j < totalPerArray; j++) {
        if (tempArr.length) subArray.push(tempArr.shift());
      }

      twoDimension[twoDimension.length] = subArray;
      i += totalPerArray;
    }
    return twoDimension;
  }

  // handle api call to next page when crousel ends view all posts 
  const nextPage = (e) => {

    if (e == 0 || e == posts.per_page && current_page == last_page) {

      if (current_page === last_page) {
        next_page = 1;
        next_url = posts.first_page_url;
      }
      onSelectPage(false, {label: next_page, url: next_url});
    }
  }

  // multidimantion array of posts
  const postsArrs = twoDarray(posts.data, 2);

  // return infinite crousel sycle with post data inside cards component
  return (
    <Carousel
      variant="dark"
      controls={false}
      interval={6000}
      onSlide={(e) => nextPage(e)}
      indicators={false}
    >
    	{/*looping first array*/}
      {postsArrs.map((postsArr, index) => (
        < Carousel.Item
          key={index}
          style={{
            border: "none",
            borderTop: "gray solid 1px"
          }}
        >
        {/* looping second array and return data view */}
          {postsArr.map((post, idx) => (
            <Card
              key={post.id + "" + idx}
              style={{
                borderLeft: "none",
                borderRight: "none",
                borderTop: "none"
              }}
            >
              <Card.Img
                variant="top"
                src={post?.writer?.image_url}
                style={{
                  width: "150px",
                  height: "120px",
                  padding: ".2rem"
                }}
              />
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>
                  {post.content}
                </Card.Text>
              </Card.Body>
              <Card.Body>
                <Card.Link href={post.url + port + "/posts/" + post.id}>Read More</Card.Link>
              </Card.Body>
            </Card>))}
        </Carousel.Item >

      ))}
    </Carousel >
  );
}

export default PostsCarousel;
