// Vue 插件 暴露一个对象
let myPlugins = {}

myPlugins.install = function (Vue, options) {
  // 任何组件都可以使用

  // Vue.prototype.$bus
  // Vue.directive
  // Vue.component
  // Vue.filter
  Vue.directive(options.name, (element, binding) => {
    element.innerHTML = binding.value
  })
}

export default myPlugins
