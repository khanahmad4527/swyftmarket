import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  legacy_createStore,
  compose,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import { homeReducer } from "./home/home.reducer";
import { authReducer } from "./auth/auth.reducer";
import { productsReducer } from "./products/products.reducer";
import { productDetailReducer } from "./product-detail/productDetail.reducer";
import { cartReducer } from "./cart/cart.reducer";
import { checkoutReducer } from "./checkout/checkout.reducer";
import { orderReducer } from "./order/order.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  products: productsReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  order: orderReducer,
});

/*****************       In Production    ***************************/
// interface CustomWindow extends Window {
//   __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
// }

// const composeEnhancer =
//   (typeof window !== "undefined" &&
//     (window as CustomWindow).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose;

// export const store = legacy_createStore(
//   rootReducer,
//   composeEnhancer(applyMiddleware(thunk))
// );

/*****************       For Users    ***************************/

export const store = legacy_createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

/**************      TypeScript for redux useDispatch and useSelector      ************/

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
