<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';

//import orbitcontrols from 'three-orbitcontrols';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

//import glb
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
//import axis helper from three
import {AxesHelper} from 'three';

let scene, camera, renderer, controls;

onMounted(()=>{
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xF5F5F5);
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.shadowMap.enabled = true;
  document.body.appendChild( renderer.domElement );
 /*  //add axis helper
  const axesHelper = new AxesHelper( 5 );
  scene.add( axesHelper ); */

  //add orbit controls
  const controls = new OrbitControls( camera, renderer.domElement );
  //add public models shoe.glb
  const loader = new GLTFLoader();
  loader.load('/models/shoe.glb', function(gltf){
    gltf.scene.position.set(-0.2, 0.25, 0);
    gltf.scene.rotation.y = 1.6;
    //make shoe bigger
    gltf.scene.scale.set(8, 7, 10);
    // Traverse the model and log each child
    gltf.scene.traverse(function (child) {
        if (child.isMesh) {
          console.log(child.name);
          child.castShadow = true;
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
        scene.add(gltf.scene);

      });

  }, undefined, function(error){
    console.error(error);
  });

  //add plane
  const planeGeometry = new THREE.PlaneGeometry( 100, 100, 32 );
  const planeMaterial = new THREE.MeshStandardMaterial( {color: 0xF5F5F5, side: THREE.DoubleSide} );
  const plane = new THREE.Mesh( planeGeometry, planeMaterial );
  plane.receiveShadow = true;
  plane.rotation.x = Math.PI / -2;
  scene.add( plane );


  camera.position.z = 2;
  camera.position.y = 1;

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
