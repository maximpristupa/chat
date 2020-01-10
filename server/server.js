"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token, X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.post('/messages', (req, res, next) => {
  let messages = getAndUpdateMessages(req, true);
  res.send(messages);
})

app.get('/messages', (req, res) => {
  let messages = getAndUpdateMessages(req);
  res.send(messages);
});

app.get('/online', (req, res) => {
  const MINUTE = 60000;
  let messages = getMessages();
  let lastMessageIndex = messages.length;
  let lastMessage = messages.find((element, index) => {
    if (+element.createdAt >= Date.now() - MINUTE * 2) {
      lastMessageIndex = index;
      return element;
    }
  });
  let latestMessages = messages.slice(lastMessageIndex);
  let names = [];
  latestMessages.forEach((element)=>{
    names.push(element.userName);
  });
  res.send(JSON.stringify(names));
});

app.get('/user', (req, res) => {
  const name = req.query.name;
  const pureName = name.replace(/%20/g, ' ');
  let messages = getMessages();
  let usersMessages = [];
  let found = messages.find((element, index) => {
    if (element.userName == pureName) {
      usersMessages.push(element);
    }
  });
  res.send(usersMessages);
});

function getAndUpdateMessages(req, post = false) {
  let messages = getMessages();
  let lastMessageTime = req.query.lastmessagetime;
  let lastMessageIndex = null;
  let found = messages.find((element, index) => {
    lastMessageIndex = index;
    return element.createdAt == `${lastMessageTime}`;
  });
  if (post) {
    messages[messages.length] = req.body;
    fs.writeFileSync('messages.json', JSON.stringify(messages));
  }
  if (found) {
    messages = messages.slice(lastMessageIndex + 1);
  }
  return messages;  
}

function getMessages() {
  let jsonFile = fs.readFileSync('messages.json');
  return JSON.parse(jsonFile);
}

app.listen(3000, () => console.log('Server started on port 3000'));