import { isFn, isStr, Placement } from "./utils";
import { updateHostComponent } from './ReactFIberReconciler'
let wipRoot = null
//当前正在工作中的fiber
let wip = null
export function scheduleUpdateOnFiber (fiber) {

  wipRoot = fiber;

  wip = fiber;



}
function performUnitOfWork() {
  // 处理当前的任务

  const {type} = wip;
  if(isStr(type)) {
    updateHostComponent(wip)
  }else if(isFn(type)) {
    updateFunctionComponent(wip)
  }

  // 处理下一个任务
  // 深度优先遍历
  if(wip.child) {
    wip = wip.child;
    return 
  }
  let next = wip
  while(next) {

    if(next.sibling) {
      wip =  next.sibling
      return  
    }
    next = next.return;

  }
  wip = null


}

function workLoop (IdleDeadline) {

  while(wip && IdleDeadline.timeRemaining()>0){
    performUnitOfWork();

  }
  if(!wip && wipRoot) {
    commitRoot()
  }

}

requestIdleCallback(workLoop)

function commitRoot () {
  commitWork(wipRoot)
  wipRoot = null
}

function commitWork(wip) {

  if (!wip) {
    return;
  }
  // 1. cmmiit自己
  const {flags, stateNode} = wip;
  // 父dom节点
  let parentNode = getParentNode(wip.return) //wip.return.stateNode; // wip.return.stateNode;
  if (flags & Placement && stateNode) {
    parentNode.appendChild(stateNode);
  }

  // if (flags & Update && stateNode) {
  //   updateNode(stateNode, wip.alternate.props, wip.props);
  // }

  // commitchild
  commitWork(wip.child);
  // commit兄弟
  commitWork(wip.sibling);
}

function getParentNode (wip) {
  let tem = wip
  while(tem) {
    if(tem.stateNode) {
      return tem.stateNode
    }
    tem = tem.return
  }

}