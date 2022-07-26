import React from "react";
import { Link } from "react-router-dom";

export default function WelcomeScreen() {
  return (
    <section className="text-white">
      <div className="w-full px-4 py-12 mx-auto lg:items-center lg:flex">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-extrabold text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
            Solve Fun Picture Questions.
            <span className="sm:block">Enjoy Your Time.</span>
          </h1>

          <p className="max-w-xl mx-auto mt-4 sm:leading-relaxed sm:text-xl">
          In order to have a fun time, you should first <br/>
          register or login as a member.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              className="block w-full px-12 py-3 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded sm:w-auto active:text-opacity-75 hover:bg-transparent hover:text-white focus:outline-none focus:ring"
              to="/signin"
            >
              Signin
            </Link>

            <Link
              className="block w-full px-12 py-3 text-sm font-medium text-white  bg-blue-600 border border-blue-600 rounded sm:w-auto hover:bg-transparent active:bg-blue-500 focus:outline-none focus:ring"
              to="/login"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
