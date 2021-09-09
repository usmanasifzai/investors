import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Investors from 'views/Investors';
import Home from 'views/Home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense>
          <Switch>
            <Route path="/investors">
              <Investors />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Redirect to="/home" />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
