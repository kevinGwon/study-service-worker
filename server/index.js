const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const webPush = require('web-push');

const app = express();

dotenv.config();

app.use(cors());
app.use(bodyParser.json());

// webPush.setVapidDetails('mailto: `YOUR EMAIL OR WEBSITE ADDRESS`', 'YOUR-PUBLIC-VAPID-KEY', 'YOUR-PRIVATE-VAPID-KEY');

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.post('/notifications/subscribe', (req, res) => {
  console.log(req.body);
  const payload = JSON.stringify({
    title: req.body.title,
    description: req.body.description,
    icon: req.body.icon,
  });
  webPush
    .sendNotification(req.body.subscription, payload)
    .then((result) => console.log())
    .catch((e) => console.log(e.stack));

  res.status(200).json({ success: true });
});

app.listen(8000, () => console.log('The server has been started on the port 8000'));
