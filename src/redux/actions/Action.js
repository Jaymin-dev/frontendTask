import { DATA_REQUEST, RESET_BLOCK, RESET_FLAGS } from "../reducers/Reducer";

export const dashboardRequest = () => ({ type: DATA_REQUEST });

export const resetBlock = (payload) => ({
  type: RESET_BLOCK,
  payload,
});

export const resetFlags = (payload) => ({
  type: RESET_FLAGS,
  payload,
});
