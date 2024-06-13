import React from "react";
import RoomIcon from "@mui/icons-material/Room";

const Register = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
      <div className="p-8 bg-white rounded-md shadow-lg">
        <div className="flex items-center mb-4">
          <RoomIcon className="w-8 h-8 text-blue-500" />
          <div className="ml-2 text-lg font-semibold text-gray-800">mapPin</div>
        </div>
        <form className="space-y-4">
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold text-gray-700">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
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
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white transition duration-300 bg-blue-500 rounded shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Register
          </button>
          {/* Success message */}
          <span className="text-green-500">Successful. You can log in now</span>
          <br />
          {/* Error message */}
          <span className="text-red-500">Something went wrong</span>
        </form>
      </div>
    </div>
  );
};

export default Register;
