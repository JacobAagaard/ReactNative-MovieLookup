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

export class Register extends React.Component {
  static navigationOptions = {
    title: "Register",
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
      password: "",
      passwordConfirm: ""
    };
  }

  cancelRegister = () => {
    console.log("Registration cancelled");
    this.props.navigation.navigate("HomeRT");
  };

  registerAccount = () => {
    if (!this.state.username || !this.validateEmail(this.state.username)) {
      Alert.alert("Please enter a vaild Email");
    } else if (this.state.password !== this.state.passwordConfirm) {
      Alert.alert("Password mismatch");
    } else if (!this.state.password) {
      Alert.alert("Please enter a password");
    } else {
      firebase.db.app
        .auth()
        .createUserWithEmailAndPassword(
          this.state.username,
          this.state.password
        )
        .then(() => {
          Alert.alert(`${this.state.username} account created`);
          this.props.navigation.navigate("HomeRT");
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == "auth/weak-password") {
            alert("The password is too weak.");
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    }
  };

  validateEmail(mail) {
    const validMailPattern = /\S+@\S+\.\S+/;
    if (validMailPattern.test(mail)) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputs}
          onChangeText={text => this.setState({ username: text })}
          value={this.state.username}
          placeholder="Enter Email"
          placeholderTextColor="rgb(211, 172, 0)"
          returnKeyType="next"
        />

        <TextInput
          style={styles.inputs}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
          secureTextEntry={true}
          placeholder="Enter Password"
          placeholderTextColor="rgb(211, 172, 0)"
          returnKeyType="next"
        />

        <TextInput
          style={styles.inputs}
          onChangeText={text => this.setState({ passwordConfirm: text })}
          value={this.state.passwordConfirm}
          secureTextEntry={true}
          placeholder="Enter Password again"
          placeholderTextColor="rgb(211, 172, 0)"
          returnKeyType="done"
        />

        <TouchableHighlight
          onPress={this.registerAccount}
          style={styles.touchables}
        >
          <Text style={styles.buttons}>Register</Text>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={this.cancelRegister}
          underlayColor="#31e981"
          style={styles.touchables}
          borderColor="#35605a"
          borderWidth="1px"
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
    padding: 10,
    marginBottom: 10,
    borderColor: "gray",
    borderWidth: 1
  },
  buttons: {
    fontSize: 16,
    textAlign: "center"
  },
  touchables: {
    borderColor: "#35605a",
    borderWidth: 1,
    marginTop: 15,
    width: 100,
    padding: 5
  }
});
