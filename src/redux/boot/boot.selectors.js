const bootState = (state) => state.boot;

export const selectBootBackgrounds = (store) => bootState(store).backgrounds;

export default bootState;
