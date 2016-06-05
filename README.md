# SO_ChatBot

A simple JS stackoverflow chat bot

Can be found in the room http://chat.stackoverflow.com/rooms/26424/iosandroidchaosoverflow

## Working

> Note : The current version of bot running isn't based on this code. Its not stable yet so the repository will be updated later with proper specs for it.

This is a userscript. It parses the DOM in a timer and processes the command. Code is really hacky at this point (to be improved).

## Commands Wiki

```
/help 
```
Use to list all commands of the bot
it will output some thing like
```
((admin only) /awake /suspend) /hello /help /hang <letter>  /annoy  /hateyou /kill /middlefinger /hangman /flip /dunno /disapprove /welcome /greet /cleanup /eval /info /usegist (gifs) /g_s_agree /g_c_omg /g_hi5 /g_i_awesome /g_dance /g_scare /g_userious /g_whut /g_fluffy /g_sorry 
```
---

```
/awake
/suspend
```
Can be used by super admin. to suspend the bot (wont respond till awake command is executed)

---


```
/welcome (can be used with a name to ping the person)
````
greets user to the chat

---
```
/greet (can be used with a name to ping the person)
````
greets user to the chat with sarcasm.

---

### Emoji icon commands
```
/hateyou     (can be used with a name to ping the person)
/kill        (can be used with a name to ping the person)
/middlefinger (can be used with a name to ping the person)
/flip
````
--- 
# GAMES

1. Hangman 
Use /hang to start the game or simply show current game output.
```
/hang word - this will try to use word to compare too. Use this to guess in one attempt
/hang <letter> (ex - /hang a) - to use the letter in the word search
/hint - Available when two lives left - A simple riddle given for easy guessing of the word
```

2. Jumble 

```
/jumble - to start the game or to check the jumble again
/jumble <sentence> - Compares the sentence to the jumbled sentence answer - case insensitive check
```

3. Tic Tac Toe

```
/t3 - use this to get the game instruction within the chat only
/t3 solo - play a solo game against the bot
/t3 challenge @<username> - to challenge the user in a game
/t3 accept - accept a challenge
/t3 decline - decline the challenge
```
