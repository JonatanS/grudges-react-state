import React, { useReducer, createContext, useCallback, Children } from 'react';

import id from 'uuid/v4';
import initialState from './initialState';

export const GrudgeContext = createContext();
const actions = {
  ADD_GRUDGE: 'ADD_GRUDGE',
  TOGGLE_FORGIVENESS: 'TOGGLE_FOREGIVENESS'
};

function reducer(state, action) {
  switch (action.type) {
    case actions.ADD_GRUDGE:
      return [action.payload, ...state];
    case actions.TOGGLE_FORGIVENESS:
      return state.map((g) => {
        if (g.id !== action.payload.id) return g;
        return { ...g, forgiven: !g.forgiven };
      });
    default:
      return state;
  }
}

export const GrudgeProvider = ({ children }) => {
  const [grudges, dispatch] = useReducer(reducer, initialState);

  const addGrudge = useCallback((grudge) => {
    grudge.id = id();
    grudge.forgiven = false;
    dispatch({
      type: actions.ADD_GRUDGE,
      payload: grudge
    });
  });

  const toggleForgiveness = useCallback((id) => {
    dispatch({
      type: actions.TOGGLE_FORGIVENESS,
      payload: { id }
    });
  });

  const value = { grudges, addGrudge, toggleForgiveness };
  return (
    <GrudgeContext.Provider value={value}>{children}</GrudgeContext.Provider>
  );
};
