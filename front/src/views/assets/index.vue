<template>
    <div class="h-screen w-screen flex">
        <AddressTag/>
        <div class="m-auto w-[1200px] mt-16 min-h-[50%] flex">
            <!--资产列表-->
            <div class="w-72 border-[#e5e7eb] m-12 text-center relative" v-for="item in userAsset" :key="item.TokenId">
                <!--左边状态-->
                <el-tag class="absolute top-0 left-0 -translate-x-1/2	-translate-y-1/2" v-if="item.AIType === 'Picture Generate'">图片生成 AI</el-tag>
                <el-tag class="absolute top-0 left-0 -translate-x-1/2	-translate-y-1/2" type="success" v-if="item.AIType === 'Chat AI Bot'">聊天 AI</el-tag>

                <!--右边状态-->
                <el-tag class="absolute top-0 right-0 translate-x-1/2	-translate-y-1/2" type="info" v-if="item.Status.Connected">Connecting</el-tag>
                <el-tag class="absolute top-0 right-0 translate-x-1/2	-translate-y-1/2" type="info" v-if="item.Status.Saling">Saling</el-tag>

                <div class="border pb-2">
                    <div class="border-b pb-2">
                        <div class="h-72">
                            <Radar :dataRader="item.PerformanceRating" :ItemId="item.TokenId" :width="'100%'" :height="'100%'"/>
                        </div>
                        <div class="text-2xl my-1">
                            {{ item.MetaInfo.GPU }}
                        </div>
                        <div>
                            {{ item.MetaInfo.CPU }}
                        </div>
                    </div>

                    <div class="pt-2">
                        <div class="my-1">Rent Price: {{ item.Price }} Ether/Hour</div>
                        <div class="my-1">Rent Power Count: {{ toKString(item.Status.PowerCount) }}</div>
                        <div class="my-1">Consume Power: {{ toKString(item.Status.ConsumePowerCount) }}, {{ toPercent(item.Status.ConsumePowerCount, item.Status.PowerCount) }}</div>
                        <div>
                            <el-button type="primary" @click="returnPage(item)">Connect</el-button>
                            <el-button>Sale</el-button>
                        </div>
                    </div>
                </div>

                <div class="leading-8">AI Power #{{ item.TokenId }}</div>
            </div>
        </div>
    </div>
</template>
<script setup name="Assets">
import AddressTag from '@/components/AddressTag.vue'
import { toKString, toPercent } from '@/utils/tools.js'
import { connect, getuserAsset } from '@/mock/chain_api.js'
import { useRouter } from 'vue-router'
import Radar from "@/components/radar.vue";


const userAsset = getuserAsset()

const router = useRouter()

const returnPage = (item) => {
  const connectNonce = connect(item.TokenId)

  if (item.AIType === 'Picture Generate') {
    router.push({
      path: '/picture',
      query: {
        tokenId: item.TokenId,
        nonce: connectNonce
      }
    })
  } else if (item.AIType === 'Chat AI Bot') {
    router.push({
      path: '/chat',
      query: {
        tokenId: item.TokenId,
        nonce: connectNonce
      }
    })
  }
}
</script>
<style lang="scss" scoped></style>
