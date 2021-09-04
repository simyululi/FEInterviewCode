/**
 * 在子类构造函数中调用父类构造函数
 * 解决原型链继承中包含引用值导致的继承问题， 可在子类中向父类传参
 * 缺点：必须在构造函数中定义方法，因此函数不能重用。子类也不能访问父类原型上定义的方法，因此所有类型只能使用构造函数模式。
 * @constructor
 */
function SuperType(){
    this.colors = ['red', 'blue', 'green']
}
function SubType(){
    SuperType.call(this)
}
let instance1 = new SubType()
instance1.colors.push('black')
console.log(instance1.colors);

let instance2 = new SubType()
console.log(instance2.colors);
