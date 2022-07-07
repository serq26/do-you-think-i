import { useAuth } from "../../contexts/AuthContext";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import { getMyQuestions } from "../../firebase/firebase";
import QuestionSkeleton from "../../components/skeletons/QuestionSkeleton";

export default function Questions() {
  // const [myQuestions, setMyQuestions] = useState([]);
  const { userId } = useAuth();
  const { data, error, status } = useInfiniteQuery(
    ["myQuestions", userId],
    getMyQuestions
  );

  if (status === "loading")
    return (
      <div className="mt-10 mb-10 grid grid-cols-3 gap-6 px-5">
        <QuestionSkeleton />
        <QuestionSkeleton />
        <QuestionSkeleton />
        <QuestionSkeleton />
        <QuestionSkeleton />
        <QuestionSkeleton />
      </div>
    );

  if (status === "error") return "An error has occurred: " + error.message;

  return (
    <div className="px-5">
      <h1 className="py-4 text-center font-medium text-2xl underline">
        My Questions
      </h1>
      
      <div className="mt-10 grid grid-cols-3 gap-6">
        {data.pages.length > 0 &&
          data.pages.map((group, i) => (
            <Fragment key={i}>
              {group.map((question, key) => (
                <div key={key} className="card glass mb-4">
                  <span className="absolute inset-x-0 bottom-0 h-2  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
                  <figure>
                    <img
                      className="h-[240px] w-full object-cover"
                      src={question.img}
                      alt="Question"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{question.question}</h2>
                    <ul>
                      {question.answers.map((answer, key) => (
                        <li className="font-medium text-md" key={key}>
                          - {answer.answer}
                        </li>
                      ))}
                    </ul>
                    <div className="card-actions justify-end mt-5">
                      <Link to={`statistics/${question.key}`}>
                        <div
                          className="tooltip tooltip-info"
                          data-tip="Statistics"
                        >
                          <button className="btn btn-outline btn-info gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                              />
                            </svg>
                          </button>
                        </div>
                      </Link>
                      <Link to={question.key}>
                        <div
                          className="tooltip tooltip-warning"
                          data-tip="Edit"
                        >
                          <button className="btn btn-outline btn-warning gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </button>
                        </div>
                      </Link>
                      <div className="tooltip tooltip-error" data-tip="Delete">
                        <button
                          className="btn btn-outline btn-error gap-2"
                          onClick={() => {
                            // setMyQuestions(
                            data.pages.filter(
                              (item) => item.key !== question.key
                            );
                            // );
                            // await deleteDoc(
                            //   doc(firestore, "questions", question.key)
                            // );
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Fragment>
          ))}
      </div>
    </div>
  );
}
