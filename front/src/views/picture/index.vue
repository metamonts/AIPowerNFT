<template>
    <div>
        <AddressTag />
        <div class="pictore-box">
            <div class="pictore-msg" v-if="detailMsg">
                <p> AI Power #{{detailMsg.TokenId}}</p>
                <p> Total Power Count:{{detailMsg.ConsumePower}}</p>
                <p> Consume Power:{{detailMsg.TotalPowerCount}} ,{{detailMsg.Nonece}}% <el-button @click="disFun">Disconnect</el-button></p>
                
            </div>
            <div class="form-box">
                <iframe src="http://10.10.72.128:7860" frameborder="0" width="1200px" height="700px"></iframe>
            </div>
        </div>
    </div>
</template>
<script setup name="Picture">
import { ref, onMounted } from "vue";
import AddressTag from "@/components/AddressTag.vue";
import { disconnect,getConsumeInfo } from '@/mock/chain_api.js'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()

const detailMsg = ref(null)
const tokenID = ref(route.query.tokenId);
const getDetail = ()=>{
    detailMsg.value = getConsumeInfo(tokenID.value)
}
const disFun = ()=>{
    disconnect(tokenID.value)
    router.push("market");
}
onMounted(()=>{
    getDetail()
})
</script>
<style lang="scss" scoped>
.pictore-box{
    width:1200px;
    margin:60px auto;
    .form-box{
        border-top:1px solid #cccccc;
        margin-top:30px
    }
}
</style>
