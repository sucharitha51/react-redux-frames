import deepFreeze from "deep-freeze";
import { snakeToCamelCase } from "../util/snakeToCamelCase";

import {
  FETCHING_FRAMES,
  FETCH_FRAMES_SUCCESS,
  FETCH_FRAMES_FAILURE,
  SELECT_FRAME,
  COPY_FRAME,
  RESET_ERROR,
} from "../actions/ActionTypes";

const initialState = {
  selectedFrame: 0,
  copiedFrame: null,
};
deepFreeze(initialState);

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_FRAMES:
      return fetchingFrames(state, action);
    case FETCH_FRAMES_SUCCESS:
      return fetchFramesSuccess(state, action);
    case FETCH_FRAMES_FAILURE:
      return fetchFramesFailure(state, action);

    case SELECT_FRAME:
      return selectFrame(state, action);

    case COPY_FRAME:
      return copyFrame(state, action);

    case RESET_ERROR:
      return resetError(state, action);

    default:
      return state;
  }
};

const fetchingFrames = (state, action) => ({
  ...state,
  isFetchingFrames: true,
  isFetchingFramesError: false,
});

const fetchFramesSuccess = (state, action) => {
  const payload = snakeToCamelCase(action.payload);

  let variant;
  let columns;

  const isVariantResponse = !!payload[0].body.creativeList;

  if (isVariantResponse) {
    variant = payload[0];
    columns = payload[1];
  } else {
    variant = payload[1];
    columns = payload[0];
  }

  const frames = variant.body.creativeList[0].workingData.frames;

  const getColumnsToDisplay = (columns, frameId) => {
    return columns.body
      .filter((column) => column.parentFrameId === frameId)
      .filter((column) => !column.isHidden);
  };

  const tableData = {
    0: {
      columns: getColumnsToDisplay(columns, frames.first.frameId),
      row: getColumnsToDisplay(columns, frames.first.frameId).map((column) => {
        return { [column.keyName]: frames.first.content[column.keyName] };
      }),
      frameContent: frames.first.content,
    },
    1: {
      columns: getColumnsToDisplay(columns, frames.middle[0].frameId),
      row: getColumnsToDisplay(columns, frames.first.frameId).map((column) => {
        return { [column.keyName]: frames.middle[0].content[column.keyName] };
      }),
      frameContent: frames.middle[0].content,
    },
    2: {
      columns: getColumnsToDisplay(columns, frames.middle[1].frameId),
      row: getColumnsToDisplay(columns, frames.first.frameId).map((column) => {
        return { [column.keyName]: frames.middle[1].content[column.keyName] };
      }),
      frameContent: frames.middle[1].content,
    },
    3: {
      columns: getColumnsToDisplay(columns, frames.last.frameId),
      row: getColumnsToDisplay(columns, frames.first.frameId).map((column) => {
        return { [column.keyName]: frames.last.content[column.keyName] };
      }),
      frameContent: frames.last.content,
    },
  };

  return {
    ...state,
    tableData,
    isFetchingFrames: false,
    isFetchingFramesError: false,
  };
};

const fetchFramesFailure = (state, { error }) => ({
  ...state,
  error,
  isFetchingFrames: false,
  isFetchingFramesError: true,
  statusCode: parseInt(error.message, 10),
});

const selectFrame = (state, { selectedFrame }) => ({
  ...state,
  selectedFrame,
  copiedFrame: null,
});

const copyFrame = (state) => {
  return {
    ...state,
    copiedFrame: {
      ...state.tableData[state.selectedFrame],
    },
  };
};

const resetError = (state) => ({
  ...state,
  isFetchingFramesError: false,
  statusCode: null,
});

export default rootReducer;
