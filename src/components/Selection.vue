<script setup>
import { ref, onMounted } from 'vue';


</script>

<template>
    <div class="moderator__shoe-type">
        <h2>AIR REV. NITRO S TRIPLE WHITE</h2>
        <div>inside</div>
        <div>laces</div>
        <div>outside_01</div>
        <div>outside_02/3</div>
        <div>sole_top</div>
        <div>sole_bottom</div>
    </div>
    <div class="moderator__material-type">
        <h3>Material</h3>
        <div class="material">
          <div class="material_leather">
            <div class="material_leather__image"></div>
            <div class="material_leather__name">Leather</div>
          </div>
          <div class="material_plastic">
            <div class="material_plastic__image"></div>
            <div class="material_plastic__name">Plastic</div>
          </div>
          <div class="material_rubber">
            <div class="material_rubber__image"></div>
            <div class="material_rubber__name">Rubber</div>
          </div>
        </div>
    </div>
    <div class="color_type">
        <h3>Color</h3>
        <div class="color">
          <div class="color_white">white</div>
          <div class="color_white">white</div>
          <div class="color_white">white</div>
          <div class="color_white">white</div>
          <div class="color_white">white</div>
          <div class="color_white">white</div>
          <div class="color_white">white</div>
          <div class="color_white">white</div>
          <div class="color_white">white</div>
          <div class="color_white">white</div>
        </div>
    </div> 
    <div class="navigation_buttons">
        <button>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.65 18L18.85 29.2L16 32L0 16L16 0L18.85 2.8L7.65 14H32V18H7.65Z" fill="#C7C7C7"/>
          </svg>
        </button>
        <button>Save</button>
    </div>
</template>

<style scoped>
 .moderator__shoe-type,
.moderator__material-type {
  width: 100%;
}

.moderator__shoe-type h2,
.moderator__material-type h3 {
  margin-bottom: 10px;
  text-transform: uppercase;
  color: #000;
}

.moderator__shoe-type div,
.moderator__material-type div {
  margin-bottom: 5px;
  color: #333;
}
</style>
