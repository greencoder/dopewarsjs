<template>
  <section id="doctor" class="overlay">
    <div>
      <header>
        <span>Doctor Feelgood</span>
        <img src="@/assets/images/close.svg" @click="handleCloseButtonPress" />
      </header>
      <div class="inner">
        <p>The doctor will see you now.</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Doctor',
  methods: {
    handleCloseButtonPress: function() {
      this.$store.dispatch('hideOverlay');
    }
  }
}
</script>

<style scoped>
</style>
