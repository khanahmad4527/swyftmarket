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
    firstname: string;
    lastname: string;
    email: string;
  };
  isLoading: boolean;
  isError: boolean;
  isAuth: boolean;
};

const token = Cookies.get("token");

const { firstname, lastname, email } = JSON.parse(
  Cookies.get("smUserData") || "{}"
) as { firstname: string; lastname: string; email: string };

const initialState: AuthState = {
  userDetails: {
    firstname,
    lastname,
    email,
  },
  isLoading: false,
  isError: false,
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
        isLoading: true,
        isError: false,
      };
    }

    case GET_AUTH_SUCCESS: {
      if (action.payload.userData) {
        Cookies.set("token", action.payload.token, { expires: 3 });
        Cookies.set("smUserData", JSON.stringify(action.payload.userData), {
          expires: 3, // Set cookie expiration time to 7 days
          sameSite: "lax", // Set sameSite to lax
        });
      }

      return {
        ...state,
        userDetails: {
          firstname: action.payload.userData.firstname,
          lastname: action.payload.userData.lastname,
          email: action.payload.userData.email,
        },
        isLoading: false,
        isError: false,
        isAuth: true,
      };
    }

    case GET_AUTH_ERROR: {
      return {
        ...state,
        isLoading: false,
        isError: true,
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
