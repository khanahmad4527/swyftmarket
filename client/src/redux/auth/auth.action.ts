import instance from "../../utils/axiosInstance";
import { AppDispatch } from "../store";
import { User } from "../../utils/types";
import { NewUser } from "../../utils/types";

import {
  GET_AUTH_LOADING,
  GET_AUTH_SUCCESS,
  GET_AUTH_ERROR,
  RESET_AUTH,
} from "./auth.types";

/*****    action creators interface     *****/

interface GetAuthLoadingAction {
  type: typeof GET_AUTH_LOADING;
}

interface GetAuthSuccessAction {
  type: typeof GET_AUTH_SUCCESS;
  payload: User;
}

interface GetAuthErrorAction {
  type: typeof GET_AUTH_ERROR;
}

interface ResetAuthAction {
  type: typeof RESET_AUTH;
}

export type AuthAction =
  | GetAuthLoadingAction
  | GetAuthSuccessAction
  | GetAuthErrorAction
  | ResetAuthAction;

/*****    action creators     *****/

const getAuthLoading = (): GetAuthLoadingAction => {
  return { type: GET_AUTH_LOADING };
};

const getAuthSuccess = (data: User): GetAuthSuccessAction => {
  return { type: GET_AUTH_SUCCESS, payload: data };
};

const getAuthError = (): GetAuthErrorAction => {
  return { type: GET_AUTH_ERROR };
};

const resetAuth = (): ResetAuthAction => {
  return { type: RESET_AUTH };
};

/*****    action creators dispatch function     *****/

export const login =
  (email: string, password: string): any =>
  async (dispatch: AppDispatch) => {
    dispatch(getAuthLoading());
    try {
      const response = await instance.post(`/user/auth/login`, {
        email,
        password,
      });
      dispatch(getAuthSuccess(response.data));
    } catch (error: any) {
      dispatch(getAuthError());
    }
  };

export const existingUser = async (email: string, password: string) => {
  try {
    const response = await instance.post(`/user/auth/login`, {
      email,
      password,
    });
    // const status = response.status;
    // const role = response.data.userData.role;
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const isEmailAvailable = async (newUser: NewUser) => {
  try {
    const response = await instance.post(`/user/auth/register`, newUser);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const logout = (): any => async (dispatch: AppDispatch) => {
  dispatch(resetAuth());
};
