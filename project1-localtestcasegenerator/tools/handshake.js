const http = require('http');

const data = JSON.stringify({
  model: 'llama3.2',
  messages: [
    { role: 'user', content: 'Say "Connection Confirmed" if you can hear me.' }
  ],
  stream: false
});

const options = {
  hostname: 'localhost',
  port: 11434,
  path: '/api/chat',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

console.log('Testing connection to Ollama (llama3.2)...');

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => { body += chunk; });
  res.on('end', () => {
    if (res.statusCode === 200) {
      const response = JSON.parse(body);
      console.log('Status: Success');
      console.log('Response:', response.message.content);
    } else {
      console.error('Error: Status', res.statusCode);
      console.error('Body:', body);
    }
  });
});

req.on('error', (error) => {
  console.error('Connection Error:', error.message);
});

req.write(data);
req.end();
