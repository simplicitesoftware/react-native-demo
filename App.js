import React from 'react';
import { StyleSheet, Text, Image, View, ListView } from 'react-native';

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

	//
	render() {
		return (
			<View style={ styles.demo }>
				{ this.state.login && <View style={ styles.user }>
					<Image style={{ width: 50, height: 50 }} source={{ uri: 'data:' + this.state.picture.mime + ';base64,' +  this.state.picture.content }}/>
					<Text>{ this.state.login ? 'Hello ' + this.state.login + '!' : '' }</Text>
				</View> }
				{ this.state.login && <View style={ styles.products }>
					<DemoProduct/>
				</View> }
			</View>
		);
	}
};

export class DemoProduct extends React.Component {
	constructor(props) {
		super(props);
		global.DemoProductDS = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		this.state = { ds: global.DemoProductDS.cloneWithRows([]) };
	}

	componentWillMount() {
		let self = this;
		let prd = global.app.getBusinessObject('DemoProduct');
		prd.search(null, { inlineThumbs: false }).then(function(list) {
			let products = [];
			for (let item of list)
				products.push(item.demoPrdName);
			console.log(products);
			self.setState({ ds: global.DemoProductDS.cloneWithRows(products) });
		});
	}

	render() {
		return (
			<ListView
				enableEmptySections={ true }
				dataSource={ this.state.ds }
				renderRow={ (row) => <Text>{ row }</Text> }
			/>
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
		backgroundColor: '#ffffff'
	},
	demo: {
		flex: 1,
		padding: 20,
		backgroundColor: '#4682b4'
	},
	user: {
		flex: 1,
		padding: 20,
		backgroundColor: '#87ceeb',
		alignItems: 'center',
		justifyContent: 'center'
	},
	products: {
		flex: 5,
		padding: 20,
		backgroundColor: '#f0f0f0'
	}
});
