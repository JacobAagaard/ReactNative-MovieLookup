import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
  AsyncStorage,
  TextInput
} from "react-native";
import * as firebase from "../db/config";

export class Login extends React.Component {
  static navigationOptions = {
    title: "Login",
    headerStyle: {
      backgroundColor: "#35605a"
    },
    headerTitleStyle: {
      flex: 1
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  cancelLogin = () => {
    console.log("Login cancelled");
    this.props.navigation.navigate("HomeRT");
  };

  loginUser = () => {
    if (!this.state.username) {
      Alert.alert("Please enter a username");
    } else if (!this.state.password) {
      Alert.alert("Please enter a password");
    } else {
      AsyncStorage.getItem("userLoggedIn", (err, result) => {
        if (result !== "none") {
          Alert.alert("Someone already logged on");
          this.props.navigation.navigate("HomeRT");
        } else {
          firebase.db.app
            .auth()
            .signInWithEmailAndPassword(
              this.state.username,
              this.state.password
            )
            .then(() => {
              AsyncStorage.setItem(
                "userLoggedIn",
                this.state.username,
                (err, result) => {
                  Alert.alert(`${this.state.username} successfully logged in`);
                  this.props.navigation.navigate("HomeRT");
                }
              );
            })
            .catch(error => {
              alert(error.message);
              console.log(error);
            });
        }
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputs}
          placeholder="Email"
          placeholderTextColor="rgb(211, 172, 0)"
          onChangeText={text => this.setState({ username: text })}
          value={this.state.username}
        />

        <TextInput
          style={styles.inputs}
          placeholder="Password"
          placeholderTextColor="rgb(211, 172, 0)"
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
          secureTextEntry={true}
        />

        <TouchableHighlight onPress={this.loginUser} style={styles.touchables}>
          <Text style={styles.buttons}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={this.cancelLogin}
          style={styles.touchables}
        >
          <Text style={styles.buttons}>Cancel</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingBottom: "45%",
    paddingTop: "10%"
  },
  inputs: {
    flex: 1,
    width: "80%",
    padding: 5,
    marginBottom: 10,
    borderColor: "gray",
    borderWidth: 1
  },
  buttons: {
    textAlign: "center",
    fontSize: 16
  },
  touchables: {
    borderColor: "#35605a",
    borderWidth: 1,
    marginTop: 15,
    width: 100,
    padding: 5
  }
});
