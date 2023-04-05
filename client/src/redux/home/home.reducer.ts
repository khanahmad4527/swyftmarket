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
  getMobileIsLoading: boolean;
  getMobileIsError: boolean;
  getTvIsLoading: boolean;
  getTvIsError: boolean;
  getHomeIsLoading: boolean;
  getHomeIsError: boolean;
  mobileData: Product[];
  tvData: Product[];
  homeData: Product[];
}

const initialState: HomeState = {
  getMobileIsLoading: false,
  getMobileIsError: false,
  getTvIsLoading: false,
  getTvIsError: false,
  getHomeIsLoading: false,
  getHomeIsError: false,
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
        getMobileIsLoading: true,
        getMobileIsError: false,
      };
    }

    case GET_MOBILES_SUCCESS: {
      return {
        ...state,
        getMobileIsLoading: false,
        getMobileIsError: false,
        mobileData: action.payload,
      };
    }

    case GET_MOBILES_ERROR: {
      return {
        ...state,
        getMobileIsLoading: false,
        getMobileIsError: true,
      };
    }

    case GET_TVS_LOADING: {
      return {
        ...state,
        getTvIsLoading: true,
        getTvIsError: false,
      };
    }

    case GET_TVS_SUCCESS: {
      return {
        ...state,
        getTvIsLoading: false,
        getTvIsError: false,
        tvData: action.payload,
      };
    }

    case GET_TVS_ERROR: {
      return {
        ...state,
        getTvIsLoading: false,
        getTvIsError: true,
      };
    }

    case GET_HOMEAPPLIANCES_LOADING: {
      return {
        ...state,
        getHomeIsLoading: true,
        getHomeIsError: false,
      };
    }

    case GET_HOMEAPPLIANCES_SUCCESS: {
      return {
        ...state,
        getHomeIsLoading: false,
        getHomeIsError: false,
        homeData: action.payload,
      };
    }

    case GET_HOMEAPPLIANCES_ERROR: {
      return {
        ...state,
        getHomeIsLoading: false,
        getHomeIsError: true,
      };
    }

    default: {
      return state;
    }
  }
};
