import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { BASE_URL_DEV, fetchAuth } from "../utils";
import { UserContext } from "../App";

const Login = () => {
  const history = useHistory();
  const { dispatch } = useContext(UserContext);

  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const auth = fetchAuth();
    if (auth && auth.authToken && auth.userPublicId) {
      history.push("/dashboard");
      console.log(auth);
    }
  }, [history]);

  const loginUser = async (e) => {
    e.preventDefault();
    if (!userDetails.username || !userDetails.password) return null;
    const response = await fetch(`${BASE_URL_DEV}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "Authorization",
      },
      body: JSON.stringify(userDetails),
    });
    const json = await response.json();
    console.log(json);
    if (response.ok) {
      dispatch({ type: "AUTH", payload: json });
      history.push("/dashboard");
    }
  };

  return (
    <div className="mt-5 auth-page" style={{ height: "85vh" }}>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="card text-left py-5 my-5 bg-dark px-4 px-sm-5">
              <div className="brand-logo">
                <img src={require("../images/logo.svg")} alt="logo" />
              </div>
              <h4>Hello! let's get started</h4>
              <h6 className="font-weight-light">Sign in to continue.</h6>
              <Form className="pt-3">
                <Form.Group className="d-flex search-field">
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    size="lg"
                    className="h-auto"
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        username: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="d-flex search-field">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    size="lg"
                    className="h-auto"
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        password: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <div className="mt-3">
                  <Button
                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    onClick={loginUser}
                  >
                    SIGN IN
                  </Button>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-primary">
                    Create
                  </Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
