//人类
function Person(name) {
	this.name = name;
}
//动物
function Animal(name) {
	this.name = name;
}
//人类1
function Person1() {
	Person.apply(this);
}
Person1.prototype = new Person('Tom');
Person1.prototype.walk = function() {
	console.log('开始走了');
}
Person1.prototype.eat = function() {
	console.log('吃米饭');
}

//动物1
function Animal1() {
	Animal.call(this);
}

Animal1.prototype = new Animal('大白');

Animal1.prototype.walk = function() {
	console.log('爬');
}
Animal1.prototype.fight = function() {
	console.log('打架');
}


function AnimalAdapter(oAnimal) {
	Person.apply(this);
	this.oAnimal = oAnimal;
}
AnimalAdapter.prototype = new Person('Red');
AnimalAdapter.prototype.eat = function() {
	this.oAnimal.fight();
}

var a = new Person1();
a.walk();
a.eat();

var b = new Animal1();
b.walk();
b.fight();

var c = new AnimalAdapter(b);
//c.walk();
c.eat();