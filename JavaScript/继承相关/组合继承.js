/**
 * 综合原型链和盗用构造函数的方法。
 * 使用原型链继承原型上的属性和方法，通过盗用构造函数继承实例属性。
 * 这样既可以把方法定义在原型上实现重用，又可以让每个实例都有自己的属性
 *
 * @param name
 * @constructor
 */
function SuperType(name){
    this.name = name
    this.color = ['red', 'blue', 'green']
}
SuperType.prototype.sayName = function (){
    console.log(this.name);
}
function SubType(name, age){
    SuperType.call(this, age)
    this.age = age
}
SubType.prototype = new SuperType()
SubType.prototype.sayAge = function (){
    console.log(this.age);
}
let instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
console.log(instance1.colors); // "red,blue,green,black"
instance1.sayName(); // "Nicholas";
instance1.sayAge(); // 29
let instance2 = new SubType("Greg", 27);
console.log(instance2.colors);  // "red,blue,green"
instance2.sayName();            // "Greg";
instance2.sayAge();             // 27
