import instance from "../../utils/axiosInstance";
import { AppDispatch } from "../store";
import { Cart, AddToCart } from "@/utils/types";
import {
  GET_CART_ITEMS_LOADING,
  GET_CART_ITEMS_SUCCESS,
  GET_CART_ITEMS_ERROR,
  ADD_ITEM_TO_CART_LOADING,
  ADD_ITEM_TO_CART_SUCCESS,
  ADD_ITEM_TO_CART_ERROR,
  UPDATE_CART_ITEMS_LOADING,
  UPDATE_CART_ITEMS_SUCCESS,
  UPDATE_CART_ITEMS_ERROR,
  REMOVE_CART_ITEMS_LOADING,
  REMOVE_CART_ITEMS_SUCCESS,
  REMOVE_CART_ITEMS_ERROR,
  EMPTY_CART_ITEMS_LOADING,
  EMPTY_CART_ITEMS_SUCCESS,
  EMPTY_CART_ITEMS_ERROR,
} from "./cart.types";

/*****    action creators interface     *****/

interface GetCartLoadingAction {
  type: typeof GET_CART_ITEMS_LOADING;
}

interface GetCartSuccessAction {
  type: typeof GET_CART_ITEMS_SUCCESS;
  payload: Cart[];
}

interface GetCartErrorAction {
  type: typeof GET_CART_ITEMS_ERROR;
}

interface AddCartLoadingAction {
  type: typeof ADD_ITEM_TO_CART_LOADING;
}

interface AddCartSuccessAction {
  type: typeof ADD_ITEM_TO_CART_SUCCESS;
  payload: Cart;
}

interface AddCartErrorAction {
  type: typeof ADD_ITEM_TO_CART_ERROR;
}

interface UpdateCartLoadingAction {
  type: typeof UPDATE_CART_ITEMS_LOADING;
}

interface UpdateCartSuccessAction {
  type: typeof UPDATE_CART_ITEMS_SUCCESS;
  payload: Cart;
}

interface UpdateCartErrorAction {
  type: typeof UPDATE_CART_ITEMS_ERROR;
}

interface DeleteCartLoadingAction {
  type: typeof REMOVE_CART_ITEMS_LOADING;
}

interface DeleteCartSuccessAction {
  type: typeof REMOVE_CART_ITEMS_SUCCESS;
  payload: Cart;
}

interface DeleteCartErrorAction {
  type: typeof REMOVE_CART_ITEMS_ERROR;
}

interface EmptyCartLoadingAction {
  type: typeof EMPTY_CART_ITEMS_LOADING;
}

interface EmptyCartSuccessAction {
  type: typeof EMPTY_CART_ITEMS_SUCCESS;
}

interface EmptyCartErrorAction {
  type: typeof EMPTY_CART_ITEMS_ERROR;
}

export type CartAction =
  | GetCartLoadingAction
  | GetCartSuccessAction
  | GetCartErrorAction
  | AddCartLoadingAction
  | AddCartSuccessAction
  | AddCartErrorAction
  | UpdateCartLoadingAction
  | UpdateCartSuccessAction
  | UpdateCartErrorAction
  | DeleteCartLoadingAction
  | DeleteCartSuccessAction
  | DeleteCartErrorAction
  | EmptyCartLoadingAction
  | EmptyCartSuccessAction
  | EmptyCartErrorAction;

/*****    action creators     *****/

const getCartLoading = (): GetCartLoadingAction => {
  return { type: GET_CART_ITEMS_LOADING };
};

const getCartSuccess = (data: Cart[]): GetCartSuccessAction => {
  return { type: GET_CART_ITEMS_SUCCESS, payload: data };
};

const getCartError = (): GetCartErrorAction => {
  return { type: GET_CART_ITEMS_ERROR };
};

const addCartLoading = (): AddCartLoadingAction => {
  return { type: ADD_ITEM_TO_CART_LOADING };
};

const addCartSuccess = (data: Cart): AddCartSuccessAction => {
  return { type: ADD_ITEM_TO_CART_SUCCESS, payload: data };
};

const addCartError = (): AddCartErrorAction => {
  return { type: ADD_ITEM_TO_CART_ERROR };
};

const updateCartLoading = (): UpdateCartLoadingAction => {
  return { type: UPDATE_CART_ITEMS_LOADING };
};

const updateCartSuccess = (data: Cart): UpdateCartSuccessAction => {
  return { type: UPDATE_CART_ITEMS_SUCCESS, payload: data };
};

const updateCartError = (): UpdateCartErrorAction => {
  return { type: UPDATE_CART_ITEMS_ERROR };
};

const deleteCartLoading = (): DeleteCartLoadingAction => {
  return { type: REMOVE_CART_ITEMS_LOADING };
};

const deleteCartSuccess = (data: Cart): DeleteCartSuccessAction => {
  return { type: REMOVE_CART_ITEMS_SUCCESS, payload: data };
};

const deleteCartError = (): DeleteCartErrorAction => {
  return { type: REMOVE_CART_ITEMS_ERROR };
};

const emptyCartLoading = (): EmptyCartLoadingAction => {
  return { type: EMPTY_CART_ITEMS_LOADING };
};

const emptyCartSuccess = (): EmptyCartSuccessAction => {
  return { type: EMPTY_CART_ITEMS_SUCCESS };
};

const emptyCartError = (): EmptyCartErrorAction => {
  return { type: EMPTY_CART_ITEMS_ERROR };
};

/*****    action creators dispatch function     *****/

export const getCartData = (): any => async (dispatch: AppDispatch) => {
  dispatch(getCartLoading());
  try {
    const responce = await instance.get(`/cart`);
    dispatch(getCartSuccess(responce.data));
  } catch (error) {
    console.log("error", error);
    dispatch(getCartError());
  }
};

export const addToCart =
  (newCart: AddToCart): any =>
  async (dispatch: AppDispatch) => {
    dispatch(addCartLoading());
    try {
      const responce = await instance.post(`/cart/add`, newCart);
      dispatch(addCartSuccess(responce.data));
    } catch (error) {
      dispatch(addCartError());
    }
  };

export const updateCartData =
  (id: string, updatedQuantity: number): any =>
  async (dispatch: AppDispatch) => {
    dispatch(updateCartLoading());
    try {
      const responce = await instance.patch(`/cart/update/${id}`, {
        quantity: updatedQuantity,
      });
      dispatch(updateCartSuccess(responce.data));
    } catch (error) {
      dispatch(updateCartError());
    }
  };

export const deleteCartData =
  (id: string): any =>
  async (dispatch: AppDispatch) => {
    dispatch(deleteCartLoading());
    try {
      const responce = await instance.delete(`/cart/delete/${id}`);
      dispatch(deleteCartSuccess(responce.data));
    } catch (error) {
      dispatch(deleteCartError());
    }
  };

export const emptyCart = (): any => async (dispatch: AppDispatch) => {
  dispatch(emptyCartLoading());
  try {
    dispatch(emptyCartSuccess());
    await instance.delete(`/cart/emptycart`);
  } catch (error) {
    dispatch(emptyCartError());
  }
};
