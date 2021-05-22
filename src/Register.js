import React from "react";
import { BASE_URL_DEV } from "./utils";

const Register = () => {
  const [userDetails, setUserDetails] = React.useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    console.log(userDetails);
    const response = await fetch(`http://localhost:5000/api/user/register`, {
      method: "POST",
      body: JSON.stringify(userDetails),
    });
    const json = await response.json();
  };

  return (
    <div className="container m-5">
      <form onSubmit={registerUser}>
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
          <label className="text-muted">Email</label>
          <br />
          <input
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
                email: e.target.value,
              })
            }
            className="form-control"
            type="email"
            placeholder="test@gmail.com"
            required
          />
        </div>
        <div>
          <label className="text-muted">Password</label>
          <br />
          <input
            value={userDetails.password1}
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
                password1: e.target.value,
              })
            }
            className="form-control"
            type="password"
            placeholder="*******"
            required
          />
        </div>
        <div>
          <label className="text-muted">Confirm Password</label>
          <br />
          <input
            value={userDetails.password2}
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
                password2: e.target.value,
              })
            }
            className="form-control"
            type="password"
            placeholder="*****"
            required
          />
        </div>
        <br />
        <input
          onSubmit={registerUser}
          type="submit"
          class="btn btn-outline-danger"
          value="Register"
        />
      </form>
    </div>
  );
};

export default Register;
