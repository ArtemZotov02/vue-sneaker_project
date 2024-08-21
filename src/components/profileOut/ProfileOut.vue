<script setup>
    import ButtonRed from '@/components/buttonRed/ButtonRed.vue';
    import { state } from '@/store';
    import Cookies from 'js-cookie';

    const props = defineProps({
        updateUserState: Function
    })
    const emit = defineEmits([
        'update:auth', 
        'update:authorized'
    ]);


  const userOut = () => {
    emit('update:auth', true);
    emit('update:authorized', false);
    localStorage.removeItem('login');
    localStorage.removeItem('user');
    props.updateUserState();
  };
  
  const deleteAcc = () => {
    Cookies.remove(localStorage.getItem('user'));
    localStorage.removeItem(`userData_${localStorage.getItem('user')}`);
    state.profileAvatar = '../../../public/noUser.webp';
    userOut();
  };
</script>


<template>
    <div class="flex flex-col items-center justify-start">
        <ButtonRed class="mb-[10px] px-3 py-1 text-[14px]" @click="userOut">
          Вийти
        </ButtonRed>
        <ButtonRed @click="deleteAcc" class="px-3 py-1 text-[14px]">
          Видалити аккаунт
        </ButtonRed>
    </div>
</template>