// authDuck.ts
import axios from 'axios';
import { put, takeLatest, call, all } from 'redux-saga/effects';
import AuthService from '../../services/AuthService';
import { IUser } from '../../components/interfaces/IUser';
import {API_URL} from "../../http/index";

// Action Types
const SET_AUTH = 'auth/SET_AUTH';
const SET_USER = 'auth/SET_USER';
const SET_LOADING = 'auth/SET_LOADING';
const SET_ERROR = 'auth/SET_ERROR';


// Interfaces
export interface AuthState {
  user: IUser |null;
  isAuth: boolean;
  isLoading: boolean;
  error:string|null
}

interface SetAuthAction {
  type: typeof SET_AUTH;
  bool: boolean;
}

interface SetUserAction {
  type: typeof SET_USER;
  user: IUser;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
  bool: boolean;
}
interface SetErrorAction {
  type: typeof SET_ERROR;
  error: string|null;
}

type AuthAction = SetAuthAction | SetUserAction | SetLoadingAction|SetErrorAction;

// Initial State
const initialState: AuthState = {
  user: null,
  isAuth: false,
  isLoading: false,
  error: null,
};

// Reducer
export default function authReducer(state = initialState, action: AuthAction): AuthState {
  switch (action.type) {
    case SET_AUTH:
      return { ...state, isAuth: action.bool, error: null }
    case SET_USER:
      return { ...state, user: action.user, error: null }
    case SET_LOADING:
      return { ...state, isLoading: action.bool, error: null }
    case SET_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
}

// Action Creators
export function setAuth(bool: boolean): SetAuthAction {
  return { type: SET_AUTH, bool };
}

export function setUser(user: any): SetUserAction {
  return { type: SET_USER, user };
}

export function setLoading(bool: boolean): SetLoadingAction {
  return { type: SET_LOADING, bool };
}
export function setError(error: string|null): SetErrorAction {
  return { type: SET_ERROR, error };
}

// Sagas
function* loginSaga(action: { type: string; email: string; password: string }): Generator {
  try {
    const response: any = yield call(AuthService.login, action.email, action.password);
    localStorage.setItem('token', response.data.accessToken);
    yield put(setAuth(true));
    yield put(setUser(response.data.user));
  } catch (e:any) {
    console.log(e.response?.data?.message);
  }
}

function* registrationSaga(action: { type: string; email: string; password: string }): Generator {
  try {
    const response: any = yield call(AuthService.registration, action.email, action.password);
    localStorage.setItem('token', response.data.accessToken);
    yield put(setAuth(true));
    yield put(setUser(response.data.user));
  } catch (e: any) {
    const error: string = e.response?.data?.message;
    console.log(error)
    yield put({ type: SET_ERROR, error });
  }
}

function* logoutSaga(): Generator {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = yield call(AuthService.logout);
    localStorage.removeItem('token');
    yield put(setAuth(false));
    yield put(setUser(null));
  } catch (e:any) {
    console.log(e.response?.data?.message);
  }
}

function* checkAuthSaga(): Generator {
  yield put(setLoading(true));
  try {
    const response: any= yield call(axios.get, `${API_URL}/refresh`, { withCredentials: true });
    localStorage.setItem('token', response.data.accessToken);
    yield put(setAuth(true));
    yield put(setUser(response.data.user));
  } catch (e:any) {
    console.log(e.response?.data?.message);
  } finally {
    yield put(setLoading(false));
  }
}

export function* authSaga(): Generator {
  yield all([
    takeLatest('LOGIN', loginSaga),
    takeLatest('REGISTRATION', registrationSaga),
    takeLatest('LOGOUT', logoutSaga),
    takeLatest('CHECK_AUTH', checkAuthSaga),
  ]);
}