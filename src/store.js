import { reactive } from 'vue';
//
const getUserState = () => {
  const user = localStorage.getItem('user')
  const {basket = [], favourite = [], profileAvatar = '../public/noUser.webp'} = JSON.parse(localStorage.getItem(`userData_${user}`) || '{}')
  return {basket, favourite, profileAvatar}
}

const setUserState = (key, data ) => {
  const user = localStorage.getItem('user')
  const obj = JSON.parse(localStorage.getItem(`userData_${user}`) || '{}')
  obj[key] = data

  localStorage.setItem(`userData_${user}`, JSON.stringify(obj))
}

const removeUserState = (key, bool=false, userName = '') => {
  const user =  userName || localStorage.getItem('user')
  const obj = JSON.parse(localStorage.getItem(`userData_${user}`) || '{}')
  
  if(!bool) {
    delete obj[key]
    localStorage.setItem(`userData_${user}`, JSON.stringify(obj))
  } else {
    localStorage.removeItem(`userData_${user}`)
  }
}
//
const state = reactive({
  isFavorite: {},
  productsBasket: getUserState().basket,
  favourite: getUserState().favourite,
  profileAvatar: getUserState().profileAvatar,
  totalBasket: 0,
  order: []
});
//
function addInFavorite(name, price, img, id) {    
  const index = state.favourite.findIndex(item => item.id === id)

  if (index === -1) {
    state.favourite.push({
      name: name,
      price: price,
      img: img,
      id: id
    })
    setUserState('favourite', state.favourite)  
  } else {
    state.favourite.splice(index, 1)
    setUserState('favourite', state.favourite)  
  }
}

function addInBasket(e) {
    state.productsBasket.push({
      name: e.name,
      price: e.price,
      img: e.img,
      id: e.id
    });
    state.totalBasket += e.price;
    setUserState('basket', state.productsBasket)  
}


export { state, addInFavorite, addInBasket, getUserState, setUserState, removeUserState};