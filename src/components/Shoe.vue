<script setup>
import { ref, onMounted, onBeforeUnmount, defineProps, watchEffect } from 'vue';
import * as THREE from 'three';

//import glb
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
//import axis helper from three
import {AxesHelper} from 'three';

let scene, camera, renderer, shoe;

const props = defineProps({
  onPartSelected:{
    type: String,
    default: null
  },
  onColorSelected:{
    type: String,
    default: null
  }
});

const rotateShoe = (part) => {
  // Rotate the shoe based on the selected part
  // This is just an example, you'll need to replace this with your actual rotation logic
  if (shoe) { 
    if (part === 'inside') {
      shoe.rotation.y =  Math.PI / 2;
    } else if (part === 'laces') {
      shoe.rotation.y = 0;
    } else if (part === 'outside_1') {
      shoe.rotation.y = Math.PI*1.5;
    } else if (part === 'outside_2') {
      shoe.rotation.y = Math.PI / 2;
    } else if (part === 'sole_top') {
      shoe.rotation.y = Math.PI * 1;
    } else if (part === 'sole_bottom') {
      shoe.rotation.y = Math.PI * 2.5;
    }
  }
};

// Add a new function to change the color of the selected part
const changeColor = (part, color) => {
  if (shoe) {
    shoe.traverse((child) =>{
      if (child.isMesh && child.name === part) {
        switch (color) {
          case 'white':
            child.material.color.set(0xFFFFFF);
            break;
          case 'grey':
            child.material.color.set(0x808080);
            break;
          case 'lime':
            child.material.color.set(0x00FF00);
            break;
          case 'black':
            child.material.color.set(0x000000);
            break;
          case 'pink':
            child.material.color.set(0xFFC0CB);
            break;
          case 'yellow':
            child.material.color.set(0xFFFF00);
            break;
          case 'red':
            child.material.color.set(0xFF0000);
            break;
          case 'orange':
            child.material.color.set(0xFFA500);
            break;
          case 'blue':
            child.material.color.set(0x0000FF);
            break;
          case 'purple':
            child.material.color.set(0x800080);
            break;
          default:
            child.material.color.set(0xFFFFFF); // Default to white
            break;
        }
      }
      });
    }
  }

const selectionCount = ref(1);

watchEffect(() => {
  if (props.onPartSelected) {
    rotateShoe(props.onPartSelected);
    console.log(props.onPartSelected)
  }
});

watchEffect(() => {
  if (props.onColorSelected && props.onPartSelected) {
    changeColor(props.onPartSelected, props.onColorSelected);
    console.log(props.onColorSelected)
  }
});

onMounted(()=>{
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xF5F5F5);
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth*Math.PI/2 / window.innerHeight*Math.PI/4, 0.1, 1000 );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth*Math.PI/2, window.innerHeight*Math.PI/4);
  renderer.shadowMap.enabled = true;
  document.body.appendChild( renderer.domElement );
 /*  //add axis helper
  const axesHelper = new AxesHelper( 5 );
  scene.add( axesHelper ); */
  
  //add public models shoe.glb
  const loader = new GLTFLoader();
  loader.load('/models/shoe.glb', function(gltf){
    shoe = gltf.scene;
    shoe.position.set(-0.2, 1.25, 0);
    shoe.rotation.y = 1.6;
    //make shoe bigger
    shoe.scale.set(8, 7, 10);
    // Traverse the model and log each child
    let outside_2_group = new THREE.Group();
    outside_2_group.name = 'outside_2';
    shoe.traverse((child) =>{
        if (child.isMesh) {
          if (child.name === 'outside_2' || child.name === 'outside_3') {
          outside_2_group.add(child.clone());
          }
          child.castShadow = true;
        }
      });
      scene.add(shoe);
      rotateShoe(props.onPartSelected);

  }, undefined, function(error){
    console.error(error);
  });


  //add plane
  const planeGeometry = new THREE.PlaneGeometry( 100, 100, 32 );
  const planeMaterial = new THREE.MeshStandardMaterial( {color: 0xF5F5F5, side: THREE.DoubleSide} );
  const plane = new THREE.Mesh( planeGeometry, planeMaterial );
  plane.receiveShadow = true;
  plane.rotation.x = Math.PI / -2;
  plane.position.y = 0.98;
  scene.add( plane );


  camera.position.z = 3;
  camera.position.y = 2;

  //add ambientlight
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  //add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(0, 2.4, 0);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  //add extra directional light
  const extraDirectionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
  extraDirectionalLight.position.set(camera.position.x, camera.position.y + 0.5, camera.position.z);
  extraDirectionalLight.target.position.set(-0.2, 0.25, 0); // Position of the shoe
  extraDirectionalLight.castShadow = true;
  scene.add(extraDirectionalLight);

  function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
  }

  animate();

  window.addEventListener('resize', () => {
      const width = window.innerWidth *Math.PI/2;
      const height = window.innerHeight*Math.PI/4;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', () => {
    const width = window.innerWidth *Math.PI/2;
    const height = window.innerHeight*Math.PI/4;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
});

</script>

<template>
    <div></div>
</template>

<style scoped>
</style>
