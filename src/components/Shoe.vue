<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';

//import orbitcontrols from 'three-orbitcontrols';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

//import glb
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, controls;

onMounted(()=>{
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  //add orbit controls
  const controls = new OrbitControls( camera, renderer.domElement );
  //add public models shoe.glb
const loader = new GLTFLoader();
loader.load('/models/shoe.glb', function(gltf){
  gltf.scene.position.set(-0.4, 0.4, 1);
  gltf.scene.rotation.y = 1.5;
  //make shoe bigger
  gltf.scene.scale.set(8, 7, 10);
  scene.add(gltf.scene);
  // Traverse the model and log each child
  gltf.scene.traverse(function (child) {
      if (child.isMesh) {
        console.log(child.name);
        if (child.name === 'sole_top') {
          child.material.color.set(0xE90866);
        }
        if (child.name === 'sole_bottom') {
          child.material.color.set(0x4F4F4F);
        }
        if (child.name === 'outside_1') {
          child.material.color.set(0x69ff47);
        }
        if (child.name === 'inside') {
          child.material.color.set(0x000ff0);
        }
        if (child.name === 'laces') {
          child.material.color.set(0xDFEB57);
        }

      }
    });

}, undefined, function(error){
  console.error(error);
});

//add plane
const planeGeometry = new THREE.PlaneGeometry( 100, 100, 32 );
const planeMaterial = new THREE.MeshBasicMaterial( {color: 0x69ff47, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.rotation.x = 1.5;
scene.add( plane );


camera.position.z = 3;
camera.position.y = 1;

//add ambientlight
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

//add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 2);
directionalLight.castShadow = true;
scene.add(directionalLight);

function animate() {
	requestAnimationFrame( animate );
  controls.update();
	renderer.render( scene, camera );
}

animate();

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
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
