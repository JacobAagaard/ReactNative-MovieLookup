import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput
} from "react-native";
import * as firebase from "../db/firebaseConfig";
import store from "../redux/searchStore";

export class Hero extends React.Component {
  constructor(props) {
    super(props);
    this.animatedFlex = 1;
    this.state = store.getState();

    store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  fetchYoutubeVideos(YOUTUBE_API_KEY, searchQuery) {
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

  toggleSearch = () => {
    store.dispatch({ type: "TOGGLE_SEARCH" });
  };

  render() {
    return (
      <View
        style={{
          ...this.props.style,
          flex: this.state.logoFlexAnim
        }}
      >
        <TouchableOpacity onPress={this.toggleSearch} style={styles.container}>
          {!this.state.logoClicked ? (
            <Image
              style={styles.heroImage}
              source={require("./img/MovieLookup_transparent.png")}
              resizeMode={"contain"}
            />
          ) : (
            <View>
              <TextInput
                style={styles.heroInput}
                autoFocus
                placeholder="Find movie"
                onChangeText={text => {
                  store.dispatch({ type: "NEW_SEARCH", text });
                }}
                value={this.state.searchText}
                returnKeyType="search"
                onSubmitEditing={event => {
                  var submitText = event.nativeEvent.text;
                  var searchQuery = submitText.replace(" ", "+");
                  let YOUTUBE_API_KEY = "";
                  firebase.db.app
                    .database()
                    .ref("/store/YOUTUBE_API_KEY")
                    .once("value")
                    .then(snapshot => {
                      YOUTUBE_API_KEY =
                        (snapshot.val() && snapshot.val()) ||
                        "API_KEY_NOT_FOUND";
                    })
                    .then(() => {
                      return this.fetchYoutubeVideos(
                        YOUTUBE_API_KEY,
                        searchQuery
                      );
                    })
                    .catch(error => {
                      console.log(error);
                    });
                }}
              />
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  heroImage: {
    flex: 1,
    alignSelf: "center"
  },
  heroInput: {
    textAlign: "center",
    paddingTop: 10,
    fontSize: 24
  }
});
