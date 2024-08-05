<script setup>
    import ButtonRed from '@/components/buttonRed/ButtonRed.vue';
import { state, addInFavorite, addInBasket, removeUserState } from '@/store';


    const deleteAllFavourites = () => {
        removeUserState('favourite')
        state.favourite = []
    }
</script>

<template>
    <div class="flex flex-col justify-between">
        <div  v-if="state.favourite.length >= 1" class="flex justify-between my-[30px]">
            <p class="font-bold text-[24px]">Усього збережених товарів: {{ state.favourite.length }}</p>
            <ButtonRed v-if="state.favourite.length > 1"  @click="deleteAllFavourites()" class="px-[20px] py-[5px]">   
                Видалити все
            </ButtonRed>
        </div>
        <div class="grid grid-cols-4 gap-5 ">
                <div v-for="(e) in state.favourite" :key="e.id" class="flex flex-col justify-between relative border mx-auto border-slate-300 rounded-2xl p-[20px] max-w-[288px]">
                    <div>
                        <img :src="state.favourite.findIndex(item => item.id === e.id ) !== -1 ? '../../../../../public/like-2.svg' : '../../../../../public/like-1.svg' " alt="Add in favourite"
                              class="absolute top-[20px] left-[20px] w-[35px] border-[1px] border-gray-300 rounded-[10px] cursor-pointer" 
                              @click="addInFavorite(e.name, e.price, e.img, e.id)">
                        <img :src="e.img" alt="Shoes">
                        <p>{{ e.name }}</p>
                    </div>
            
                    <div class="flex justify-between items-center">
                        <div class="flex flex-col">
                            <span class="text-slate-400">Ціна:</span>
                            <b>{{ e.price}}грн.</b>
                        </div>
                        <img :src="'../../../public/plus.svg'" alt="Add"
                            @click="addInBasket(e)" 
                            class="border-[2px] border-gray-300 rounded-[10px] cursor-pointer"
                        />
                    </div>
                </div>
        </div>
        <div v-if="state.favourite.length === 0" class="flex flex-col items-center my-[50px]">
            <img src="../../../public/emoji-1.png" alt="Збережених товарів немає" class="w-[70px]">
            <p class="mt-[30px] mb-[50px] font-bold text-[18px]"> Збережених товарів немає </p>
            <a class="flex justify-center w-[245px] p-2 text-white rounded-xl bg-green-500 hover:bg-green-600 active:bg-green-700"
                href="#/"
            >
                <img src="../../../public/arrow-next.svg" alt="Emoji" class="rotate-180 my-auto mr-[20px]">
                Повернутися назад
            </a>
        </div>
    </div>
</template>

