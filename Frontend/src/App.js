import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css'
import Homepage from "./components/OtherExamples/Homepage";
import Profilepage from "./components/OtherExamples/Profilepage";
import Settingspage from "./components/OtherExamples/Settingspage";
import ErrorPage from "./components/OtherExamples/ErrorPage";
import Contents from "./components/OtherExamples/Contents";
import Signup from "./components/Cognito/Signup";
import Login from "./components/Cognito/Login";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/profile" element={<Profilepage />} />
          <Route path="/settings" element={<Settingspage />} />
          <Route path="/content/:id" element={<Contents />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
