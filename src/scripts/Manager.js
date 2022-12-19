const LOCAL_STORAGE_KEY = 'game';

const ITEMS = [
  {name: 'ecstasy', priceLow: 10, priceHigh: 60, maxAvailable: 75, bustPrice: 2, boomPrice: 100},
  {name: 'edibles', priceLow: 100, priceHigh: 700, maxAvailable: 99, bustPrice: 25, boomPrice: 1000},
  {name: 'speed', priceLow: 70, priceHigh: 250, maxAvailable:99, bustPrice: 20, boomPrice: 400},
  {name: 'shrooms', priceLow: 600, priceHigh: 1400, maxAvailable: 35, bustPrice: 100, boomPrice:2000},
  {name: 'acid', priceLow: 1000, priceHigh: 4000, maxAvailable: 30, bustPrice: 50, boomPrice: 5000},
  {name: 'oxycontin', priceLow: 1500, priceHigh: 4500, maxAvailable: 45, bustPrice: 75, boomPrice: 6000},
  {name: 'heroin', priceLow: 5000, priceHigh: 14000, maxAvailable: 20, bustPrice: 2500, boomPrice: 20000},
  {name: 'cocaine', priceLow: 15000, priceHigh: 40000, maxAvailable: 15, bustPrice: 9000, boomPrice: 75000},
]

class GameManager {

  static loadGame() {
    let gameData = window.localStorage.getItem(LOCAL_STORAGE_KEY);

    if (gameData) {
      let defaultGame = this.initializeGame();
      let loadedGame = JSON.parse(gameData);
      return {...defaultGame, ...loadedGame};
    }

    return null;
  }

  static saveGame(dict) {
    let game = {
      overlay: dict.overlay,
      screen: dict.screen,
      location: dict.location,
      selectedItem: dict.selectedItem,
      debt: dict.debt,
      cash: dict.cash,
      health: dict.health,
      savings: dict.savings,
      daysRemaining: dict.daysRemaining,
      coatCapacity: dict.coatCapacity,
      newsItem: dict.newsItem,
      inventory: dict.inventory,
      market: dict.market,
    }

    let gameData = JSON.stringify(game);
    window.localStorage.setItem(LOCAL_STORAGE_KEY, gameData);
  }

  static deleteGame() {
    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  static randomizeMarket() {
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

    var marketArray = [];

    ITEMS.forEach((marketItem) => {
      marketArray.push({
        name: marketItem.name,
        price: randomInteger(marketItem.priceLow, marketItem.priceHigh),
        available: randomInteger(1, marketItem.maxAvailable),
        boomPrice: marketItem.boomPrice,
        bustPrice: marketItem.bustPrice,
        isBoomPrice: false,
        isBustPrice: false,
      });
    })

    // Randomly cause a price boom or bust. This should happen 30% of the time.
    let shouldBoomBust = Math.floor(Math.random() * 100) + 1 >= 70

    if (shouldBoomBust) {

      // Pick one item randomly
      var randomItemIndex = Math.floor(Math.random() * marketArray.length);

      let shouldBoom = Math.floor(Math.random() * 100) + 1 >= 50

      // Either set the price to boom or bust (50% chance of either)
      if (shouldBoom) {
        marketArray[randomItemIndex].price = marketArray[randomItemIndex].boomPrice;
        marketArray[randomItemIndex].isBoomPrice = true;
      }
      else {
        marketArray[randomItemIndex].price = marketArray[randomItemIndex].bustPrice;
        marketArray[randomItemIndex].isBustPrice = true;
      }
    }

    let shuffledArray = shuffleArray(marketArray);
    return shuffledArray;
  }

  static initializeGame() {
    let market = GameManager.randomizeMarket();
    var inventory = [];

    market.forEach((marketItem) => {
      inventory.push({
        name: marketItem.name,
        owned: 0,
      });
    });

    let news = 'Welcome to New York. You have 30 days to make your fortune. Tap a row to select an item to buy or sell. Visit the loan shark if you need cash.';

    return {
      daysRemaining: 30,
      cash: 1500,
      debt: 0,
      savings: 0,
      location: 'Queens',
      overlay: null,
      screen: 'main',
      selectedItem: null,
      health: 100,
      coatCapacity: 30,
      newsItem: news,
      market: market,
      inventory: inventory,
    }
  }

}

export default GameManager;