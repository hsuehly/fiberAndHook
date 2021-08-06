import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop";

// 正在工作的hook
let currentlyRendingFiber = null;
let workInProressHook = null


export function renderWithHOoks(wip) {
  currentlyRendingFiber = wip
  currentlyRendingFiber.memeorizedState = null
  workInProressHook = null //尾hook
}
// fiber.memeorizedState(hook0)->next(hook1)->next(hook2)->next(hook3)(workInProressHook)
// workInProressHook
function updateWorkInProgressHook() {
 let hook;

 let current = currentlyRendingFiber.alternate
 // 更新
if(current) {
  currentlyRendingFiber.memeorizedState = current.memeorizedState
  if(workInProressHook) {
    workInProressHook = hook = workInProressHook.next
  }else {
    workInProressHook = hook = currentlyRendingFiber.memeorizedState
  }

}else {
  //  初次渲染
  hook = {
    memeorizedState: null, // 状态值
    next: null// 指向下一个hook
  }
  if(workInProressHook) {
    // 不是第一个hook
    workInProressHook = workInProressHook.next = hook
  }else {
    // 第一个hook
    workInProressHook = currentlyRendingFiber.memeorizedState = hook
  }
}
 
 return hook
}

export function useReducer(reducer, initalState) {

  const hook = updateWorkInProgressHook()
  // 初次渲染
  if(!currentlyRendingFiber.alternate) {
    hook.memeorizedState = initalState

  }
  const dispatch = () => {
    // console.log("eee")
    hook.memeorizedState = reducer(hook.memeorizedState)
    scheduleUpdateOnFiber(currentlyRendingFiber)
  }
  return[hook.memeorizedState, dispatch]

}