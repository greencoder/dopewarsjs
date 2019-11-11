<template>
  <section id="menu" class="overlay">
    <div>
      <header>
        <span>Game Menu</span>
        <img src="@/assets/images/close.svg" @click="hideOverlay" />
      </header>
      <nav>
        <p>Do you want to start a new game?</p>
        <button class="full-width">30-day game</button>
      </nav>
    </div>
  </section>
</template>

<script>
export default {
   name: 'Menu',
   props: [
     'hideOverlay',
   ]
}
</script>

<style scoped>
</style>