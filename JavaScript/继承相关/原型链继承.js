/**
 * 原型链继承是把子类的原型指向父类的构造函数
 * 子类有时候需要覆盖父类的方法，或者增加父类没有的方法。为此，这些方法必须在原型赋值之后 再添加到原型上
 * 缺点：当原型中包含引用类型的时候，原型中包含的引用值会在所有实例中共享。所以属性一般定义在实例中而不在原型上
 * @constructor
 */
function SuperType(){
    this.property = true
}
SuperType.prototype.getSuperValue = function (){
    return this.property
}
function SubType(){
    this.subproperty = false
}
SubType.prototype = new SuperType()
SubType.prototype.getSubValue = function (){
    return this.subproperty
}
let instance = new SubType()
console.log(SubType.prototype);


function SuperType() {
    this.colors = ["red", "blue", "green"]
}
SuperType.prototype.sayColor = function (){
    return this.colors
}
function SubType() {
    this.colors = ["red", "blue", "green"];
}
// 继承SuperType
SubType.prototype = new SuperType();

let instance1 = new SubType();
instance1.colors.push("black");
console.log(instance1.sayColor());
// console.log(instance1.colors); // "red,blue,green,black"
let instance2 = new SubType();
console.log(instance2.sayColor());
// console.log(instance2.colors); // "red,blue,green,black"
