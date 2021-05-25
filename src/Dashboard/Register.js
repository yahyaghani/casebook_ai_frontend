import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { BASE_URL_DEV, fetchAuth } from "../utils";

const Register = () => {

  const history = useHistory();

  const [userDetails, setUserDetails] = React.useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  useEffect(() => {
    const auth = fetchAuth();
    if (auth && auth.authToken && auth.userPublicId) {
      history.push("/dashboard");
      console.log(auth);
    }
  }, [history]);

  const registerUser = async (e) => {
    e.preventDefault();
    if(!userDetails.username || !userDetails.email || !userDetails.password1 || !userDetails.password2) return null;
    if(userDetails.password1 !== userDetails.password2) return null;
    console.log(userDetails);
    const response = await fetch(`${BASE_URL_DEV}/api/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userDetails),
    });
    const json = await response.json();
    console.log(json);
    if(response.ok) {
      history.push('/login');
    }
  };

  return (
    <div className="mb-2 auth-page">
      <div className="d-flex align-items-center auth px-0 h-100">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="card text-left py-5 my-5 bg-dark px-4 px-sm-5">
              <div className="brand-logo">
                <img src={require("../images/logo.svg")} alt="logo" />
              </div>
              <h4>New here?</h4>
              <h6 className="font-weight-light">
                Signing up is easy. It only takes a few steps
              </h6>
              <form className="pt-3">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="inputUsername1"
                    placeholder="Username"
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        username: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="inputEmail1"
                    placeholder="Email"
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    id="inputPassword1"
                    placeholder="Password"
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        password1: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    id="inputConfirmPassword1"
                    placeholder="Confirm Password"
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        password2: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mt-3">
                  <Button
                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    onClick={registerUser}
                  >
                    SIGN UP
                  </Button>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary">
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
