import { MarkItemList, UserAssetList, ChatResult } from './api_data_examples.js';

/**
 * 描述： 返回左上角的钱包地址 Wallet Address
 * 页面： NFT市场， 资产管理， 节点页面
 */
function getWalletAddress() {
    return "0xC88F7666330b4b511358b7742dC2a3234710e7B1";
}

/**
 * 描述： 查询 NFT 市场页面的 正在销售的 NFT 列表
 * 页面： NFT市场
 * @returns:  NFT 列表, 数据格式见 api_data_examples.js中的 MarkItemList 字段
 */
function getMarketItemList() {
    return MarkItemList;
}


/**
 * 描述:  购买市场上的NFT, 用于 Buy窗口
 * 页面： Buy窗口
 * @param {*} itemId: 购买市场上的NFT类型ID
 * @param {*} powerCount:   算力值Power
 * @param {*} isDiscount:  是否打折
 * @returns:   交易的hash, tokenId
 */
function buyMarketItem(itemId, powerCount, isDiscount) {
    return {
        hash: "0x0264a6e3e1396801c7df5bf4ef41e29d9cf8f3a9e1cbf78260a5d2509ffb5d5c",
        tokenId: 98
    }
}


/**
 * 描述： 查询交易哈希的状态, 用于交易 Loading 窗口中的交易状态显示
 * 页面： 交易 Loading 窗口
 * @returns:  交易状态,
 *              "success",  交易成功。
 *              "failed",  交易失败
 *              "pending"， 交易正在处理中，显示loading 图标
 */
function getTransactionStatus(txHash) {
    // "success", "failed", "pending"
    return "success";
}


/**
 * 描述： 返回用户的资产列表(持有的NFT), 用于资产管理页面
 * 页面： 资产管理
 * @param {*} address: 用户的钱包地址
 * @returns:  用户的资产列表, 数据格式见 api_data_examples.js中的 UserAssetList 字段
 */
function getuserAsset(address) {
    return UserAssetList;
}


/**
 * 描述： 用户连接 NFT 算力节点， 将连接状态写入合约， 用于资产管理页面的 Connect 按钮
 * 页面：图片节点页面， Chat节点页面
 * @param {} tokenId 算力NFT的ID
 * @returns 连接的序号
 */
function connect(tokenId) {
    return 98;
}

/**
 * 描述： 用户断开算力 NFT 节点连接， 用户 节点页面的 Discount 按钮
 * 页面：图片节点页面， Chat节点页面
 * @param {*} tokenId 算力NFT的ID
 * @param {int} 连接的序号
 * @returns
 */
function disconnect(tokenId,connectNonce) {
    // TODO
}

/**
 * 描述： 用户查询自己连接的 NFT 的消费信息， 用于 节点页面的状态信息
 * 页面：图片节点页面， Chat节点页面
 * @param {} tokenId 算力NFT的ID
 * @returns
 */
function getConsumeInfo(tokenId) {
    return {
        TokenId: 54,
        Nonece: 98,
        TotalPowerCount: 99999,
        ConsumePower: 3000,
    }
}


/**
 * 描述： 算力 NFT 的 provider 将用户此次连接消费信息更新到合约中，
 * 后台逻辑， 先写在前端页面中。 在后台线程执行。 用户连接后，大约每1分钟消费1%的算力值
 * 页面： 图片节点页面， Chat节点页面 的后台线程
 * @param {*} tokenId 算力NFT的ID
 * @param {*} nonce 连接序号
 * @param {*} powerCount 消费的算力值
 * @returns
 */
function consume(tokenId, nonce, powerCount) {
    return true;
}

export {
    getWalletAddress,
    getMarketItemList,
    buyMarketItem,
    getuserAsset,
    getTransactionStatus,
    connect,
    disconnect,
    consume,
    getConsumeInfo
}
