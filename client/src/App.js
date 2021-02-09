import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Menu from "./components/Menu";
import AddData from "./pages/AddData";
import ShowPerformance from "./pages/ShowPerformance";

function App() {
  return (
    <section className="section">
      <div className="container is-fluid">
        <div className="columns">
          <div className="column is-one-fifth">
            <Menu />
          </div>
          <div
            className="column"
            style={{
              margin: "0px",
            }}
          >
            <Switch>
              <Route path="/add">
                <AddData />
              </Route>
              <Route path="/performance">
                <ShowPerformance />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
