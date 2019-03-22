import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput
} from "react-native";
import store from "../redux/searchStore";
import {
  fetchYoutubeApiKey,
  fetchYoutubeVideosWithQuery
} from "../services/YoutubeService";

export class Hero extends React.Component {
  constructor(props) {
    super(props);
    this.animatedFlex = 1;
    this.state = store.getState();

    store.subscribe(() => {
      this.setState(store.getState());
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
                  fetchYoutubeApiKey()
                    .then(YOUTUBE_API_KEY => {
                      return fetchYoutubeVideosWithQuery(
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
