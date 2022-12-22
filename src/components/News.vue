<template>
  <div>
    <p v-if="newsItem">{{ newsItem }}</p>
  </div>
</template>

<script>
export default {
  name: 'News',
  computed: {
    newsItem: function() {
      return this.$store.getters.newsItem;
    }
  }
}
</script>

<style scoped>

div {
  background-color: inherit;
}

p {
  font-size: 0.9em;
  line-height: 1.5em;
  padding-bottom: 15px;
  border-bottom: 1px dashed #ccc;
}

</style>
