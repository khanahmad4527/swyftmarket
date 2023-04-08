import {
  GET_PRODUCTDETAIL_LOADING,
  GET_PRODUCTDETAIL_SUCCESS,
  GET_PRODUCTDETAIL_ERROR,
} from "./produtDetail.types";
import { ProductDetailAction } from "./productDetail.actions";
import { Product } from "@/utils/types";

interface ProductDetailState {
  getProductDetailIsLoading: boolean;
  getProductDetailIsError: boolean;
  productDetailData: Product;
}

const initialState: ProductDetailState = {
  getProductDetailIsLoading: false,
  getProductDetailIsError: false,
  productDetailData: {} as Product, // type assertion to get rig of empty object or undefined
};

export const productDetailReducer = (
  state: ProductDetailState = initialState,
  action: ProductDetailAction
): ProductDetailState => {
  const { type } = action;
  switch (type) {
    case GET_PRODUCTDETAIL_LOADING: {
      return {
        ...state,
        getProductDetailIsLoading: true,
        getProductDetailIsError: false,
      };
    }

    case GET_PRODUCTDETAIL_SUCCESS: {
      return {
        ...state,
        getProductDetailIsLoading: false,
        getProductDetailIsError: false,
        productDetailData: action.payload,
      };
    }

    case GET_PRODUCTDETAIL_ERROR: {
      return {
        ...state,
        getProductDetailIsLoading: false,
        getProductDetailIsError: true,
      };
    }

    default: {
      return state;
    }
  }
};
