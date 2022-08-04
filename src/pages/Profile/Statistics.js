import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { firestore } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import EditQuestionSkeleton from "../../components/skeletons/EditQuestionSkeleton";
import { getStatistics } from "../../firebase/firebase";
import StatisticsView from "../../components/StatisticsView";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Statistics() {
  const [question, setQuestion] = useState({});
  const [questionDocRef, setQuestionDocRef] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const { id } = useParams();
  const [stats, setStats] = useState([]);
  const [statsData, setStatsData] = useState([]);
  const [statsShow, setStatsShow] = useState({
    isShow: false,
    showedAnswer: "",
  });
  const [animationParent] = useAutoAnimate();

  useEffect(() => {
    const getQuestion = async () => {
      try {
        const docRef = doc(firestore, "questions", id);
        const docSnap = await getDoc(docRef);
        setQuestion(docSnap.data());
        setQuestionDocRef(docRef.id);
        setLoading(false);
      } catch (error) {
        setError(error);
        console.log(error);
      }
    };

    getQuestion();
  }, [id]);

  useEffect(() => {
    const getStats = async (questionId) => {
      const result = await getStatistics(questionId);
      setStats(result);
    };

    getStats(questionDocRef);
  }, [questionDocRef]);

  const getAnswerStats = (answer) => {
    // if(statsShow){
    //   setStatsShow(false);
    //   // setStatsData([]);
    //   return null;
    // }

    stats !== undefined &&
      stats.answers.forEach((item) =>
        Object.entries(item).forEach(([key, value], index) => {
          let statsDataObjects = [];
          if (key === answer) {
            return Object.entries(value).forEach(([valueKey, val], number) => {
              const labelsData = [];
              const dataSet = [];

              val.forEach((item) => {
                labelsData.push(item.name);
                dataSet.push(item.count);
              });

              statsDataObjects.push({
                key: `${key}-${valueKey}`,
                answerText: key,
                title: valueKey,
                data: {
                  labels: labelsData,
                  datasets: [
                    {
                      label: "# of Votes",
                      data: dataSet,
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                      ],
                      borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                      ],
                      borderWidth: 1,
                    },
                  ],
                },
              });
              console.log(statsDataObjects);
              setStatsData(statsDataObjects);
              // setStatsShow(true);
            });
          }
        })
      );
  };

  console.log(statsData);

  if (loading) return <EditQuestionSkeleton />;

  if (error)
    return <div>{`There is a problem fetching the post data - ${error}`}</div>;

  return (
    <div className="p-8" ref={animationParent}>
      <div className="flex items-center justify-center w-full mb-5 relative">
        <div className="flex flex-col overflow-hidden items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          {question.img === "" ? (
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
            </div>
          ) : (
            <img src={question.img} alt="QuestionImage" />
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <p>{question.question}</p>
      </div>
      <div className="flex align-center justify-center py-8">
        <div className="stats stats-vertical lg:stats-horizontal shadow">
          <div className="stat place-items-center">
            <div className="stat-value">{stats?.answeredCount}</div>
            <div className="stat-title">Users Answered</div>
          </div>
        
          <div className="stat">
            <div className="stat-title">New Users</div>
            <div className="stat-value">4,200</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>
        
          <div className="stat">
            <div className="stat-title">New Registers</div>
            <div className="stat-value">1,200</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>
      </div>
      <div>
        <div className="mt-4 flex justify-between xs:flex-col md:flex-row">
          {question.answers.map((answer, key) => (
            <div
              className="flex flex-col justify-start items-center p-10 border border-gray-700 rounded-lg xs:mb-2"
              key={key}
            >
              <span className="label-text ml-2">{answer.answer}</span>
              <button
                id={`ans-stats-btn-${key}`}
                className="btn btn-outline btn-info my-2"
                onClick={() => {
                  setStatsData([]);
                  getAnswerStats(answer.answer);
                  setStatsShow({
                    isShow: true,
                    showedAnswer: `ans-stats-btn-${key}`,
                  });
                }}
                disabled={
                  statsShow.isShow &&
                  statsShow.showedAnswer === `ans-stats-btn-${key}`
                }
              >
                Show Statistics
              </button>
            </div>
          ))}
        </div>
      </div>
      {statsShow.isShow && (
        <div className="rounded-md my-5 pb-5 border-[1px] border-gray-500">
          <h3 className="text-center font-medium my-6 text-white">
            { statsData.length > 0 ? `${statsData[0]?.answerText} Statistics View` : "There are currently no results..."}
          </h3>
          {statsShow.isShow && (
            <div className="flex items-center justify-around xs:flex-col md:flex-row">
              {statsData.map((statsObj) => (
                <StatisticsView
                  key={statsObj.key}
                  title={statsObj.title}
                  data={statsObj.data}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
