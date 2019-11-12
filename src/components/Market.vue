<template>
  <div>
    <table>
      <tr>
        <th>Avail</th>
        <th>Item</th>
        <th>Price</th>
        <th>Own</th>
      </tr>
      <tr v-for="item in availableItems" :key="item.name" @click="toggleSelectedItem(item)" :class="classForRow(item)">
        <td>{{ item.available }}</td>
        <td>{{ item.name|capitalize }}</td>
        <td>${{ item.price }}</td>
        <td>{{ ownedCountForItem(item.name) }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Market',
  props: [
    'inventory',
    'market',
    'selectedItem',
    'toggleSelectedItem',
  ],
  computed: {
    availableItems: function() {
      let slicedArray = this.market.slice(0, 8);
      let sortedArray = slicedArray.sort((a, b) => (a.price > b.price) ? 1 : -1)
      return sortedArray;
    }
  },
  filters: {
    capitalize: function(value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  methods: {
    shuffleArray: function(array) {
      for (let i=array.length-1; i>0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    },
    classForRow: function(item) {
      if (this.selectedItem && item.name === this.selectedItem.name) {
        return "selected"
      }
    },
    ownedCountForItem: function(itemName) {
      for (let inventoryItem of this.inventory) {
        if (inventoryItem.name === itemName) {
          return inventoryItem.owned;
        }
      }
      return 0;
    }
  }
}
</script>

<style scoped>

div {
  background-color: inherit;
  padding-top: 15px !important;
}

table {
  border: 1px solid #353A3F;
  border-collapse: collapse;
  width: 100%;
  font-size: 1.0em;
}

tr.selected {
  background-color: #DDE9C9;
}

td, th {
  border: 1px solid #353A3F;
  padding: 6px 5px;
}

th {
  font-size: 0.75em;
  text-align: left;
  font-weight: normal;
}

</style>