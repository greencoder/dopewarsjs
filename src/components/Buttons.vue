<template>
  <div>
    <nav>
      <button v-bind:disabled="selectedItem === null">Sell</button>
      <button v-bind:disabled="selectedItem === null">Buy</button>
    </nav>
    <nav>
      <button @click="showOverlay('travel')">Travel</button>
      <button>Loan Shark</button>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Buttons',
  props: [
    'selectedItem',
    'showOverlay',
  ]
}
</script>

<style scoped>

div {
  background-color: inherit;
  padding-top: 20px !important;
}

nav {
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
}

nav:last-child {
  padding-bottom: 0px;
}

nav button {
  width: calc(50% - 5px);
}

</style>