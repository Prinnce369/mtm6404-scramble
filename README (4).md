# Scramble

## Objective

Using React and local storage, create an interactive version of the game Scramble.

## How to Play

- A scrambled word is shown. Type your guess into the textbox and press **Enter**.
- A correct guess earns a **point** and shows a new scrambled word.
- An incorrect guess earns a **strike** and keeps the current word.
- The **Pass** button skips the current word (limited number of passes).
- The game ends when you get through every word **or** reach the maximum number of strikes.
- Your progress is saved in local storage, so a refresh keeps your current game. Click **Play Again** to reset.

## Built With

- React (`useState`, `useEffect`)
- Local Storage
- The provided `shuffle()` function
