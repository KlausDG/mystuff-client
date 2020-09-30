<template>
  <section class="container">
    <div class="filter">
      <h1 class="filter-current">
        {{ filter.header.category.title }}
        (
        <span
          class="filter-current-secondary"
        >{{ filter.header.found }}</span>
        )
      </h1>
      <ul class="filter-container">
        <li class="filter-item">
          <p class="filter-item-label">Ordenar por</p>
          <select
            class="filter-item-dropdown filter-item-input"
            name="sort"
            id="sort"
            v-model="filter.options.sort"
            @change="sort($event)"
          >
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
            <option value="asc">Menor Preço</option>
            <option value="desc">Maior Preço</option>
          </select>
        </li>
        <li class="filter-item">
          <p class="filter-item-label">Exibir</p>
          <select
            class="filter-item-dropdown filter-item-input"
            name="display-qtd"
            id="display-qtd"
            v-model="filter.options.itemsPerPage"
            @change="displayQuantity($event)"
          >
            <option v-for="(item, index) in displayQtdValues" :key="index" :value="item">{{ item == 10000 ? "Todos" : item}}</option>
          </select>
        </li>
        <li class="filter-item">
          <input
            class="filter-item-input filter-item-search"
            type="text"
            name="search"
            id="search"
            :placeholder="`Procure por um item em ${filter.header.category.title}`"
            v-model="filter.options.search"
            @input="search($event)"
          />
          <icon-base class="search-icon" icon-name="search">
            <search-icon></search-icon>
          </icon-base>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import EventBus from '@/event-bus';

export default {
  data() {
    return {
      displayQtdValues: [12, 24, 48, 96, 192, 10000]
    }
  },
  props: {
    filter: Object
  },

  methods: {
    // Quantidade de itens por página
    displayQuantity(event) {
      this.$emit("items-per-page", event.target.value);
      this.returnToFirstPage();
    },

    // Ordenação dos itens exibidos
    sort(event) {
      this.$emit("sort", event.target.value);
      this.returnToFirstPage();
    },

    // Busca por titulo
    search(event) {
      this.$emit("search", event.target.value);
      this.returnToFirstPage();
    },

    returnToFirstPage() {
      EventBus.$emit('returnToFirstPage');
    }
  }
};
</script>
