import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput
} from "react-native";

export class Hero extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logoClicked: false,
      searchText: "",
      searchQuery: ""
    };
  }

  toggleSearch = () => {
    this.setState({ logoClicked: !this.state.logoClicked });
  };

  render() {
    return (
      <TouchableOpacity onPress={this.toggleSearch} style={{ flex: 10 }}>
        {!this.state.logoClicked ? (
          <Image
            style={styles.heroImage}
            source={require("./img/MovieLookup_transparent.png")}
          />
        ) : (
          <View>
            <TextInput
              style={styles.heroInput}
              autoFocus
              placeholder="Find movie"
              onChangeText={text => this.setState({ searchText: text })}
              value={this.state.searchText}
              returnKeyType="search"
              onSubmitEditing={event => {
                var submitText = event.nativeEvent.text;
                this.setState({ searchQuery: submitText });
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
  heroImage: {
    width: undefined,
    height: undefined,
    flex: 1
  },
  heroInput: {
    textAlign: "center",
    paddingTop: "50%",
    fontSize: 24
  }
});
