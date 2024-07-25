<script setup>
    import { ref, computed, defineEmits } from 'vue';
    const props = defineProps({
        products: Array,
        searchQuery: String,

    })

    const onChangeSelect = (e) => {
        if(e.target.value === 'cheap') {
        props.products.sort((a,b)=> a.price - b.price)
        } else if (e.target.value === 'expensive') {
        props.products.sort((a,b)=> b.price - a.price)
        } else if (e.target.value === 'name') {
        props.products.sort((a, b) => a.name.localeCompare(b.name))
        }
    }

    
    
    const emit = defineEmits(['updateSearchQuery']);
    
    const onChangeInput = (event) => {;
        emit('updateSearchQuery', event.target.value);
    };





</script>

<template>
    <div class="max-w-[85vw] mx-auto">
        <div class="flex items-center justify-between my-[30px]">
          <h2 class=" text-center font-extrabold text-[30px]">Усі кросівки</h2>
          <div class="flex">
            <select @change="onChangeSelect" class="p-1 border rounded-md outline-none mr-5">
              <option value="name">За назвою</option>
              <option value="cheap">За ціною (дешеві) </option>
              <option value="expensive">За ціною (дорогі)</option>
            </select>
            <div class="flex relative">
              <img class="absolute top-[27%] left-3" src="../../../public/search.svg" alt="Search" >
              <input @input="onChangeInput" class="border rounded-md pl-10 pr-2 py-1 outline-none focus:border-gray-400" type="text" placeholder="Пошук...">
            </div>
          </div>
        </div>
    </div>
</template>
