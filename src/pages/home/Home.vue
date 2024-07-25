<script setup   >
  import SortProduct from '@/components/sortProduct/SortProduct.vue';
  import Product from '../../components/product/Product.vue'
  import { inject } from 'vue';

</script>

<template>
      <!-- <SortProduct :products="products" :searchQuery="searchQuery" @updateSearchQuery="updateSearchQuery"/> -->
       <div class="my-[30px]">
         <img class="mx-auto" src="../../../public/Group 112.svg" alt="Banner">
       </div>
        <Product/>
</template>