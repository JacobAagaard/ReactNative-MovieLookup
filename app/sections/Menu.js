import React from "react";
import { StyleSheet, View, ScrollView, FlatList, Image } from "react-native";
import store from "../redux/searchStore";
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
    const searchInfo = require("./img/search.png");
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
        {this.state.logoClicked ? (
          <></>
        ) : (
          <Image
            style={{
              width: "50%",
              resizeMode: "contain"
            }}
            source={searchInfo}
          />
        )}
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
