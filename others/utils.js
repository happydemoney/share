export function isObject (obj) {
  return obj !== null && (typeof obj === 'object')
}

// 格式化成毫秒
export function formatMs (time) {
  if (typeof time !== 'number') {
    console.warn('时间必须为数字')
    return
  }
  // 毫秒转换成秒 返回
  if (time > 1000) {
    return (time / 1000).toFixed(2) + 's'
  }
  // 默认返回毫秒
  return Math.round(time) + 'ms'
}

export function isImg (param) {
  if (/\.(gif|jpg|jpeg|png|webp|svg)/i.test(param)) {
    return true
  }
  return false
}

export function isJS (param) {
  if (/\.(js)/i.test(param)) {
    return true
  }
  return false
}

export function isCss (param) {
  if (/\.(css)/i.test(param)) {
    return true
  }
  return false
}

export function isVideo (param) {
  if (/\.(mp4|rm|rmvb|mkv|avi|flv|ogv|webm)/i.test(name)) {
    return true
  }
  return false
}
