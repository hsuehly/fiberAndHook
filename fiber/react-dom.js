import createFiber from "./createFiber";
import { scheduleUpdateOnFiber } from './ReactFiberWorkLoop'

function ReactDOMRoot (internalRoot) {
  this._internalRoot = internalRoot;
}

ReactDOMRoot.prototype.render = function (children) {
  const root = this._internalRoot
  // 更新
  updataContainer(children, root)
}

// container 就是dom 节点
function createRoot (container) {

  const root = {containerInfo: container}
  return new ReactDOMRoot(root)
}

function updataContainer (element, root) {
  const {containerInfo} = root;
  console.log(element,"updata");

  const fiber =  createFiber(element, {
    type: containerInfo.nodeName.toLocaleLowerCase(),
    stateNode: containerInfo
  })
// 更新fiber
scheduleUpdateOnFiber(fiber)
}

export default {createRoot};