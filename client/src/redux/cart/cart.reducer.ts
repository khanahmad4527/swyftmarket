import {
  GET_CART_ITEMS_LOADING,
  GET_CART_ITEMS_SUCCESS,
  GET_CART_ITEMS_ERROR,
  ADD_ITEM_TO_CART_LOADING,
  ADD_ITEM_TO_CART_SUCCESS,
  ADD_ITEM_TO_CART_ERROR,
  UPDATE_CART_ITEMS_LOADING,
  UPDATE_CART_ITEMS_SUCCESS,
  UPDATE_CART_ITEMS_ERROR,
  REMOVE_CART_ITEMS_LOADING,
  REMOVE_CART_ITEMS_SUCCESS,
  REMOVE_CART_ITEMS_ERROR,
  EMPTY_CART_ITEMS_LOADING,
  EMPTY_CART_ITEMS_SUCCESS,
  EMPTY_CART_ITEMS_ERROR,
} from "./cart.types";
import { CartAction } from "./cart.actions";
import { Cart } from "@/utils/types";

interface CartState {
  getCartIsLoading: boolean;
  getCartIsError: boolean;
  postCartIsLoading: boolean;
  postCartIsError: boolean;
  patchCartIsLoading: boolean;
  patchCartIsError: boolean;
  deleteCartIsLoading: boolean;
  deleteCartIsError: boolean;
  emptyCartIsLoading: boolean;
  emptyCartIsError: boolean;
  cartData: Cart[];
}

const initState: CartState = {
  getCartIsLoading: false,
  getCartIsError: false,
  postCartIsLoading: false,
  postCartIsError: false,
  patchCartIsLoading: false,
  patchCartIsError: false,
  deleteCartIsLoading: false,
  deleteCartIsError: false,
  emptyCartIsLoading: false,
  emptyCartIsError: false,
  cartData: [],
};

export const cartReducer = (
  state: CartState = initState,
  action: CartAction
): CartState => {
  const { type } = action;
  switch (type) {
    case GET_CART_ITEMS_LOADING: {
      return {
        ...state,
        getCartIsLoading: true,
        getCartIsError: false,
      };
    }

    case GET_CART_ITEMS_SUCCESS: {
      return {
        ...state,
        getCartIsLoading: false,
        getCartIsError: false,
        cartData: action.payload,
      };
    }

    case GET_CART_ITEMS_ERROR: {
      return {
        ...state,
        getCartIsLoading: false,
        getCartIsError: true,
      };
    }

    case ADD_ITEM_TO_CART_LOADING: {
      return {
        ...state,
        postCartIsLoading: true,
        postCartIsError: false,
      };
    }

    case ADD_ITEM_TO_CART_SUCCESS: {
      return {
        ...state,
        postCartIsLoading: false,
        postCartIsError: false,
        cartData: [action.payload, ...state.cartData],
      };
    }

    case ADD_ITEM_TO_CART_ERROR: {
      return {
        ...state,
        postCartIsLoading: false,
        postCartIsError: true,
      };
    }

    case UPDATE_CART_ITEMS_LOADING: {
      return {
        ...state,
        patchCartIsLoading: true,
        patchCartIsError: false,
      };
    }

    case UPDATE_CART_ITEMS_SUCCESS: {
      return {
        ...state,
        patchCartIsLoading: false,
        patchCartIsError: false,
        cartData: state.cartData.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    }

    case UPDATE_CART_ITEMS_ERROR: {
      return {
        ...state,
        patchCartIsLoading: false,
        patchCartIsError: true,
      };
    }

    case REMOVE_CART_ITEMS_LOADING: {
      return {
        ...state,
        deleteCartIsLoading: true,
        deleteCartIsError: false,
      };
    }

    case REMOVE_CART_ITEMS_SUCCESS: {
      return {
        ...state,
        deleteCartIsLoading: false,
        deleteCartIsError: false,
        cartData: state.cartData.filter(
          (item) => item._id !== action.payload._id
        ),
      };
    }

    case REMOVE_CART_ITEMS_ERROR: {
      return {
        ...state,
        deleteCartIsLoading: false,
        deleteCartIsError: true,
      };
    }

    case EMPTY_CART_ITEMS_LOADING: {
      return {
        ...state,
        emptyCartIsLoading: true,
        emptyCartIsError: false,
      };
    }

    case EMPTY_CART_ITEMS_SUCCESS: {
      return {
        ...state,
        emptyCartIsLoading: false,
        emptyCartIsError: false,
        cartData: [],
      };
    }

    case EMPTY_CART_ITEMS_ERROR: {
      return {
        ...state,
        emptyCartIsLoading: false,
        emptyCartIsError: true,
      };
    }

    default: {
      return state;
    }
  }
};
