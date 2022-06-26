import React from "react";

export default function Settings() {
  return (
    <div>
      <h1 className="py-4 text-center font-medium text-3xl">
        Settings
      </h1>
      <div className="flex justift-between">
        <div className="px-20 py-10 w-1/2">
          <h2 className="font-medium mb-6 text-xl">Change My E-mail Adress</h2>
          <div class="alert alert-info shadow-lg mb-8 bg-gray-500">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="stroke-current flex-shrink-0 w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span className="text-white font-medium">
                Before you can change your e-mail address, you must first verify
                your current e-mail address. After clicking the Change button,
                we will send a verification code to your e-mail address.
              </span>
            </div>
          </div>
          <span className="mr-3 font-medium">Current E-mail Adress:</span>
          <span className="font-medium bg-gray-300 p-3 text-black">
            asd@mail.com
          </span>
          <button className="btn btn-accent w-full mt-8 block">Change</button>
        </div>
        <div class="divider divider-horizontal"></div>
        <div className="px-20 py-10 w-1/2">
          <h2 className="font-medium mb-6 text-xl">Close My Account:</h2>
          <button class="btn btn-outline btn-error">Close Account</button>
        </div>
      </div>
    </div>
  );
}
