import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

export const signinWith = async (method) => {
  let provider;
  let providerInstance;
  let providerError;
  const auth = getAuth();

  switch (method) {
    case "google":
      provider = new GoogleAuthProvider();
      providerInstance = (result) =>
        GoogleAuthProvider.credentialFromResult(result);
      providerError = (error) => GoogleAuthProvider.credentialFromError(error);
      break;
    case "github":
      provider = new GithubAuthProvider();
      provider.addScope("user");
      providerInstance = (result) =>
        GithubAuthProvider.credentialFromResult(result);
      providerError = (error) => GithubAuthProvider.credentialFromError(error);
      break;
    case "twitter":
      provider = new TwitterAuthProvider();
      providerInstance = (result) =>
        TwitterAuthProvider.credentialFromResult(result);
      providerError = (error) => TwitterAuthProvider.credentialFromError(error);
      break;
    default:
      provider = "";
      break;
  }

  const data = await signInWithPopup(auth, provider)
    .then((result) => {
      const credential = providerInstance(result);
      const token = credential.accessToken;
      const user = result.user;
      window.localStorage.setItem("emailForSignIn", user.email);
      return { user, result };
    })
    .catch((err) => {
      const errorCode = err.code;
      const errorMessage = err.message;
      const error = { errorCode, errorMessage };
      return { error };
    });
  return data;
};

export const getQuestions = async ({ queryKey }) => {
  const userId = queryKey[1];
  const data = [];
  try {
    const questionsQuery = query(collection(firestore, "questions"));
    const querySnapshots = await getDocs(questionsQuery);
    const userSeenList = await getDoc(doc(firestore, "seenList", userId));

    querySnapshots.forEach((doc) => {
      userSeenList.data() !== undefined
        ? Object.entries(userSeenList.data()).every(
            ([key, value]) => doc.id !== key
          ) && data.push({ ...doc.data(), key: doc.id })
        : data.push({ ...doc.data(), key: doc.id });
    });
  } catch (error) {
    console.log(error);
  }

  return data;
};

export const getMyQuestions = async ({ queryKey }) => {
  const userId = queryKey[1];
  const data = [];
  try {
    const questionQuery = query(
      collection(firestore, "questions"),
      where("userId", "==", userId)
    );

    const questionSnapshot = await getDocs(questionQuery);

    questionSnapshot.forEach((doc) => {
      data.push({ ...doc.data(), key: doc.id });
    });
  } catch (error) {
    console.log(error);
  }

  return data;
};

export const addToSeenList = async (value) => {
  try {
    const docRef = doc(firestore, "seenList", value.userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(doc(firestore, "seenList", value.userId), {
        [value.questionId]: value.answer,
      });
    } else {
      await setDoc(doc(firestore, "seenList", value.userId), {
        [value.questionId]: value.answer,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const addToQuestionStats = async (value) => {
  try {
    const docRef = doc(firestore, "questionStats", value.questionId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(doc(firestore, "questionStats", value.questionId), {
        [value.userId]: value.answer,
      });
    } else {
      await setDoc(doc(firestore, "questionStats", value.questionId), {
        [value.userId]: value.answer,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAnsweredCount = async (questionId) => {
  try {
    const docRef = doc(firestore, "questionStats", questionId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (error) {
    console.log(error);
  }
};

export const getAnsweredUserInfo = async (userId) => {
  try {
    const docRef = doc(firestore, "users", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (error) {
    console.log(error);
  }
};

export const getStatistics = async (questionId) => {
  try {
    const docRef = doc(firestore, "questionStats", questionId);
    const docSnap = await getDoc(docRef);
    const answeredCount =
      docSnap.data() !== undefined ? Object.keys(docSnap.data()).length : 0;

    let groupedAnswers = [];
    Object.entries(docSnap.data()).map(
      ([key, value]) =>
        !groupedAnswers.includes(value) && groupedAnswers.push(value)
    );

    const answers = 
      groupedAnswers.map((ans,i) => {
        return {
          [ans]: {
            country: [
              { name: "Turkey", count: 78*(i+1) },
              { name: "England", count: 12*(i+1) },
            ],
            gender: [
              { name: "Male", count: 32 },
              { name: "Female", count: 29 },
            ],
            city: [
              { name: "Ankara", count: 22 },
              { name: "Istanbul", count: 54 },
              { name: "London", count: 21 },
              { name: "Liverpool", count: 13 },
            ],
            age: [
              { name: "24", count: 93 },
              { name: "32", count: 82 },
            ],
          },
        };
      });

    const stats = {
      questionId: questionId,
      answeredCount: answeredCount,
      answers: answers,
    };
    console.log("stats", stats);
    return stats;
  } catch (error) {
    console.log(error);
  }
};
