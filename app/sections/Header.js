import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  Alert,
  AlertButton
} from "react-native";
import * as firebase from "../db/firebaseConfig";

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      loggedUser: false
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("userLoggedIn", (err, result) => {
      if (result === "none") {
        console.log("No user is logged in");
      } else if (result === null) {
        AsyncStorage.setItem("userLoggedIn", "none", (err, result) => {
          console.log("Initialize user to none");
        });
      } else {
        this.setState({
          isLoggedIn: true,
          loggedUser: result
        });
      }
    });
  }

  toggleUser = () => {
    if (this.state.isLoggedIn) {
      Alert.alert("Logout?", null, [
        { text: "Cancel" },
        {
          text: "Logout",
          onPress: () => {
            firebase.db.app
              .auth()
              .signOut()
              .catch(function(error) {
                console.log(error.code + ": " + error.message);
                // An error happened.
              });
            this.setState({ isLoggedIn: false, loggedUser: false });
            Alert.alert("Successfully logged out");
          }
        }
      ]);
    } else {
      this.props.navigate("LoginRT");
    }
  };

  render() {
    let display = this.state.isLoggedIn
      ? this.state.loggedUser
      : this.props.message;
    return (
      <View style={styles.headStyle}>
        <Image
          style={styles.logoStyle}
          source={require("./img/MovieLookup_transparent.png")}
        />
        <Text onPress={this.toggleUser} style={styles.headText}>
          {display}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headText: {
    paddingTop: 30,
    textAlign: "right",
    color: "rgb(211, 172, 0)",
    fontSize: 20,
    flex: 4
  },
  headStyle: {
    paddingRight: 10,
    backgroundColor: "#35605a",
    flex: 1.5,
    flexDirection: "row",
    borderBottomWidth: 2,
    borderColor: "#000000"
  },
  logoStyle: {
    flex: 1,
    width: undefined,
    height: undefined
  }
});
