/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer, Dispatch } from 'react';

const reducer = (prevState: any, updater: any): any =>
  typeof updater === 'function'
    ? { ...prevState, ...updater(prevState) }
    : { ...prevState, ...updater };

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useMergeState = (initialState: any): [any, Dispatch<any>] =>
  useReducer(reducer, initialState);

export default useMergeState;
