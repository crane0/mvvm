/**
 * @description 创建代理
 * @param {object} vm Vue 实例
 * @param {object} obj 需要被代理的对象
 * @param {string} namespace 用于递归对象时，能够标记是哪个子对象
 * @return {object} 创建的代理对象，最终会挂载到 vm._data 上。
 */
export function constructProxy(vm, obj, namespace) {
  let proxyObj = {};

  if (obj instanceof Array) {
    //
  } else if (obj instanceof Object) {
    proxyObj = constructObjectProxy(vm, obj, namespace);
  } else {
    throw new Error("只支持代理数组和对象");
  }
  return proxyObj;
}

function constructObjectProxy(vm, obj, namespace) {
  let proxyObj = {};
  for (const key in obj) {
    Object.defineProperty(proxyObj, key, {
      configurable: true,
      get() {
        return obj[key];
      },
      set(value) {
        obj[key] = value;
      },
    });
    // 方便 vm 直接访问 data 中的属性
    Object.defineProperty(vm, key, {
      configurable: true,
      get() {
        return obj[key];
      },
      set(value) {
        obj[key] = value;
      },
    });
  }
  return proxyObj;
}
