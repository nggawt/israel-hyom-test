import React, {useEffect, useState} from "react";
import {
  createSearchParams,
  useSearchParams,
} from "react-router-dom";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import {Spinner} from "react-bootstrap";
import CreatePost from "./CreatePost";
import PaginatePosts from "../../components/PaginatePosts";

import {
  useGetPostsQuery,
} from "../../redux/post_store/PostSlice";

import PostsCarousel from "../../components/PostsCarousel";
import UseLogout from "../../hooks/UseLogout";

const REACT_VERSION = React.version;

// defualt per page input for api request
const requestParams = {
  per_page: 20
};

// responsable for view posts
function PostComponent() {

  const logout = UseLogout();
  // handle geting url query more easly
  const [searchParams, setSearchParams] = useSearchParams();
  // define active tabe whatere is posts or new post tab
  const [activeTab, setActiveTab] = useState(
    searchParams.get("active-tab") || "posts"
  );
  // define current page id
  const [pageId, setPageId] = useState(searchParams.get("pageId") || "1");
  const [loading, setLoading] = useState(true);

  // api call to a backend with request parameters (per_pag && pageId)
  const {
    data: postsEntity,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery(
    {...requestParams, page: pageId},
    {
      //pollingInterval: 20000,
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );
  // get from api response posts data and select with pageId latest call data
  const posts = postsEntity?.entities
    ? postsEntity?.entities[pageId]
    : postsEntity;

  // if we have erros from api backend call we abort controller
  // to prevent infinite loop or errors
  useEffect(() => {
    const abortController = new AbortController();

    if (!loading && isError && error.status === 404) logout();
    else setLoading(false);

    return () => abortController.abort();
  }, [isError]);

  // handle get post from api by changing pageId state
  const getPosts = (e, item) => {
    if (e && e.target) e.preventDefault();

    let url = new URL(window.location);
    let params = new URLSearchParams(url.search);
    params.set("pageId", item.label);
    setSearchParams(createSearchParams(params));
    setPageId(item.label);
  };

  // handle selection of tabs whethere is posts or new post tab
  const handleOnSelect = (tabName) => {
    setSearchParams(createSearchParams({["active-tab"]: tabName}), {
      replace: true,
    });
    setActiveTab(tabName);
  };

  // define variable hats hold result of data or content
  let content;

  // if api response not complated and isLoading state is true we return spinner
  if (isLoading) {
    content = (
      <Spinner
        className="d-flex justify-content-center"
        animation="grow"
        variant="success"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  } else if (isSuccess && posts) {
    // if api response is successs hold result of PostsCarousel and
    // PaginatePosts inside tabs
    content = (
      <Tabs
        defaultActiveKey={activeTab}
        transition={true}
        onSelect={handleOnSelect}
        id="posts-tabs"
        className="mb-3"
      >
        <Tab eventKey="posts" title="Posts">
          <PostsCarousel
            postsData={posts}
            onSelectPage={getPosts}
          />
          <PaginatePosts
            posts={posts}
            onSelectPage={getPosts}
          />
        </Tab>
        <Tab eventKey="new_post" title="New Post">
          <CreatePost posts={posts} />
        </Tab>
      </Tabs>
    );
  } else if (!isLoading && isError) {
    // if we have any error we convert error object to a string and asign into
    // content variable
    content = (
      <p>{error ? JSON.stringify(error) : "Errors Was Occur.!!!"}</p>
    );
  }

  // return result of content variable inside div element 
  return (
    <div className="col-sm-12">
      <div>
        <p className="h4">React Version: {REACT_VERSION}</p>
        <p className="h6">
          Total Posts: <span>{posts?.total}</span>
        </p>
      </div>
      {content}
    </div>
  );
}
export default PostComponent;
