import createFiber from "./createFiber";
import { isArray, isStr, updateNode } from "./utils";


export function updateHostComponent(wip) {

  if(wip.stateNode) {
    wip.stateNode = document.createElement(wip.type)
    updateNode(wip.stateNode, wip.props)
  }
  reconcileChildren(wip, wip.props.children);

  // console.log('wip', wip);
  
}
function updateFunctionComponent (wip) {
  const { type } = wip
  const children = type(props)
  reconcileChildren(wip, children)
}
// 协调子节点
function reconcileChildren(returnFIber, children) {
  if(isStr(children)) {
    return
  }
  const newChildren = isArray(children) ? children : [children]
  //记录上个fiber
  let previousNewFiber = null
  for(let i = 0; i< newChildren.length; i ++) {

    const newChild = newChildren[i]
    const newFiber = createFiber(newChild, returnFIber)

    if(i === 0) {
      returnFIber.child = newFiber
    }else {
      previousNewFiber.sibling = newFiber
    }
    previousNewFiber = newFiber
  }

}