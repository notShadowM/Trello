import { MobXProviderContext } from 'mobx-react';
import React from 'react';
import BoardsStore from './BoardsStore';
import ItemsData from './ItemsData';

// eslint-disable-next-line import/prefer-default-export
export function createStores() {
  return {
    BoardsStore,
    ItemsData,
  };
}

export const useStore = () => {
  const store = React.useContext(MobXProviderContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};
