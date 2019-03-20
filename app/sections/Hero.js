import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput
} from "react-native";
import * as firebase from "../db/firebaseConfig";
import store from "../searchStore";

export class Hero extends React.Component {
  constructor(props) {
    super(props);
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
        // this.setState({
        //   listLoaded: true,
        //   videoList: Array.from(responseJson.items)
        // });
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
    // this.setState({ logoClicked: !this.state.logoClicked });
    store.dispatch({ type: "TOGGLE_SEARCH" });
  };

  render() {
    return (
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
                // this.setState({ searchText: text });
                store.dispatch({ type: "NEW_SEARCH", text });
              }}
              value={this.state.searchText}
              returnKeyType="search"
              onSubmitEditing={event => {
                var submitText = event.nativeEvent.text;
                var searchQuery = submitText.replace(" ", "+");
                console.log(searchQuery);
                //this.setState({ searchQuery: submitText });
                let YOUTUBE_API_KEY = "";
                firebase.db.app
                  .database()
                  .ref("/store/YOUTUBE_API_KEY")
                  .once("value")
                  .then(snapshot => {
                    YOUTUBE_API_KEY =
                      (snapshot.val() && snapshot.val()) || "API_KEY_NOT_FOUND";
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
                //query using submitted text
              }}
            />
          </View>
        )}
      </TouchableOpacity>
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
    paddingTop: "25%",
    fontSize: 24
  }
});
