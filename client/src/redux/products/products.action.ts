import instance from "../../utils/axiosInstance";
import {
  GET_PRODUCTS_LOADING,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
} from "./products.types";
import { AppDispatch } from "../store";
import { Product } from "@/utils/types";
import { ProductSearchParams } from "@/utils/types";

/*****    action creators interface     *****/

interface GetProductsLoadingAction {
  type: typeof GET_PRODUCTS_LOADING;
}

interface GetProductsSuccessAction {
  type: typeof GET_PRODUCTS_SUCCESS;
  payload: { data: Product[]; totalProductCount: number };
}

interface GetProductsErrorAction {
  type: typeof GET_PRODUCTS_ERROR;
}

export type ProductAction =
  | GetProductsLoadingAction
  | GetProductsSuccessAction
  | GetProductsErrorAction;

/*****    action creators     *****/

const getProductsLoading = (): GetProductsLoadingAction => {
  return { type: GET_PRODUCTS_LOADING };
};

const getProductsSuccess = (
  data: Product[],
  totalProductCount: number
): GetProductsSuccessAction => {
  return { type: GET_PRODUCTS_SUCCESS, payload: { data, totalProductCount } };
};

const getProductsError = (): GetProductsErrorAction => {
  return { type: GET_PRODUCTS_ERROR };
};

export const getProducts =
  (params: ProductSearchParams): any =>
  async (dispatch: AppDispatch) => {
    dispatch(getProductsLoading());
    try {
      const responce = await instance.get(`/products`, { params });
      console.log("param", params);
      console.log("res", responce);
      const data = responce.data;
      const totalProductCount = responce.headers["x-total-count"];
      dispatch(getProductsSuccess(data, totalProductCount));
    } catch (err) {
      dispatch(getProductsError());
    }
  };
