import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import { observer } from "mobx-react-lite";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import React from "react";
import { useRoutes } from "react-router-dom";

function App() {
  const location = useLocation();

  interface MultiRoutes {
    element: React.ReactElement;
    paths: string[];
    key: string;
  }

  const renderMultiRoutes = ({ element, paths, key }: MultiRoutes) =>
    paths.map((path) => <Route key={key} path={path} element={element} />);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <>
        <NavBar />
        <Container style={{ marginTop: "7em" }}>
          <Routes>
            <Route path="/activities" element={<ActivityDashboard />} />
            <Route path="/activities/:id" element={<ActivityDetails />} />
            {/* <Route
            key={location.key}
            path="/manage/:id"
            element={<ActivityForm />}
          />
          <Route
            key={location.key}
            path={"/createActivity"}
            element={<ActivityForm />}
          /> */}

            {renderMultiRoutes({
              paths: ["/manage/:id", "/createActivity"],
              element: <ActivityForm />,
              key: location.key,
            })}
          </Routes>
        </Container>
      </>
    </>
  );
}

export default observer(App);
