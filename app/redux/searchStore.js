import { createStore } from "redux";

const defaultState = {
  logoClicked: false,
  searchText: "",
  videosLoaded: false,
  videoList: [],
  searches: [
    {
      current: "Initial search",
      prevSearches: [""]
    }
  ],
  logoFlexAnim: 1
};

function searchStore(state = defaultState, action) {
  if (action.type != "NEW_SEARCH")
    console.log("entered searchStore with type: " + action.type);
  switch (action.type) {
    case "STORE_SEARCH":
      return Object.assign({}, state, {
        searches: state.searches.concat([
          {
            current: action.text,
            prevSearches: [action.text, ...history]
          }
        ])
      });
    case "NEW_SEARCH":
      return Object.assign({}, state, {
        searchText: action.text
      });
    case "TOGGLE_SEARCH":
      return Object.assign({}, state, {
        logoClicked: !state.logoClicked.valueOf(),
        logoFlexAnim: !state.logoClicked ? 0.1 : 1
      });
    case "VIDEOS_LOADED":
      return Object.assign({}, state, {
        videosLoaded: true,
        videoList: action.videoList
      });
    default:
      return state;
  }
}

export default createStore(searchStore);
