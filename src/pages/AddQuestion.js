import React, { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { firestore, storage } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import { useAutoAnimate } from "@formkit/auto-animate/react";
// import CheckBox from "../components/CheckBox";

export default function AddQuestion() {
  const [uploadImage, setUploadImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { userId } = useAuth();
  const types = ["image/png", "image/jpeg"];
  const { t } = useTranslation();
  const [animationParent] = useAutoAnimate();
  const [animationParent2] = useAutoAnimate();
  const [checkBoxes, setCheckBoxes] = useState(["checkBox-0"]);
  const [formError, setFormError] = useState(null);

  const initialValues = {
    question: "",
    answers: [
      {
        answer: "",
        isCorrect: false,
      },
    ],
    file: null,
    userId: userId,
  };

  const handleChamgeImage = (e) => {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
    setUploadImage(e.target.files[0]);
  };

  const uploadImageToStorage = async (file) => {
    if (!file) return;
    const storageRef = ref(storage, `questions/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => {
        console.log(error);
        setIsUploaded(false);
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setIsUploaded(true);
        });
      }
    );

    return uploadTask.then(async (res) => {
      return await getDownloadURL(uploadTask.snapshot.ref).then(
        (downloadURL) => {
          return downloadURL;
        }
      );
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="w-full md:w-1/2 lg:w-1/3 mx-auto my-12">
        <h1 className="text-lg font-bold">{t("add_question")}</h1>
        {!isComplete ? (
          <Formik
            initialValues={initialValues}            
            onSubmit={async (values, bag) => {
              try {
                const imgUrl = await uploadImageToStorage(uploadImage);
                values["img"] = imgUrl;
                const docRef = await addDoc(
                  collection(firestore, "questions"),
                  values
                );
                setIsComplete(true);
              } catch (e) {
                bag.setErrors({ general: e.response.data.message });
                console.log(e);
              }
            }}
          >
            {({ values, errors, touched }) => (
              <Form>
                <div ref={animationParent2}>
                  {formError && (
                    <div className="bg-gray-700 py-8 px-4 rounded-lg mb-5">
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
                        {formError}
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-center w-full mb-5 relative">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col overflow-hidden items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    {uploadImage === null ? (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-10 h-10 mb-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">
                            {t("file_upload1")}
                          </span>{" "}
                          {t("or")} {t("file_upload2")}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG {t("or")} GIF (MAX. 800x400px)
                        </p>
                      </div>
                    ) : (
                      <img src={previewImage} alt="Upload Preview" />
                    )}
                    <input
                      id="dropzone-file"
                      type="file"
                      name="file"
                      className="opacity-0"
                      onChange={handleChamgeImage}
                      required
                    />
                  </label>
                  {progress > 0 && (
                    <progress
                      className="progress progress-accent absolute left-0 right-0 bottom-0"
                      value={progress}
                      max="100"
                    ></progress>
                  )}
                </div>
                <Field
                  type="text"
                  name="question"
                  placeholder={t("write_your_question")}
                  className="input input-bordered w-full mt-5"
                  required
                />
                <FieldArray name="answers">
                  {({ remove, push }) => (
                    <div ref={animationParent}>
                      {values.answers.length > 0 &&
                        values.answers.map((answer, index) => (
                          <div className="row" key={index}>
                            <div className="flex justify-between items-center mt-5">
                              <Field
                                type="text"
                                name={`answers.${index}.answer`}
                                placeholder={`${index + 1}. ${t("answer")}`}
                                className="input input-bordered w-2/3 mr-4"
                                required
                              />
                              <div
                                className="tooltip tooltip-right"
                                data-tip={t("check_true_answer")}
                              >
                                <Field
                                  type="radio"
                                  name={`answers.isCorrect`}
                                  className="radio radio-accent"
                                  checked={values.answers[index].isCorrect}
                                  onClick={(e) => {
                                    e.target.checked = true;
                                    values.answers.map(
                                      (answer, index) =>
                                        (answer.isCorrect = false)
                                    );
                                    values.answers[index].isCorrect = true;
                                  }}
                                />
                                {/* <div
                                  className="checkBox-wrapper"
                                  style={{ height: "50px", width: "50px" }}
                                >
                                  <CheckBox
                                    id={`checkBox-${index}`}
                                    checkBoxes={checkBoxes}
                                    setCheckBoxes={setCheckBoxes}
                                  />
                                </div> */}
                              </div>
                              <button
                                type="button"
                                className="btn btn-outline"
                                onClick={() =>
                                  values.answers.length !== 2
                                    ? remove(index)
                                    : setFormError("The question must have at least 2 answers")
                                }
                              >
                                X
                              </button>
                            </div>
                          </div>
                        ))}
                      <button
                        type="button"
                        className="btn btn-outline btn-accent capitalize mt-5"
                        onClick={() => {
                          values.answers.length !== 5
                            ? push({ answer: "", isCorrect: "" })
                            : setFormError("The question must have at most 5 answers");

                          const lastCheckbox = checkBoxes.slice(-1);
                          const lastIndex = lastCheckbox
                            .toString()
                            .split("-")[1];
                          const newCheckbox =
                            "checkBox-" + (parseInt(lastIndex) + 1);
                          setCheckBoxes([...checkBoxes, newCheckbox]);
                        }}
                      >
                        {t("add_more_answer")}
                      </button>
                    </div>
                  )}
                </FieldArray>
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
              Added your question
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
