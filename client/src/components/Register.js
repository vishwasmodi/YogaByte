import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/auth";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);

    dispatch(register(name, username, email, password))
      .then(() => {
        props.history.push("/");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const navigate = useNavigate();

  return (
    <div>
      <div class="flex justify-end mr-12 mt-4">
        <button
          onClick={() => navigate("/", { replace: true })}
          class=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Back
        </button>
      </div>
      <div class="flex justify-center min-w-full">
        <form
          class="flex flex-col justify-center  bg-white shadow-md rounded  px-8 py-10 mt-28 w-96 "
          onSubmit={handleRegister}
        >
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="name"
              value={name}
              onChange={onChangeName}
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="username"
              value={username}
              onChange={onChangeUsername}
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="text"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              value={email}
              onChange={onChangeEmail}
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              name="password"
              value={password}
              onChange={onChangePassword}
            />
          </div>

          {message && (
            <div class="mb-3">
              <div class="text-purple-500 text-xs italic" role="alert">
                {message}
              </div>
            </div>
          )}

          <div class="flex items-center justify-between">
            <button
              class="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              <span>Register</span>
              {loading === true ? (
                <svg
                  class=" bg-blue-500 border-t-white border-2 rounded-full animate-spin h-5 w-5 mr-3  ..."
                  viewBox="0 0 24 24"
                ></svg>
              ) : null}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
