import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import QuestionCard from "./QuestionCard";
import { firestore } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function Question() {
  const swiperRef = useRef(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const getQuestions = async () => {
      const getQuestionsFromFirebase = [];
      try {
        const querySnapshot = await getDocs(collection(firestore, "questions"));
        querySnapshot.forEach((doc) => {
          getQuestionsFromFirebase.push({ ...doc.data(), key: doc.id });
        });
        setQuestions(getQuestionsFromFirebase);
      } catch (error) {
        console.log(error);
      }
    };

    getQuestions();
  }, []);

  return (
    <>
      <div className="container">
        <Swiper
          ref={swiperRef}
          className="mySwiper"
          spaceBetween={50}
          slidesPerView={1}
          speed={1200}
          allowTouchMove={false}
        >
          {questions.length > 0 &&
            questions.map((question, key) => (
              <SwiperSlide key={key}>
                <QuestionCard question={question} swiperRef={swiperRef}></QuestionCard>
              </SwiperSlide>
            ))}
        </Swiper>
        <div className="my-2 mr-3 mb-4 flex items-center justify-center">
          <button
            className="btn btn-active btn-ghost capitalize"
            onClick={() => swiperRef.current.swiper.slideNext()}
          >
            Pass Question 
          </button>
        </div>
      </div>
    </>
  );
}
