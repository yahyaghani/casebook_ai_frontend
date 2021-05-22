import React from "react";
import { BASE_URL_DEV } from "./utils";

const Login = () => {
  const [userDetails, setUserDetails] = React.useState({
    username: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/user/login`, {
      headers: {
        username: userDetails.username,
        password: userDetails.password,
      },
    });
    const json = await response.json();
    console.log(json);
  };

  return (
    <div className="container m-5">
      <form onSubmit={loginUser} method="get">
        <div>
          <label className="text-muted">Username</label>
          <br />
          <input
            value={userDetails.username}
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
                username: e.target.value,
              })
            }
            className="form-control"
            type="text"
            placeholder="testusername"
            required
          />
        </div>

        <div>
          <label className="text-muted">Password</label>
          <br />
          <input
            value={userDetails.password}
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
                password: e.target.value,
              })
            }
            className="form-control"
            type="password"
            placeholder="*******"
            required
          />
        </div>

        <br />
        <input
          onSubmit={loginUser}
          type="submit"
          class="btn btn-outline-danger"
          value="login"
        />
      </form>
    </div>
  );
};

export default Login;
