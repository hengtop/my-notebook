const h = (tag, props, children) => {
  return {
    tag,
    props,
    children,
  };
};

const mount = (vnode, container) => {
  //创建真实元素
  const el = (vnode.el = document.createElement(vnode.tag));

  //处理元素属性
  if (vnode.props) {
    for (const key in vnode.props) {
      const value = vnode.props[key];
      //如果是事件就需要监听
      if (key.startsWith("on")) {
        el.addEventListener(key.slice(2).toLocaleLowerCase(), value);
      } else {
        el.setAttribute(key, value);
      }
    }
  }
  //处理子节点
  if (vnode.children) {
    if (typeCheck(vnode.children) === "[object String]") {
      el.textContent = vnode.children;
    } else {
      vnode.children.forEach((item) => {
        mount(item, el);
      });
    }
  }
  //将el挂载到container中
  container.appendChild(el);
};

const patch = (n1, n2) => {
  if (n1.tag !== n2.tag) {
    const n1Parent = n1.el.parentElement;
    n1Parent.removeChild(n1.el);
    mount(n2, n1Parent);
  } else {
    //取出element
    const el = (n2.el = n1.el);
    //处理props
    const oldProps = n1.props || {};
    const newProps = n2.props || {};
    //获取所有的newProps
    for (const key in newProps) {
      const oldValue = oldProps[key];
      const newValue = newProps[key];
      if (newValue !== oldValue) {
        if (key.startsWith("on")) {
          el.addEventListener(key.slice(2).toLocaleLowerCase(), newValue);
        } else {
          el.setAttribute(key, newValue);
        }
      }
    }
    //删除旧的props
    for (const key in oldProps) {
      if (key.startsWith("on")) {
        const value = oldProps[key];
        el.removeEventListener(key.slice(2).toLocaleLowerCase(), value);
      }
      if (!(key in newProps)) {
        el.removeAttribute(key);
      }
    }

    //处理children
    const oldChildren = n1.children || [];
    const newChildren = n2.children || [];
    //情况1 新节点为文本类型
    if (typeCheck(newChildren) === "[object String]") {
      //如果新旧子节点都是文本元素
      if (typeCheck(oldChildren) === "[object String]") {
        //内容是否相等
        if (newChildren !== oldChildren) {
          console.log(el);
          el.textContent = newChildren;
        }
      } else {
        //如果旧子节点不是文本元素
        el.innerHTML = newChildren;
      }
    } else {
      // 情况2 为数组类型，这里不考虑对象类型
      //如果旧子节点为文本，新的节点为数组
      if (typeCheck(oldChildren) === "[object String]") {
        el.textContent = ""; //清空字符串
        newChildren.forEach((item) => {
          mount(item, el);
        });
      } else {
        //如果新旧都不为文本节点，都是数组
        //1。前面有相同节点的原生进行patch操作
        const commonLength = Math.min(oldChildren.length, newChildren.length);
        for (let i = 0; i < commonLength; i++) {
          patch(oldChildren[i], newChildren[i]);
        }
        // 2. newChildren > oldChildren 添加多的节点
        if (newChildren.length > oldChildren.length) {
          newChildren.slice(oldChildren.length).forEach((item) => {
            mount(item, el);
          });
        }
        //3. newchildren < oldChildren 移除多的节点
        oldChildren.slice(newChildren.length).forEach((item) => {
          el.removeChild(item.el);
        });
      }
    }
  }
};

function typeCheck(data) {
  return Object.prototype.toString.call(data);
}
