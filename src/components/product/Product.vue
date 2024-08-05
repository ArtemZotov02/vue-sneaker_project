<script setup>
import {reactive, onMounted, ref, computed } from 'vue';

import SortProduct from '../sortProduct/SortProduct.vue'

  import { state, addInFavorite, addInBasket } from '@/store';


  let products = reactive([
    {
      name: 'Nike Blazer Mid Suede',
      price: 3300,
      id: 101,
      img: new URL('../../../public/sneakers/sneakers-1.jpg', import.meta.url).href,
    },
    {
      name: 'Nike Air Max 270',
      price: 4300,
      id: 102,
      img: new URL('../../../public/sneakers/sneakers-2.jpg', import.meta.url).href,
    },
    {
      name: 'Nike Blazer Mid Suede',
      price: 3300,
      id: 103,
      img: new URL('../../../public/sneakers/sneakers-3.jpg', import.meta.url).href,
    },
    {
      name: 'Puma X Aka Boku Future Rider',
      price: 3000,
      id: 104,
      img: new URL('../../../public/sneakers/sneakers-4.jpg', import.meta.url).href,
    },
    {
      name: 'Under Armour Curry 8',
      price: 4500,
      id: 105,
      img: new URL('../../../public/sneakers/sneakers-5.jpg', import.meta.url).href,
    },
    {
      name: 'Nike Kyrie 7',
      price: 4700,
      id: 106,
      img: new URL('../../../public/sneakers/sneakers-6.jpg', import.meta.url).href,
    },
    {
      name: 'Jordan Air 11',
      price: 5300,
      id: 107,
      img: new URL('../../../public/sneakers/sneakers-7.jpg', import.meta.url).href,
    },
    {
      name: 'Nike Lebron XVIII',
      price: 6100,
      id: 108,
      img: new URL('../../../public/sneakers/sneakers-8.jpg', import.meta.url).href,
    },
    {
      name: 'Nike Lebron XVIII Low',
      price: 5800,
      id: 109,
      img: new URL('../../../public/sneakers/sneakers-9.jpg', import.meta.url).href,
    },
    {
      name: 'Nike Kyrie Flytrap IV',
      price: 4800,
      id: 110,
      img: new URL('../../../public/sneakers/sneakers-10.jpg', import.meta.url).href,
    },
    {
      name: 'Reebok Street',
      price: 3100,
      id: 111,
      img: new URL('../../../public/sneakers/sneakers-11.jpg', import.meta.url).href,
    },
    {
      name: 'Puma Legacy',
      price: 2800,
      id: 112,
      img: new URL('../../../public/sneakers/sneakers-12.jpg', import.meta.url).href,
    },
  ])


  const searchQuery = ref('');
  
  const updateSearchQuery = (newQuery) => {
    searchQuery.value = newQuery;
  };
  
  const filteredProducts = computed (() => {
    if (searchQuery.value) {
      return products.filter(product => product.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
    } else {
      return products
    }
  });
  
  
  onMounted(()=> {
    products.sort((a, b) => a.name.localeCompare(b.name))
  })


</script>

<template>
      <SortProduct :products="products" :searchQuery="searchQuery" @updateSearchQuery="updateSearchQuery"/>
        <div class="grid grid-cols-4 gap-5 mt-[20px]">
            <div v-for="(e) in filteredProducts" :key="e.id" class="flex flex-col justify-between relative border mx-auto border-slate-300 rounded-2xl p-[20px] max-w-[288px]">
                <div>
                    <img :src="state.favourite.findIndex(item => item.id === e.id ) !== -1  ? '../../../public/like-2.svg' : '../../../public/like-1.svg' " alt="Like 1" 
                          class="absolute top-[20px] left-[20px] w-[35px] border-[1px] border-gray-300 rounded-[10px] cursor-pointer select-none" 
                          @click="addInFavorite(e.name, e.price, e.img, e.id)"

                    >
                    <img :src="e.img" alt="Shoes" class="select-none">
                    <p>{{ e.name }}</p>
                </div>
        
                <div class="flex justify-between items-center">
                    <div class="flex flex-col">
                        <span class="text-slate-400">Ціна:</span>
                        <b>{{ e.price}}грн.</b>
                    </div>
                    <div class="flex justify-center items-center w-[36px] h-[36px] bg-white-200 border-[2px] rounded-lg border-gray-300 text-gray-300 text-[26px] select-none cursor-pointer hover:border-green-500 hover:bg-green-400 hover:text-white active:border-green-700 active:bg-green-600"
                        @click="addInBasket(e)" 
                    >
                        <p class="h-full mb-[10px]">+</p>
                    </div>
                </div>
            </div>
        </div>
</template>




