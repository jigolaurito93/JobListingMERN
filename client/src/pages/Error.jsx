import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  // from react-router-dom, accesses the error property
  const error = useRouteError();
  // 
  console.log(error.status);
  console.log(error.statusText);
  return (
    <div>
      <h1>Error Page</h1>
      <Link to="/">back home</Link>
    </div>
  );
};

export default Error;
