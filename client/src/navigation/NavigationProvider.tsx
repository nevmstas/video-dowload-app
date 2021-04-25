import {
  DownloadsScreen,
  HomeScreen,
  ClassScreen,
  MeditationScreen,
  CourseScreen,
  ArticleScreen,
  ClassPlayerScreen,
  CoursePlayerScreen,
  ArticlePlayerScreen,
  MeditationPlayerScreen,
} from "../screens";
import { ErrorMessage } from "../components";
import React, { createContext, useState, ComponentProps } from "react";

const routes = {
  HomeScreen,
  DownloadsScreen,
  ClassScreen,
  MeditationScreen,
  CourseScreen,
  ArticleScreen,
  ClassPlayerScreen,
  CoursePlayerScreen,
  ArticlePlayerScreen,
  MeditationPlayerScreen,
};

type RouteKey = keyof typeof routes;

type Route<K extends RouteKey = RouteKey> = {
  route: K;
  params: ComponentProps<typeof routes[K]>;
};

type SetActiveRoute = <K extends RouteKey>(route: Route<K>) => void;

const initialRoute: Route<"HomeScreen"> = { route: "HomeScreen", params: {} };

export const NavigationContext = createContext<{
  activeRoute: Route;
  setActiveRoute: SetActiveRoute;
}>({
  activeRoute: initialRoute,
  setActiveRoute: () => console.warn("Missing navigation provider"),
});

export const NavigationProvider: React.FC = ({ children }) => {
  const [activeRoute, setActiveRoute] = useState(initialRoute);
  const ScreenComponent = routes[activeRoute.route];
  if (!ScreenComponent) return <ErrorMessage msg="Missing ScreenComponent!" />;

  return (
    <NavigationContext.Provider
      value={{
        activeRoute,
        setActiveRoute: setActiveRoute as SetActiveRoute,
      }}
    >
      {children}
      <div style={{ padding: 30 }}>
        <ScreenComponent {...activeRoute.params} />
      </div>
    </NavigationContext.Provider>
  );
};
