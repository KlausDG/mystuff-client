<template>
  <div class="product">
    <!-- <img :src="item.image" :alt="'imagem do produto de nome ' + item.title" class="product-image" /> -->
    <div class="product-image-container">
      <div
        :style="{ 'background-image': 'url(' + require(`@/assets/img/${item.image}.jpg`) + ')' }"
        :alt="'imagem do produto de nome ' + item.title"
        class="product-image"
      ></div>
    </div>
    <div class="product-info">
      <div class="top-info">
        <p class="product-author">{{ item.author }}</p>
        <h1 class="product-title">{{ item.title }}</h1>
      </div>

      <div class="bottom-info">
        <p class="product-category">
          {{ item.category }}
          <span v-if="item.isSealed" class="color-contrast">- Lacrado</span>
        </p>
        <h2 class="product-price color-contrast">
          R$ {{ item.price }},00
          <span
            v-if="item.oldPrice < item.currentPrice"
            class="faded"
          >{{item.oldPrice}},00</span>
        </h2>
        <button class="product-btn" @click="sendMessage(item.title)">{{ btnText }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "product",
  props: {
    item: Object,
  },
  data() {
    return {
      btnText: "ENTRAR EM CONTATO",
      contact: "981432111",
    };
  },

  methods: {
    sendMessage(title) {
      let message = "Olá! Tenho interesse no " + title;
      let formatedMessage = message.split(" ").join("%20");
      let url =
        "https://wa.me/5555" + this.contact + "?text=" + formatedMessage;
      window.open(url, "_blank");
    },
  },
};
</script>

<style scoped>
</style>
