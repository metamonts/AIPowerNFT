import { post } from './index'

export const _getNFTAsset = (data) => post('/account_asset/find_nft_items', data) // 查询账户持有的NFT资产
export const _getDepositWithdrawHistory = (data) => post('/account_asset/deposit_withdraw_history', data) // 查询nft的充币和提币记录
export const _withdrawNFT = (data) => post('/account_asset/withdraw_nft', data) // 将 NFT 资产提取到链上
export const _depositNFT = (data) => post('/account_asset/deposit_nft', data) // 将 NFT 资产转入平台中
export const _getDepositAddress = (data) => post('/account_asset/get_deposit_address', data) // 获取充币的转账地址


