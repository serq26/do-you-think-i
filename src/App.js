import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useAuth } from "./contexts/AuthContext";
import Router from "./router/Router";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  const { user } = useAuth();

  return (
    <div className="App h-screen">
      <Header userName={user?.name} />
      <Router />
      <Footer />
      <ToastContainer theme="colored" transition={Zoom}/>
    </div>
  );
}

export default App;
