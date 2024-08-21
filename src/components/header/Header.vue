<script setup>
    import { inject, ref, watch,onMounted } from 'vue';
    import Basket from '../basket/Basket.vue';
    import { state } from '@/store';

    const basket = ref(false)
    
    const openBasket = () => {
        basket.value = !basket.value
    }


    

</script>

<template>
    <Basket v-if="basket" :openBasket="openBasket"/>

    <header class="flex justify-between border-b border-slate-300 px-5 py-3">
        <a class="flex items-center cursor-pointer" href="#/">
            <img src="../../../public/logo.png" alt="Logo" class="w-[50px] mr-3">
            <div>
                <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
                <p class="text-slate-400">Магазин найкращого взуття</p>
            </div>
        </a>
        <ul class="flex items-center gap-6">
            <li class="relative flex items-center gap-2 text-gray-500 text-[14px] hover:text-black cursor-pointer" 
                @click="openBasket">
                <img src="../../../public/cart.svg" alt="Cart">
                <p class="font-medium">{{ state.totalBasket }} грн.</p>
                <span v-if="state.productsBasket.length > 0" class="absolute top-[12px] left-[-9px] text-[12px]">{{ state.productsBasket.length }}</span>
            </li>
            <li class="relative flex items-center text-gray-500 text-[14px] hover:text-black cursor-pointer">
                <a href="#/favourite" class="flex gap-2">
                    <img src="../../../public/heart.svg" alt="Cart">
                    <p class="font-medium">Збережені</p>
                    <span v-if="state.favourite.length > 0" class="absolute top-[12px] left-[-6px] text-[12px]">{{ state.favourite.length }}</span>
                </a>
            </li>
            <li class="flex items-center gap-2 text-gray-500 text-[14px] hover:text-black cursor-pointer">
                <a href="#/profile" class="flex gap-2">
                    <img src="../../../public/profile.svg" alt="Profile">
                    <p class="font-medium">Профіль</p>
                </a>
            </li>
        </ul>
    </header>
</template>
