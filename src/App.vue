<script setup>
 
  import { onBeforeMount, onMounted, onUpdated, ref, watch} from 'vue';
  import Header from './components/header/Header.vue'
  import { state } from './store';


  onMounted(()=> {
    state.totalBasket = state.productsBasket.reduce((total, item) => total + item.price, 0)
    // localStorage.clear()
})

</script>

<template>
    <div class="w-[90vw] pb-[40px] m-auto bg-white rounded-t-xl shadow-xl mt-14">
      <Header />  
      <div class="max-w-[85vw] mx-auto">
        <router-view/>
      </div>
    </div>
</template>


<style scoped>
 
</style>
