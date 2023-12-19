<script setup>
  import {
    ref,
    onMounted,
    onBeforeUnmount,
    defineProps,
    watchEffect  } from 'vue';
  import { onBeforeRouteLeave } from 'vue-router';

  import * as THREE from 'three';
  //import glb
  import {
    GLTFLoader
  } from 'three/examples/jsm/loaders/GLTFLoader.js';
  //import axis helper from three
  import {
    AxesHelper
  } from 'three';
  const materialsMap = new Map();
  let scene, camera, renderer, shoe;
  let showCanvas = ref(true);
  let canvasContainer = ref(null);
  const emit = defineEmits(['save-data']);
  const props = defineProps({
    onPartSelected: {
      type: String,
      default: null
    },
    onMaterialSelected: {
      type: String,
      default: null
    },
    onColorSelected: {
      type: String,
      default: null
    }
  });
  const data = {
    dataObject: {
      name: "AIR REV. NITRO S TRIPLE WHITE",
      size: "EU 42.5",
      client: "1",
      status: "in progress",
      compound: {
        outside_01: {},
        laces: {},
        sole_top: {},
        inside: {},
        outside_2: {},
        sole_bottom: {}
      },
      price: 51.99,
    },
    childColors: {}
  };
  const rotateShoe = (part) => {
    // Rotate the shoe based on the selected part
    if (shoe) {
      if (part === 'inside') {
        shoe.rotation.y = Math.PI / 2;
      } else if (part === 'laces') {
        shoe.rotation.y = 0;
      } else if (part === 'outside_1') {
        shoe.rotation.y = Math.PI * 1.5;
      } else if (part === 'outside_2') {
        shoe.rotation.y = Math.PI / 2;
      } else if (part === 'sole_top') {
        shoe.rotation.y = Math.PI * 1;
      } else if (part === 'sole_bottom') {
        shoe.rotation.y = Math.PI * 2.5;
      }
    }
  };
  //Define leather material
  let leatherMaterial;
  //Define textile material
  let textileMaterial;
  //Define rubber material
  let polyesterMaterial;

  const applyMaterial = (part, material, color) => {
    if (shoe) {
      shoe.traverse((child) => {
        if (child.isMesh && child.name === part) {
          let newMaterial;
          switch (material) {
            case 'leather':
              newMaterial = leatherMaterial.clone();
              break;
            case 'textile':
              newMaterial = textileMaterial.clone();
              break;
            case 'polyester':
              newMaterial = polyesterMaterial.clone();
              break;
            default:
              child.material = new THREE.MeshStandardMaterial({});
              break;
          }
          newMaterial.color.set(color);
          child.material = newMaterial;
          data.childColors[part] = color;
          data.dataObject.compound[part] = {
            material: material,
            color
          };
          console.log(data.dataObject);
          emit('save-data', data.dataObject);
        }
      });
    }
  }
  // Add a new function to change the color of the selected part
  const changeColor = (part, color) => {
    if (shoe) {
      shoe.traverse((child) => {
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
          //save the color of the selected part
          //data.dataObject.compound[part] = color;
          data.childColors[part] = color;
          applyMaterial(part, props.onMaterialSelected, color);
          console.log(data.dataObject);
          emit('save-data', data.dataObject);
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
    if (props.onColorSelected && props.onPartSelected && props.onMaterialSelected) {
      changeColor(props.onPartSelected, props.onColorSelected);
      //applyMaterial(props.onPartSelected, props.onMaterialSelected, props.onColorSelected);
      console.log(props.onColorSelected)
    }
  });
  onMounted(() => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF5F5F5);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth * Math.PI / 2 / window.innerHeight * Math.PI / 4,
      0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth * Math.PI / 2, window.innerHeight * Math.PI / 4);
    renderer.shadowMap.enabled = true;
    canvasContainer.value.appendChild(renderer.domElement);

    /*  //add axis helper
     const axesHelper = new AxesHelper( 5 );
     scene.add( axesHelper ); */

    //load textures from public folder leather
    const loader_leather = new THREE.TextureLoader();
    const normalTexture_leather = loader_leather.load('/textures/leather/Leather_011_normal.jpg');
    const aoTexture_leather = loader_leather.load('/textures/leather/Leather_011_ambientOcclusion.jpg');
    const heightTexture_leather = loader_leather.load('/textures/leather/Leather_011_height.png');
    const roughnessTexture_leather = loader_leather.load('/textures/leather/Leather_011_roughness.jpg');
    
    //load textures from public folder textile
    const loader_textile = new THREE.TextureLoader();
    const normalTexture_textile = loader_textile.load('/textures/textile/Fabric_034_normal.jpg');
    const aoTexture_textile = loader_textile.load('/textures/textile/Fabric_034_ambientOcclusion.jpg');
    const heightTexture_textile = loader_textile.load('/textures/textile/Fabric_034_height.png');
    const roughnessTexture_textile = loader_textile.load('/textures/textile/Fabric_034_roughness.jpg');
    //const baseColorTexture_textile = loader_textile.load('/textures/textile/Fabric_034_baseColor.jpg');
    
    //loader textures from public folder polyester
    const loader_polyester = new THREE.TextureLoader();
    const normalTexture_polyester = loader_polyester.load('/textures/polyester/Fabric_polyestr_001_normal.jpg');
    const aoTexture_polyester = loader_polyester.load('/textures/polyester/Fabric_polyestr_001_ambientOcclusion.jpg');
    const heightTexture_polyester = loader_polyester.load('/textures/polyester/Fabric_polyestr_001_height.png');
    const roughnessTexture_polyester = loader_polyester.load('/textures/polyester/Fabric_polyestr_001_roughness.jpg');

    //create a material with the leather textures
    leatherMaterial = new THREE.MeshStandardMaterial({
      map: normalTexture_leather,
      aoMap: aoTexture_leather,
      displacementMap: heightTexture_leather,
      displacementScale: 0.1,
      roughnessMap: roughnessTexture_leather,
    });

    //create a material with the textile textures
    textileMaterial = new THREE.MeshStandardMaterial({
      map: normalTexture_textile,
      aoMap: aoTexture_textile,
      displacementMap: heightTexture_textile,
      displacementScale: 0.1,
      roughnessMap: roughnessTexture_textile,
    });

    //create a material with the polyester textures
    polyesterMaterial = new THREE.MeshStandardMaterial({
      map: normalTexture_polyester,
      aoMap: aoTexture_polyester,
      displacementMap: heightTexture_polyester,
      displacementScale: 0.1,
      roughnessMap: roughnessTexture_polyester,
    });
    //add public models shoe.glb
    const loader = new GLTFLoader();
    loader.load('/models/shoe.glb', function(gltf) {
      shoe = gltf.scene;
      shoe.position.set(-0.2, 1.25, 0);
      shoe.rotation.y = 1.6;
      //make shoe bigger
      shoe.scale.set(8, 7, 10);
      // Traverse the model and log each child
      let outside_2_group = new THREE.Group();
      outside_2_group.name = 'outside_2';
      shoe.traverse((child) => {
        if (child.isMesh) {
          //child.material = leatherMaterial;
          if (child.name === 'outside_2' || child.name === 'outside_3') {
            outside_2_group.add(child.clone());
          }
          child.castShadow = true;
        }
      });
      scene.add(shoe);
      rotateShoe(props.onPartSelected);
    }, undefined, function(error) {
      console.error(error);
    });
    //add plane
    const planeGeometry = new THREE.PlaneGeometry(100, 100, 32);
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: 0xF5F5F5,
      side: THREE.DoubleSide
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = Math.PI / -2;
    plane.position.y = 0.98;
    scene.add(plane);

    //CAMERA
    camera.position.z = 3;
    camera.position.y = 2;

    //LIGHTS
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
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();
    window.addEventListener('resize', () => {
      const width = window.innerWidth * Math.PI / 2;
      const height = window.innerHeight * Math.PI / 4;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
  });
  onBeforeUnmount(() => {
    window.removeEventListener('resize', () => {
      const width = window.innerWidth * Math.PI / 2;
      const height = window.innerHeight * Math.PI / 4;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
  });
  onBeforeRouteLeave(()=>{
    showCanvas.value = false;
  })
</script>

<template>
  <div v-if="showCanvas" ref="canvasContainer" style="display: inline-block;"></div>
</template>

<style scoped>
</style>