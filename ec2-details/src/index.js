import React from 'react';
import ReactDOM from 'react-dom';
import UpdateEC2 from './components/loadNavBar';
import EC2OffView from './components/loadPowerOffVMs';
import EC2OnView from './components/loadPowerOnVMs';
import EC2PendingView from './components/loadPendingVMs';
import 'font-awesome/css/font-awesome.min.css';

ReactDOM.render(<EC2OnView/>,document.getElementById('EC2On'));
ReactDOM.render(<EC2OffView/>,document.getElementById('EC2Off'));
ReactDOM.render(<EC2PendingView/>,document.getElementById('EC2Pending'));
ReactDOM.render(<UpdateEC2/>,document.getElementById('nav'));

