import { Placement } from "./utils";


export default function createFiber (vnode, returnFiber) {
  const newFiber = {

    type: vnode.type,
    key: vnode.key,
    props: vnode.props,
    //第一个子fiber
    child: null,
    //下一个兄地
    sibling: null,
    // 父fiber
    return: returnFiber,
    // 如果是原生标签 dom 节点
    // 类组件  类实列
    stateNode: null,
    // 标记但前fiber 是提交是什么操作, 比如插入 更新
    flags: Placement

  }


  return newFiber;

}