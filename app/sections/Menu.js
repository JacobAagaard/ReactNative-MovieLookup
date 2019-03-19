import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Image
} from "react-native";

export class Menu extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.videoRow}>
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => this.props.navigate("VideosRT")}
          >
            <Image
              style={styles.videoImg}
              source={require("./img/MovieLookup_transparent.png")}
            />
            <Text style={styles.buttonText}>VideoTitle</Text>
          </TouchableOpacity>
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
