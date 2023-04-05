import { ProductAction } from "./products.action";
import {
  GET_PRODUCTS_LOADING,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
} from "./products.types";
import { Product } from "@/utils/types";

interface ProductState {
  getProductsIsLoading: boolean;
  getProductsIsError: boolean;
  totalProductCount: number;
  productsData: Product[];
}

const initialState: ProductState = {
  getProductsIsLoading: false,
  getProductsIsError: false,
  totalProductCount: 0,
  productsData: [],
};

export const productsReducer = (
  state: ProductState = initialState,
  action: ProductAction
): ProductAction => {
  const { type } = action;
  switch (type) {
    case GET_PRODUCTS_LOADING: {
      return {
        ...state,
        getProductsIsLoading: true,
        getProductsIsError: false,
      };
    }

    case GET_PRODUCTS_SUCCESS: {
      return {
        ...state,
        getProductsIsLoading: false,
        getProductsIsError: false,
        totalProductCount: action.payload.totalProductCount,
        productsData: action.payload.data,
      };
    }

    case GET_PRODUCTS_ERROR: {
      return {
        ...state,
        getProductsIsLoading: false,
        getProductsIsError: true,
      };
    }

    default: {
      return state;
    }
  }
};
