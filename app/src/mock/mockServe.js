// 导入 mockjs 模块
import Mock from 'mockjs'

// 导入 json 数据
// webpack 默认对外共享：图片，JSON 数据格式
import banner from './banner.json'
import floor from './floor.json'

// mock数据: 参数1: 请求地址，参数2：请求数据
Mock.mock('/mock/banner', { code: 200, data: banner }) // 模拟首页轮播图的数据
Mock.mock('/mock/floor', { code: 200, data: floor }) // 模拟首页的数据
