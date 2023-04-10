import instance from "../../utils/axiosInstance";
import {
  GET_PRODUCTDETAIL_LOADING,
  GET_PRODUCTDETAIL_SUCCESS,
  GET_PRODUCTDETAIL_ERROR,
} from "./produtDetail.types";
import { Product } from "@/utils/types";
import { AppDispatch } from "../store";

/*****    action creators interface     *****/

interface GetProductDetailLoadingAction {
  type: typeof GET_PRODUCTDETAIL_LOADING;
}

interface GetProductDetailSuccessAction {
  type: typeof GET_PRODUCTDETAIL_SUCCESS;
  payload: Product;
}

interface GetProductDetailErrorAction {
  type: typeof GET_PRODUCTDETAIL_ERROR;
}

export type ProductDetailAction =
  | GetProductDetailLoadingAction
  | GetProductDetailSuccessAction
  | GetProductDetailErrorAction;

/*****    action creators     *****/

const getProductDetailLoading = (): GetProductDetailLoadingAction => {
  return { type: GET_PRODUCTDETAIL_LOADING };
};

const getProductDetailSuccess = (
  data: Product
): GetProductDetailSuccessAction => {
  return { type: GET_PRODUCTDETAIL_SUCCESS, payload: data };
};

const getProductDetailError = (): GetProductDetailErrorAction => {
  return { type: GET_PRODUCTDETAIL_ERROR };
};

export const getProductDetail =
  (id: string): any =>
  async (dispatch: AppDispatch) => {
    dispatch(getProductDetailLoading());
    try {
      const responce = await instance.get(`/product/${id}`);
      dispatch(getProductDetailSuccess(responce.data));
    } catch (err) {
      dispatch(getProductDetailError());
    }
  };
