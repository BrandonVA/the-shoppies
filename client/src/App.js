import React from "react";
import Movies from "./pages/Movies";
import NoMatch from "./pages/NoMatch";
import HeadingNav from "./components/HeadingNav/HeadingNav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import MoviesSaved from "./pages/MoviesSaved";

const App = () => {
  return (
    <Router>
      <div>
        <HeadingNav />
        <Switch>
          <Route exact path="/">
            <Movies />
          </Route>
          {/* <Route exact path="/saved">
            <MoviesSaved />
          </Route> */}
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
