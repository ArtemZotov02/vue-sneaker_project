
<script setup>
    import { state, setUserState, removeUserState } from '@/store'; 
    import ButtonRed from '../buttonRed/ButtonRed.vue';
    import { ref } from 'vue';

    const props = defineProps({
        openBasket: Function,
    })

    const isLoggedIn = localStorage.getItem('login') === 'true';


    const deleteProduct = (id) => {
        const index = state.productsBasket.findIndex(item => item.id === id)
        const deletedProduct = state.productsBasket[index]
        state.productsBasket.splice(index, 1)
        state.totalBasket -= deletedProduct.price
        setUserState('basket', state.productsBasket)
    }
    
    const deleteAllProducts = () => {
        state.productsBasket = []
        removeUserState('basket')
        state.totalBasket = 0
    }


    const setOrder = ref(false)
    const makeOrder = () => {
        state.order = [...state.order, state.productsBasket]
        setUserState('order', state.order)
        removeUserState('basket')
        setOrder.value = true
        state.productsBasket = []
        state.totalBasket = 0
    }

    
</script>

<template>
    <div class="fixed top-0 left-0 h-full bg-black w-full z-10 opacity-70" @click="props.openBasket"></div>    
    <div class="bg-white w-[400px] h-full fixed top-0 right-0 z-20 p-8 flex flex-col">
            <div class="flex mb-[20px] justify-between">
                <div class="flex cursor-pointer" @click="props.openBasket()">
                    <img src="../../../public/arrow-right.svg" alt="Close basket" class="w-[18px] mr-[20px] cursor-pointer transition hover:translate-x-1">
                    <h2 class="text-2xl font-bold">Кошик</h2>   
                </div>
                <ButtonRed v-if="state.productsBasket.length > 1" @click="deleteAllProducts" class="px-[10px] text-[14px]">
                        Видалити все
                </ButtonRed>
            </div>
            <div class="flex flex-col overflow-y-auto h-full">
                <div v-for="(e) in state.productsBasket" :key="e.id" class="flex w-full p-3 border border-gray-300 mb-[20px] rounded-xl justify-between">
                    <div class="flex items-center">
                        <img :src="e.img" alt="" class="w-[100px] mr-[10px]">
                        <div>
                            <p>{{ e.name }}</p>
                            <p class="font-bold mt-[10px]">{{ e.price }} грн.</p>
                        </div>
                    </div>
                    <img src="../../../public/close.svg" class="h-[32px] mt-auto cursor-pointer" @click="deleteProduct(e.id)"/>
                </div>  
                <div v-if="state.productsBasket.length === 0 && setOrder === false" class="flex flex-col m-auto items-center w-[70%]">
                    <img src="../../../public/package-icon.png" alt="No products in basket" class="w-[120px]">
                    <p class="font-bold my-[10px]">Кошик порожній</p>
                    <button class="w-full p-2 text-white rounded-xl bg-green-500 hover:bg-green-600 active:bg-green-700">
                        <a href="#/" @click="props.openBasket()">Обрати товар</a>
                    </button>
                </div>
                <div v-if="setOrder" class="flex flex-col m-auto items-center w-[70%]">
                    <img src="../../../public/order-success-icon.png" alt="order-success" class="w-[83px]">
                    <p class="font-bold my-[10px]">Замовлення оформлене!</p>
                    <button class="w-full p-2 text-white rounded-xl bg-green-500 hover:bg-green-600 active:bg-green-700">
                        <a href="#/" @click="props.openBasket()">На головну</a>
                    </button>
                </div>
            
            </div>
            <div v-if="state.productsBasket.length >= 1"  class="pt-[20px] border-t-[1px] border-gray-400">
                <div class="flex justify-between mb-[30px] gap-2">
                    <p>Всього: </p>
                    <div class="flex-1 border-b-[1px] border-dashed border-gray-400 h-[18px]"></div>
                    <p>{{ state.totalBasket }} грн.</p>
                </div>
                <!-- <button @click="makeOrder" class="w-full p-3 bg-green-500 rounded-xl text-white  disabled:bg-slate-400 transition hover:bg-green-600 active:bg-green-700">
                    Оформити замовлення
                </button> -->
                <button v-if="isLoggedIn" @click="makeOrder" class="w-full p-3 bg-green-500 rounded-xl text-white disabled:bg-slate-400 transition hover:bg-green-600 active:bg-green-700">
                    Оформити замовлення
                </button>
                <p v-else class="text-red-600 text-center font-bold ">
                    Увійдіть до <a href="#/profile" class="underline" @click="props.openBasket">облікового запису</a>, щоб оформити замовлення
                </p>
            </div>
            
            
    </div>
</template>