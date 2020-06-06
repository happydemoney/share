#   算法

##  快速排序

```javascript
/**
 * 分治（双边循环）
 * @param array 待交换的数组
 * @param startIndex 起始下标
 * @param endIndex 结束下标
 */
function partitionTwice (array, startIndex, endIndex) {
  let pivot = array[startIndex]
  let left = startIndex
  let right = endIndex
  while (left !== right) {
    while (left < right && array[right] > pivot) {
      right--
    }
    while (left < right && array[left] <= pivot) {
      left++
    }
    if (left < right) {
      let temp = array[left]
      array[left] = array[right]
      array[right] = temp
    }
  }
  array[startIndex] = array[left]
  array[left] = pivot
  return left
}
// 2. 单边循环法
function partitionOne (array, startIndex, endIndex) {
  let pivot = array[startIndex]
  let mark = startIndex
  // 从mark位置开始遍历
  for (let i = startIndex + 1; i <= endIndex; i++) {
    if (array[i] < pivot) {
      mark++
      let temp = array[i]
      array[i] = array[mark]
      array[mark] = temp
    }
  }
  array[startIndex] = array[mark]
  array[mark] = pivot
  return mark
}
function QuickSort (...args) {
  const array = args[0]
  const startIndex = args[1] || 0
  const endIndex = args[2] || array.length - 1
  if (startIndex >= endIndex) {
    return
  }
  const pivot = partitionTwice(array, startIndex, endIndex)
  if (startIndex < pivot - 1) {
    QuickSort(array, startIndex, pivot - 1)
  }
  if (endIndex > pivot + 1) {
    QuickSort(array, pivot + 1, endIndex)
  }
}
const array = [1,2,4,3,6,5,7,9,8,10]
// const array = [1,3,2,6,4,5,9,8,7]
// const array = [4,4,6,5,3,2,8,1]
QuickSort(array)
console.log(array)
```

