<script setup>
import { ref,defineEmits } from 'vue';

</script>

<template>
<!--An overview of the shoes to buy-->
<div class="shop">
  <h1 class="shop__title">Shop</h1>
  <div class="shop__container">
    <div class="shop__container__item">
        <router-link to="/product-detail">
          <img class="shop__item-image" src="../assets/cover_shoeModel.png" alt="air-rev-nitro-s-triple-white">
        </router-link>
      <h2  class="shop__item-title">AIR REV. NITRO S TRIPLE WHITE</h2>
      <p class="shop__item-price">€51.99</p>
    </div>
</div>
</div>
    
</template>

<style scoped>
.shop {
  font-family: Arial, sans-serif;
  color: #333;
}

.shop__title {
  font-size: 2em;
  margin-bottom: 1em;
  padding: 0 2em;
}

.shop__container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-left: 2em;
}

.shop__item {
  width: 200px;
  margin: 1em;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}

.shop__item-image {
  width: 80%;
  height: auto;
  display: inline-block;
  margin: 0 auto;
}

.shop__item-title {
  font-size: 1.2em;
  margin: 0.5em 0;
}

.shop__item-price {
  color: #999;
  margin-bottom: 1em;
}
</style>
