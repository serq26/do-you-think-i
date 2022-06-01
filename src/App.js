import "./App.css";
import Header from "./components/Header";
import Router from "./router/Router";

localStorage.setItem("theme","light");

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

function App() {
  return (
    <div className="App h-screen bg-white dark:bg-slate-800">
      <Header />
      <Router/>
    </div>
  );
}

export default App;
