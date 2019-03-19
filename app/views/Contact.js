import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Alert
} from "react-native";

export class Contact extends React.Component {
  static navigationOptions = {
    title: "Contact",
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
      msg: "Enter Message",
      name: "Enter Name",
      email: "Enter E-mail Address"
    };
  }

  clearFields = () => this.setState({ name: "", msg: "", email: "" });

  sendMessage = () => {
    Alert.alert(this.state.name, this.state.msg);
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputs}
          onChangeText={text => this.setState({ name: text })}
          value={this.state.name}
          placeholder="Enter Name"
          placeholderTextColor="rgb(211, 172, 0)"
        />
        <TextInput
          style={styles.multiInput}
          onChangeText={text => this.setState({ msg: text })}
          value={this.state.msg}
          multiline={true}
          numberOfLines={4}
          placeholder="Enter Message"
          placeholderTextColor="rgb(211, 172, 0)"
        />
        <TextInput
          style={styles.inputs}
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
          placeholder="Enter E-mail address"
          placeholderTextColor="rgb(211, 172, 0)"
        />

        <TouchableHighlight
          onPress={this.sendMessage}
          style={styles.touchables}
        >
          <Text style={styles.buttons}>Send Message</Text>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={this.clearFields}
          style={styles.touchables}
        >
          <Text style={styles.buttons}>Reset Form</Text>
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
  multiInput: {
    flex: 5,
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
    width: 150,
    padding: 5
  }
});
