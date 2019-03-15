import React from "react";
import { StatusBar } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import ListScreen from "./screens/ListScreen";
import DetailsScreen from "./screens/DetailsScreen";

StatusBar.setBarStyle("light-content");

const rootNavigator = createStackNavigator({
    List: ListScreen,
    Details: DetailsScreen
});

export default createAppContainer(rootNavigator);
