<script setup>
//import components
import Navigation from './components/Navigation.vue'
import  Shoe from './components/shoe.vue'
import Selection from './components/Selection.vue'

</script>

<template>
  <header>
    <Navigation />
  </header>
  <main class="moderator">
    <div class="moderator__model">
      <Shoe />
    </div>
    <div class="moderator__form">
      <Selection />
    </div>
  </main>
</template>

<style scoped>
.moderator {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.moderator__model {
  flex: 0 0 64%;
}

.moderator__form {
  flex: 1;
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
