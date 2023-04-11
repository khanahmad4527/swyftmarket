import instance from "../../utils/axiosInstance";
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
import { AppDispatch } from "../store";
import { Product } from "../../utils/types";

/*****    action creators interface     *****/

interface GetMobilesLoadingAction {
  type: typeof GET_MOBILES_LOADING;
}

interface GetMobilesSuccessAction {
  type: typeof GET_MOBILES_SUCCESS;
  payload: Product[];
}

interface GetMobilesErrorAction {
  type: typeof GET_MOBILES_ERROR;
}

interface GetTvsLoadingAction {
  type: typeof GET_TVS_LOADING;
}

interface GetTvsSuccessAction {
  type: typeof GET_TVS_SUCCESS;
  payload: Product[];
}

interface GetTvsErrorAction {
  type: typeof GET_TVS_ERROR;
}

interface GetHomeAppliancesLoadingAction {
  type: typeof GET_HOMEAPPLIANCES_LOADING;
}

interface GetHomeAppliancesSuccessAction {
  type: typeof GET_HOMEAPPLIANCES_SUCCESS;
  payload: Product[];
}

interface GetHomeAppliancesErrorAction {
  type: typeof GET_HOMEAPPLIANCES_ERROR;
}

export type HomeAction =
  | GetMobilesLoadingAction
  | GetMobilesSuccessAction
  | GetMobilesErrorAction
  | GetTvsLoadingAction
  | GetTvsSuccessAction
  | GetTvsErrorAction
  | GetHomeAppliancesLoadingAction
  | GetHomeAppliancesSuccessAction
  | GetHomeAppliancesErrorAction;

/*****    action creators     *****/

const getMobilesLoading = (): GetMobilesLoadingAction => {
  return { type: GET_MOBILES_LOADING };
};

const getMobilesSuccess = (data: Product[]): GetMobilesSuccessAction => {
  return { type: GET_MOBILES_SUCCESS, payload: data };
};

const getMobilesError = (): GetMobilesErrorAction => {
  return { type: GET_MOBILES_ERROR };
};

const getTvsLoading = (): GetTvsLoadingAction => {
  return { type: GET_TVS_LOADING };
};

const getTvsSuccess = (data: Product[]): GetTvsSuccessAction => {
  return { type: GET_TVS_SUCCESS, payload: data };
};

const getTvsError = (): GetTvsErrorAction => {
  return { type: GET_TVS_ERROR };
};

const getHomeAppliancesLoading = (): GetHomeAppliancesLoadingAction => {
  return { type: GET_HOMEAPPLIANCES_LOADING };
};

const getHomeAppliancesSuccess = (
  data: Product[]
): GetHomeAppliancesSuccessAction => {
  return { type: GET_HOMEAPPLIANCES_SUCCESS, payload: data };
};

const getHomeAppliancesError = (): GetHomeAppliancesErrorAction => {
  return { type: GET_HOMEAPPLIANCES_ERROR };
};

/*****    action creators dispatch function     *****/

export const getMobiles = (): any => async (dispatch: AppDispatch) => {
  dispatch(getMobilesLoading());
  try {
    const response = await instance.get(`/products?category=dress`);
    dispatch(getMobilesSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(getMobilesError());
  }
};

export const getTvs = (): any => async (dispatch: AppDispatch) => {
  dispatch(getTvsLoading());
  try {
    const response = await instance.get(`/products?category=shoes`);
    dispatch(getTvsSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(getTvsError());
  }
};

export const getHomeAppliances = (): any => async (dispatch: AppDispatch) => {
  dispatch(getHomeAppliancesLoading());
  try {
    const response = await instance.get(`/products?category=candles`);
    dispatch(getHomeAppliancesSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(getHomeAppliancesError());
  }
};
