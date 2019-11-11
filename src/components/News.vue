<template>
  <div>
    <p v-if="newsItem">{{ newsItem }}</p>
  </div>
</template>

<script>
export default {
  name: 'News',
  props: [
    'newsItem'
  ]
}
</script>

<style scoped>

div {
  background-color: inherit;
}

p {
  font-size: 0.9em;
  line-height: 1.5em;
}

</style>