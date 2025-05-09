// Updated imports for modern serialport package
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');

const app = express();
const HTTP_PORT = 3001;

// Replace with your Arduino's serial port
// On Linux it's typically /dev/ttyACM0 or /dev/ttyUSB0
const ARDUINO_PORT = '/dev/ttyACM0'; // Change this to match your port

// Create the port and parser
const arduinoPort = new SerialPort({
  path: ARDUINO_PORT,
  baudRate: 9600
});

const parser = arduinoPort.pipe(new ReadlineParser({ delimiter: '\n' }));

app.use(cors());
let latestData = {};

// WebSocket Server
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('New client connected');
  if (latestData) {
    ws.send(JSON.stringify(latestData));
  }
  
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Handle Arduino data
parser.on('data', (data) => {
  try {
    latestData = {
      ...JSON.parse(data),
      receivedAt: new Date().toISOString()
    };
    console.log('New data:', latestData);
    
    // Broadcast to all WebSocket clients
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(latestData));
      }
    });
  } catch (e) {
    console.error('Error parsing data:', e);
  }
});

// Handle serial port errors
arduinoPort.on('error', (err) => {
  console.error('Serial port error:', err);
});

// HTTP API endpoint
app.get('/api/data', (req, res) => {
  res.json(latestData);
});

// Start HTTP server
app.listen(HTTP_PORT, () => {
  console.log(`Server running on http://localhost:${HTTP_PORT}`);
  console.log(`WebSocket server running on ws://localhost:8080`);
});