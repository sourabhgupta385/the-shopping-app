import React, { useState } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import OrderReducer from "./store/reducers/orders";
import authReducer from "./store/reducers/auth";
import NavigationContainer from "./navigation/NavigationContainer";
import ReduxThunk from "redux-thunk";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: OrderReducer,
  auth: authReducer
});

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  });
};

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}
