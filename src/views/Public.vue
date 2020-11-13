<template>
  <div>
    <div class="products-container">
      <item
        v-for="(item, index) in itemsToDisplay.slice(
          currentPageFirstItem,
          currentPageLastItem
        )"
        v-bind:key="index"
        v-bind:item="item"
      />
    </div>
    <div class="pagination" v-if="!phone">
      <button
        class="pagination-btn pagination-control-btn"
        :class="{ disabled: currentPage === 1 }"
        :disabled="currentPage === 1"
        v-on:click="changePage(currentPage - 1)"
      >
        <icon-base class="pagination-icon" icon-name="previous">
          <previous-icon></previous-icon>
        </icon-base>
      </button>
      <ul class="pagination-item-list">
        <li
          v-for="n in pageCount"
          :key="n"
          class="pagination-item"
          :class="paginationClasses(n)"
          v-on:click="changePage(n)"
        >
          <button
            class="pagination-btn"
            :class="{ 'border-right': n < pageCount }"
          >
            {{ n }}
          </button>
        </li>
      </ul>
      <button
        class="pagination-btn pagination-control-btn"
        :class="{ disabled: currentPage === pageCount }"
        :disabled="currentPage === pageCount"
        v-on:click="changePage(currentPage + 1)"
      >
        <icon-base class="pagination-icon" icon-name="next">
          <next-icon></next-icon>
        </icon-base>
      </button>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import EventBus from "@/event-bus";
import { responsive } from "@/mixins/responsive";

export default {
  mixins: [responsive],
  data() {
    return {
      items: [],
      currentPage: 1,
    };
  },

  props: {
    filter: Object,
  },

  created() {
    let vm = this;

    this.fetch();

    EventBus.$on("returnToFirstPage", function () {
      vm.changePage(1);
    });
  },

  computed: {
    // Retorna uma lista aplicando todos os filtros e ordenações
    itemsToDisplay: function () {
      let vm = this;
      let tempArray = this.items;

      return tempArray
        .filter(function (e) {
          // True se o itens estiver marcado como disponível e se bate com a categoria selecionada
          let initialTest = e.isAvailable && vm.matchCategory(e.category);

          //Filtro específico para o Search Field, ativa apenas caso o tamanho da query seja maior do que 2
          if (vm.filter.options.search.length > 1) {
            //Normaliza a query de busca, transformando letras maiúsculas em minúsculas
            let normalizedQuery = vm.filter.options.search.toLowerCase();
            //Normaliza o nome do item, transformando letras maiúsculas em minúsculas e removendo acentuação
            let normalizedTitle = e.title
              .toLowerCase()
              .normalize("NFD")
              .replace(/[^a-zA-Z0-9\s]/g, "");

            //Verifica se o item contém a query inserida no Search Field
            let hasQuery = normalizedTitle.includes(normalizedQuery);

            return initialTest && hasQuery;
          }

          return initialTest;
        })
        .sort(function (a, b) {
          if (vm.filter.options.sort == "a-z") {
            return a.title > b.title ? 1 : b.title > a.title ? -1 : 0;
          } else if (vm.filter.options.sort == "z-a") {
            return a.title > b.title ? -1 : b.title > a.title ? 1 : 0;
          } else if (vm.filter.options.sort == "asc") {
            return a.price - b.price;
          } else if (vm.filter.options.sort == "desc") {
            return b.price - a.price;
          }
        });
    },

    // Verifica a quantidade total de itens, emitindo o valor para o App
    totalItems: function () {
      this.$emit("total-items", this.items.length, this.itemsToDisplay.length);
      return this.itemsToDisplay.length;
    },

    // Retorna o indice do primeiro item a ser exibido na página atual
    currentPageFirstItem: function () {
      return this.pageCount > 1
        ? this.filter.options.itemsPerPage * (this.currentPage - 1)
        : 0;
    },

    // Retorna o indice do último item a ser exibido na página atual
    currentPageLastItem: function () {
      return (
        this.currentPageFirstItem + Number(this.filter.options.itemsPerPage)
      );
    },

    // Retorna o número total de páginas
    pageCount: function () {
      return this.filter.options.itemsPerPage < 10000
        ? Math.ceil(this.totalItems / this.filter.options.itemsPerPage)
        : 1;
    },
  },

  methods: {
    fetch(url) {
      url = url || "";

      Axios.get(url).then((res) => {
        this.items = res.data;
      });
    },

    matchCategory(category) {
      let selectedCategory = this.filter.header.category.value;

      if (selectedCategory != "Outro") {
        return selectedCategory == category || selectedCategory == "Todos";
      } else {
        return category != "Livro" && category != "Mangá" && category != "HQ";
      }
    },

    changePage(page) {
      this.currentPage = page;
    },

    paginationClasses(n) {
      let multiplePages = this.pageCount > 1;
      return {
        current: n == this.currentPage,
        "radius-left": multiplePages && n === 1,
        "radius-right": multiplePages && n === this.pageCount,
        "radius-full": !multiplePages,
      };
    },
  },
};
</script>
