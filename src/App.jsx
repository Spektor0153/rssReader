import React, { Component } from "react";
import "./App.css";
import { Header } from "./global/header";
import Main from './Components/mainLayot/main'
import {Provider} from "react-redux";
import store from "./redux/store";

class App extends Component {
  render() {
    return (
        <Provider store={store}>
              <div className="App">
                  <Main></Main>
                  <Header />
              </div>
        </Provider>
    );
  }
}

export default App;
