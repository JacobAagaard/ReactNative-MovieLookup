import React from "react";
import { Home } from "./app/views/Home.js";
import { Contact } from "./app/views/Contact.js";
import { StackNavigator } from "react-navigation";
import { Video } from "./app/views/Video.js";
import { VideoDetail } from "./app/views/VideoDetail.js";
import { Register } from "./app/views/Register.js";
import { Login } from "./app/views/Login.js";
import { Quiz } from "./app/views/Quiz.js";
import { FinishQuiz } from "./app/views/QuizFinish.js";
import { About } from "./app/views/About.js";

const MyRoutes = StackNavigator(
  {
    HomeRT: {
      screen: Home
    },
    ContactRT: {
      screen: Contact
    },
    VideosRT: {
      screen: Video
    },
    VideoDetailRT: {
      screen: VideoDetail
    },
    RegisterRT: {
      screen: Register
    },
    LoginRT: {
      screen: Login
    },
    QuizRT: {
      screen: Quiz
    },
    FinishQuizRT: {
      screen: FinishQuiz
    },
    AboutRT: {
      screen: About
    },
    BlogRT: {
      screen: About
    }
  },
  {
    initialRouteName: "HomeRT"
  }
);

export default class App extends React.Component {
  render() {
    return <MyRoutes />;
  }
}
