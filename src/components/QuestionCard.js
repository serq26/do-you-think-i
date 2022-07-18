import { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useSwiperSlide } from "swiper/react";
import { useAuth } from "../contexts/AuthContext";
import { addToQuestionStats, addToSeenList } from "../firebase/firebase";

export default function QuestionCard({ question, swiperRef, lastSlide }) {
  const [myAnswer, setMyAnswer] = useState(null);
  const { userId } = useAuth();

  const handleAnswer = async (answer) => {
    await addToSeenList({
      questionId: question.key,
      answer: answer.answer,
      userId,
    });

    await addToQuestionStats({
      questionId: question.key,
      answer: answer.answer,
      userId,
    });

    setMyAnswer(answer.isCorrect);
  };

  return (
    <>
      {!lastSlide && (
        <div className="bg-transparent rounded-2xl p-3 border-2 border-gray-600 drop-shadow-xl">
          <Zoom
            overlayBgColorEnd="rgba(0,0,0,0.7)"
            transitionDuration="700"
            zoomMargin={250}
          >
            {myAnswer !== null && (
              <div>
                <div
                  className={`alert alert-error shadow-lg absolute left-0 right-0 top-0 bottom-0 z-20 opacity-80 p-12 flex flex-col items-center justify-center drop-shadow-xl ${
                    myAnswer === true ? "hidden" : ""
                  }`}
                >
                  <div>
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
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div
                  className={`alert alert-success shadow-lg absolute left-0 right-0 top-0 bottom-0 z-20 opacity-80 p-12 flex flex-col items-center justify-center drop-shadow-xl ${
                    myAnswer === false ? "hidden" : ""
                  }`}
                >
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
                </div>
              </div>
            )}
            <img
              src={question.img}
              alt="Question"
              style={{ maxWidth: "100%", margin: "0 auto" }}
              className="rounded-2xl"
            />
          </Zoom>
          <div>
            <p className="text-xl mt-5 text-center mr-auto ml-auto max-w-[75%]">
              {question.question}
            </p>
          </div>
          <div>
            <div className="mt-4 flex justify-between">
              {question.answers.map((answer, key) => (
                <label
                  className="label cursor-pointer"
                  key={key}
                  style={{
                    background:
                      myAnswer !== null && answer.isCorrect && "#057240",
                    borderRadius: "6px",
                  }}
                >
                  <input
                    type="radio"
                    name="answer"
                    className={`radio ${
                      myAnswer !== null &&
                      (answer.isCorrect ? "radio-accent" : "radio-secondary")
                    }`}
                    value={answer.answer}
                    onClick={(e) => {
                      handleAnswer(answer);
                      setTimeout(() => {
                        swiperRef.current.swiper.slideNext();
                      }, 2000);
                    }}
                  />
                  <span
                    className="label-text ml-2"
                    style={{
                      color: myAnswer !== null && answer.isCorrect && "#fff",
                    }}
                  >
                    {answer.answer}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
      {lastSlide && (
        <div style={{padding:"165px 0",display:"flex",alignItems:"center",justifyContent:"center",flexFlow:"column"}}>
          <p className="focus-in-contract-bck">There isn't any question...</p>
          <small>Please visit again later</small>
          <img src="/images/no-more-question.png" alt="No More Question" style={{maxWidth:"20%",height:"auto",display:"block",margin:"0 auto",filter:"grayscale(1)"}} />
        </div>
      )}
    </>
  );
}
