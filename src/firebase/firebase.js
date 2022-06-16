import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebaseConfig";

export const getQuestions = async () => {
  const data = [];
  try {
    const first = query(collection(firestore, "questions"));
    const documentSnapshots = await getDocs(first);
    documentSnapshots.forEach((doc) => {
      data.push({ ...doc.data(), key: doc.id });
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
    const q = query(
      collection(firestore, "questions"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), key: doc.id });
    });
  } catch (error) {
    console.log(error);
  }

  return data;
};
