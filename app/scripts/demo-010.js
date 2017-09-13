//'use strict';
const log = console.log;

// function test() {
//     log(this);
// }
// var test = () => {
//     log(this);
// }
// test();

// var obj = {
//
//     name: 'zhangsan',
//     testFun: () => {
//         log(this);
//         log(this.name);
//     }
// }
//
// obj.testFun();
var dog={
    name:"doge",
    sayName:function(){
        return function(){
            console.log(this);
        }
    }
}
// 此时是函数调用，this指向window
dog.sayName()();

const oDiv = document.querySelector('#targetDiv');

window.addEventListener('mousedown', (e) => {

});

window.addEventListener('mousemove', () => {

});

window.addEventListener('mouseup', () => {

});

/**
 * 获取目标元素的初始位置
 */
const getTargetPos = (ele) => {
    let pos = {x: 0, y: 0};

}