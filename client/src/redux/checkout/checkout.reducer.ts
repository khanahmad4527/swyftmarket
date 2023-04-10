import {
  GET_ADDRESS_LOADING,
  GET_ADDRESS_SUCCESS,
  GET_ADDRESS_ERROR,
  ADD_ADDRESS_LOADING,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_ERROR,
  UPDATE_ADDRESS_LOADING,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_ERROR,
  REMOVE_ADDRESS_LOADING,
  REMOVE_ADDRESS_SUCCESS,
  REMOVE_ADDRESS_ERROR,
  GET_COUPONS_LOADING,
  GET_COUPONS_SUCCESS,
  GET_COUPONS_ERROR,
} from "./checkout.types";
import { AddressAction } from "./checkout.actions";
import { Address, Coupon } from "@/utils/types";

interface CheckoutState {
  getCheckoutIsLoading: boolean;
  getCheckoutIsError: boolean;
  postCheckoutIsLoading: boolean;
  postCheckoutIsError: boolean;
  updateCheckoutIsLoading: boolean;
  updateCheckoutIsError: boolean;
  deleteCheckoutIsLoading: boolean;
  deleteCheckoutIsError: boolean;
  userAddress: Address[];
  getCouponIsLoading: boolean;
  getCouponIsError: boolean;
  coupons: Coupon[];
}

const initState: CheckoutState = {
  getCheckoutIsLoading: false,
  getCheckoutIsError: false,
  postCheckoutIsLoading: false,
  postCheckoutIsError: false,
  updateCheckoutIsLoading: false,
  updateCheckoutIsError: false,
  deleteCheckoutIsLoading: false,
  deleteCheckoutIsError: false,
  userAddress: [],
  getCouponIsLoading: false,
  getCouponIsError: false,
  coupons: [],
};

export const checkoutReducer = (
  state: CheckoutState = initState,
  action: AddressAction
): CheckoutState => {
  const { type } = action;
  switch (type) {
    case GET_ADDRESS_LOADING: {
      return {
        ...state,
        getCheckoutIsLoading: true,
        getCheckoutIsError: false,
      };
    }

    case GET_ADDRESS_SUCCESS: {
      return {
        ...state,
        getCheckoutIsLoading: false,
        getCheckoutIsError: false,
        userAddress: action.payload,
      };
    }

    case GET_ADDRESS_ERROR: {
      return {
        ...state,
        getCheckoutIsLoading: false,
        getCheckoutIsError: true,
      };
    }

    case GET_COUPONS_LOADING: {
      return {
        ...state,
        getCouponIsLoading: true,
        getCouponIsError: false,
      };
    }

    case GET_COUPONS_SUCCESS: {
      return {
        ...state,
        getCouponIsLoading: false,
        getCouponIsError: false,
        coupons: action.payload,
      };
    }

    case GET_COUPONS_ERROR: {
      return {
        ...state,
        getCouponIsLoading: false,
        getCouponIsError: true,
      };
    }

    case ADD_ADDRESS_LOADING: {
      return {
        ...state,
        postCheckoutIsLoading: true,
        postCheckoutIsError: false,
      };
    }

    case ADD_ADDRESS_SUCCESS: {
      return {
        ...state,
        postCheckoutIsLoading: false,
        postCheckoutIsError: false,
        userAddress: [action.payload, ...state.userAddress],
      };
    }

    case ADD_ADDRESS_ERROR: {
      return {
        ...state,
        postCheckoutIsLoading: false,
        postCheckoutIsError: true,
      };
    }

    case UPDATE_ADDRESS_LOADING: {
      return {
        ...state,
        updateCheckoutIsLoading: true,
        updateCheckoutIsError: false,
      };
    }

    case UPDATE_ADDRESS_SUCCESS: {
      return {
        ...state,
        updateCheckoutIsLoading: false,
        updateCheckoutIsError: false,
        userAddress: state.userAddress.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    }

    case UPDATE_ADDRESS_ERROR: {
      return {
        ...state,
        updateCheckoutIsLoading: false,
        updateCheckoutIsError: true,
      };
    }

    case REMOVE_ADDRESS_LOADING: {
      return {
        ...state,
        deleteCheckoutIsLoading: true,
        deleteCheckoutIsError: false,
      };
    }

    case REMOVE_ADDRESS_SUCCESS: {
      return {
        ...state,
        deleteCheckoutIsLoading: false,
        deleteCheckoutIsError: false,
        userAddress: state.userAddress.filter(
          (item) => item._id !== action.payload._id
        ),
      };
    }

    case REMOVE_ADDRESS_ERROR: {
      return {
        ...state,
        deleteCheckoutIsLoading: false,
        deleteCheckoutIsError: true,
      };
    }

    default: {
      return state;
    }
  }
};
