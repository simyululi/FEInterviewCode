/**
 * 寄生继承类似于寄生构造函数和工厂模式：创建一个实现继承的函数，以某种方式增强对象，然后返回这个对象。
 * 缺点：通过寄生继承给对象增加函数会导致函数难以重用，与构造函数模式类似
 * @param original
 * @returns {any}
 */
function createAnother(original){
    let clone = Object(original); // 通过调用函数创建一个新对象
    clone.sayHi = function() { // 以某种方式增强这个对象
        console.log("hi");
    };
    return clone; // 返回这个对象
}
let person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};
let anotherPerson = createAnother(person);
anotherPerson.sayHi();  // "hi"
