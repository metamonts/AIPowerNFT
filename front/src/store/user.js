import { defineStore } from "pinia";
export const useUserStore = defineStore({
    id: 'user',//id必填，且唯一
    state: () => {
        return {
            id: null,
            token: null,
            name: null,//用户昵称
            logoUrl: null,//用户头像
            email: null,//邮箱
            phone: null,//手机号
            emailDoubleCheck: null,//邮箱是否双重验证
            phoneDoubleCheck: null,//手机号是否双重验证
        }
    },
    getters: {
        getToken: state => state.token,
        getUserInfo: state => {
            return {
                id: state.id,
                token: state.token,
                name: state.name,
                logoUrl: state.logoUrl,
                email: state.email,
                phone: state.phone,
                emailDoubleCheck: state.emailDoubleCheck,
                phoneDoubleCheck: state.phoneDoubleCheck
            }
        },
        getLoginStatus: state => !!state.token,
    },
    actions: {
        setUserInfo(userInfo) {
            const { id, token, name, logoUrl, email, phone, emailDoubleCheck, phoneDoubleCheck } = userInfo
            this.id = id
            token ? this.token = token : ''
            this.name = name
            this.logoUrl = logoUrl
            this.email = email
            this.phone = phone
            this.emailDoubleCheck = emailDoubleCheck
            this.phoneDoubleCheck = phoneDoubleCheck
        },
        removeUserInfo() {
            this.id = null
            this.token = null
            this.name = null
            this.logoUrl = null
            this.email = null
            this.phone = null
            this.emailDoubleCheck = null
            this.phoneDoubleCheck = null
        },
        removeToken() {
            this.token = ''
        },
    },
    // 开启数据缓存
    persist: {
        enabled: true,
        strategies: [
            {
                storage: localStorage,
            }
        ]
    }
})
