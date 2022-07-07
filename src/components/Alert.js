import React, { memo } from "react";

function Alert({ type, close, alert }) {
  let alertIcon;
  switch (type) {
    case "warning":
      alertIcon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-amber-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      );
      break;
    case "error":
      alertIcon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"
          />
        </svg>
      );
      break;
    case "success":
      alertIcon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-green-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      );
      break;
    case "info":
      alertIcon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-sky-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
      break;
    default:
      alertIcon = "";
      break;
  }

  return (
    <div className="w-full m-auto fixed left-0 right-0 top-0 bottom-0 max-h-full flex items-center justify-center z-50 bg-[rgba(0,0,0,0.7)]">
      <div className="flex flex-col p-5 rounded-lg shadow bg-white dark:bg-gray-800 dark:text-white w-1/3 ">
        <div className="flex">
          <div>{alertIcon}</div>
          <div className="ml-3">
            <h2 className="font-semibold">{alert.title}</h2>
            <p className="mt-2 text-sm dark:text-gray-300 leading-relaxed">
              {alert.message}
            </p>
          </div>
        </div>

        <div className="flex justify-end items-center mt-3">
          <button
            onClick={close}
            className="px-4 py-2 ml-2 bg-blue-500 hover:bg-blue-600 text-white dark:bg-gray-700 dark:hover:bg-gray-500 text-sm font-medium rounded-md"
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(Alert);
