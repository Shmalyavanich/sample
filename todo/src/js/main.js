import '../css/style.scss';
import {Application} from './app';
import {Listeners} from './listeners';


const app = new Application();
const listeners = new Listeners();

app.renderItemsList();
listeners.start();
