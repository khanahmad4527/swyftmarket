import { AddOrder, Order } from "@/utils/types";
import instance from "../../utils/axiosInstance";
import {
  GET_ORDER_ITEMS_LOADING,
  GET_ORDER_ITEMS_SUCCESS,
  GET_ORDER_ITEMS_ERROR,
  ADD_ITEM_TO_ORDER_LOADING,
  ADD_ITEM_TO_ORDER_SUCCESS,
  ADD_ITEM_TO_ORDER_ERROR,
} from "./order.types";
import { AppDispatch } from "../store";

/*****    action creators interface     *****/

interface GetOrdersLoadingAction {
  type: typeof GET_ORDER_ITEMS_LOADING;
}

interface GetOrdersSuccessAction {
  type: typeof GET_ORDER_ITEMS_SUCCESS;
  payload: Order[];
}

interface GetOrdersErrorAction {
  type: typeof GET_ORDER_ITEMS_ERROR;
}

interface AddOrdersLoadingAction {
  type: typeof ADD_ITEM_TO_ORDER_LOADING;
}

interface AddOrdersSuccessAction {
  type: typeof ADD_ITEM_TO_ORDER_SUCCESS;
  payload: Order;
}

interface AddOrdersErrorAction {
  type: typeof ADD_ITEM_TO_ORDER_ERROR;
}

export type OrderAction =
  | GetOrdersLoadingAction
  | GetOrdersSuccessAction
  | GetOrdersErrorAction
  | AddOrdersLoadingAction
  | AddOrdersSuccessAction
  | AddOrdersErrorAction;

/*****    action creators     *****/

const getOrdersLoading = (): GetOrdersLoadingAction => {
  return { type: GET_ORDER_ITEMS_LOADING };
};

const getOrdersSuccess = (data: Order[]): GetOrdersSuccessAction => {
  return { type: GET_ORDER_ITEMS_SUCCESS, payload: data };
};

const getOrdersError = (): GetOrdersErrorAction => {
  return { type: GET_ORDER_ITEMS_ERROR };
};

const addOrdersLoading = (): AddOrdersLoadingAction => {
  return { type: ADD_ITEM_TO_ORDER_LOADING };
};

const addOrdersSuccess = (data: Order): AddOrdersSuccessAction => {
  return { type: ADD_ITEM_TO_ORDER_SUCCESS, payload: data };
};

const addOrdersError = (): AddOrdersErrorAction => {
  return { type: ADD_ITEM_TO_ORDER_ERROR };
};

/*****    action creators dispatch function     *****/

export const getOrderData = (): any => async (dispatch: AppDispatch) => {
  dispatch(getOrdersLoading());
  try {
    const response = await instance.get(`/orders`);
    dispatch(getOrdersSuccess(response.data));
  } catch (err) {
    dispatch(getOrdersError());
  }
};

export const addToOrder =
  (newOrder: AddOrder): any =>
  async (dispatch: AppDispatch) => {
    dispatch(addOrdersLoading());
    try {
      const response = await instance.post(`/orders/add`, newOrder);
      dispatch(addOrdersSuccess(response.data));
    } catch (err) {
      dispatch(addOrdersError());
    }
  };
