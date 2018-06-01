![Simplicit&eacute; Software](https://www.simplicite.io/resources/logos/logo250.png)
* * *

ReactNative&reg; demo
=====================

This project is a **very basic** native front-end demo written in [ReactNative&reg;](https://facebook.github.io/react-native/)
using the [Simplicit&eacute;&reg; node.js &amp; browser library](ihttps://github.com/simplicitesoftware/nodejs-api).

Prerequisites:

	sudo npm install -g react-native-cli

Install:

        npm install

Run in dev mode:

        npm start

Android
-------

**TODO**: to be completed

	react-native eject
	mkdir -p android/app/src/main/assets
	rm -fr android/app/build
	react-native bundle --platform android --dev false --entry-file App.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
	cd android
	gradle assembleDebug

iOS
---

**TODO**: to be completed

License
=======

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at:

[](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

