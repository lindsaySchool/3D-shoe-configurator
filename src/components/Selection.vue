<script setup>
import { ref, onMounted } from 'vue';


</script>

<template>
    <div class="moderator__shoe-type">
        <h2 class="moderator__shoe-type__title">AIR REV. NITRO S TRIPLE WHITE</h2>
        <div class="moderator__shoe-type__part">
          <div>inside</div>
          <div>laces</div>
          <div>outside_01</div>
          <div>outside_02/3</div>
          <div>sole_top</div>
          <div>sole_bottom</div>
        </div>
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
    <div class="moderator__color_type">
        <h3 class="color_type__title">Color</h3>
        <div class="color_type__selection">
          <div class="color-white"></div>
          <div class="color-grey"></div>
          <div class="color-lime"></div>
          <div class="color-black"></div>
          <div class="color-pink"></div>
          <div class="color-yellow"></div>
          <div class="color-red"></div>
          <div class="color-orange"></div>
          <div class="color-blue"></div>
          <div class="color-purple"></div>
        </div>
    </div> 
    <div class="navigation_buttons">
        <a class="navigation_buttons-back">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.65 18L18.85 29.2L16 32L0 16L16 0L18.85 2.8L7.65 14H32V18H7.65Z" fill="#C7C7C7"/>
          </svg>
        </a>
        <a class="navigation_buttons-save">Save</a>
    </div>
</template>

<style scoped>
 .moderator__shoe-type,
.moderator__material-type {
  width: 100%;
}
.material{
  display: flex;
  flex-direction: row;
  gap: 20px;
}
.material .material_leather, 
.material .material_plastic, 
.material .material_rubber{
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  border: 1px solid #D9D9D9;
  padding: 8px;
}
.material .material_leather div, 
.material .material_plastic div, 
.material .material_rubber div{
  margin-bottom: 0;
}
.material .material_leather__image, 
.material .material_plastic__image, 
.material .material_rubber__image{
  width: 20px;
  height: 20px;
}
.material .material_leather__image{
  background-color: #D9E497;
}
.material .material_plastic__image{
  background-color: #449BA0;
}
.material .material_rubber__image{
  background-color: #B63A3A;
}
.material .material_leather__name,
.material .material_plastic__name,
.material .material_rubber__name{
  text-transform: uppercase;
  font-size: 14px;
  color: #000;
}
.moderator__shoe-type h2,
.moderator__material-type h3,
.moderator__color_type h3 {
  margin-bottom: 10px;
  text-transform: uppercase;
  color: #000;
}

.moderator__shoe-type div,
.moderator__material-type div {
  margin-bottom: 5px;
  color: #333;
}

.color_type__selection{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 20px;
  max-width: 20em;
}
.color_type__selection div{
  width: 40px;
  height: 40px;
}
.color_type__selection .color-white{
  border: 1px solid #333;
  background-color: #fff;
}
.color_type__selection .color-grey{
  background-color: #D9D9D9;
}
.color_type__selection .color-lime{
  background-color: #69FF47;
}
.color_type__selection .color-black{
  background-color: #1C1B1F;
}
.color_type__selection .color-pink{
  background-color: #FF00E5;
}
.color_type__selection .color-yellow{
  background-color: #EBFF00;
}
.color_type__selection .color-red{
  background-color: #FF1F1F;
}
.color_type__selection .color-orange{
  background-color: #FFD84F;
}
.color_type__selection .color-blue{
  background-color: #0019FF;
}
.color_type__selection .color-purple{
  background-color: #8B16E7;
}
.navigation_buttons{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 60px;
}
.navigation_buttons-save{
  background-color: #1C1B1F;
  color: #fff;
  padding: 18px 93px;
  text-decoration: none;
  text-transform: uppercase;

}
</style>
