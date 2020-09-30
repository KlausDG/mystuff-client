<template>
  <header class="header">
    <h1 class="header-logo" @click="reset">Coisas do Klaus</h1>
    <nav class="nav">
      <ul class="nav-list">
        <li
          v-for="(item, index) in categories"
          :key="index"
          class="nav-list-item"
          :class="isSelected(item.title)"
          v-on:click="changeCategory(index)"
        >{{item.title.toUpperCase()}}</li>
      </ul>
    </nav>
  </header>
</template>

<script>
import EventBus from '@/event-bus';
export default {
  data() {
    return {
      categories: [
        { title: "Todos", value: "Todos" },
        { title: "Livros", value: "Livro" },
        { title: "HQs", value: "HQ" },
        { title: "Mangás", value: "Mangá" },
        { title: "Jogos", value: "Jogo" },
        { title: "Outros", value: "Outro" }
      ],
      category: {
        title: String,
        value: String
      }
    };
  },

  props: {
    filter: Object
  },

  methods: {
    // Define qual a categoria atualmente selecionada
    isSelected(value) {
      return {
        selected: this.filter.header.category.title === value
      };
    },

    // Troca de categoria
    changeCategory(i) {
      let item = this.categories[i];
      this.currentSelected = i;
      this.$emit("change-category", item);
    },

    // Ao clikar no logo do site, reseta os filtros
    reset() {
      this.$emit("reset");
      EventBus.$emit('returnToFirstPage');
    },
  }
};
</script>
