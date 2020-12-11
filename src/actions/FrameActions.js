import {
  FETCHING_FRAMES,
  FETCH_FRAMES_SUCCESS,
  FETCH_FRAMES_FAILURE,
  SELECT_FRAME,
  COPY_FRAME,
  RESET_ERROR,
} from "./ActionTypes";

import { mockFetch } from "../back-end/server";

export const fetchingFrames = () => ({
  type: FETCHING_FRAMES,
});

const fetchFramesSuccess = (payload) => ({
  type: FETCH_FRAMES_SUCCESS,
  payload,
});

const fetchFramesFailure = (error) => ({
  type: FETCH_FRAMES_FAILURE,
  error,
});

export const fetchFrames = () => async (dispatch) => {
  dispatch(fetchingFrames());

  try {
    const variant = await mockFetch("/variant");
    const columns = await mockFetch("/columns");
    dispatch(fetchFramesSuccess([variant, columns]));
  } catch (err) {
    console.error(err);
    dispatch(fetchFramesFailure(err));
  }
};

export const selectFrame = (frameIndex) => ({
  type: SELECT_FRAME,
  selectedFrame: frameIndex,
});

export const copyFrame = () => ({
  type: COPY_FRAME,
});

export const resetError = () => ({
  type: RESET_ERROR,
});
