import React from 'react';
import stores from '../stores';

export const Context = React.createContext(stores);
export const useStores = () => React.useContext(Context);
