import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import QuestionCard from "./QuestionCard";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { getQuestions } from "../firebase/firebase";
import HomeSkeleton from "./skeletons/HomeSkeleton";
import { useAuth } from "../contexts/AuthContext";

export default function Question() {
  const [displayPassBtn, setDisplayPassBtn] = useState(true);
  const swiperRef = useRef(null);
  const { t } = useTranslation();
  const { userId } = useAuth();
  const { data, error, status } = useQuery(["questions", userId], getQuestions);

  if (status === "loading") return <HomeSkeleton />

  if (status === "error") return "An error has occurred: " + error.message;

  return (
    <div className="container">
      <Swiper
        ref={swiperRef}
        className="mySwiper"
        spaceBetween={50}
        slidesPerView={1}
        speed={1200}
        allowTouchMove={false}
        onReachEnd={() => setDisplayPassBtn(false)}
      >
        {data.length > 0 &&
          data.map((question,index) => (
            <SwiperSlide key={index}>
              <QuestionCard
                question={question}
                swiperRef={swiperRef}
              ></QuestionCard>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="my-2 mr-3 mb-4 flex items-center justify-center">
        {displayPassBtn && (
          <button
            className="btn btn-active btn-ghost capitalize"
            onClick={() => swiperRef.current.swiper.slideNext()}
          >
            {t("pass_question")}
          </button>
        )}
      </div>
    </div>
  );
}
