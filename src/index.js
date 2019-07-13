import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './views/App';
import { I18nextProvider } from 'react-i18next';
import { i18next } from './actions/i18n.js';
import DocumentMeta from 'react-document-meta';

class Application extends Component {

    render() {
       

        return (
            <DocumentMeta>
                <Router>
                    <I18nextProvider i18n={i18next}>
                        <App />
                    </I18nextProvider>
                </Router>
            </DocumentMeta>
        );
    }

}

// Run react JS
ReactDOM.render(<Application/>, document.getElementById('root'));
// registerServiceWorker();

