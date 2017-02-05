function EventEmitter(){}//专门管理自定义事件 和（EventTarget是系统管理事件）  nodejs里面有EventEmitter是可以用的；是公开的; 你可以给自己定义的类实现发布事件；（自己定义的类继承一下EventEmitter）就可以了但是DOm中没有公开EventTarget这个类的run方法，不能继承。所有才有了DOM中EventEmitter自己写的这个；
EventEmitter.prototype.on=function(){

};
EventEmitter.prototype.run=function(){

}
EventEmitter.prototype.off=function(){

}