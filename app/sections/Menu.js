import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  FlatList
} from "react-native";
import store from "../searchStore";
import { TubeItem } from "../views/Video";

export class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    store.subscribe(() => {
      this.setState(store.getState());
    });
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.videoRow}>
          {this.state.videosLoaded && (
            <FlatList
              data={this.state.videoList}
              renderItem={({ item }) => (
                <TubeItem
                  id={item.id.videoId}
                  title={item.snippet.title}
                  imageSrc={item.snippet.thumbnails.high.url}
                  navigate={this.props.navigate}
                />
              )}
            />
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#35605a"
  },
  videoRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start"
  },
  touchable: {
    backgroundColor: "#35605a",
    alignItems: "center"
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18
  },
  videoImg: {
    flex: 1,
    height: 100,
    width: 100
  }
});
