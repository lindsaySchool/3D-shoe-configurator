<script setup>
    import {
        ref,
        defineEmits
    } from 'vue';
    import {
        useRoute,
        useRouter
    } from 'vue-router';
    const name = ref('');
    const email = ref('');
    const router = useRouter();
    const saveData = () => {
        console.log(name.value, email.value)
        router.push({
            path: '/configurator',
            query: {
                name: name.value,
                email: email.value
            }
        });
    };
</script>

<template>
    <!--An overview of the shoes to buy-->
    <div class="client">
        <h1 class="client__title">How may we contact you?</h1>
        <div class="client__container">
            <input v-model="name" type="text" placeholder="Name" class="client__input" />
            <input v-model="email" type="email" placeholder="Email" class="client__input" />

            <div class="navigation_buttons">
                <router-link :to="{ path: '/configurator', query: { name, email } }">
                    <a class="navigation_buttons-save" @click="saveData">Next</a>
                </router-link>
            </div>

        </div>
    </div>

</template>

<style scoped>
    .client {
        font-family: Arial, sans-serif;
        color: #333;
    }

    .client__title {
        font-size: 2em;
        margin-bottom: 1em;
        padding: 0 2em;
    }

    .client__container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-wrap: wrap;
        margin-left: 4em;
        padding: 0 1em;
    }

    .client__input {
        width: 100%;
        max-width: 400px;
        padding: 0.5em;
        margin: 1em 0;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 1em;
        box-sizing: border-box;
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

    @media (max-width: 600px) {
        .client__container {
            margin-left: 0;
        }

        .client__input {
            max-width: 100%;
        }
    }
</style>