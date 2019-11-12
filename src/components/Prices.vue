<template>
  <section id="menu" class="overlay">
    <div>
      <header>
        <span>Price List</span>
        <img src="@/assets/images/close.svg" @click="hideOverlay" />
      </header>
      <div class="inner">
        <p>Here are the price ranges for items:</p>
        <ul>
          <li>Ecstasy: $100 - $250</li>
          <li>Edibles: $150 - $450</li>
          <li>Speed: $200 - $600</li>
          <li>Shrooms: $600 - $1800</li>
          <li>Acid: $1000 - $4000</li>
          <li>Oxycotin: $1500 - $5000</li>
          <li>Heroin: $5000 - $13000</li>
          <li>Cocaine: $15000 - $45000</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
   name: 'Prices',
   props: [
     'hideOverlay',
   ]
}
</script>

<style scoped>

li {
  margin-bottom: 10px;
}

</style>