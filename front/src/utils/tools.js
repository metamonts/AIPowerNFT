/**
 * 给数字前缀0补齐
 * num:数字 length:补齐长度，默认长度为3
 * */
export function addZero(num, length=3) {
  return (Array(length).join('0') + num).slice(-length);
}

/**
 * 将数字转化为 k 单位的字符串
 * @param {Number} num
 * @returns {String}
 */
export function toKString(num) {
  if (num < 1000) {
    return num.toString();
  }
  return (num / 1000).toLocaleString('zh-CN', {style: 'currency', currency: 'CNY', minimumFractionDigits:0 }).replace('¥', '') + 'k';
}

/**
 * 计算百分比
 * @param {Number} num
 * @param {Number} total
 * @returns {String}
 */
export function toPercent(num, total) {
  return (Math.round(num / total * 10000) / 100.00 + "%");// 小数点后两位百分比
}
