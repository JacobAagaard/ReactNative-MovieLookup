import React from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  StyleSheet
} from "react-native";
import {
  fetchYoutubeApiKey,
  fetchYoutubeVideos
} from "../services/YoutubeService";
import store from "../redux/searchStore";

export class Video extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = store.getState();

    store.subscribe(() => {
      this.setState(store.getState());
    });
  }
  componentDidMount() {
    fetchYoutubeApiKey().then(API_KEY => {
      return fetchYoutubeVideos(API_KEY);
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        {this.state.videosLoaded && (
          <View style={{ paddingTop: 30 }}>
            <FlatList
              data={this.state.videoList}
              renderItem={({ item }) => (
                <TubeItem
                  id={item.id.videoId}
                  title={item.snippet.title}
                  imageSrc={item.snippet.thumbnails.high.url}
                  navigate={navigate}
                />
              )}
            />
          </View>
        )}
        {!this.state.videosLoaded && (
          <View style={{ paddingTop: 30 }}>
            <Text>LOADING</Text>
          </View>
        )}
      </View>
    );
  }
}

export class TubeItem extends React.Component {
  onPress = () => {
    this.props.navigate("VideoDetailRT", { youtubeId: this.props.id });
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={styles.container}>
          <Image
            style={styles.animatedImg}
            source={{ uri: this.props.imageSrc }}
          />
          <Text>{this.props.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: { paddingTop: 20, alignItems: "center" },
  animatedImg: {
    width: "100%",
    height: 200
  }
});
