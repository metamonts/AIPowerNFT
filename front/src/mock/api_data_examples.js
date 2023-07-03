const MarkItemList = [
    {
        "ItemId": "1",          // 销售订单的ID
        "ProviderAddress": "0x58b704065B7aFF3ED351052f8560019E05925023",        // 算力NFT 的节点供应商地址
        "Price": 0.0061,            // 价格
        "Discount": 46,             // 折扣， 46%.
        "DiscountStartHours": 15,   // 打折开始时间
        "DiscountEndHours": 17,        // 打折结束时间
        "AIType": "Picture Generate",   // AI任务的类型
        "MetaInfo": {                   // 要购买的算力 NFT 的元数据信息
            "GPU": "RTX 4090 TI 24GB",
            "CPU": "2 CORE 32GB",
            "Congest": "20%",
            "NetDelay": "24 ms",
            "Model": "GPT4",
        },
        "PerformanceRating": {      // 要购买的算力NFT 的性能指标, 用于雷达图
            "GPU": 100,
            "CPU": 20,
            "Congest": 90,
            "NetDelay": 30,
            "Model": 75,
        }
    },
    {
        "ItemId": "2",
        "ProviderAddress": "0x58b704065B7aFF3ED351052f8560019E05925023",
        "Price": 7.0061,
        "Discount": 75,             // 折扣， 75%.
        "DiscountStartHours": 15,
        "DiscountEndHours": 17,
        "AIType": "Chat AI Bot",
        "MetaInfo": {
            "GPU": "RTX 4090 TI 24GB",
            "CPU": "2 CORE 32GB",
            "Congest": "20%",
            "NetDelay": "24 ms",
            "Model": "GPT4",
        },
        "PerformanceRating": {
            "GPU": 100,
            "CPU": 20,
            "Congest": 90,
            "NetDelay": 30,
            "Model": 75,
        }
    },
];

const UserAssetList = [
    {
        "TokenId": "488",           // NFT的tokenID
        "OwnerAddress": "0xC88F7666330b4b511358b7742dC2a3234710e7B1",   //NFT 的持有者地址
        "ProviderAddress": "0x58b704065B7aFF3ED351052f8560019E05925023",
        "Price": 0.0061,
        "DiscountInfo": {       // 购买的NFT 的折扣信息
            "IsDiscount": true,
            "Discount": 46,             // 折扣， 46%.
            "DiscountStartHours": 15,
            "DiscountEndHours": 17,
        },
        "AIType": "Picture Generate",
        "MetaInfo": {
            "GPU": "RTX 4090 TI 24GB",
            "CPU": "2 CORE 32GB",
            "Congest": "20%",
            "NetDelay": "24 ms",
            "Model": "GPT4",
        },
        "PerformanceRating": {
            "GPU": 100,
            "CPU": 20,
            "Congest": 90,
            "NetDelay": 30,
            "Model": 75,
        },
        "Status": {         // 算力NFT 的算力的当前消费情况
            "PowerCount": 5813000,
            "ConsumePowerCount": 423434,
            "Connected": false,         // 当前是否连接节点
            "Saling": true,             // 是否 Slaing
        }
    },
    {
        "TokenId": "365",
        "OwnerAddress": "0xC88F7666330b4b511358b7742dC2a3234710e7B1",
        "ProviderAddress": "0x58b704065B7aFF3ED351052f8560019E05925023",
        "Price": 7.0061,
        "DiscountInfo": {
            "IsDiscount": false
        },
        "AIType": "Chat AI Bot",
        "MetaInfo": {
            "GPU": "RTX 4090 TI 24GB",
            "CPU": "2 CORE 32GB",
            "Congest": "20%",
            "NetDelay": "24 ms",
            "Model": "GPT4",
        },
        "PerformanceRating": {
            "GPU": 100,
            "CPU": 20,
            "Congest": 90,
            "NetDelay": 30,
            "Model": 75,
        },
        "Status": {
            "PowerCount": 5813000,
            "ConsumePowerCount": 423434,
            "Connected": true,
            "Saling": false,
        }
    },
];


// 聊天结果信息
const ChatResult = {
    "Result": "Etherscan is a block explorer and analytics platform for Ethereum. The company's platform operates independently of the blockchain and the transactions on the blockchain. Etherscan is developed to give users an equitable way to access blockchain data, with transparent and accessible results. The platform allows users to search through transactions, blocks, wallet addresses, and smart contracts, amongst other on-chain data and is a free-to-use block explorer. In this way, Etherscan acts like a search engine for the Ethereum blockchain in which a user can use a transaction hash to check all related activity. Etherscan was built and launched in 2015 by CEO and founder Matthew Tan with the mission to provide equitable access to blockchain data."
}

export {
    MarkItemList,
    UserAssetList,
    ChatResult,
}
