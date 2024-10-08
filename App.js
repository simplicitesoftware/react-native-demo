/*  ___ _            _ _    _ _
 * / __(_)_ __  _ __| (_)__(_) |_ ___
 * \__ \ | '  \| '_ \ | / _| |  _/ -_)
 * |___/_|_|_|_| .__/_|_\__|_|\__\___|
 *             |_|
 * This example is using the Simplicite node.js & browser JavaScript API
 */
import React from 'react';
import { StyleSheet, Text, Image, View, ScrollView, FlatList } from 'react-native';
import Simplicite from 'simplicite';

global.debug = false;

export class Demo extends React.Component {
	constructor(props) {
		super(props);
		global.app = Simplicite.session({
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
			global.app.getGrant().then(function(grant) {
				if (!global.app) return;
				self.setState(grant);
			});
		}).fail(function(reason) {
			global.app = undefined;
			console.error('Login failed (status: ' + reason.status + ', message: ' + reason.message + ')');
		});
	}

	render() {
		return (
			<View style={ styles.demo }>
				{ this.state.login && <View style={ styles.user }>
					<Image style={{ width: 250, height: 50 }} source={{ uri: 'https://www.simplicite.io/resources/logos/logo250.png' }}/>
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
		this.state = { list: [] };
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
			<FlatList
				data={ this.state.list }
				keyExtractor={ (item, index) => item.row_id }
				renderItem={ ({ item }) => <View>
					<ScrollView horizontal={ true }>
						<Image style={{ width: 50, height: 50 }} source={{ uri: 'data:image/png;base64,' + item.demoPrdPicture.thumbnail }}/>
						<View>
							<Text style={ styles.productname }>{ item.demoPrdName }</Text>
							<Text style={ styles.productreference }>{ item.demoPrdReference }</Text>
						</View>
					</ScrollView>
					<Text style={ styles.productdescription }>{ item.demoPrdDescription }</Text>
				</View> }
			/>
	   );
	}
};

export default class App extends React.Component {
	render() {
		return (
			<View style={ styles.container }>
				<Demo url='https://demo.dev2.simplicite.io' username='website' password='simplicite'/>
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
		paddingTop: 25,
		backgroundColor: '#000000'
	},
	user: {
		flex: 1,
		padding: 15,
		backgroundColor: '#87ceeb',
		alignItems: 'center',
		justifyContent: 'center'
	},
	products: {
		flex: 5,
		padding: 10,
		backgroundColor: '#f0f0f0'
	},
	productname: {
		fontWeight: 'bold'
	},
	productreference: {
		fontStyle: 'italic',
		color: '#707070'
	},
	productdescription: {
		padding: 10,
		marginBottom: 15,
		borderRadius: 10,
		backgroundColor: '#e0e0e0'
	}
});
