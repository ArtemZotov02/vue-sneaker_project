<script setup>
    import { state } from '@/store';
    import { reactive, ref } from 'vue';

    const openOrder = ref({})
    const toggleOrder = (i)=> {
        openOrder.value[i] = !openOrder.value[i];

    }

    const calculateTotalPrice = (items) => {
       return items.reduce((total, item)=> total + item.price, 0)
    }

    const currentDate = ref(new Date());
    const formattedDate = ref(`
        ${currentDate.value.getFullYear()}.
        ${(currentDate.value.getMonth() + 1).toString().padStart(2, '0')}.
        ${currentDate.value.getDate().toString().padStart(2, '0')}
    `)
</script>

<template>
    <div class="flex flex-col w-[49%] p-[10px] bg-white shadow-lg rounded-lg">
                <p class="flex font-bold text-[18px] text-gray-700 justify-start">Замовлення:</p>
                <div v-if="state.order < 1" class="text-center my-auto">
                    <p class="font-bold mb-[20px]">Замовлень поки немає</p>
                    <button class="py-1 px-3 text-white rounded-xl bg-green-500 hover:bg-green-600 active:bg-green-700">
                        <a href="#/">Обрати товар</a>
                    </button>
                </div>
                
                <div 
                    v-for="(item, outerIndex) in state.order" 
                    :key="outerIndex" 
                    class="bg-gray-200 p-[5px] rounded-xl my-[10px] relative"
                >
                        <div class="flex justify-around my-[10px]">
                            <p>{{formattedDate}}</p>
                            <p class="text-center font-bold">Замовлення № {{ outerIndex +1 }}</p>
                            <img 
                                @click="toggleOrder(outerIndex)" 
                                src="../../../public/arrow-right.svg" 
                                :class="{'rotate-[270deg]': openOrder[outerIndex], 'rotate-90': !openOrder[outerIndex] }" 
                                class="transition w-[14px] cursor-pointer" alt="Open order"
                            >
                        </div>
                        <div 
                            :class="{ 'flex': openOrder[outerIndex], 'hidden': !openOrder[outerIndex   ] }" 
                            class="text-center p-[10px] items-center font-medium border-t-[2px] border-gray-300"
                        >
                            <p class="w-1/5">Кількість товарів: {{ item.length }}</p>
                            <p class="w-2/5">Назва</p>
                            <p class="w-2/5">Ціна</p>
                        </div>
                        <div 
                            v-for="(elem, innerIndex) in item" :key="innerIndex" 
                            :class="{ 'flex': openOrder[outerIndex], 'hidden': !openOrder[outerIndex] }" 
                            class="flex items-center justify-between text-center bg-white rounded-xl p-[10px] mb-[10px]"
                        > 
                            <img :src='elem.img' alt="Product" class="w-1/5 mr-[6px]">
                            <p class="w-2/5">{{ elem.name }} </p>
                            <p class="w-2/5">{{ elem.price }} грн.</p>
                        </div>

                        <div :class="{ 'flex': openOrder[outerIndex], 'hidden': !openOrder[outerIndex] }" class="items-center">
                            <p class="w-[62%] text-red-400">Замовлення в обробці, незабаром ми з вами зв'яжемося.</p>
                            <p class="w-[38%] p-[5px] text-center rounded-xl font-bold bg-green-300">Усього: {{ calculateTotalPrice(item)}} грн.</p>
                        </div>
                </div>
    </div>
</template>