<template>
    <div class="market-box">
        <div class="market-top">
            <p class="market-address">

                <AddressTag />
            </p>
            <p class="market-title">AI Power NFT Market</p>
        </div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="All" name="first"></el-tab-pane>
            <el-tab-pane label="Image Generation" name="second"></el-tab-pane>
            <el-tab-pane label="Chat" name="third"></el-tab-pane>
        </el-tabs>
        <div class="market-list">
            <div class="market-item" v-for="item in tabList" @click="goDetail(item.AIType,item.ItemId)">
                <!-- {{ item }} -->
                <!-- 雷达 -->
                <radar :dataRader="item.PerformanceRating" :ItemId="item.ItemId" />
                <!-- cpu-list -->
                <div class="cpu-list">
                    <div class="cpu-top">
                        <p>
                            GPU:{{ item.MetaInfo.GPU }}
                        </p>
                        <p>Congest:{{ item.MetaInfo.Congest }}</p>
                    </div>
                    <div class="cpu-bottom">
                        <span>Cpu:{{ item.MetaInfo.CPU }} </span>
                        <span>NetDelay:{{ item.MetaInfo.NetDelay }}</span>
                        <span>Model:{{ item.MetaInfo.Model }} </span>
                    </div>

                </div>
                <!-- 底部数据 -->
                <div class="market-bottom">
                    <p>Price:{{ item.Price }}</p>
                    <el-button type="primary"
                        @click.stop="goBuy(item.ItemId, item.Price, item.DiscountStartHours, item.DiscountEndHours, item.Discount)">purchase</el-button>
                </div>
                <!-- 购买按钮 -->
                <div class="item-type"
                    :class="{ 'chat-type': item.AIType == 'Chat AI Bot', 'img-type': item.AIType == 'Picture Generate' }">{{
                        item.AIType == 'Chat AI Bot' ? 'Chat' : ' Image' }}</div>
            </div>
        </div>
    </div>
    <buy :showBox="showBox" :buyData="buyData" @closeDialog="closeDialog" />
    <payVue :payBox = "payBox" :hash = "hash" :tokenId = "tokenId"/>
</template>
<script setup name="Market">
import { ref, onMounted } from "vue";
import radar from "@/components/radar.vue";
import { getWalletAddress, getMarketItemList } from '@/mock/chain_api.js'
import buy from "./component/buy.vue"
import payVue from "./component/pay.vue";
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
import AddressTag from "@/components/AddressTag.vue";


const activeName = ref('first')
const tabList = ref([])
const showBox = ref(false)
const payBox = ref(false)
const buyData = ref(null)
const hash = ref(null)
const tokenId = ref(null)
const _getMarketItemList = () => {
    var marketList = getMarketItemList();
    console.log("000", marketList)
    if (activeName.value == 'first') {

        tabList.value = marketList;
    } else if (activeName.value == 'second') {
        tabList.value = marketList.filter((item) => {
            return item.AIType == 'Picture Generate';
        })
    } else {
        tabList.value = marketList.filter((item) => {
            return item.AIType == 'Chat AI Bot';
        })
    }
}
const handleClick = (tab, event) => {
    activeName.value = tab.props.name;
    _getMarketItemList()
}
const goBuy = (ItemId, Price, DiscountStartHours, DiscountEndHours, Discount) => {
    showBox.value = true;
    buyData.value = {
        itemId: ItemId,
        Price: Price,
        DiscountStartHours: DiscountStartHours,
        DiscountEndHours: DiscountEndHours,
        Discount: Discount
    }
}
const closeDialog = (val) => {
    showBox.value = false
    if (val == 'cancel') {
        
        
    } else {
        payBox.value = true;
        hash.value = val.hash;
        tokenId.value = val.tokenId
    }
}
const goDetail = (type,id)=>{
    if(type == 'Chat AI Bot'){
        router.push(`chat?tokenId=${id}`);
    }else{
        router.push(`picture?tokenId=${id}`);
    }
}
onMounted(() => {
    _getMarketItemList()
})
</script>
<style lang="scss" scoped>
.market-box {
    width: 1200px;
    margin: 0 auto;

    .market-address {
        text-align: right;
        padding: 15px 0;
    }

    .market-title {
        text-align: center;
    }

    .market-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        .market-item {
            width: 360px;
            border: 1px solid #cccccc;
            margin-right: 28px;
            position: relative;

            .cpu-top,
            .cpu-bottom {
                display: flex;
                justify-content: space-between;
                padding: 0 8px;

                p {
                    font-size: 16px;
                    font-weight: bold;
                }

                span {
                    font-size: 12px;
                }

            }

            .market-bottom {
                border-top: 1px solid #cccccc;
                padding: 10px 8px;
                text-align: center;

                p {
                    padding-bottom: 20px;
                }
            }

            .item-type {
                position: absolute;
                width: 100px;
                height: 30px;
                border: 1px solid #67c23a;
                top: 0px;
                left: 0px;
                text-align: center;
                line-height: 30PX;
                color: #fff;
            }

            .chat-type {
                background: #67c23a;
            }

            .img-type {
                background: #409eff;
            }
        }
    }
}</style>
