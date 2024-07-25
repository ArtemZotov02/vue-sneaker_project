<script setup>
import { onMounted, reactive, ref } from 'vue';
import Cookies from 'js-cookie';
import { getUserState, state } from '@/store';


    const reg = ref(false)
    const auth = ref(true)

    const login = ref(localStorage.getItem('user') || '')
    const password = ref('')

    const failLogin = ref(false)
    const failPass= ref(false)

    const authorized = ref(localStorage.getItem('login') || false)

    const changeAuthToReg = () => {
        auth.value = !auth.value
        reg.value = !reg.value
        failLogin.value = false
        failPass.value = false 
    }

    const setLogin = (e) => {
        login.value = e
        failLogin.value = false
        failPass.value = false
    }
    const setPassword = (e) => {
        password.value = e 
        failLogin.value = false
        failPass.value = false 
    }


    const regUser = (e) => {
        if (login.value && password.value != '') {
            if(!Cookies.get(login.value)) {
                Cookies.set(login.value, password.value, { expires: 1 })
                reg.value = false
                auth.value = true
            } else {
                failLogin.value = true
            }  
        } else {
            failPass.value = true
        }
    }

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
            } else {
                failPass.value = true
            }
        } else {
            failLogin.value = true
        }
    }

    const userOut = () => {
        authorized.value = false 
        auth.value = true
        localStorage.removeItem('login')
        localStorage.removeItem('user')
        updateUserState()
        // state.favourite = JSON.parse(localStorage.getItem(`favourite_${localStorage.getItem('user')}`) || '[]')
        // state.productsBasket = JSON.parse(localStorage.getItem(`basket_${localStorage.getItem('user')}`) || '[]')
        // state.totalBasket = JSON.parse(localStorage.getItem(`basket_${localStorage.getItem('user')}`) || '[]').reduce((total, item) => total + item.price, 0) 
    }
    onMounted(()=> {
        if(localStorage.getItem('login') === 'true') {
            auth.value = false
        }

    })


</script>


<template>
    <div>
        <div v-if="reg" class="flex flex-col items-center w-[350px] mx-auto p-[20px] pt-[10px] my-[20px]">
            <p class="font-bold mb-[20px] text-blue-800 text-[24px]">Реєстрація</p>
            <input 
                class="rounded-lg w-[300px] px-[10px] py-[5px] border-2" 
                placeholder="Имя"
                @input="(e)=> setLogin(e.target.value)"
            />
            <p v-if="failLogin" class="text-red-600">Такий користувач вже зареєстровано</p>
            <input 
                class="rounded-lg w-[300px] px-[10px] py-[5px] mt-[20px] border-2" 
                placeholder="Пароль"  
                @input="(e)=> setPassword(e.target.value)"
            />
            <p v-if="failPass" class="text-red-600">Заповніть всі поля</p>
            <button 
                class="mt-[20px] bg-blue-600 w-full rounded-lg p-[10px] font-bold hover:bg-blue-700 text-white"
                @click="() => regUser()"
            >Зареєструватись</button>
            <p class="mt-[10px] text-center">
                або якщо є обліковий запис, можете 
                <b @click="changeAuthToReg" class="cursor-pointer text-blue-600">
                    увійти
                </b>
            </p>
        </div>

        <div v-if="auth" class="flex flex-col items-center w-[350px] mx-auto p-[20px] pt-[10px] my-[20px]">
            <p class="font-bold mb-[20px] text-blue-800 text-[24px]">Вхід</p>
            <input 
                class="rounded-lg w-[300px] px-[10px] py-[5px] border-2" 
                placeholder="Имя"
                @input="(e)=> setLogin(e.target.value)"
            />
            <p v-if="failLogin" class="text-red-600">Користувач не знайдений</p>
            <input 
                class="rounded-lg w-[300px] px-[10px] py-[5px] my-[20px] border-2" 
                placeholder="Пароль"  
                @input="(e)=> setPassword(e.target.value)"
            />
            <p v-if="failPass" class="text-red-600">Невірний пароль</p>
            <button 
                class="bg-blue-600 w-full rounded-lg p-[10px] font-bold hover:bg-blue-700 text-white"
                @click="() => loginUser()"
            >Увійти</button>
            <p class="mt-[10px] text-center">
                або якщо немає облікового запису, можете 
                <b @click="changeAuthToReg" class="cursor-pointer text-blue-600">
                    зареєструватися
                </b>
            </p>
        </div>

        <div v-if="authorized">
            <div class="my-[20px] flex justify-between">
                <div>
                    <p class="font-bold text-[20px]">Ім'я: {{ login }}</p>
                </div>
                <div>
                    <button class="px-[20px] py-[10px] bg-red-500 text-white rounded-lg" @click="userOut">Вийти</button>
                </div>
            </div>
        </div>
    </div>
</template>