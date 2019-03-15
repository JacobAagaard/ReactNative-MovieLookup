import React from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";

export class Hero extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logoClicked: false
    };
  }

  searchMovies = () => {
    this.setState({ logoClicked: !this.state.logoClicked });
  };

  render() {
    return (
      <TouchableOpacity onPress={this.searchMovies} style={{ flex: 10 }}>
        {!this.state.logoClicked ? (
          <Image
            style={styles.heroImage}
            source={require("./img/MovieLookup_transparent.png")}
          />
        ) : (
          <TextInput style={styles.heroInput} autoFocus /> // Add functionality for user text input
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  heroImage: {
    width: undefined,
    height: undefined,
    flex: 1
  },
  heroInput: {
    textAlign: "center",
    paddingTop: "50%",
    fontSize: 32
  }
});
