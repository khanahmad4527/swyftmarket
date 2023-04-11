import instance from "../../utils/axiosInstance";
import { AppDispatch } from "../store";
import { AddAddress, Address, Coupon } from "@/utils/types";
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

/*****    action creators interface     *****/

interface GetAddressLoadingAction {
  type: typeof GET_ADDRESS_LOADING;
}

interface GetAddressSuccessAction {
  type: typeof GET_ADDRESS_SUCCESS;
  payload: Address[];
}

interface GetAddressErrorAction {
  type: typeof GET_ADDRESS_ERROR;
}

interface AddAddressLoadingAction {
  type: typeof ADD_ADDRESS_LOADING;
}

interface AddAddressSuccessAction {
  type: typeof ADD_ADDRESS_SUCCESS;
  payload: Address;
}

interface AddAddressErrorAction {
  type: typeof ADD_ADDRESS_ERROR;
}

interface UpdateAddressLoadingAction {
  type: typeof UPDATE_ADDRESS_LOADING;
}

interface UpdateAddressSuccessAction {
  type: typeof UPDATE_ADDRESS_SUCCESS;
  payload: Address;
}

interface UpdateAddressErrorAction {
  type: typeof UPDATE_ADDRESS_ERROR;
}

interface DeleteAddressLoadingAction {
  type: typeof REMOVE_ADDRESS_LOADING;
}

interface DeleteAddressSuccessAction {
  type: typeof REMOVE_ADDRESS_SUCCESS;
  payload: Address;
}

interface DeleteAddressErrorAction {
  type: typeof REMOVE_ADDRESS_ERROR;
}

interface GetCouponsLoadingAction {
  type: typeof GET_COUPONS_LOADING;
}

interface GetCouponsSuccessAction {
  type: typeof GET_COUPONS_SUCCESS;
  payload: Coupon[];
}

interface GetCouponsErrorAction {
  type: typeof GET_COUPONS_ERROR;
}

export type AddressAction =
  | GetAddressLoadingAction
  | GetAddressSuccessAction
  | GetAddressErrorAction
  | AddAddressLoadingAction
  | AddAddressSuccessAction
  | AddAddressErrorAction
  | UpdateAddressLoadingAction
  | UpdateAddressSuccessAction
  | UpdateAddressErrorAction
  | DeleteAddressLoadingAction
  | DeleteAddressSuccessAction
  | DeleteAddressErrorAction
  | GetCouponsLoadingAction
  | GetCouponsSuccessAction
  | GetCouponsErrorAction;

/*****    action creators     *****/

const getAddressLoading = (): GetAddressLoadingAction => {
  return { type: GET_ADDRESS_LOADING };
};

const getAddressSuccess = (data: Address[]): GetAddressSuccessAction => {
  return { type: GET_ADDRESS_SUCCESS, payload: data };
};

const getAddressError = (): GetAddressErrorAction => {
  return { type: GET_ADDRESS_ERROR };
};

const addAddressLoading = (): AddAddressLoadingAction => {
  return { type: ADD_ADDRESS_LOADING };
};

const addAddressSuccess = (data: Address): AddAddressSuccessAction => {
  return { type: ADD_ADDRESS_SUCCESS, payload: data };
};

const addAddressError = (): AddAddressErrorAction => {
  return { type: ADD_ADDRESS_ERROR };
};

const updateAddressLoading = (): UpdateAddressLoadingAction => {
  return { type: UPDATE_ADDRESS_LOADING };
};

const updateAddressSuccess = (data: Address): UpdateAddressSuccessAction => {
  return { type: UPDATE_ADDRESS_SUCCESS, payload: data };
};

const updateAddressError = (): UpdateAddressErrorAction => {
  return { type: UPDATE_ADDRESS_ERROR };
};

const deleteAddressLoading = (): DeleteAddressLoadingAction => {
  return { type: REMOVE_ADDRESS_LOADING };
};

const deleteAddressSuccess = (data: Address): DeleteAddressSuccessAction => {
  return { type: REMOVE_ADDRESS_SUCCESS, payload: data };
};

const deleteAddressError = (): DeleteAddressErrorAction => {
  return { type: REMOVE_ADDRESS_ERROR };
};

const getCouponsLoading = (): GetCouponsLoadingAction => {
  return { type: GET_COUPONS_LOADING };
};

const getCouponsSuccess = (data: Coupon[]): GetCouponsSuccessAction => {
  return { type: GET_COUPONS_SUCCESS, payload: data };
};

const getCouponsError = (): GetCouponsErrorAction => {
  return { type: GET_COUPONS_ERROR };
};

/*****    action creators dispatch function     *****/

export const getAddress = (): any => async (dispatch: AppDispatch) => {
  dispatch(getAddressLoading());
  try {
    const response = await instance.get(`/address`);
    dispatch(getAddressSuccess(response.data));
  } catch (error) {
    dispatch(getAddressError());
  }
};

export const getCoupons = (): any => async (dispatch: AppDispatch) => {
  dispatch(getCouponsLoading());
  try {
    const response = await instance.get(`/coupons`);
    dispatch(getCouponsSuccess(response.data));
  } catch (error) {
    dispatch(getCouponsError());
  }
};

export const addAddress =
  (payload: AddAddress): any =>
  async (dispatch: AppDispatch) => {
    dispatch(addAddressLoading());
    try {
      const response = await instance.post(`/address/add`, payload);
      dispatch(addAddressSuccess(response.data));
    } catch (error) {
      dispatch(addAddressError());
    }
  };

export const updateAddress =
  (id: string, updatedAddress: AddAddress): any =>
  async (dispatch: AppDispatch) => {
    dispatch(updateAddressLoading());
    try {
      const response = await instance.patch(
        `/address/update/${id}`,
        updatedAddress
      );
      dispatch(updateAddressSuccess(response.data));
    } catch (error) {
      dispatch(updateAddressError());
    }
  };

export const deleteAddress =
  (id: string): any =>
  async (dispatch: AppDispatch) => {
    dispatch(deleteAddressLoading());
    try {
      const response = await instance.delete(`/address/delete/${id}`);
      dispatch(deleteAddressSuccess(response.data));
    } catch (error) {
      dispatch(deleteAddressError());
    }
  };
