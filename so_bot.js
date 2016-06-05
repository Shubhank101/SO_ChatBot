// ==UserScript==
// @name Kamini
// @namespace     http://shubhank.com
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js 
// @include       http://chat.stackoverflow.com/rooms/26424/iosandroidchaosoverflow
// @run-at        document-start
// ==/UserScript==

 
window.onload = onload;

var firstLoad = true;
var messagesArr = [];
var completedMessages = [];

var state_awake = "awake";
var state_sleep = "shutdown";
var state = "awake"

var adminIds = []; // add your user id here

function onload(args) {
  console.log("loaded");
  
  startEvent(); // send the initialized messaged to the chat
  
  setTimeout(detectMessages,1000); // load the current chat messages into completed messages
  setInterval(detectMessages,5000); // start processing messages every 5 seconds
}

function startEvent() {
  sendMessage(null,false,"Bot Initialized");
}

function isAwake() {
	return state == state_awake;
}


function detectMessages() {
    var messages = document.getElementsByClassName("user-container monologue");
	// we only process the last 10 messages in the dom and not the whole dom ( for performance reasons )
	for(i = messages.length - 1; i > messages.length-10 && i > 0;  --i ){
	    var element = messages[i];
        var messagesDiv = $(element).children(".messages").children(".message");	// if user sends three messages in a row - message Div will have 3 count
			for(var j = 0; j < messagesDiv.length ; j++){
			    var innerEle = messagesDiv.eq(j);
				var _messageId =  innerEle.attr('id').replace("message-", "");				
				var content = $(innerEle).children(".content").html();
			   	if (content == null) {
					 continue;
				}
				
				var found = checkIfMessageContainedInArray(messagesArr,_messageId); // if already parsed 				
				var completedFound = checkIfMessageContainedInArray(completedMessages,_messageId); // if already parsed as well as processed
				if (found == false && completedFound == false) {
					var userId = $(element).children(".signature").attr('href').replace("/users/","");
					var username = $(element).children(".signature").children('.username').html();					
					
					var contentElement = {
						messageId : _messageId,
						message : content,
						userID : userId,
						username : username
                    };
					
					if (firstLoad) {
						completedMessages.push(contentElement);
					}
					else {
						messagesArr.push(contentElement);
					}
				}
			}
	}

	
	firstLoad = false;
	checkLogic(); // process the messages
}


function checkIfMessageContainedInArray(array, messageId) {
	for(var j = 0; j < array.length ;  j++){	
		var element = array[j];
		if (element.messageId ==  messageId) {
			return true;
		}
	}
	return false;
}

function checkifUserIdExist(array, userId) {
	for(var j = 0; j < array.length ;  j++){	
		var UserID = array[j];
		if (UserID ==  userId) {
			return true;
		}
	}
	return false;
}

function processMessages() {

	for ( i = 0 ; i < messagesArr.length; i++ ) {
		var element = messagesArr[i];
		if (element == null || element.message == null) {
			continue;
		}
		
		var content = element.message;				
		
		if (greetedUsers.indexOf(element.userID) == -1) {
			greetedUsers.push(element.userID);
			//sendMessage(null,false, "@" + element.username + " welcome to the chat. Have a good day :).");								
		}
		
		
		// invocation pattern
		if((content.charAt(0) == "/")) {
			console.log("process content " + content);
			
			// push it to the completed message array so that it is not process again
			completedMessages.push(element);
			messagesArr.splice(i, 1);
			
			if (content == "/awake") {
				if (state == state_awake) {
					sendMessage(element,false,"I am awake!");						
				}
				else if (checkifUserIdExist(adminIds,element.userID)) {
					state = state_awake;
					sendMessage(element,false,"Bot Awaken");	
				}				
			}
			else if (content == "/suspend") {
				if (checkifUserIdExist(adminIds,element.userID)) {	
					sendMessage(element,false,"Affirmative, proceeding to standby.");
					state = state_sleep;					
				}
				else {
					sendMessage(element,false,"Only admin can use this command");					
				}
			}					
			else if (content.indexOf("/welcome") > -1) {
				var user = content.replace("/welcome ", "");
				if (user.indexOf("/welcome") > -1) {
					user = content.replace("/welcome", "");
				}
				user.replace(" ","");
				if (user == "me" || user == "") {
					user = element.username;
				}
				sendMessage(null, true,  user + " welcome to the chat. Have a good day :)");
			}
			else if (content == "/info") {
				sendMessage(element,false, "A JS bot developed by [Shubhank](http://stackoverflow.com/users/1095089/shubhank). I bring Chaos to ChaosOverflow.");
			}
			else if (content.indexOf("/hello") > -1) {
				var _words = ["hello :)", "hey :)", "hi :)"];
				var	word = _words[Math.floor(Math.random() * _words.length)];					
				sendMessage(null,false, word);						
			}				
			else if (content.indexOf("/greet") > -1) {
				var user = content.replace("/greet ", "");	
				if (user.indexOf("/greet") > -1) {
					user = content.replace("/greet", "");
				}
				user.replace(" ","");
				if (user == "me" || user == "") {
					user = element.username;
				}
				sendMessage(null,false, "hey @" +user + ", may your day be full of compile errors, memory crashes and downvotes on stackoverflow.");						

			}				
			else if (content == "/commands" || content == "/help") {
				sendMessage(null,false, "Commands : " + "((admin only) /awake /suspend ) " + "\n" + "/hello /welcome /greet /help /info More info to use can be found on https://github.com/Shubhank101/SO_ChatBot");				
			}
			else {						
				sendMessage(element,false,"Command not detected. Try /help to get list of commands.");						

			}
		}
		
	}
	
}

function sendMessage(element,pingBool,message) {
	if (!isAwake()) { return; }
	

	var finalMessage = "";
	if (element != null) {
	  // reply back to the user who messaged
	  finalMessage = ":" + element.messageId;
      finalMessage += " ";		
	}


	if (pingBool) {
	  finalMessage += "@";
	}
	
	finalMessage +=  message;	

    // send the message by filling the textarea of the chat UI and clicking send button programatically
	document.getElementById("input").value = finalMessage;
	var sayButton = document.getElementById("sayit-button");
	sayButton.click();
}
