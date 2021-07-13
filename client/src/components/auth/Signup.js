import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { signUp } from "../../actions";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      signUp({ email, password }, () => {
        history.push("/feature");
      })
    );
  };

  return (
    <div className="mt-5">
      <div className="grid align__item">
        <div className="register">
          <img
            height="100px"
            src="https://avatars.githubusercontent.com/u/67744643?s=200&v=4"
            alt=""
          />

          <h2>Sign Up</h2>

          <form className="form" onSubmit={handleSubmit}>
            <div className="form__field">
              <input
                type="email"
                placeholder="enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form__field">
              <input
                type="password"
                placeholder="enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form__field">
              <input type="submit" value="Sign Up" />
            </div>
          </form>

          <p>
            Already have an account? <Link to="/signin">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
