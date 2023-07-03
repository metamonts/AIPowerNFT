<script setup>
import { getWalletAddress } from '@/mock/chain_api.js'

const walletAddress = () => {
  // 地址取前后 4 位，中间用 4 个*代替
  const address = getWalletAddress()
  return `${address.slice(0, 4)}****${address.slice(-4)}`
}
</script>

<template>
  <div class="absolute top-4 right-4 inline-block px-4 py-2  bg-[#3396ff] text-white text-base font-bold rounded-md">
      Wallet Address: {{ walletAddress() }}
  </div>
</template>

<style scoped lang="scss">

</style>
