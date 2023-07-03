<template>
    <el-dialog :modelValue="showBox" width="50%" :before-close="handleClose">
        <div class="pay-box">
            <p class="pay-top">Chat GPU Power Rent</p>
            <div class="pay-data">
                <div>
                    <div class="label-box">Power Count：</div>
                    <div><el-input v-model="formData.powerCount" placeholder="Please input" /></div>
                    <div>x1000Tokens</div>
                </div>
                <div>
                    <div class="label-box">Price：</div>
                    <div>{{buyData.Price}} Ether/tokens</div>
                </div>
                <div>
                    <div class="label-box"><el-checkbox v-model="formData.isDiscount" size="large" />ldle Discount：</div>
                    <div>{{buyData.Discount+'%'}}</div>
                </div>
                <div>
                    <div class="label-box">ldle Time：</div>
                    <div>{{buyData.DiscountStartHours+':00'}}-{{buyData.DiscountEndHours+':00'}}</div>
                </div>
                <div>
                    <div class="label-box">Total price</div>
                    <div>{{formData.isDiscount ? (formData.powerCount*buyData.Price*(buyData.Discount/100)).toFixed(2):(formData.powerCount*buyData.Price).toFixed(2)}}  Ether</div>
                </div>
            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="cancel">Cancel</el-button>
                <el-button type="primary" @click="rent">
                    Rent
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup>
import { ref, onMounted, toRefs } from "vue";
import { buyMarketItem} from '@/mock/chain_api.js'

const props = defineProps({
    showBox: {
        type: Boolean,
        default: true,
    },
    buyData:{
        type:Object,
        default:{
            itemId:1,
            Price:0.01,
            DiscountEndHours:'00',
            DiscountStartHours:'00',
            Discount:'100%'
        }
    }
})
const { showBox,buyData } = toRefs(props)
const emits = defineEmits('closeDialog');
const formData = ref({
    isDiscount:false,
    powerCount:1
})
const Hash = ref(null)
const rent = ()=>{
    Hash.value =  buyMarketItem(buyData.itemId,formData.value.powerCount,formData.value.isDiscount);
    emits("closeDialog", Hash.value);
}
const cancel = ()=>{
    emits("closeDialog", "cancel");
}
const handleClose = ()=>{
    emits("closeDialog", "cancel");
}
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