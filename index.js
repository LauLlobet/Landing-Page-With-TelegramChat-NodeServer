
//npm install --save node-telegram-bot-api

const TelegramBot = require('node-telegram-bot-api');
const firebase = require('firebase');

// replace the value below with the Telegram token you receive from @BotFather
const token = '507346153:AAHi13XlkcwLd5A7GETKC9rGjUiHFBR1f40';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAwjIJXmqcJ_uoUSFFDy1sap4rebuhglDw",
    authDomain: "gncalive.firebaseapp.com",
    databaseURL: "https://gncalive.firebaseio.com",
    storageBucket: "gncalive.appspot.com",
    messagingSenderId: "116350798150"
  };
  firebase.initializeApp(config);

  var fireBase = firebase.database().ref("chat");

  var alias = firebase.database().ref("alias");

hashCode = function(str){
    if(str === undefined){
      return 0;
    }
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash%500);
}


 fireBase.on("child_added", function(snapshot) {
      var obj = snapshot.val(); 
      
      var concreteAlias = firebase.database().ref('alias/'+hashCode(obj.name));

      concreteAlias.on('value', function(snapshot) {
          bot.sendMessage(500363388, snapshot.val() +': '+obj.text);
          console.log(snapshot.val() +': '+obj.text);
      });

  });




// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  console.log(chatId);
  fireBase.push({
        name: "Lau Llobet (professor de GNCA)",
        text: msg.text
      });
});