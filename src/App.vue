<script setup>
import {ref} from 'vue';
//import components
import Navigation from './components/Navigation.vue'
import  Shoe from './components/Shoe.vue'
import Selection from './components/Selection.vue'

let selectedPart = ref(null);
let selectedColor = ref(null);
let previousColor = ref(null);
let dataObject = ref(null);

const handlePartSelected = (part) =>{
  //console.log(`Dit is de ${part}`);
  if (part !== previousColor.value) {
  selectedPart.value= part;
  selectedColor.value = null;}
}
const handleColorSelected = (color) => {
  //console.log(`Dit is de ${color}`);
  if (color !== previousColor.value) {
    selectedColor.value = color;
    previousColor.value = color;
  }
}
//save data to api
const handleDataSaved = (data) =>{
  dataObject.value = data;
  console.log(dataObject.value);
}
</script>

<template>
  <header>
    <Navigation />
  </header>
  <main class="moderator">
    <div class="moderator__model">
      <Shoe @save-data="handleDataSaved" :onPartSelected="selectedPart"  :onColorSelected="selectedColor"/>
    </div>
    <div class="moderator__form">
      <Selection  @part-selected="handlePartSelected" @color-selected="handleColorSelected" :dataObject="dataObject"/>
    </div>
  </main>
  <router-view></router-view>
</template>

<style scoped>
main.moderator{
  overflow: hidden;
}
.moderator[data-v-7a7a37b1] {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
}

.moderator__model {
  flex: 0 0 64%;
}

.moderator__form {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 1rem;
  float: right;
}

@media (max-width: 768px) {
  .moderator {
    flex-direction: column;
  }

  .moderator__model, .moderator__form {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
 
</style>
