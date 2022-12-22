<template>
  <div>
    <table>
      <tr>
        <th>Avail</th>
        <th width="*">Item</th>
        <th>Price</th>
        <th>Owned</th>
      </tr>
      <tr v-for="item in marketItems"
          @click="toggleSelectedItem(item)"
          :key="item.name"
          :class="classForRow(item)">
        <td>{{ item.available }}</td>
        <td class="left">{{ item.name|capitalize }}</td>
        <td>${{ item.price }}</td>
        <td>{{ ownedCountForItem(item.name) }}</td>
      </tr>
      <tr v-for="item in unavailableItems"
          @click="toggleSelectedItem(item)"
          :key="item.name"
          :class="classForRow(item)">
        <td class="centered">-</td>
        <td>{{ item.name|capitalize }}</td>
        <td>-</td>
        <td>{{ ownedCountForItem(item.name) }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Market',
  computed: {
    marketItems: function() {
      return this.$store.getters.marketItems;
    },
    unavailableItems: function() {
      return this.$store.getters.unavailableInventoryItems;
    },
    inventory: function() {
      return this.$store.getters.inventory;
    },
    selectedItem: function() {
      return this.$store.getters.selectedItem;
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
    toggleSelectedItem: function(item) {
      this.$store.commit('selectItem', item);
    },
    classForRow: function(item) {
      let classList = [];

      if (this.selectedItem && item.name === this.selectedItem.name) {
        classList.push('selected');
      }

      if (item.isBoomPrice || item.isBustPrice) {
        classList.push('boom-bust');
      }

      return classList.join(' ');
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

tr.boom-bust {
  font-weight: 600;
}

td, th {
  border: 1px solid #353A3F;
  padding: 8px 6px;
  height: 36px;
  text-align: center;
}

th {
  font-size: 0.75em;
  height: 18px;
  font-weight: 700;
  background-color: #efefef;
}

</style>
