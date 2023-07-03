<template>
    <el-dialog :modelValue="payBox" width="50%" :before-close="rent">
        <div class="pay-box">
            <p class="pay-top">Transaction {{status}}</p> 
            <div class="pay-ok-msg">
                <p>交易Hash:{{ hash }}</p>
                <p v-if="status == 'success'">tokenID All Power #{{ tokenId }}</p>
            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="rent" v-if="status == 'success'">
                    confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup>
import { ref, onMounted, toRefs } from "vue";
import { getTransactionStatus} from '@/mock/chain_api.js'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()


const props = defineProps({
    payBox: {
        type: Boolean,
        default: false,
    },
    hash:{
        type: String,
        default: '',
    },
    tokenId:{
        type: Number,
        default: 1,
    }
    
})

const { payBox ,hash,tokenId} = toRefs(props)
const emits = defineEmits('closePay');
const rent = ()=>{
    router.push("assets");
}
const status = ref('pending');
const getStatus = (hash)=>{
    status.value = getTransactionStatus();
}
onMounted(()=>{
})
watch(hash, (newValue, oldValue) => {
    if(newValue){
        getStatus()
    }
    
});
</script>
<style lang="scss" scoped>
.pay-box {
    .pay-top {
        text-align: center;
        margin-bottom: 10px;
    }

    .pay-data > div{
        .label-box{
            width:118px;
        }
        display: flex;
        margin-bottom: 4px;
        height: 40px;
        line-height: 40px;
    }
}
</style>