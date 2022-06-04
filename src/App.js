import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Router from "./router/Router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "./firebaseConfig";
import { useEffect, useState } from "react";
function App() {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const docRef = doc(firestore, "users", uid);
        const docSnap = await getDoc(docRef);
        setUserData(docSnap.data());
        console.log(userData.name);
        // ...
      } else {
        console.log("There is no user..!")
      }
    });
  }, [userData]);

  return (
    <div className="App h-screen">
      <Header userName={userData?.name} />
      <Router />
      <Footer />
    </div>
  );
}

export default App;
