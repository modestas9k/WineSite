import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header, Loading, PrivateRoute } from "./components";
import { Home, Login } from "./pages";
const RegisterLazy = lazy(() => import(`./pages/Register/Register`));
const AllWineLazy = lazy(() => import(`./pages/AllWine/AllWine`));
const AddWineTypeLazy = lazy(() => import(`./pages/AddWineType/AddWineType`));

function Routes() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={RegisterLazy} />
          <PrivateRoute
            exact
            path="/allWine"
            redirectPath="/"
            component={AllWineLazy}
          />
          <PrivateRoute
            exact
            path="/addWineType"
            redirectPath="/"
            component={AddWineTypeLazy}
          />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default Routes;
