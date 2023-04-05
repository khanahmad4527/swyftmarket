import {
  GET_MOBILES_LOADING,
  GET_MOBILES_SUCCESS,
  GET_MOBILES_ERROR,
  GET_TVS_LOADING,
  GET_TVS_SUCCESS,
  GET_TVS_ERROR,
  GET_HOMEAPPLIANCES_LOADING,
  GET_HOMEAPPLIANCES_SUCCESS,
  GET_HOMEAPPLIANCES_ERROR,
} from "./home.types";
import { HomeAction } from "./home.action";
import { Product } from "@/utils/types";

interface HomeState {
  isLoadingMobile: boolean;
  isErrorMobile: boolean;
  isLoadingTv: boolean;
  isErrorTv: boolean;
  isLoadingHome: boolean;
  isErrorHome: boolean;
  mobileData: Product[];
  tvData: Product[];
  homeData: Product[];
}

const initialState: HomeState = {
  isLoadingMobile: false,
  isErrorMobile: false,
  isLoadingTv: false,
  isErrorTv: false,
  isLoadingHome: false,
  isErrorHome: false,
  mobileData: [],
  tvData: [],
  homeData: [],
};

export const homeReducer = (
  state: HomeState = initialState,
  action: HomeAction
): HomeState => {
  const { type } = action;
  switch (type) {
    case GET_MOBILES_LOADING: {
      return {
        ...state,
        isLoadingMobile: true,
        isErrorMobile: false,
      };
    }

    case GET_MOBILES_SUCCESS: {
      return {
        ...state,
        isLoadingMobile: false,
        isErrorMobile: false,
        mobileData: action.payload,
      };
    }

    case GET_MOBILES_ERROR: {
      return {
        ...state,
        isLoadingMobile: false,
        isErrorMobile: true,
      };
    }

    case GET_TVS_LOADING: {
      return {
        ...state,
        isLoadingTv: true,
        isErrorTv: false,
      };
    }

    case GET_TVS_SUCCESS: {
      return {
        ...state,
        isLoadingTv: false,
        isErrorTv: false,
        tvData: action.payload,
      };
    }

    case GET_TVS_ERROR: {
      return {
        ...state,
        isLoadingTv: false,
        isErrorTv: true,
      };
    }

    case GET_HOMEAPPLIANCES_LOADING: {
      return {
        ...state,
        isLoadingHome: true,
        isErrorHome: false,
      };
    }

    case GET_HOMEAPPLIANCES_SUCCESS: {
      return {
        ...state,
        isLoadingHome: false,
        isErrorHome: false,
        homeData: action.payload,
      };
    }

    case GET_HOMEAPPLIANCES_ERROR: {
      return {
        ...state,
        isLoadingHome: false,
        isErrorHome: true,
      };
    }

    default: {
      return state;
    }
  }
};
