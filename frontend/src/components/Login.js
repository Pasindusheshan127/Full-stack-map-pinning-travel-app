import React, { useRef, useState } from "react";
import RoomIcon from "@mui/icons-material/Room";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";

const Login = ({ setShowLogin, myStorage, setCurrentUser }) => {
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: nameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        user
      );
      console.log(res.data);
      myStorage.setItem("user", res.data.username);
      setCurrentUser(res.data.username);
      setError(false);
      setShowLogin(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
      <div className="relative p-8 bg-white rounded-md shadow-lg">
        <div className="flex items-center mb-4">
          <RoomIcon className="w-8 h-8 text-blue-500" />
          <div className="ml-2 text-lg font-semibold text-gray-800">
            location Pin
          </div>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold text-gray-700">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              ref={nameRef}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              ref={passwordRef}
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white transition duration-300 bg-blue-500 rounded shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Login
          </button>

          {/* Error message */}
          {error && (
            <span className="block mt-2 text-center text-red-500">
              Something went wrong !
            </span>
          )}
        </form>
        <CancelIcon
          onClick={() => setShowLogin(false)}
          className="absolute w-6 h-6 text-red-500 cursor-pointer top-2 right-2"
        />
      </div>
    </div>
  );
};

export default Login;
