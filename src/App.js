import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";

//Services - Vision Dependencies
import LocalStorageContextProvider, {
  Updater as LocalStorageContextUpdater,
} from "./services/vision/contexts/LocalStorage";
import TokenDataContextProvider, { Updater as TokenDataContextUpdater } from "./services/vision/contexts/TokenData";
import GlobalDataContextProvider from "./services/vision/contexts/GlobalData";
import PairDataContextProvider, { Updater as PairDataContextUpdater } from "./services/vision/contexts/PairData";
import ApplicationContextProvider from "./services/vision/contexts/Application";
import UserContextProvider from "./services/vision/contexts/User";
import { client } from "./services/vision/apollo/client";
import { ApolloProvider } from "react-apollo";

const App = () => {
  return (
    <>
      <Providers>
        <Router>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/2" component={Dashboard} />
          </Switch>
        </Router>
      </Providers>
    </>
  );
};

// Ignore for demo

const Providers = ({ children }) => {
  return (
    <>
      <Context>
        <Updaters />
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </Context>
    </>
  );
};
const Updaters = () => {
  return (
    <>
      <LocalStorageContextUpdater />
      <PairDataContextUpdater />
      <TokenDataContextUpdater />
    </>
  );
};
const Context = ({ children }) => {
  return (
    <>
      <LocalStorageContextProvider>
        <ApplicationContextProvider>
          <TokenDataContextProvider>
            <GlobalDataContextProvider>
              <PairDataContextProvider>
                <UserContextProvider>{children}</UserContextProvider>
              </PairDataContextProvider>
            </GlobalDataContextProvider>
          </TokenDataContextProvider>
        </ApplicationContextProvider>
      </LocalStorageContextProvider>
    </>
  );
};

export default App;
