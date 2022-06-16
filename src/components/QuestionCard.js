import { useEffect, useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export default function QuestionCard({ question, swiperRef }) {
  const [myAnswer, setMyAnswer] = useState(null);
  const [radioColor, setRadioColor] = useState("radio");

  useEffect(() => {
    question.answers.forEach((item) => {
      if (item.isCorrect === myAnswer) {
        if (myAnswer === true) {
          setRadioColor("radio-accent");
          setTimeout(() => {swiperRef.current.swiper.slideNext()},2000);
        } else {
          setRadioColor("radio-secondary");
          setTimeout(() => {swiperRef.current.swiper.slideNext()},2000);
        }
      }
    });
  }, [myAnswer]);

  return (
    <div className="bg-transparent rounded-2xl p-3 border-2 border-gray-600 drop-shadow-xl">
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
      <Zoom
        overlayBgColorEnd="rgba(0,0,0,0.7)"
        transitionDuration="700"
        zoomMargin={250}
      >
          <img src={question.img} alt="Question" style={{maxWidth:"100%",margin:"0 auto"}} />
      </Zoom>
      <div>
        <p className="text-xl mt-5 text-center mr-auto ml-auto max-w-[75%]">
          {question.question}
        </p>
      </div>
      <div>
        <div className="mt-4 flex justify-between">
          {question.answers.map((answer, key) => (
            <label className="label cursor-pointer" key={key}>
              <input
                type="radio"
                name="answer"
                className={`radio ${radioColor}`}
                value={answer.answer}
                onClick={() => setMyAnswer(answer.isCorrect)}
              />
              <span className="label-text ml-2">{answer.answer}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
