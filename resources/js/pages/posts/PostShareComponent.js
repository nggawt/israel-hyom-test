import {Outlet} from "react-router-dom";

const PostShareComponent = () => {
  console.log("%cPostShareComponent-->>> ", "background: rgba(0,0,280,.5)");
  return <Outlet />;
};

export default PostShareComponent;
