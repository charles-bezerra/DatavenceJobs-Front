import React from 'react';
import ReactDom from 'react-dom';
import Routes from './routes';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDom.render(
    <Routes/>,
    document.getElementById("app")
);