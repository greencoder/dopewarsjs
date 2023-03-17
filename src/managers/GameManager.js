const LOCAL_STORAGE_KEY = 'dopewars';
const GAME_DAYS = 30;
const STARTING_CASH = 2500;
const STARTING_INVENTORY_CAPACITY = 25;
const NUMBER_OF_MARKET_ITEMS = 6;

import {ITEMS} from './items.js';
import {LOCATIONS} from './locations.js';

class GameManager {

  constructor(store) {
    this.store = store;
  }

  loadGame() {
    let gameData = window.localStorage.getItem(LOCAL_STORAGE_KEY);

    if (gameData) {
      let defaultGame = this.initializeGame();
      let loadedGame = JSON.parse(gameData);
      return {...defaultGame, ...loadedGame};
    }

    return null;
  }

  saveGame() {
    let gameDataString = JSON.stringify(this.store.state);
    window.localStorage.setItem(LOCAL_STORAGE_KEY, gameDataString);
  }

  deleteGame() {
    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  restartGame() {
    console.debug('[GameManager] Restarting Game');
    this.startGame();
  }

  finishGame() {
    this.store.dispatch('showOverlay', 'game over');
  }

  startGame() {
    console.debug('[GameManger] Starting Game');
    this.store.commit('updateCurrentScreen', 'main');
    this.initializeGame();
    this.saveGame();
  }

  initializeGame() {
    console.debug('[GameManager] Initializing Game');

    // Initialize the game with the starting options
    let gameOptions = {
      cash: STARTING_CASH,
      health: 100,
      locations: LOCATIONS,
      items: ITEMS,
      debt: 0,
      gun: false,
      savings: 0,
      gameLength: GAME_DAYS,
      inventoryCapacity: STARTING_INVENTORY_CAPACITY
    }

    this.store.commit('initializeGameState', gameOptions);

    // Randomize the market item prices and availability
    let randomizedMarketItems = this.randomizeMarket(true);
    this.store.commit('updateMarketItems', randomizedMarketItems);

    // Set the welcome message as the news item
    let daysRemaining = this.store.getters.daysRemaining;
    let currentLocation = this.store.getters.currentLocation.name;

    let newsItem = `Welcome to ${currentLocation}. You have ${daysRemaining} days to make your fortune.
    Tap a row to select an item to buy or sell. Visit the loan shark if you need cash.`;
    this.store.commit('updateNewsItem', newsItem);

    // Create the user's inventory with all the items and zero owned
    let emptyInventory = this.createEmptyInventory(ITEMS);
    this.store.commit('updateInventory', emptyInventory);
  }

  resetInventory() {
    let emptyInventory = this.createEmptyInventory(ITEMS);
    this.store.commit('updateInventory', emptyInventory);
  }

  startNewDay() {
    console.debug('[Game] Starting new day');

    // Make sure no items are selected and that we're on the main screen
    this.store.commit('updateSelectedItem', null);
    this.store.commit('updateCurrentScreen', 'main');

    // Decrement the days remaining
    let daysRemaining = this.store.getters.daysRemaining;
    this.store.commit('updateDaysRemaining', daysRemaining - 1);

    // Randomize the market item prices and availability
    let randomizedMarketItems = this.randomizeMarket(false);
    this.store.commit('updateMarketItems', randomizedMarketItems);

    // Update the news
    let newsItem = this.generateNewsItem();
    this.store.commit('updateNewsItem', newsItem);

    let randomPolice = Math.floor(Math.random() * 100) + 1;
    let inventoryCount = this.store.getters.inventoryOwned;
    let hasGun = this.store.getters.hasGun;
    let policeThreshold = hasGun ? 95 : 85;

    // If you have drugs and have a gun, you have a 5% chance of being hassled
    // by the police. If you have no gun, the chance goes up to 15%
    if (inventoryCount > 0 && randomPolice >= policeThreshold) {
      this.store.dispatch('showOverlay', 'police');
    }

    // Save the game
    this.saveGame();
  }

  travel(newLocation) {
    this.store.commit('updateLocation', newLocation);
    this.store.dispatch('hideOverlay');
    this.startNewDay();
  }

  generateNewsItem() {
    console.debug('[GameManager] Generating News');

    // If there is a boom/bust item, it will have its own news attached
    // to the item, otherwise we just make up a random news item
    let boomBustItem = this.store.getters.boomBustItem;

    if (boomBustItem) {
      return boomBustItem.news;
    }
    else {
      let randomNewsItems = [
        'No news is good news, or so I\'m told.',
        'Have you thought about doing something better with your life?',
        'Maybe you should read a book sometime.',
        'Does your mother know you are doing this?',
        'This sure beats having a real job.',
      ]

      let randomNewsItem = randomNewsItems[Math.floor(Math.random() * randomNewsItems.length)];
      return randomNewsItem;
    }
  }

  randomizeMarket(isFirstDay) {
    console.debug('[GameManager] Randomizing Market');

    function randomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function shuffleArray(array) {
      for (let i=array.length-1; i>0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    }

    // Create the market items
    let marketArray = [];

    this.store.getters.availableItems.forEach(item => {
      marketArray.push({
        name: item.name,
        adjective: item.adjective,
        price: randomInteger(item.priceLow, item.priceHigh),
        available: randomInteger(3, item.maxAvailable),
        news: null,
        isBoomPrice: false,
        isBustPrice: false
      });
    });

    // We only want to display a subset of items
    marketArray = shuffleArray(marketArray).slice(0, NUMBER_OF_MARKET_ITEMS);

    // Randomly cause a price boom or bust. This should happen 70% of the time.
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    let shouldBoomBust = randomNumber >= 30;

    if (shouldBoomBust && !isFirstDay) {
      let randomItemIndex = Math.floor(Math.random() * marketArray.length);
      let randomItemName = marketArray[randomItemIndex].name;
      let shouldBoom = Math.floor(Math.random() * 100) + 1 >= 50;

      // Either set the price to boom or bust (50% chance of either)
      if (shouldBoom) {

        // A boom is either because of a drug bust or because addicts are buying
        let isAddictBoom = Math.floor(Math.random() * 100) + 1 >= 50;
        var boomPrice = marketArray[randomItemIndex].price * 4;
        var news;

        // Addicts drive the price up x8, Busts drive it up x4
        if (isAddictBoom) {
          boomPrice *= 2;
          news = `Addicts are buying ${randomItemName} at outrageous prices!`;
        }
        else {
          news = `There was a drug bust on a local ${randomItemName} supplier. Prices have skyrocketed!`;
        }

        marketArray[randomItemIndex].news = news;
        marketArray[randomItemIndex].price = parseInt(boomPrice);
        marketArray[randomItemIndex].isBoomPrice = true;
      }

      // If it's not a boom, it's a bust and the price is divided by 4
      else {
        let bustPrice = marketArray[randomItemIndex].price / 4;
        let news = `The market is flooded with cheap ${randomItemName}. Prices have tanked!`;

        marketArray[randomItemIndex].news = news;
        marketArray[randomItemIndex].price = parseInt(bustPrice);
        marketArray[randomItemIndex].isBustPrice = true;
      }
    }

    // Sort the array by price
    let sortedMarketArray = marketArray.sort((a,b) => (a.price - b.price));
    return sortedMarketArray;
  }

  createEmptyInventory(availableItems) {
    return availableItems.map(item => ({name: item.name, owned: 0}));
  }

  addPockets(numberOfPockets, cost) {
    this.store.commit('addPockets', { numberOfPockets, cost });
  }

  resetPolice() {
    this.policeDamage = 0;
  }

  fightPolice() {
    let policeDamage = 0;
    let selfDamage = 0;

    // You have a 1 in 4 chance of the cop fleeing
    let copFled = Math.floor(Math.random() * 100) + 1 >= 75;

    if (copFled) {
      policeDamage = 100;
    }
    else {
      let result = Math.floor(Math.random() * 100) + 1;

      // You have a 4% chance of getting killed
      if (result >= 96) {
        selfDamage = 100;
      }
      // You have a 15% chance of getting wounded
      else if (result >= 85) {
        selfDamage = 25;
      }
      else {
        policeDamage = 25;
      }
    }

    return { selfDamage, policeDamage };
  }

  runFromPolice() {
    let result = Math.floor(Math.random() * 100) + 1
    let lostInventory = false;
    let gotAway = false;

    // You have a 1% chance of losing your inventory when running
    if (result >= 99) {
      lostInventory = true;
      gotAway = true;
    }

    // You have a 50% chance of getting away cleanly
    else if (result >= 50) {
      gotAway = true;
    }

    return { lostInventory, gotAway };
  }
}

export default GameManager;
