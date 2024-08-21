<script setup>
 
  import { onBeforeMount, onBeforeUpdate, onMounted, onUpdated} from 'vue';
  import Header from './components/header/Header.vue'
  import { getUserState, removeUserState, state } from './store';
  import Cookies from 'js-cookie';


  onBeforeMount(()=> {
    state.totalBasket = state.productsBasket.reduce((total, item) => total + item.price, 0)
  

    if(!Cookies.get(localStorage.getItem('user')) && localStorage.getItem('user') != null) {
      removeUserState('', true)
      localStorage.removeItem('login')
      localStorage.removeItem('user')

      state.favourite = getUserState().favourite
      state.productsBasket = getUserState().basket
    }
})  


</script>

<template>
    <div class="w-[98vw] pb-[40px] m-auto bg-white rounded-t-xl shadow-xl my-1">
      <Header />  
      <div class="max-w-[85vw] mx-auto">
        <router-view/>
      </div>
    </div>
</template>


<style scoped>
 
</style>
