<template>
  <div id="app">
    <main-header
      @change-category="newCategory"
      @reset="reset"
      :filter="filter"
    ></main-header>
    <sub-header></sub-header>
    <filter-menu
      @items-per-page="itemsPerPage"
      @sort="sortItems"
      @search="searchItem"
      :filter="filter"
    ></filter-menu>
    <router-view @total-items="totalItems" :filter="filter" />
    <my-footer></my-footer>
  </div>
</template>

<script>
import { responsive } from '@/mixins/responsive';

export default {
  mixins: [responsive],
  data() {
    return {
      filter: {
        header: {
          category: { title: 'Todos', value: 'Todos' },
          quantity: 0,
          found: 0,
        },
        options: {
          sort: 'a-z',
          itemsPerPage: 12,
          search: '',
          currentPage: 1,
        },
      },
    };
  },

  created() {
    if (this.phone) {
      this.filter.options.itemsPerPage = 10000;
    }
  },

  methods: {
    newCategory(value) {
      this.filter.header.category = value;
    },
    sortItems(value) {
      this.filter.options.sort = value;
    },
    searchItem(query) {
      this.filter.options.search = query;
    },
    itemsPerPage(value) {
      this.filter.options.itemsPerPage = value;
    },
    totalItems(total, found) {
      this.filter.header.quantity = Number(total);
      this.filter.header.found = Number(found);
    },
    reset() {
      this.filter = {
        header: {
          category: { title: 'Todos', value: 'Todos' },
          quantity: 0,
          found: 0,
        },
        options: {
          sort: 'a-z',
          itemsPerPage: '12',
          search: '',
          currentPage: 1,
        },
      };
    },
  },
};
</script>

<style lang="scss">
@import './sass/main.scss';
</style>
