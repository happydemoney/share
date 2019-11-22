import {
  formatMs,
  isObject
} from './utils'

function MyPerformance () {}

MyPerformance.prototype = {
  init: function () {
    // 监控history基础上实现的单页路由中url的变化
    const _wr = function (type) {
      const orig = window.history[type]
      return function () {
        const rv = orig.apply(this, arguments)
        const e = new Event(type)
        e.arguments = arguments
        window.dispatchEvent(e)
        return rv
      }
    }
    const interval = setInterval(() => {
      if (document.readyState === 'complete') {
        this.getPerformanceTiming()
        clearInterval(interval)
      }
    }, 2000)
    window.history.pushState = _wr('pushState')
    // window.history.replaceState = _wr('replaceState')
    // window.addEventListener('replaceState', (e) => {
    //   console.log('replaceState')
    // })
    window.addEventListener('pushState', (e) => {
      // ...deal with something
      const interval = setInterval(() => {
        if (document.readyState === 'complete') {
          console.clear()
          this.getEnteriesTime()
          clearInterval(interval)
        }
      }, 1000)
    })
  },
  // 获取数据信息
  getPerformanceTiming: function () {
    this.timing = window.performance.timing
    // 获取资源类型为 resource的所有数据
    // this.enteriesResouceData = window.performance.getEntriesByType('resource')
    if (!isObject(this.timing)) {
      console.log('值需要是一个对象类型')
      return
    }
    // 获取解析后的数据
    this.afterDatas.timingFormat = this._setTiming()
    console.clear()
    this._showTiming()
    this.getEnteriesTime()
  },
  getEnteriesTime () {
    this.afterDatas.enteriesResouceDataFormat = this._setEnteries()
    this._showResouce()
  },
  // 保存原始数据
  timing: {},
  // 原始enteries数据
  // enteriesResouceData: [],
  // 保存解析后的数据
  afterDatas: {
    timingFormat: {},
    enteriesResouceDataFormat: {},
    enteriesResouceDataTiming: {
      'navigation': 0,
      'script': 0,
      'css': 0,
      'fetch': 0,
      'xmlhttprequest': 0,
      // 'link': 0,
      'img': 0
    }
  },
  _setTiming: function () {
    const timing = this.timing
    const data = {
      '重定向耗时': formatMs(timing.redirectEnd - timing.redirectStart),
      'AppCache耗时': formatMs(timing.domainLookupStart - timing.fetchStart), // DNS 缓存时间
      'DNS查询耗时': formatMs(timing.domainLookupEnd - timing.domainLookupStart),
      'TCP连接耗时': formatMs(timing.connectEnd - timing.connectStart),
      'HTTP请求耗时': formatMs(timing.responseEnd - timing.responseStart), // request请求耗时
      '请求完毕到DOM加载耗时': formatMs(timing.domInteractive - timing.responseEnd),
      // '解析DOM树耗时': formatMs(timing.domComplete - timing.domInteractive),
      '首字节等待时长': formatMs(timing.responseStart - timing.navigationStart), // Time to first Byte, TTFB - 用于衡量网络链路和服务器响应性能
      '白屏时间耗时': formatMs(timing.domLoading - timing.fetchStart),
      // '卸载页面的时间': formatMs(timing.unloadEventEnd - timing.unloadEventStart),
      '用户可交互时间': formatMs(timing.domContentLoadedEventEnd - timing.navigationStart),
      // 'domReadyTime': formatMs(timing.domContentLoadedEventEnd - timing.fetchStart),
      // 'load事件耗时': formatMs(timing.loadEventEnd - timing.loadEventStart),
      '*页面加载时长': formatMs(timing.loadEventEnd - timing.navigationStart) // Page Load Time
      // 首次渲染时长 - First Paint
      // 首次内容渲染时长 - First Contentful Paint
      // 首次有效渲染时长 - First Meaningful Paint
      // 开始渲染 - Start Render
      // Speed Index
      // 首次CPU空闲时长 - First CPU Idle
      // Time to interactive
      // Max Potential First Input Delay
    }
    // paint about
    const paintMetrics = performance.getEntriesByType('paint')
    if (paintMetrics !== undefined && paintMetrics.length > 0) {
      paintMetrics.forEach((paintMetric) => {
        // console.log(`${paintMetric.name}: ${paintMetric.startTime}`)
        data[paintMetric.name] = formatMs(paintMetric.startTime)
      })
    }
    return data
  },
  _setEnteries: function () {
    // const enteriesResouceData = window.performance.getEntriesByType('resource')
    // const resourceTypeList = ['navigation', 'script', 'css', 'fetch', 'xmlhttprequest', 'link', 'img']
    const enteriesResouceData = window.performance.getEntries()
    const navigationArrs = []
    const scriptArrs = []
    const cssArrs = []
    const fetchArrs = []
    const xmlhttprequestArrs = []
    // const linkArrs = []
    const imgArrs = []
    enteriesResouceData.map(item => {
      // console.log(item)
      const d = {
        '资源名称': item.name,
        'HTTP协议类型': item.nextHopProtocol,
        // '重定向时间': formatMs(item.redirectEnd - item.redirectStart),
        // 'dns查询耗时': formatMs(item.domainLookupEnd - item.domainLookupStart),
        // 'TCP连接耗时': formatMs(item.connectEnd - item.connectStart),
        '请求时间': formatMs(item.responseEnd - item.fetchStart),
        '加载时间': formatMs(item.duration)
      }
      switch (item.initiatorType) {
        case 'navigation':
          this.afterDatas.enteriesResouceDataTiming.navigation += item.duration
          navigationArrs.push(d)
          break
        case 'script':
          this.afterDatas.enteriesResouceDataTiming.script += item.duration
          scriptArrs.push(d)
          break
        case 'css':
          this.afterDatas.enteriesResouceDataTiming.css += item.duration
          cssArrs.push(d)
          break
        case 'fetch':
          this.afterDatas.enteriesResouceDataTiming.fetch += item.duration
          fetchArrs.push(d)
          break
        case 'xmlhttprequest':
          this.afterDatas.enteriesResouceDataTiming.xmlhttprequest += item.duration
          xmlhttprequestArrs.push(d)
          break
        // case 'link':
        //   this.afterDatas.enteriesResouceDataTiming.link += item.duration
        //   linkArrs.push(d)
        //   break
        case 'img':
          this.afterDatas.enteriesResouceDataTiming.img += item.duration
          imgArrs.push(d)
          break
        default:
          break
      }
    })
    return {
      'navigation': navigationArrs,
      'script': scriptArrs,
      'css': cssArrs,
      'fetch': fetchArrs,
      'xmlhttprequest': xmlhttprequestArrs,
      // 'link': linkArrs,
      'img': imgArrs
    }
  },
  _showTiming () {
    console.table(this.afterDatas.timingFormat)
  },
  _showResouce: function () {
    for (var key in this.afterDatas.enteriesResouceDataFormat) {
      console.group(key + '--- 共加载时间' + formatMs(this.afterDatas.enteriesResouceDataTiming[key]))
      console.table(this.afterDatas.enteriesResouceDataFormat[key])
      console.groupEnd(key)
    }
  }
}

export default MyPerformance
