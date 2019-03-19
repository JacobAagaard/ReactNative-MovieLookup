import React from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import * as firebase from "../db/config";

export class Video extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      listLoaded: false
    };
  }
  componentDidMount() {
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
        return fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=interstellar&type=video&key=${YOUTUBE_API_KEY}`
        )
          .then(response => response.json())
          .then(responseJson => {
            this.setState({
              listLoaded: true,
              videoList: Array.from(responseJson.items)
            });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        {this.state.listLoaded && (
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
        {!this.state.listLoaded && (
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
        <View style={{ paddingTop: 20, alignItems: "center" }}>
          <Image
            style={{ width: "100%", height: 200 }}
            source={{ uri: this.props.imageSrc }}
          />
          <Text>{this.props.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
