
<script setup>
    import { inject, onMounted, watch} from 'vue';
    import { state, setUserState, removeUserState } from '@/store';

    const props = defineProps({
        openBasket: Function,
    })

    const deleteProduct = (id) => {
        const index = state.productsBasket.findIndex(item => item.id === id)
        const deletedProduct = state.productsBasket[index]
        state.productsBasket.splice(index, 1)
        state.totalBasket -= deletedProduct.price
        setUserState('basket', state.productsBasket)
        // localStorage.setItem(`basket_${localStorage.getItem('user')}`, JSON.stringify(state.productsBasket))
    }
    
    const deleteAllProducts = () => {
        state.productsBasket = []
        // localStorage.removeItem(`basket_${localStorage.getItem('user')}`)
        removeUserState('basket')
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
                <button class="px-[10px] bg-red-500 text-white rounded-xl"
                        v-if="state.productsBasket.length > 1"
                        @click="deleteAllProducts"
                >Видалити все</button>
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
                <div v-if="state.productsBasket.length === 0" class="flex flex-col m-auto items-center w-[70%]">
                    <img src="../../../public/package-icon.png" alt="No products in basket" class="w-[120px]">
                    <p class="font-bold my-[10px]">Кошик порожній</p>
                    <button class="w-full p-2 text-white rounded-xl bg-green-500 hover:bg-green-600 active:bg-green-700"
                    >
                        <a href="#/" @click="props.openBasket()">Обрати товар</a>
                    </button>
                </div>
            </div>
            <div v-if="state.productsBasket.length >= 1" class="pt-[20px] border-t-[1px] border-gray-400">
                <div class="flex justify-between mb-[30px] gap-2">
                    <p>Всього: </p>
                    <div class="flex-1 border-b-[1px] border-dashed border-gray-400 h-[18px]"></div>
                    <p>{{ state.totalBasket }} грн.</p>
                </div>
                <button class="w-full p-3 bg-green-500 rounded-xl text-white  disabled:bg-slate-400 transition hover:bg-green-600 active:bg-green-700">Оформити замовлення</button>
            </div>
    </div>
</template>