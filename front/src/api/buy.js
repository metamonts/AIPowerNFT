import { post } from './index'

export const _getOrderList = (data) => post('/market/find_nft_blindbox_sale_orders', data) // 获取在售的新品订单
export const _addCart = (data) => post('/shoppingcart/add_shipping_cart', data) //加入购物车
export const _cardList = (data) => post('/shoppingcart/all_saleorder_list', data) //购物车的新品列表
export const _buyOrder = (data) => post('/shoppingcart/create_buy_order', data) //购买
export const _payOrder = (data) => post('/shoppingcart/pay_buy_order', data) //支付
export const _orderDetail = (data) => post('/shoppingcart/get_buy_order_detail', data) //获取订单详情
export const _openBlindbox = (data) => post('/market/open_blindbox', data) //打开盲盒