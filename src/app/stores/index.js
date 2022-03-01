import { MobXProviderContext } from 'mobx-react';
import React from 'react';
import BoardsStore from './BoardsStore';

// eslint-disable-next-line import/prefer-default-export
export function createStores() {
  return {
    BoardsStore,
  };
}

export const useStore = () => {
  const store = React.useContext(MobXProviderContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};
