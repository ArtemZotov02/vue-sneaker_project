<script setup>
  import { ref } from 'vue';
  import Cookies from 'js-cookie';
  import { state, getUserState, removeUserState } from '@/store';
  
  const props = defineProps([
    'auth', 
    'login',
    'authorized',
    'updateUserState'
  ]);
  const emit = defineEmits([
    'update:auth',
    'update:login',
    'update:authorized'
  ]);
  
  const reg = ref(false);
  const password = ref('');
  
  const failLogin = ref(false);
  const failPass = ref(false);
  
  const changeAuthToReg = () => {
    reg.value = !reg.value;
    failLogin.value = false; 
    failPass.value = false;
  };
  
  const setLogin = (e) => {
    emit('update:login', e);
    failLogin.value = false;
    failPass.value = false;
  };
  
  const setPassword = (e) => {
    password.value = e;
    failLogin.value = false;
    failPass.value = false;
  };
  
  const regUser = () => {
    if (props.login && password.value !== '') {
      if (!Cookies.get(props.login)) {
        Cookies.set(props.login, password.value, { expires: 1 });
        reg.value = false;
        emit('update:auth', true);
      } else {
        failLogin.value = true;
      }
    } else {
      failPass.value = true;
    }
  };
  
  const loginUser = () => {
    const userCookie = Cookies.get(props.login);
    if (userCookie) {
      if (userCookie === password.value) {
        localStorage.setItem('login', 'true');
        localStorage.setItem('user', props.login);
        emit('update:auth', false);
        emit('update:authorized', true);
        props.updateUserState();
        state.profileAvatar = getUserState().profileAvatar
      } else {
        failPass.value = true;
      }
    } else {
        failLogin.value = true
            if(!Cookies.get(props.login)) {
                removeUserState('', true, props.login)
                localStorage.removeItem('login')
                localStorage.removeItem('user')
            }
    }
  };

  
</script>
  


<template>
    <div v-if="reg" class="flex flex-col items-center w-[350px] mx-auto p-[20px] pt-[10px] my-[20px]">
      <p class="font-bold mb-[20px] text-blue-800 text-[24px]">Реєстрація</p>
      <input 
        class="rounded-lg w-[300px] px-[10px] py-[5px] border-2" 
        placeholder="Имя"
        @input="(e) => setLogin(e.target.value)"
      />
      <p v-if="failLogin" class="text-red-600">Такий користувач вже зареєстрований</p>
      <input 
        class="rounded-lg w-[300px] px-[10px] py-[5px] mt-[20px] border-2" 
        placeholder="Пароль"  
        @input="(e) => setPassword(e.target.value)"
      />
      <p v-if="failPass" class="text-red-600">Заповніть всі поля</p>
      <button 
        class="mt-[20px] bg-blue-600 w-full rounded-lg p-[10px] font-bold hover:bg-blue-700 text-white"
        @click="regUser"
      >Зареєструватись</button>
      <p class="mt-[10px] text-center">
        або якщо є обліковий запис, можете 
        <b @click="changeAuthToReg" class="cursor-pointer text-blue-600">
          увійти
        </b>
      </p>
    </div>
  
    <div v-if="!reg" class="flex flex-col items-center w-[350px] mx-auto p-[20px] pt-[10px] my-[20px]">
      <p class="font-bold mb-[20px] text-blue-800 text-[24px]">Вхід</p>
      <input 
        class="rounded-lg w-[300px] px-[10px] py-[5px] border-2" 
        placeholder="Имя"
        @input="(e) => setLogin(e.target.value)"
      />
      <p v-if="failLogin" class="text-red-600">Користувач не знайдений</p>
      <input 
        class="rounded-lg w-[300px] px-[10px] py-[5px] my-[20px] border-2" 
        placeholder="Пароль"  
        @input="(e) => setPassword(e.target.value)"
      />
      <p v-if="failPass" class="text-red-600">Невірний пароль</p>
      <button 
        class="bg-blue-600 w-full rounded-lg p-[10px] font-bold hover:bg-blue-700 text-white"
        @click="loginUser"
      >Увійти</button>
      <p class="mt-[10px] text-center">
        або якщо немає облікового запису, можете 
        <b @click="changeAuthToReg" class="cursor-pointer text-blue-600">
          зареєструватися
        </b>
      </p>
    </div>
  </template>
  
