import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Formik, Field, Form, FieldArray } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { firestore, storage } from "../../firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  writeBatch,
} from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import { Country, State } from "country-state-city";
import AccountSkeleton from "../../components/skeletons/AccountSkeleton";

export default function Account() {
  const [isProfileCompleted, setIsProfileCompleted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [user, setUser] = useState({});
  const [selectedCountry, setSelectedCountry] = useState("");
  const [cities, setCities] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { t } = useTranslation();
  const { userId } = useAuth();
  const countries = Country.getAllCountries();

  useEffect(() => {
    const getUser = async () => {
      if (userId) {
        try {
          const docRef = doc(firestore, "users", userId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUser(docSnap.data());
            setLoading(false);
            setIsProfileCompleted(true);
          } else {
            setUser({
              name: state.firstName,
              surname: state.lastName,
              email: state.email,
            });
            setIsProfileCompleted(false);
            setLoading(false);
            console.log("errors");
          }
        } catch (error) {
          setError(error);
          console.log(error);
        }
      }
    };

    getUser();
  }, [userId]);

  useEffect(() => {
    setCities(State.getStatesOfCountry("TR"));
  }, [user]);

  const initialValues = user;

  if (loading) return <AccountSkeleton />;

  if (error)
    return <div>{`There is a problem fetching the post data - ${error}`}</div>;

  return (
    <div className="p-8">
      {!isProfileCompleted && (
        <div className="alert alert-warning shadow-lg mb-6">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span className="font-medium">
              You should fill in your profile information to continue.
            </span>
          </div>
        </div>
      )}
      {!isComplete ? (
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            const batch = writeBatch(firestore);
            const sfRef = doc(firestore, "users", userId);
            batch.update(sfRef, values);
            await batch.commit();
            setIsComplete(true);
          }}
        >
          {({ values }) => (
            <Form>
              <Field
                type="text"
                name="name"
                placeholder="Name"
                className="input input-bordered w-full mb-5"
              />
              <Field
                type="text"
                name="surname"
                placeholder="Surname"
                className="input input-bordered w-full mb-5"
              />
              <Field
                type="text"
                name="email"
                placeholder="E-mail"
                className="input input-bordered w-full mb-5"
              />
              <Field
                name="gender"
                as="select"
                value={values.gender}
                className="input input-bordered w-full mb-5"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Field>
              <Field
                type="date"
                name="birthdate"
                placeholder="Birthdate"
                className="input input-bordered w-full mb-5"
              />
              <Field
                className="input input-bordered w-full mb-5"
                as="select"
                name="country"
                value={values.country}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  values.country =
                    e.target.options[e.target.selectedIndex].text;
                  setCities(
                    State.getStatesOfCountry(
                      e.target.options[e.target.selectedIndex].getAttribute(
                        "code"
                      )
                    )
                  );
                }}
              >
                {countries.map((country, index) => (
                  <option
                    value={country.name}
                    key={index}
                    code={country.isoCode}
                  >
                    {country.name}
                  </option>
                ))}
              </Field>
              <Field
                className="input input-bordered w-full mb-5"
                as="select"
                name="city"
                value={values.city}
                onChange={(e) => {
                  values.city = e.target.value;
                  console.log(e.target.value)
                }}
              >
                {cities.map((city, index) => (
                  <option value={city.name} key={index}>
                    {city.name}
                  </option>
                ))}
              </Field>
              <button
                type="submit"
                className="btn btn-accent w-full mt-5"
                onClick={(e) => e.target.classList.add("loading")}
              >
                {t("send")}
              </button>
            </Form>
          )}
        </Formik>
      ) : (
        <div className="alert alert-success shadow-lg mt-5 p-12 flex flex-col items-center justify-center drop-shadow-xl">
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
          <span className="font-medium text-xl w-full text-center block">
            Updated your question
          </span>
        </div>
      )}
    </div>
  );
}
