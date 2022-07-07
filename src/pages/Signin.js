import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import { signinValidations } from "../validations";
import { doc, setDoc } from "firebase/firestore";
import { firestore, actionCodeSettings } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendSignInLinkToEmail,
} from "firebase/auth";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Country, State } from "country-state-city";
import { useTranslation } from "react-i18next";

export default function Signin() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [cities, setCities] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const {t} = useTranslation()
  const swiperRef = useRef(null);

  const authentication = getAuth();

  const countries = Country.getAllCountries();
  
  const registerFirebase = (values) => {
    createUserWithEmailAndPassword(
      authentication,
      values.email,
      values.password
    )
      .then(async (userCredential) => {
        delete values.password;
        delete values.password_confirm;
        const userRef = doc(firestore, "users", userCredential.user.uid);
        await setDoc(userRef, values);

        sendSignInLinkToEmail(authentication, values.email, actionCodeSettings)
          .then(() => {            
            setIsComplete(true);
            window.localStorage.setItem("emailForSignIn", values.email);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode +"-"+ errorMessage);
          });
      })
      .catch(alert);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      password_confirm: "",
      name: "",
      surname: "",
      gender: "",
      birthdate: "",
      country: "",
      city: "",
    },
    signinValidations,
    onSubmit: async (values, bag) => {
      try {
        registerFirebase(values);
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
    <div className="flex justify-center h-screen">
      <div
        className="w-1/2 flex items-center justify-center flex-col relative"
        style={{ backgroundColor: "rgb(248,250,252/.6)" }}
      >
        <progress
          class="progress progress-info w-full h-2 absolute top-0 left-0 right-0"
          value={progress}
          max="100"
        ></progress>
        <div>
          <span className="font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-200">
            Do You Think I
          </span>
          <h2 className="text-3xl font-bold dark:text-white text-gray-600 mt-1">
            {t("signin_to_account")}
          </h2>
        </div>
        {!isComplete ? (
          <form onSubmit={formik.handleSubmit} className="w-full">
            <Swiper
              ref={swiperRef}
              className="mySwiper"
              spaceBetween={50}
              slidesPerView={1}
              speed={1200}
              allowTouchMove={false}
            >
              <SwiperSlide>
                <div className="flex justify-between flex-col items-center w-full">
                  <div className="mb-5 w-1/2">
                    <input
                      type="email"
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      placeholder="E-mail"
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="mb-5 w-1/2">
                    <input
                      type="password"
                      name="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      placeholder={t("password")}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="mb-5 w-1/2">
                    <input
                      type="password"
                      name="password_confirm"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password_confirm}
                      placeholder={t("password_confirm")}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary w-1/2 capitalize"
                    onClick={() => {
                      setProgress(progress + 50);
                      swiperRef.current.swiper.slideNext();
                    }}
                  >
                    {t("next")}
                  </button>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="flex flex-col justify-between">
                  <div className="mb-5">
                    <input
                      name="name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      placeholder={t("name")}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </div>
                  <div className="mb-5">
                    <input
                      name="surname"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.surname}
                      placeholder={t("surname")}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </div>
                  <div className="mb-5">
                    <select
                      className="select select-bordered w-full max-w-xs"
                      name="gender"
                      value={formik.values.gender}
                      onChange={formik.handleChange}
                    >
                      <option disabled selected>
                      {t("gender")}
                      </option>
                      <option value="Male">{t("male")}</option>
                      <option value="Female">{t("female")}</option>
                    </select>
                  </div>
                  <div className="mb-5">
                    <div className="form-control w-full">
                      <label class="label">
                        <span class="label-text">{t("birthdate")}</span>
                      </label>
                      <input
                        type="date"
                        name="birthdate"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.birthdate}
                        className="input input-bordered w-full max-w-xs"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary capitalize"
                    onClick={() => {
                      setProgress(progress + 50);
                      swiperRef.current.swiper.slideNext();
                    }}
                  >
                    {t("next")}
                  </button>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="flex flex-col mb-5">
                  <div className="mb-5 form-control w-full max-w-xs">
                    <label class="label">
                      <span class="label-text text-lg">
                      {t("where_live")}
                      </span>
                    </label>
                    <select
                      className="select select-bordered w-full max-w-xs"
                      name="country"
                      onChange={(e) => {
                        setSelectedCountry(e.target.value);
                        formik.values.country =
                          e.target.options[e.target.selectedIndex].text;
                        setCities(State.getStatesOfCountry(e.target.value));
                      }}
                    >
                      <option selected>{t("choose_country")}</option>
                      {countries.map((country, index) => (
                        <option value={country.isoCode} key={index}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-5  form-control w-full max-w-xs">
                    <label class="label">
                      <span class="label-text text-lg">{t("city")}</span>
                    </label>
                    <select
                      className="select select-bordered w-full max-w-xs"
                      name="city"
                      onChange={(e) => (formik.values.city = e.target.value)}
                    >
                      <option selected>{t("choose_city")}</option>
                      {selectedCountry !== null ? (
                        cities.map((city, index) => (
                          <option value={city.name} key={index}>
                            {city.name}
                          </option>
                        ))
                      ) : (
                        <option>Empty</option>
                      )}
                    </select>
                  </div>
                  <button
                    className="btn btn-primary mt-3 capitalize"
                    type="submit"
                    onClick={(e) => e.target.classList.add("loading")}
                  >
                    {t("submit")}
                  </button>
                </div>
              </SwiperSlide>
            </Swiper>
          </form>
        ) : (
          <div class="alert alert-success shadow-lg w-1/2 p-12 flex flex-col items-center justify-center drop-shadow-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-12 w-12 text-white"
              fillRule="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium text-xl w-full text-center ">
              {t("check_email_verify")}
            </span>
          </div>
        )}
      </div>
      <div className="w-1/2">
        <img
          src="https://source.unsplash.com/random/?wallpapers"
          alt="Wallpapers"
          className="h-screen bg-cover w-full"
        />
      </div>
    </div>
  );
}
