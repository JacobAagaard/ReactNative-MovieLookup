import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  View
} from "react-native";

const aboutML =
  "MovieLookup is a search engine for matching your favorite streaming service with IMDb. It is created purely because a proficient alternative was not available. MovieLookup is a hobby project and therefore is free to use.";

const whoML = "Author: Jacob Aagaard - Launched: March 2019";

const repo = "https://github.com/JacobAagaard/ReactNative-MovieLookup";

export class About extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Image
          style={styles.pics}
          source={require("../sections/img/MovieLookup_transparent.png")}
        />
        <Text style={styles.aboutTitle}>What ML is</Text>
        <Text style={styles.aboutText}>{aboutML}</Text>

        <Text style={styles.aboutTitle}>About ML</Text>
        <Text style={styles.aboutText}>{whoML}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.urlButton}
            onPress={() => {
              Linking.openURL(repo);
            }}
          >
            <Text style={{ color: "white" }}>Github</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    backgroundColor: "#ffffff"
  },
  pics: {
    height: 250,
    alignItems: "center",
    justifyContent: "center"
  },
  aboutTitle: {
    paddingTop: 10,
    textAlign: "center",
    fontWeight: "bold"
  },
  aboutText: {
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10
  },
  urlButton: {
    backgroundColor: "#35605a",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: 150
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center"
  }
});
