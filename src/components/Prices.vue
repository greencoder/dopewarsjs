<template>
  <section id="menu" class="overlay">
    <div>
      <header>
        <span>Price List</span>
        <img src="@/assets/images/close.svg" @click="hideOverlay" />
      </header>
      <div class="inner">
        <p>Here are the normal price ranges for items:</p>
        <ul>
          <li>Ecstasy: $10 - $60</li>
          <li>Speed: $70 - $250</li>
          <li>Edibles: $100 - $700</li>
          <li>Shrooms: $600 - $1400</li>
          <li>Acid: $1000 - $4000</li>
          <li>Oxycotin: $1500 - $4500</li>
          <li>Heroin: $5000 - $14000</li>
          <li>Cocaine: $15000 - $40000</li>
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
