import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

global.debug = true;
global.Buffer = global.Buffer || require('buffer').Buffer; // ZZZ required by simplicite lib ZZZ

export class Demo extends React.Component {
	constructor(props) {
		super(props);
		global.app = require('simplicite').session({
			url: props.url,
			username: props.username,
			password: props.password,
			debug: global.debug
		});
		this.state = {};
	}

	componentWillMount() {
		let self = this;
		global.app.login().then(function(params) {
			if (global.debug) console.log('Logged in as ' + params.username);
			return global.app.getGrant({ inlinePicture: true }); // next promise
		}, function(reason) {
			global.app = undefined;
			console.error('Login failed (status: ' + reason.status + ', message: ' + reason.message + ')');
		}).then(function(grant) {
			if (!global.app) return;
			self.setState(grant);
		});
	}

	/*{ this.state.login && xDemoProduct/x }*/
	render() {
		return (
			<View>
				<Text>{ this.state.login ? 'Hello ' + this.state.login + '!' : '' }</Text>
			</View>
		);
	}
};

export class DemoProduct extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount() {
		let self = this;
		let prd = global.app.getBusinessObject('DemoProduct');
		prd.search(null, { inlineThumbs: true }).then(function(list) {
			self.setState({ list: list });
		});
	}

	render() {
		return (
			<FlatList data={ this.state.list } renderItem={ (item) => <Text>{ item.demoPrdName }</Text> } />
	   );
	}
};

export default class App extends React.Component {
	render() {
		return (
			<View style={ styles.container }>
				<Demo url='https://demo.dev.simplicite.io' username='website' password='simplicite'/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
});
