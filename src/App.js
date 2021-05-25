import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Join from "./Components/Join/Join";
import Chat from "./Components/chat/Chat";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Join />
          </Route>
          <Route path="/chat">
            <Chat />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
