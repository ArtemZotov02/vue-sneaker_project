<script setup>
    import ButtonRed from '@/components/buttonRed/ButtonRed.vue';
    import { removeUserState, setUserState, state, getUserState } from '@/store';
    import { onMounted, ref } from 'vue';

    const props = defineProps({
        login: String
    })

    const showDeleteImgBtn = ref(getUserState().profileAvatar !== '../public/noUser.webp')

    const fileInput = ref(null)

    const triggerFileInput = () => {
        fileInput.value.click();
    }

    const loadAvatar = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
            state.profileAvatar = reader.result;
            setUserState('profileAvatar', reader.result);
            showDeleteImgBtn.value = true
        };
        reader.readAsDataURL(file);
        }
    }

    const deleteAvatar = () => {
        state.profileAvatar = '../../../public/noUser.webp'
        showDeleteImgBtn.value = false
        removeUserState('profileAvatar');
    }

    onMounted(() => {
     
    })
</script>

<template>
    <div class="flex items-center">
      <button class="relative">
        <img :src="state.profileAvatar" alt="Avatar" class="w-24 h-24 rounded-full object-cover"/>
        <input type="file" @change="loadAvatar" accept="image/*" ref="fileInput" class="hidden"/>
        <div @click="triggerFileInput" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full text-white opacity-0 hover:opacity-100 transition duration-300">
          Додати фото
        </div>
      </button>
      <div class="ml-[30px]">
        <p class="font-bold text-xl text-gray-700 mb-[10px] ">Ім'я: {{ props.login }}</p>
        <ButtonRed v-if="showDeleteImgBtn" @click="deleteAvatar" class="text-[10px] py-1 px-3">
          Видалити фото
        </ButtonRed>
      </div>
    </div>
</template>