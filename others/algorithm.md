#   算法

##  快速排序

```javascript
/**
 * 分治（双边循环）
 * @param array 待交换的数组
 * @param startIndex 起始下标
 * @param endIndex 结束下标
 */
function partition (array, startIndex, endIndex) {
    // 取第一个元素作为基准元素
    let pivot = array[startIndex]
    let left = startIndex
    let right = endIndex
    while (left !== right) {
        // 控制right指针向左移
        while (left < right && array[right] > pivot) {
            right--
        }
        // 控制left指针向右移
        while (left < right && array[left] <= pivot) {
            left++
        }
        if (left < right) {
            let temp = array[left]
            array[left] = array[right]
            array[right] = temp
        }
    }
    // pivot和指针重合点交互
    array[startIndex] = array[left]
    array[left] = pivot
    return left
}
function QuickSort (...args) {
    const array = args[0]
    const startIndex = args[1] || 0
    const endIndex = args[2] || array.length - 1
    if (startIndex >= endIndex) {
        return
    }
    const pivotIndex = partition(array, startIndex, endIndex)
    // left loop
    QuickSort(array, startIndex, pivotIndex - 1)
    // right loop
    QuickSort(array, pivotIndex + 1, endIndex)
}
const array = [1,3,2,6,4,5,9,8,7]
QuickSort(array)
console.log(array)
```

