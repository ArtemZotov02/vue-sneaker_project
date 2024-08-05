<!-- <script setup>
import { ref, watch } from 'vue';
import { state, getUserState, removeUserState } from '@/store';
import Cookies from 'js-cookie';

// Определяем пропсы
const props = defineProps({
  login: String,
  reg: Boolean,
  auth: Boolean,
  failLogin: Boolean,
  failPass: Boolean,
  authorized: String ,
  updateUserState: Function,
  loginUser: Function
});

// Создаем локальные состояния на основе пропсов
const localLogin = ref(props.login);
const localReg = ref(props.reg);
const localAuth = ref(props.auth);
const localFailLogin = ref(props.failLogin);
const localFailPass = ref(props.failPass);
const localAuthorized = ref(props.authorized);

const password = ref('');

// Обновляем локальные переменные, если пропсы изменяются
watch(() => props.login, (newValue) => localLogin.value = newValue);
watch(() => props.reg, (newValue) => localReg.value = newValue);
watch(() => props.auth, (newValue) => localAuth.value = newValue);
watch(() => props.failLogin, (newValue) => localFailLogin.value = newValue);
watch(() => props.failPass, (newValue) => localFailPass.value = newValue);
watch(() => props.authorized, (newValue) => localAuthorized.value = newValue);

const setLogin = (e) => {
  localLogin.value = e.target.value;
  localFailLogin.value = false;
  localFailPass.value = false;
};

const setPassword = (e) => {
  password.value = e.target.value;
  localFailLogin.value = false;
  localFailPass.value = false;
};

const changeAuthToReg = () => {
  localAuth.value = !localAuth.value;
  localReg.value = !localReg.value;
  localFailLogin.value = false;
  localFailPass.value = false;
};

const regUser = () => {
  if (localLogin.value && password.value !== '') {
    if (!Cookies.get(localLogin.value)) {
      Cookies.set(localLogin.value, password.value, { expires: 1 });
      localReg.value = false;
      localAuth.value = true;
    } else {
      localFailLogin.value = true;
    }
  } else {
    localFailPass.value = true;
  }
};

// const loginUser = () => {
//   const userCookie = Cookies.get(localLogin.value);
//   if (userCookie) {
//     if (userCookie === password.value) {
//       localStorage.setItem('login', true);
//       localStorage.setItem('user', localLogin.value);
//       localAuth.value = false;
//       localAuthorized.value = 'true';
//       props.updateUserState();
//       state.profileAvatar = getUserState().profileAvatar;
//     } else {
//       localFailPass.value = true;
//     }
//   } else {
//     localFailLogin.value = true;
//     if (!Cookies.get(localLogin.value)) {
//       removeUserState('', true, localLogin.value);
//       localStorage.removeItem('login');
//       localStorage.removeItem('user');
//     }
//   }
// };
</script>

<template>
  <div v-if="localReg" class="flex flex-col items-center w-[350px] mx-auto p-[20px] pt-[10px] my-[20px]">
    <p class="font-bold mb-[20px] text-blue-800 text-[24px]">Реєстрація</p>
    <input 
      class="rounded-lg w-[300px] px-[10px] py-[5px] border-2" 
      placeholder="Имя"
      @input="setLogin"
    />
    <p v-if="localFailLogin" class="text-red-600">Такий користувач вже зареєстрований</p>
    <input 
      class="rounded-lg w-[300px] px-[10px] py-[5px] mt-[20px] border-2" 
      placeholder="Пароль"  
      @input="setPassword"
    />
    <p v-if="localFailPass" class="text-red-600">Заповніть всі поля</p>
    <button 
      class="mt-[20px] bg-blue-600 w-full rounded-lg p-[10px] font-bold hover:bg-blue-700 text-white"
      @click="regUser"
    >
      Зареєструватись
    </button>
    <p class="mt-[10px] text-center">
      або якщо є обліковий запис, можете 
      <b @click="changeAuthToReg" class="cursor-pointer text-blue-600">
        увійти
      </b>
    </p>
  </div>

  <div v-if="localAuth" class="flex flex-col items-center w-[350px] mx-auto p-[20px] pt-[10px] my-[20px]">
    <p class="font-bold mb-[20px] text-blue-800 text-[24px]">Вхід</p>
    <input 
      class="rounded-lg w-[300px] px-[10px] py-[5px] border-2" 
      placeholder="Имя"
      @input="setLogin"
    />
    <p v-if="localFailLogin" class="text-red-600">Користувач не знайдений</p>
    <input 
      class="rounded-lg w-[300px] px-[10px] py-[5px] my-[20px] border-2" 
      placeholder="Пароль"  
      @input="setPassword"
    />
    <p v-if="localFailPass" class="text-red-600">Невірний пароль</p>
    <button 
      class="bg-blue-600 w-full rounded-lg p-[10px] font-bold hover:bg-blue-700 text-white"
      @click="props.loginUser"
    >
      Увійти
    </button>
    <p class="mt-[10px] text-center">
      або якщо немає облікового запису, можете 
      <b @click="changeAuthToReg" class="cursor-pointer text-blue-600">
        зареєструватися
      </b>
    </p>
  </div>
</template> -->







  
<script setup>
  import { ref } from 'vue';
  import Cookies from 'js-cookie';

  import { getUserState, removeUserState, state } from '@/store';
  
  const emit = defineEmits(['auth']);

  const reg = ref(false);
  const auth = ref(true);
  const login = ref(localStorage.getItem('user') || '');
  const password = ref('');
  const failLogin = ref(false);
  const failPass = ref(false);
  
  const changeAuthToReg = () => {
    auth.value = !auth.value;
    reg.value = !reg.value;
    failLogin.value = false;
    failPass.value = false;
  };
  
  const setLogin = (e) => {
    login.value = e;
    failLogin.value = false;
    failPass.value = false;
  };
  
  const setPassword = (e) => {
    password.value = e;
    failLogin.value = false;
    failPass.value = false;
  };
  
  const regUser = () => {
    if (login.value && password.value !== '') {
      if (!Cookies.get(login.value)) {
        Cookies.set(login.value, password.value, { expires: 1 });
        reg.value = false;
        auth.value = true;
      } else {
        failLogin.value = true;
      }
    } else {
      failPass.value = true;
    }
  };

  const updateUserState = () => {
        state.favourite = getUserState().favourite
        state.productsBasket = getUserState().basket
        state.totalBasket =  (getUserState().basket || []).reduce((total, item) => total + item.price, 0) 
    }
  
  const loginUser = () => {
    const userCookie = Cookies.get(login.value);
    if (userCookie) {
      if (userCookie === password.value) {

        localStorage.setItem('login', true)
        localStorage.setItem('user', login.value)
        auth.value = false
        authorized.value = true
        updateUserState()
        state.profileAvatar = getUserState().profileAvatar
        emit('auth');
      } else {
        failPass.value = true;
      }
    } else {
      failLogin.value = true;
      if (!Cookies.get(login.value)) {
        removeUserState('', true, login.value);
        localStorage.removeItem('login');
        localStorage.removeItem('user');
      }
    }
  };
</script>


<template>
    <div>
      <!-- Регистрация -->
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
          @click="() => regUser()"
        >
          Зареєструватись
        </button>
        <p class="mt-[10px] text-center">
          або якщо є обліковий запис, можете
          <b @click="changeAuthToReg" class="cursor-pointer text-blue-600">
            увійти
          </b>
        </p>
      </div>
  
      <!-- Авторизация -->
      <div v-if="auth" class="flex flex-col items-center w-[350px] mx-auto p-[20px] pt-[10px] my-[20px]">
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
          @click="() => loginUser()"
        >
          Увійти
        </button>
        <p class="mt-[10px] text-center">
          або якщо немає облікового запису, можете
          <b @click="changeAuthToReg" class="cursor-pointer text-blue-600">
            зареєструватися
          </b>
        </p>
      </div>
    </div>
</template>
  