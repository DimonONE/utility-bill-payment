import { createGlobalState } from 'react-hooks-global-state';

const initialState = { userId: '', userName: '' };
export const { useGlobalState } = createGlobalState(initialState);