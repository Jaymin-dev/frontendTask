export const DATA_REQUEST = 'DATA_REQUEST';
export const DATA_SUCCESS = 'DATA_SUCCESS';
export const DATA_ERROR = 'DATA_ERROR';

export const RESET_BLOCK = 'RESET_BLOCK';

export const RESET_FLAGS = 'RESET_FLAGS';

const block = {
  loading: false,
  error: '',
  success: false,
};

const initialState = {
  data: { ...block },
};

export const Reducer = (state = initialState, action) => {
  switch (action.type) {

    case DATA_REQUEST:
      return { ...state, data: { ...state.data, loading: true } };
    case DATA_SUCCESS:
      return {
        ...state,
        data: { ...state.data,...action.payload, loading: false, success: true, error: '' },
      };
    case DATA_ERROR:
      return {
        ...state,
        data: { ...state.data, loading: false, error: action.error },
      };

    //reset block with flag and data
    case RESET_BLOCK:
      return {
        ...state,
        [action.payload.blockType]: {
          ...state[action.payload.blockType],
          ...initialState[action.payload.blockType],
        },
      };

    //reset only flags(block)
    case RESET_FLAGS:
      return {
        ...state,
        [action.payload.blockType]: {
          ...state[action.payload.blockType],
          ...block,
        },
      };

    default:
      return state;
  }
};
