<script setup>
import { ref,defineEmits } from 'vue';

const selectedPart = ref(null);
const selectedColor = ref(null);
const selectedMaterial = ref(null);
const emit = defineEmits(['part-selected','material-selected', 'color-selected']);

const props = defineProps({
  dataObject: Object,
  user: Object
});

//make a new Primus connection
let primus = new Primus('https://sneaker-api-4zoy.onrender.com');

primus.on('open', () => {
  console.log('Connection is ALIVES and kicking');
});

const selectPart = (part) => {
  selectedPart.value = part;
  selectedMaterial.value = null;
  //console.log(selectedPart.value);
  emit('part-selected', selectedPart.value);
  isSelectedPart(selectedPart.value);
}
const selectMaterial = async (material) => {
  selectedMaterial.value = material;
  emit('material-selected', selectedMaterial.value);
  isSelectedMaterial(selectedMaterial.value);
}

const selectColor = (color) => {
  selectedColor.value = color;
  //console.log(selectedColor.value);
  emit('color-selected', selectedColor.value);
  isSelectedColor(selectedColor.value);
}

const isSelectedPart = (part) => {
  return part === selectedPart.value;
}
const isSelectedMaterial = (material) => {
    return material === selectedMaterial.value;
  }

const isSelectedColor = (color) => {
  return color === selectedColor.value;
}
//save data to api
const saveData = async () => {
  console.log("SAVED TO DATABASE")
  try {
    const dataWithUser = {...props.dataObject, user: props.user}
    console.log(dataWithUser);
    const response = await postData('https://sneaker-api-4zoy.onrender.com/api/v1/shoes', dataWithUser);
    console.log('Success:', response);
    if(primus.readyState == Primus.OPEN){
    primus.write(JSON.stringify({action: 'post', data: response.data}));
  }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}
</script>

<template>
    <div class="moderator__shoe-type">
        <h2 class="moderator__shoe-type__title">AIR REV. NITRO S TRIPLE WHITE</h2>
        <div class="moderator__shoe-type__part">
          <div :class="{ selected: isSelectedPart('inside') }" @click="selectPart('inside')">inside</div>
          <div :class="{ selected: isSelectedPart('laces') }" @click="selectPart('laces')">laces</div>
          <div :class="{ selected: isSelectedPart('outside_1') }" @click="selectPart('outside_1')">outside_01</div>
          <div :class="{ selected: isSelectedPart('outside_2') }" @click="selectPart('outside_2')">outside_2/3</div>
          <div :class="{ selected: isSelectedPart('sole_top') }" @click="selectPart('sole_top')">sole_top</div>
          <div :class="{ selected: isSelectedPart('sole_bottom') }" @click="selectPart('sole_bottom')">sole_bottom</div>
        </div>
    </div>
    <div class="moderator__material-type">
        <h3>Material</h3>
        <div class="material">
          <div class="material_leather" :class="{ selected: isSelectedMaterial('leather') }" @click="selectMaterial('leather')">
            <div class="material_leather__image"></div>
            <div class="material_leather__name">Leather</div>
          </div>
          <div class="material_textile"   :class="{ selected: isSelectedMaterial('textile') }" @click="selectMaterial('textile')">
            <div class="material_textile__image"></div>
            <div class="material_textile__name">Textile</div>
          </div>
          <div class="material_rubber"  :class="{ selected: isSelectedMaterial('rubber') }" @click="selectMaterial('rubber')">
            <div class="material_rubber__image"></div>
            <div class="material_rubber__name">Rubber</div>
          </div>
        </div>
    </div>
    <div class="moderator__color_type">
        <h3 class="color_type__title">Color</h3>
        <div class="color_type__selection">
          <div :class="{ selected: isSelectedColor('white') }" class="color-white" @click="selectColor('white')"></div>
          <div  :class="{ selected: isSelectedColor('grey') }" class="color-grey" @click="selectColor('grey')"></div>
          <div :class="{ selected: isSelectedColor('lime') }" class="color-lime" @click="selectColor('lime')"></div>
          <div :class="{ selected: isSelectedColor('black') }" class="color-black" @click="selectColor('black')"></div>
          <div :class="{ selected: isSelectedColor('pink') }" class="color-pink" @click="selectColor('pink')"></div>
          <div :class="{ selected: isSelectedColor('yellow') }" class="color-yellow" @click="selectColor('yellow')"></div>
          <div :class="{ selected: isSelectedColor('red') }" class="color-red" @click="selectColor('red')"></div>
          <div :class="{ selected: isSelectedColor('orange') }" class="color-orange" @click="selectColor('orange')"></div>
          <div :class="{ selected: isSelectedColor('blue') }" class="color-blue" @click="selectColor('blue')"></div>
          <div :class="{ selected: isSelectedColor('purple') }" class="color-purple" @click="selectColor('purple')"></div>
        </div>
    </div> 
    <div class="navigation_buttons">
      <router-link to="/client">
        <a class="navigation_buttons-back">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.65 18L18.85 29.2L16 32L0 16L16 0L18.85 2.8L7.65 14H32V18H7.65Z" fill="#C7C7C7"/>
          </svg>
        </a>
      </router-link>
      <router-link to="/shopbag" class="navigation_buttons-save" @click="saveData">
        Save
      </router-link>
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
.material .material_textile, 
.material .material_rubber{
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  border: 1px solid #D9D9D9;
  padding: 8px;
}
.material .material_leather div, 
.material .material_textile div, 
.material .material_rubber div{
  margin-bottom: 0;
}
.material .material_leather__image, 
.material .material_textile__image, 
.material .material_rubber__image{
  width: 20px;
  height: 20px;
}
.material .material_leather__image{
  background-color: #D9E497;
}
.material .material_textile__image{
  background-color: #449BA0;
}
.material .material_rubber__image{
  background-color: #B63A3A;
}
.material .material_leather__name,
.material .material_textile__name,
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
.moderator__shoe-type__part{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 14px;
  max-width: 28em;
}
.moderator__shoe-type__part div{
  border: 1px solid #D9D9D9;
  margin-bottom: 0;
  padding: 8px;
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
.moderator__shoe-type__part div.selected {
  border: 2px solid #69FF47;
}
.material div.selected{
  border: 2px solid #69FF47;
}
.color_type__selection div.selected {
  border: 2px solid #69FF47;
}
</style>
