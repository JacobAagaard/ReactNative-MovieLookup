import React from "react";
import { Text, View } from "react-native";

export class VideoDetail extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    let tubeId = this.props.navigation.getParam(
      "youtubeId",
      "NO VIDEO WITH THAT ID"
    );

    return (
      <View style={{ paddingTop: 30 }}>
        <Text>{tubeId}</Text>
      </View>
    );
  }
}
