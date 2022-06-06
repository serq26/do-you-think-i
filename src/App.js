import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useAuth } from "./contexts/AuthContext";
import Router from "./router/Router";
function App() {

  const {user} = useAuth();

  return (
    <div className="App h-screen">
      <Header userName={user?.name} />
      <Router />
      <Footer />
    </div>
  );
}

export default App;
