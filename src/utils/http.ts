let baseUrl = 'http://localhost:9002'
let httpInterceptor = {
  invoke(option: UniApp.RequestOptions) {
    if (!option.url.startsWith('http')) {
      option.url = baseUrl + option.url
    }
    option.timeout = 10000
    option.header = {
      ...option.header,
      'source-client': 'miniapp',
    }
    let token = uni.getStorageSync('token')
    if (token) {
      option.header = {
        token,
      }
    }
  },
}
//封装请求拦截器，上传文件拦截器
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)
//封装响应拦截器
interface Data<T> {
  code: number
  message: string
  data: T
}
export const request = <T>(option: UniApp.RequestOptions) => {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...option,
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode <= 300) {
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          uni.removeStorageSync('token')
          uni.navigateTo({ url: '/pages/login/login' })
          reject(res)
        } else {
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).message || '请求错误',
          })
          reject(res)
        }
      },
      fail: (error) => {
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试',
        })
        reject(error)
      },
    })
  })
}
