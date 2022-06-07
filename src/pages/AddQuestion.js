import React, { useState } from "react";
import { useFormik } from "formik";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { firestore, storage } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";

export default function AddQuestion() {
  const [uploadImage, setUploadImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const types = ["image/png", "image/jpeg"];

  const initialValues = {
    question: "",
    answers: [
      {
        answer: "",
        isCorrect: false,
      },
    ],
    img: "",
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

  const formik = useFormik({
    initialValues: {
      question: "",
      //   answer_1: "",
      //   answer_2: "",
      //   answer_3: "",
      answers: [
        { answer: "", isCorrectAnswer: "" },
        //   {answer:"", isCorrectAnswer:""},
        //   {answer:"", isCorrectAnswer:""}
      ],
      img: "",
    },
    // validationSchema,
    onSubmit: async (values, bag) => {
      try {
        console.log(values);
        // const imgUrl = await uploadImageToStorage(uploadImage);
        // values["img"] = imgUrl;
        // const docRef = await addDoc(collection(firestore, "questions"), values);
        // setIsComplete(true);
      } catch (e) {
        bag.setErrors({ general: e.response.data.message });
        console.log(e);
      }
    },
  });

  return (
    <div className="container mx-auto p-4">
      <div className="w-full md:w-1/2 lg:w-1/3 mx-auto my-12">
        <h1 className="text-lg font-bold">Add Question</h1>
        {!isComplete ? (
          <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
              const imgUrl = await uploadImageToStorage(uploadImage);
              values["img"] = imgUrl;
              const docRef = await addDoc(collection(firestore, "questions"), values);
              setIsComplete(true);
              // alert(JSON.stringify(values, null, 2));
            }}
          >
            {({ values }) => (
              <Form>
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
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                    ) : (
                      <img src={previewImage} alt="Upload Preview" />
                    )}
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleChamgeImage}
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
                  placeholder="Write Your Question"
                  className="input input-bordered w-full mb-5"
                />
                <FieldArray name="answers">
                  {({ remove, push }) => (
                    <div>
                      {values.answers.length > 0 &&
                        values.answers.map((answer, index) => (
                          <div className="row" key={index}>
                            <div className="flex justify-between items-center mb-5">
                              <Field
                                type="text"
                                name={`answers.${index}.answer`}
                                placeholder={`${index+1}. Answer`}
                                className="input input-bordered w-2/3 mr-4"
                              />
                              <div
                                className="tooltip tooltip-right"
                                data-tip="If this answer correct, so clicked it."
                              >
                                <Field
                                  type="radio"
                                  name={`answers.isCorrect`}
                                  className="radio radio-accent"
                                  checked={values.answers[index].isCorrect}
                                  onClick={(e) => {
                                    e.target.checked = true;
                                    values.answers.map((answer,index) => answer.isCorrect = false);
                                    values.answers[index].isCorrect = true;
                                  }}
                                />
                              </div>
                              <button
                                type="button"
                                className="btn btn-outline"
                                onClick={() =>
                                  values.answers.length !== 2
                                    ? remove(index)
                                    : alert("Minimum answer section..!")
                                }
                              >
                                X
                              </button>
                            </div>
                          </div>
                        ))}
                      <button
                        type="button"
                        className="btn btn-outline btn-accent capitalize"                        
                        onClick={() =>
                          values.answers.length !== 5
                            ? push({ answer: "", isCorrect: "" })
                            : alert("Maximum answer section..!")
                        }
                      >
                        Add More Answer
                      </button>
                    </div>
                  )}
                </FieldArray>
                <button
                  type="submit"
                  className="btn btn-accent w-full mt-5"
                  onClick={(e) => e.target.classList.add("loading")}
                >
                  Send
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