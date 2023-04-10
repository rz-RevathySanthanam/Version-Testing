import React from 'react';

export const StoreConfigContext = React.createContext({});
export const StoreConfigProvider = StoreConfigContext.Provider;
export const StoreConfigConsumer = StoreConfigContext.Consumer;

export function defaultUserState() {
  return {
    token: null,
  };
}
const UserState = defaultUserState();

export const UserContext = React.createContext({
  ...UserState,
});
export const UserConsumer = UserContext.Consumer;

export const useCartVerified = () => {
  return {
    verified: true,
    cartId: '1234',
    cartItemsCount: 3,
  };
};
