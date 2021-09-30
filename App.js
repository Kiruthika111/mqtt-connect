import React, { useState, useEffect } from 'react';
import './App.css';
import mqtt from "mqtt";

function App() {
const [client, setClient] = useState(null);
// const [ConnectStatus,setConnectStatus] = useState('not connected');

const mqttConnect = () => {
    const host = "test.powerconsent.com"
    const port = "8883";
    const url = `ws://${host}:${port}/mqtt`;
    const options = {
      defaultQos : 2,
      defaultTimeOut : 30,
      keepalive: 10,
      defaultSsl: true,
      defaultRetained: false,
      defaultLastWill: null,
      defaultPort: 1883,
      connect:  0,
      advancedConnect: 1,
      lastWill: 2,
      showHistory: 3,
      server: 'test.powerconsent.com',
      topic: 'topic',
      history: 'history',
      message: 'message',
      retained: 'retained',
      qos: '2',
      protocolId: 'MQTT',
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      useSSL: true,
      clientId: 'pcs',
      username: 'power',
      password: 'PowerConsent@123',
      will: {
        topic: 'WillMsg',
        payload: 'Connection Closed abnormally..!',
        qos: 0,
        retain: false
      },
      rejectUnauthorized: false
    };
    // options.clientId = "pcs";
    // options.username = "power";
    // options.password = "PowerConsent@123";

  setClient(mqtt.connect(url, options));
};

useEffect(() => {
  if (client) {
    console.log(client)
    client.on('connect', () => {
      //  setConnectStatus('Connected');
    });
    client.on('error', (err) => {
      console.error('Connection error: ', err);
      // setConnectStatus('Error');
      client.end();
    });
    client.on('reconnect', () => {
      //  setConnectStatus('Reconnecting');
    });
    client.on('message', (topic, message) => {
      const payload = { topic, message: message.toString() };
      // setPayload(payload);
    });
  }
}, [client]);

  return (
    <div className="App">
      <button
          style={{ color: 'white' }}
          onClick={mqttConnect}>
          <h1>Subscribe Topic</h1>
        </button>
    </div>
  );
}

export default App;
