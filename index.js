import { registerRootComponent } from 'expo';

import App from './app/App';
import axios from "axios";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately

axios.defaults.baseURL = "http://192.168.31.62:8038/api"

registerRootComponent(App);
