<script setup>
import { onMounted, reactive, ref } from 'vue';
import Cookies from 'js-cookie';
import { getUserState, removeUserState, setUserState, state } from '@/store';
import ButtonRed from '@/components/buttonRed/ButtonRed.vue';


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
                state.profileAvatar = getUserState().profileAvatar
            } else {
                failPass.value = true
            }
        } else {
            failLogin.value = true
            if(!Cookies.get(login.value)) {
                removeUserState('', true, login.value)
                localStorage.removeItem('login')
                localStorage.removeItem('user')
            }
        }
    }





    const userOut = () => {
        authorized.value = false 
        auth.value = true
        localStorage.removeItem('login')    
        localStorage.removeItem('user')
        updateUserState()
    }

    const deleteAcc = () => {
        Cookies.remove(localStorage.getItem('user'))
        localStorage.removeItem(`userData_${localStorage.getItem('user')}`)
        state.profileAvatar = state.profileAvatar
        userOut()
    }

    const fileInput = ref(null);

    const triggerFileInput = () => {
        fileInput.value.click();
    };

    const loadAvatar = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onload = () => {
                state.profileAvatar = reader.result
                setUserState('profileAvatar', reader.result)
            }
            reader.readAsDataURL(file)
        } 
    }

    const deleteAvatar = () => {
        removeUserState('profileAvatar')
        state.profileAvatar = '../../../public/noUser.webp'
    }
  
    onMounted(()=> {
        if(localStorage.getItem('login')) {
            auth.value = false
        }

    })


</script>


<template>
        <div v-if="reg" class="flex flex-col items-center w-[350px] mx-auto p-[20px] pt-[10px] my-[20px]">
            <p class="font-bold mb-[20px] text-blue-800 text-[24px]">Реєстрація</p>
            <input 
                class="rounded-lg w-[300px] px-[10px] py-[5px] border-2" 
                placeholder="Имя"
                @input="(e)=> setLogin(e.target.value)"
            />
            <p v-if="failLogin" class="text-red-600">Такий користувач вже зареєстрований</p>
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
            <div class="mt-[30px]  flex justify-between items-center bg-gray-100 p-6 rounded-lg shadow-md">
                <div class="flex flex-col h-[600px]  bg-white p-6 shadow-lg rounded-lg w-[500px]">
                    <div class="flex items-center">
                        <button class="relative">
                            <img :src="state.profileAvatar" alt="Avatar" class="w-24 h-24 rounded-full object-cover"/>
                            <input type="file" @change="loadAvatar" accept="image/*" ref="fileInput" class="hidden"/>
                            <div @click="triggerFileInput" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full text-white opacity-0 hover:opacity-100 transition duration-300">
                                Додати фото
                            </div>
                        </button>
                        <div class="ml-[30px]">
                            <p class="font-bold text-xl text-gray-700 mb-[10px] ">Ім'я: {{ login }}</p>
                            <ButtonRed v-if="state.profileAvatar !== '../public/noUser.webp'" @click="deleteAvatar" class="text-[10px] py-1 px-3">
                                Видалити фото
                            </ButtonRed>
                        </div>
                    </div>
                    
                </div>
                
                <div class="flex flex-col items-center">
                    <ButtonRed class="mb-[10px] px-3 py-1" @click="userOut">
                        Вийти
                    </ButtonRed>
                    <ButtonRed @click="deleteAcc" class="px-3 py-1">
                        Видалити аккаунт
                    </ButtonRed>
                </div>
              
            </div>
        </div>

</template>







  
 


