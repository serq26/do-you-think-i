import React, { useState } from "react";
import { useFormik } from "formik";
import { loginValidations } from "../validations";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { signinWith } from "../firebase/firebase";
import Alert from "../components/Alert";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Login() {
  const { user, setUser } = useAuth();
  const [alert, setAlert] = useState({ title: "", message: "" });
  const [alertStatus, setAlertStatus] = useState(false);
  const [loading, setLoading] = useState("");
  const [firebaseError, setFirebaseError] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [animationParent] = useAutoAnimate();

  const handleSignin = async (signInMethod) => {
    const { user, result, error } = await signinWith(signInMethod);
    if (user) navigate("/profile", { state: result._tokenResponse });

    if (
      error !== undefined &&
      error.errorCode === "auth/account-exists-with-different-credential"
    ) {
      setAlertStatus(true);
      setAlert({
        title: "Login Failed",
        message:
          "You have already registered before with another signin methods. Please try logging in with the login method you registered with.",
      });
    }
  };

  const closeAlertWindow = () => {
    setAlertStatus(false);
    setAlert({ title: "", message: "" });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidations,
    onSubmit: async (values, bag) => {
      try {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, values.email, values.password)
          .then((userCredential) => {
            // Signed in
            // const user = userCredential.user;
            // setUser(userCredential.user);
            setLoading("loading");
            window.localStorage.setItem("emailForSignIn", user.email);
            navigate("/");
          })
          .catch((error) => {
            setFirebaseError(error.message);
          });
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
    <div className="flex justify-center h-screen">
      {alertStatus && (
        <Alert type="warning" close={closeAlertWindow} alert={alert} />
      )}
      <div className="md:w-1/2 xs:w-full flex items-center justify-center flex-col">
        <div>
          <div>
            <span className="font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-200">
              Do You Think I
            </span>
            <h2 className="text-2xl font-bold dark:text-white text-gray-600 mt-1">
              {t("welcome")}
            </h2>
          </div>
          <div className="mt-8">
            <label className="mb-3 block font-medium text-gray-400">
              {t("login_with")}
            </label>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={async () => await handleSignin("google")}
                className="w-full border-2 text-gray-200 hover:bg-white hover:text-gray-900 transition-all duration-1000 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
              >
                <svg
                  className="w-5 h-5 "
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
              </button>
              <button
                type="button"
                onClick={async () => await handleSignin("twitter")}
                className="text-gray-200 hover:bg-white hover:text-gray-900 transition-all duration-1000 w-full border-2 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2"
              >
                <svg
                  className="w-5 h-"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="twitter"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"
                  ></path>
                </svg>
              </button>
              <button
                type="button"
                onClick={async () => await handleSignin("github")}
                className="text-gray-200 hover:bg-white hover:text-gray-900 transition-all duration-1000 w-full border-2 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="github"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                >
                  <path
                    fill="currentColor"
                    d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div>
            <span className="text-center relative block m-4 text-gray-400 before:absolute before:w-[26%] before:h-[1px] before:bg-gray-400 before:top-0 before:bottom-0 before:block before:my-auto after:absolute after:w-[26%] after:h-[1px] after:bg-gray-400 after:right-0 after:top-0 after:bottom-0 after:block after:my-auto">
              {t("or_continue_with")}
            </span>
          </div>
          <div ref={animationParent}>
            {firebaseError && (
              <div className="bg-gray-700 py-8 px-4 rounded-lg">
                <p className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    style={{ color: "red", marginRight: 4 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {firebaseError === "Firebase: Error (auth/wrong-password)." &&
                    "E-mail or password is incorrect."}
                </p>
              </div>
            )}
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label className="block mt-6 mb-1 text-md label font-semibold">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="input input-bordered w-full max-w-xs text-md text-gray-200"
              />
              <div>
                {formik.errors.email && formik.touched.email && (
                  <div style={{ color: "red" }}>{formik.errors.email}</div>
                )}
              </div>
            </div>
            <div>
              <label className="block mt-6 mb-1 text-md label font-semibold">
                {t("password")}
              </label>
              <input
                className="input input-bordered w-full max-w-xs text-md text-gray-200"
                type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <div>
                {formik.errors.password && formik.touched.password && (
                  <div style={{ color: "red" }}>{formik.errors.password}</div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between mt-5">
              <div className="flex items-center">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                    />
                    <span className="label-text ml-2 font-medium">
                      {t("remember_me")}
                    </span>
                  </label>
                </div>
              </div>

              <div className="text-sm">
                <a
                  href="/#"
                  className="text-[14px] text-indigo-600 hover:text-indigo-500 font-medium"
                >
                  {t("forgot_password")}
                </a>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full mt-5 capitalize"
              onClick={(e) => {
                if (
                  formik.values.email !== "" &&
                  formik.values.password !== "" &&
                  loading !== "" &&
                  firebaseError === ""
                ) {
                  e.target.classList.add(loading);
                }
              }}
              disabled={
                formik.errors.password || formik.errors.email ? true : false
              }
            >
              {t("login")}
            </button>
          </form>
        </div>
      </div>
      <div className="md:w-1/2 md:block xs:hidden">
        <img
          src="https://source.unsplash.com/random/?wallpapers"
          alt="Wallpapers"
          className="h-screen bg-cover w-full"
        />
      </div>
    </div>
  );
}
