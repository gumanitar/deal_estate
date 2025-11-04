import "./app.css";
import Button from "../../components/btn/Button";
import Nav from "../../components/nav/Nav";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <main className="app">
      <Nav />
      <div className="app-wrapper">
        <div className="app-container">
          <h2 className="app-header">The chemical negatively charged</h2>
          <p className="app-text">
            The chemical negatively charged Numerous calculations predict, and
            experiments confirm, that the force field reflects the beam, while
            the mass defect is not formed. The chemical compound is negatively
            charged. Twhile the mass defect is
          </p>
          <Button
            text="Get Started"
            variant="button__plain"
            clickHandler={() => navigate("/deals")}
          />
        </div>
      </div>
    </main>
  );
}

export default App;
