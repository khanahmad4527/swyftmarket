import {
  GET_AUTH_LOADING,
  GET_AUTH_SUCCESS,
  GET_AUTH_ERROR,
  RESET_AUTH,
} from "./auth.types";
import Cookies from "js-cookie";
import { AuthAction } from "./auth.action";

type AuthState = {
  userDetails: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
  };
  getAuthIsLoading: boolean;
  getAuthIsError: boolean;
  isAuth: boolean;
};

const token = Cookies.get("token");

const { firstname, lastname, email, id } = JSON.parse(
  Cookies.get("smUserData") || "{}"
) as { firstname: string; lastname: string; email: string; id: string };

const initialState: AuthState = {
  userDetails: {
    id,
    firstname,
    lastname,
    email,
  },
  getAuthIsLoading: false,
  getAuthIsError: false,
  isAuth: token ? true : false,
};

export const authReducer = (
  state: AuthState = initialState,
  action: AuthAction
): AuthState => {
  const { type } = action;
  switch (type) {
    case GET_AUTH_LOADING: {
      return {
        ...state,
        getAuthIsLoading: true,
        getAuthIsError: false,
      };
    }

    case GET_AUTH_SUCCESS: {
      if (action.payload.userData) {
        Cookies.set("token", action.payload.token, { expires: 3 });
        Cookies.set("smUserData", JSON.stringify(action.payload.userData), {
          expires: 3, // Set cookie expiration time to 3 days
        });
      }

      return {
        ...state,
        userDetails: {
          id: action.payload.userData._id,
          firstname: action.payload.userData.firstname,
          lastname: action.payload.userData.lastname,
          email: action.payload.userData.email,
        },
        getAuthIsLoading: false,
        getAuthIsError: false,
        isAuth: true,
      };
    }

    case GET_AUTH_ERROR: {
      return {
        ...state,
        getAuthIsLoading: false,
        getAuthIsError: true,
      };
    }

    case RESET_AUTH: {
      Cookies.remove("token");
      Cookies.remove("smUserData");
      return {
        ...initialState,
        isAuth: false,
      };
    }

    default: {
      return state;
    }
  }
};
