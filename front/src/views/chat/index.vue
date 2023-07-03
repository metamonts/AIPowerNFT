<template>
    <div class="h-screen w-screen flex flex-col">
        <AddressTag/>
        <!--顶部信息-->
        <div class="flex border-b h-20 items-center">
            <div class="py-4 px-8 border-r border-[#dcdfe6]">
                Chat AI
            </div>
            <div class="mx-4">
                AI Power #{{ id }}
            </div>
            <div class="flex items-center">
                <div class="mr-4">
                    <p>Total Power Count: {{ toKString(item.Status.PowerCount) }}</p>
                    <p>Consume Power: {{ toKString(item.Status.ConsumePowerCount) }}, {{ toPercent(item.Status.ConsumePowerCount, item.Status.PowerCount) }}</p>
                </div>
                <div>
                    <el-button>Disconnect</el-button>
                </div>
            </div>
        </div>

        <div class="content w-[960px] flex-1 flex mt-4 mx-auto border">
            <div class="w-40 border-r bg-white">
                <el-button class="w-full" type="danger" @click="onClear">Clear</el-button>
            </div>
            <div class="flex-1 flex flex-col p-4 bg-[#f6f7f9]">
                <el-scrollbar class="flex-1 mb-2 p-2" ref="scrollbarRef">
                    <!--用户-->
                    <div class="flex p-2" :class="item.type === 'ai' && ' rounded-md bg-white'" v-for="(item, index) in chatList"  :key="index">
                        <el-avatar class="w-8 h-8 rounded-full mr-1">{{ item.type === 'user' ? 'user' : 'AI' }}</el-avatar>
                        <div class="flex-1 break-all pt-1">
                            <p class="px-1">{{ item.content }}</p>
                        </div>
                    </div>
                </el-scrollbar>
                <div class="flex items-end">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" resize="none"
                              placeholder="请输入内容" v-model="input"></el-input>
                    <el-button class="w-24 ml-1" type="primary" @click="onSubmit">Send</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup name="Chat">
import { useRoute, useRouter } from 'vue-router'
import AddressTag from '@/components/AddressTag.vue'
import { getuserAsset } from '@/mock/chain_api.js'
import { toKString, toPercent } from '@/utils/tools.js'
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()

const id = route.query.tokenId
const userAsset = getuserAsset()
const item = userAsset.find(item => item.TokenId === id)


const scrollbarRef = ref(null)

const input = ref('')
const chatList = ref([
    {
        type: 'user',
        content: '你好'
    },
    {
        type: 'ai',
        content: '你好'
    }
])

const onSubmit = () => {
    chatList.value.push({
        type: 'user',
        content: input.value
    })
    input.value = ''

}

const onClear = () => {
    chatList.value = []
}


</script>
<style lang="scss" scoped>
.content {
  //height: calc(100% - 4rem);
}
</style>
