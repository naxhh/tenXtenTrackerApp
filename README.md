# 10 x 10 tracker app

This app request the list of your 10 x 10 boardgames and provides information about how many times you have played that game
The app retrieves the information from BGG

## Why do this?

Same reason of everything I do on Github. Learn

## WIP

This APP is still in work in progress.
Main components and redux layout is already in place but it requires a bit of plugging things

Things you will not found yet
- Styles for the APP
- The final page where you have your games and play counts
- The final games stored in local storage for fast load + also pwa
- React router to allow that final page 

### Notes
The home will request your BGG game and retrieve your collection of games
NOTE: since the collection can be processed on the background we will display the TOP games meanwhile.

You choose the games that are part of your 10 x 10 and when done "submit"
It will create a link where you can see that 10 games and how many times you have played them this year

### API calls

- Game collection by user (returns 200 or 202)
https://www.boardgamegeek.com/xmlapi2/collection?subtype=boardgame&excludesubtype=boardgameexpansion&username=nearx


- Total plays per year per game (we only need to check totals from here :D)
https://www.boardgamegeek.com/xmlapi2/plays?subtype=boardgame&mindate=2017-01-01&maxdate=2017-12-31&username=nearx&id=161936


- Hot games (In case game collection returns 202 we can display this until is finished)
https://www.boardgamegeek.com/xmlapi2/hot?type=boardgame
