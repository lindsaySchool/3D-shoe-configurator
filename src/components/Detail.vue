<script setup>
    import {
        ref,
        defineEmits
    } from 'vue';
</script>

<template>
    <!--An overview of the shoes to buy-->
    <div class="shop">
        <h1 class="shop__title">Shop</h1>
        <div class="shop__container">
            <div class="shop__container__item">
                <router-link to="/product-detail">
                    <img class="shop__item-image" src="../assets/cover_shoeModel.png"
                        alt="air-rev-nitro-s-triple-white">
                </router-link>
                <h2 class="shop__item-title">AIR REV. NITRO S TRIPLE WHITE</h2>
                <p class="shop__item-price">€51.99</p>
            </div>
            <div class="shop__container__selection">
                <!--A dropdown selection for the size of the shoe-->
                <select class="shop__item-size">
                    <option value="size">Size</option>
                    <option value="size">EU 42.5</option>
                    <option value="size">EU 43</option>
                    <option value="size">EU 44</option>
                    <option value="size">EU 44.5</option>
                    <option value="size">EU 45</option>
                    <option value="size">EU 45.5</option>
                    <option value="size">EU 46</option>
                    <option value="size">EU 47</option>
                    <option value="size">EU 47.5</option>
                    <option value="size">EU 48</option>
                    <option value="size">EU 48.5</option>
                    <option value="size">EU 49.5</option>
                    <option value="size">EU 50</option>
                </select>
                <div class="navigation_buttons">
                    <router-link to="/">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.65 18L18.85 29.2L16 32L0 16L16 0L18.85 2.8L7.65 14H32V18H7.65Z"
                                fill="#C7C7C7" />
                        </svg>
                    </router-link>
                    <router-link to="/client">
                        <a class="navigation_buttons-save" @click="saveData">Next</a>
                    </router-link> 
                </div>
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

    .shop__container__selection {
        margin-top: 1em;
    }

    .shop__item-size {
        width: 100%;
        padding: 0.5em;
        border: 1px solid #ccc;
        border-radius: 5px;
        background: #fff;
        color: #333;
        font-size: 1em;
    }


    .navigation_buttons {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 60px;
        padding: 0 2em;
    }

    .navigation_buttons a {
        text-decoration: none;
        text-transform: uppercase;
        font-size: 1em;
        margin: 1em;
    }

    .navigation_buttons-save {
        background-color: #1C1B1F;
        color: #fff;
        padding: 18px 93px;
        text-decoration: none;
        text-transform: uppercase;

    }

    .navigation_buttons svg {
        fill: #1C1B1F;
        cursor: pointer;
    }
</style>