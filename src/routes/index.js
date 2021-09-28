import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import StackRoutes from "./stackRoutes";

import Movies from "../pages/Movies";

const Drawer = createDrawerNavigator();

function Routes() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="HomeDrawer" component={StackRoutes} />
      <Drawer.Screen name="Movies" component={Movies} />
    </Drawer.Navigator>
  );
}

export default Routes;
