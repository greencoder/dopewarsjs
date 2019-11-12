<template>
  <section id="menu" class="overlay">
    <div>
      <header>
        <span>Game Menu</span>
        <img src="@/assets/images/close.svg" @click="hideOverlay" />
      </header>
      <div class="inner">
        <p>Do you want to start a new game?</p>
        <button @click='handleRestartClick' class="full-width">Restart Game</button>
        <button @click='showOverlay("prices")' class="full-width">Price List</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
   name: 'Menu',
   props: [
     'hideOverlay',
     'showOverlay',
     'restartGame',
   ],
   methods: {
     handleRestartClick: function() {
       let answer = confirm('Are you sure you want to start a new game?');
       if (answer === true) {
        this.restartGame();
       }
     }
   }
}
</script>

<style scoped>
</style>