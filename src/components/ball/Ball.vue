<script setup>
    import { ref } from 'vue';
    
    const props = defineProps({
        name: String
    })

    const left = ref(0)
    const top = ref(0)

    const ballSize = 50 // Размер мяча
    const containerWidth = 1000 // Ширина контейнера
    const containerHeight = 800 // Высота контейнера

    const moveBall = (event) => {
        switch(event.key) {
            case 'ArrowRight':
            if (left.value + 10 + ballSize <= containerWidth) {
                left.value += 10
            }
            break
            case 'ArrowLeft':
            if (left.value - 10 >= 0) {
                left.value -= 10
            }
            break
            case 'ArrowUp':
            if (top.value - 10 >= 0) {
                top.value -= 10
            }
            break
            case 'ArrowDown':
            if (top.value + 10 + ballSize <= containerHeight) {
                top.value += 10
            }
            break
        }
    }
</script>

<template>
  <div class="ballBlock" @keydown="moveBall" tabindex="0">
    <div class="ball" :style="{ left: left + 'px', top: top + 'px' }"></div>
  </div>
  <div>
        <p v-if="props.name != undefined">Name: {{ props.name }}</p>  
        <slot></slot>
  </div>
</template>

<style scoped>
  .ballBlock {
    position: relative;
    width: 1000px;
    height: 800px;
    border: 2px solid black;
  }
  .ball {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    background-color: green;
    border-radius: 50px;
    width: 50px;
    height: 50px; 
  }
</style>
