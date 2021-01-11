import React, { useEffect, createContext, useContext, useReducer, Suspense } from "react";
import { Route, Link } from "react-router-dom";

const AlbumCards = React.lazy(() => import("./AlbumCards"));

const LazyComponent = ({ component, fallback }) => {
  return (
    <>
      <Suspense fallback={fallback}>{component}</Suspense>
    </>
  );
};

const Dashboard = () => {
  return (
    <>
      <DashboardContainer>
        <DashboardRoutes />
      </DashboardContainer>
    </>
  );
};

export const DashboardContainer = ({ children }) => {
  return (
    <>
      <Link to="/">Threejs</Link>
      {"  "}
      <Link to="/2">Another Page</Link>
      <div>{children}</div>
    </>
  );
};

const DashboardRoutes = () => {
  return (
    <>
      <Route exact path="/" component={Page1} />
      <Route exact path="/2" component={Page2} />
    </>
  );
};

const Page1 = () => {
  return (
    <>
      <LazyComponent component={<AlbumCards />} fallback={"Loading..."} />
    </>
  );
};

const Page2 = () => {
  return (
    <>
      <div>Page 2</div>
    </>
  );
};

export default Dashboard;
