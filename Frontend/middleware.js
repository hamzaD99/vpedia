import store from "@/store/store";

export function isLoggedin({to, from, next}) {
    if(!store.getters.token) next('/login')
    next();
}

export function isAdmin({to, from, next}) {
    if(store.getters.token && store.getters.user && store.getters.user.roleId == 7) next();
    next('/');
}

export function isGuest({to, from, next}) {
    if(store.getters.token) next('/')
    next();
}