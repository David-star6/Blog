import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.less'
import App from './App';
import Page from './Page'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Page />, document.getElementById('root'));

registerServiceWorker();
