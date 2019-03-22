import * as firebase from "../db/firebaseConfig";
import store from "../redux/searchStore";

export function fetchYoutubeApiKey() {
  return new Promise((resolve, reject) => {
    firebase.db.app
      .database()
      .ref("/store/YOUTUBE_API_KEY")
      .once("value")
      .then(async snapshot => {
        resolve(snapshot.val() && (await snapshot.val()));
      })
      .catch(error => {
        console.log(error);
      });
  });
}

export function fetchYoutubeVideos(YOUTUBE_API_KEY) {
  return fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=interstellar&type=video&key=${YOUTUBE_API_KEY}`
  )
    .then(response => response.json())
    .then(responseJson => {
      store.dispatch({
        type: "VIDEOS_LOADED",
        videoList: Array.from(responseJson.items)
      });
    })
    .catch(error => {
      console.log(error);
    });
}

export function fetchYoutubeVideosWithQuery(YOUTUBE_API_KEY, searchQuery) {
  return fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${searchQuery}&type=video&key=${YOUTUBE_API_KEY}`
  )
    .then(response => response.json())
    .then(responseJson => {
      store.dispatch({
        type: "VIDEOS_LOADED",
        videoList: Array.from(responseJson.items)
      });
    })
    .catch(error => {
      console.log(error);
    });
}
