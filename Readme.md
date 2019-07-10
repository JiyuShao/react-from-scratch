# Building React From Scratch

This is a talk I gave at React Rally 2016 where I walked through a simplified implementation of React in order to explain how it worked. This simplified implementation is called Dilithium.

## Watch the talk

<a href="https://www.youtube.com/watch?v=_MAD4Oly9yg&list=PLUD4kD-wL_zYSfU3tIYsb4WqfFQzO_EjQ"><img src="https://i.ytimg.com/vi_webp/_MAD4Oly9yg/maxresdefault.webp" width="100%"></a>

Be sure to check out the other talks too - all of the speakers did an amazing job.

## Check out the code

I've included the annotated code that I used in my talk, in the `dilithium` directory. Keep in mind it probably differs slightly from what was shown in the slides (I took a few liberties to make it fit).

## Flow chart

### Basic flowchart

```flow
start=>start: 开始Start

end=>end: 结束End

opInject=>operation: 把平台相关逻辑(DOMComponentWrapper)注入到HostComponent中用于挂载更新等操作
Inject DOMComponentWrapper into HostComponent for instantiateComponent

subRender=>subroutine: 开始渲染
Mount.render(element, node)

condIsRoot=>condition: 所提供的的node是否已经渲染
Mount.isRoot(node)?

opMount=>operation: 把element挂载到node上
Mount.mount(element, node)

subUpdate=>subroutine: 用element来更新node
Mount.update(element, node)

opUnMount=>operation: 这里先卸载组件
Mount.unmountComponentAtNode(node)

condInstantiateNativeElement=>condition: 开始实例化element
instantiateComponent(element)
是否是原生element实例化?
Instantiate Native Element?

opInstantiateNativeElement=>operation: 使用之前挂载的HostComponent来实例化
HostComponent.construct(element)
---(DOMComponentWrapperInstance)---

opInstantiateComponentElement=>operation: 直接实例化组件
new element.type(element.props)

opMountNativeElement=>operation: 原生挂载组件
DOMComponentWrapperInstance  mountComponent

subMountComponentElement=>subroutine: 调用Component实例mountComponent方法
ComponentInstance mountComponent

opMountNode=>operation: 把已经挂载的组件加载到页面中
DOM.empty(node)
DOM.appendChild(renderedNode)



start->opInject->subRender->condIsRoot->cond

condIsRoot(no)->opMount->condInstantiateNativeElement

condIsRoot(yes)->subUpdate->opUnMount->opMount

condInstantiateNativeElement(no)->opInstantiateComponentElement->subMountComponentElement(right)->condInstantiateNativeElement

condInstantiateNativeElement(yes)->opInstantiateNativeElement->opMountNativeElement->opMountNode->end

```

<!-- ```flow
start=>start: Start

end=>end: End

opCreateDomElement=>operation: document.createElement

opUpdateDomProperties=>operation: DOMComponentWrapperInstance._updateDOMProperties

opMountChildren=>operation: DOMComponentWrapperInstance.mountChildren
---(MultiChildInstance.mountChildren)---

start
``` -->
