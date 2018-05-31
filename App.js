import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

global.Buffer = global.Buffer || require('buffer').Buffer;
global.Simplicite = global.Simplicite || require('simplicite');

export default class App extends React.Component {
  componentWillMount() {
    global.app = Simplicite.session({
      url: 'https://demo.dev.simplicite.io',
      username: 'website',
      password: 'simplicite',
      debug: true
    });

    let self = this;
    global.app.login().then(function(params) {
      console.log('Logged in as ' + params.username);
      return global.app.getGrant({ inlinePicture: true }); // next promise
    }, function(reason) {
      global.app = undefined;
      console.error('Login failed (status: ' + reason.status + ', message: ' + reason.message + ')');
    }).then(function(grant) {
      if (!global.app) return;
      self.setState(grant);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{ this.state && this.state.login ? 'Hello ' + this.state.login + '!' : '' }</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
