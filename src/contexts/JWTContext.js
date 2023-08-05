import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: {
    displayName: null,
    photoURL: null, // https://i.pravatar.cc/300
    uid: null,
    //
    phoneNumber: null,
    email: null,
    role: null,
    address: null,
    country: null,
    city: null,
    zipCode: null,
    state: null,
    avatarURL: null,
    isVerified: null,
    status: null,
    company: null,
    isPublic: null,
  },
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user: { ...initialState.user, ...user },
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;
    const { user: prevUser } = state;

    return {
      ...state,
      isAuthenticated: true,
      user: { ...prevUser, ...user },
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  loginCheck: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await axios.get('/api/account/my-account');
          const { user } = response.data;

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (username, password) => {
    const form = new FormData();
    form.append('username', username);
    form.append('password', password);
    const response = await axios.post('/api/auth', form, { withCredentials: true });
    console.log('response', response?.data?.details);
    if (!response?.data?.details) {
      return Promise.reject({ message: 'Incorrect username or password, please try again.' });
    }

    // http://localhost:8074/api/settings?category=pricing&data=%7B%7D
    // for testing
    // const response1 = await axios.get('/api/settings?category=pricing&data=%7B%7D', { withCredentials: true });
    // console.log('response1', response1);

    const { accessToken, details } = response.data;

    setSession(accessToken);

    dispatch({
      type: 'LOGIN',
      payload: {
        user: {
          displayName: details?.user,
          // photoURL: 'https://i.pravatar.cc/300',
        },
      },
    });
  };

  const loginCheck = async () => {
    // http://localhost:8074/api/auth
    const response = await axios.post('/api/auth', null, { withCredentials: true });
    console.log('login response', response);
    if (!response?.data?.details) {
      return;
    }

    // const response1 = await axios.get('/api/settings?category=pricing&data=%7B%7D', { withCredentials: true });
    // console.log('response1', response1);

    const { accessToken, details } = response.data;

    setSession(accessToken);

    dispatch({
      type: 'LOGIN',
      payload: {
        user: {
          displayName: details?.user,
          // photoURL: 'https://i.pravatar.cc/300',
        },
      },
    });
  };

  const register = async (email, password, firstName, lastName) => {
    const response = await axios.post('/api/account/register', {
      email,
      password,
      firstName,
      lastName,
    });
    const { accessToken, user } = response.data;

    localStorage.setItem('accessToken', accessToken);
    dispatch({
      type: 'REGISTER',
      payload: {
        user,
      },
    });
  };

  // **apicall - to update context

  const logout = async () => {
    await axios.post('/api/auth?action=logout', null, { withCredentials: true });
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        loginCheck,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
