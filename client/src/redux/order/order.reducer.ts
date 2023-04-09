import { Order } from "@/utils/types";
import {
  GET_ORDER_ITEMS_LOADING,
  GET_ORDER_ITEMS_SUCCESS,
  GET_ORDER_ITEMS_ERROR,
  ADD_ITEM_TO_ORDER_LOADING,
  ADD_ITEM_TO_ORDER_SUCCESS,
  ADD_ITEM_TO_ORDER_ERROR,
} from "./order.types";
import { OrderAction } from "./order.actions";

interface OrderState {
  getOrderIsLoading: boolean;
  getOrderIsError: boolean;
  addOrderIsLoading: boolean;
  addOrderIsError: boolean;
  orderData: Order[];
}

const initState: OrderState = {
  getOrderIsLoading: false,
  getOrderIsError: false,
  addOrderIsLoading: false,
  addOrderIsError: false,
  orderData: [],
};

export const orderReducer = (
  state: OrderState = initState,
  action: OrderAction
): OrderState => {
  const { type } = action;
  switch (type) {
    case GET_ORDER_ITEMS_LOADING: {
      return {
        ...state,
        getOrderIsLoading: true,
        getOrderIsError: false,
      };
    }

    case GET_ORDER_ITEMS_SUCCESS: {
      return {
        ...state,
        getOrderIsLoading: false,
        getOrderIsError: false,
        orderData: action.payload,
      };
    }

    case GET_ORDER_ITEMS_ERROR: {
      return {
        ...state,
        getOrderIsLoading: false,
        getOrderIsError: true,
      };
    }

    case ADD_ITEM_TO_ORDER_LOADING: {
      return {
        ...state,
        addOrderIsLoading: true,
        addOrderIsError: false,
      };
    }

    case ADD_ITEM_TO_ORDER_SUCCESS: {
      return {
        ...state,
        addOrderIsLoading: false,
        addOrderIsError: false,
        orderData: [action.payload, ...state.orderData],
      };
    }

    case ADD_ITEM_TO_ORDER_ERROR: {
      return {
        ...state,
        addOrderIsLoading: false,
        addOrderIsError: true,
      };
    }

    default: {
      return state;
    }
  }
};
