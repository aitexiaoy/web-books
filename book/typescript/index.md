## TypeScript
### 基础类型
1. boolean
```js
let isKeyed:boolean = false;
```
2. number
```js
let index:number = 0;
```
3. string
```js
let str:string = "key";
let str1:string = `${str}-1`
```
4. Array

5. 元组，一系列值的集合
```js
let x:[number,string];
x=[1,'211']; // okay
x=['112',1]; // error
```
6. 枚举 enum，对js语言的一个补充
```js
enum Color {red,Green,Blue}
let c:Color=Color.red
```
7.  任意值 any
8. void 空
9. null与undefined
10. Never
11. 类型断言
假设程序员已经明确了当前的类型，拥有2种写法
```js
let someValue:any='this is a value';
let strLength:number=(<string>someValue).length;
```
```js
let someValue:any='this is a value';
let strlength:number=(someValue as string).length;
```
在React的jsx组件中只能采用第二种写法

### 变量申明
1. let
2. var
3. const
4. 解构
针对解构要指定类型的话，需要这样写
```js
let {a,b}:{a:string,b:number}=0;
```
默认值
```js
function keepWholeObject(wholeObject: { a: string, b?: number }) {
    let { a, b = 1001 } = wholeObject;
}
```

### 接口
- interface

- 可选属性

- 只读属性

- 额外的属性检测
使用类型断言或者添加一个字符串索引签名
```js
interface SquareConfig {
    color?: string, 
    width?: number,
}

function createSquare(config: SquareConfig):{color:string,area:number}{
    // ...
}

let mySquare = createSquare({colour:'red',width:100} as SquareConfig)

```
或者
```js
interface SquareConfig {
    color?: string, 
    width?: number,
    [propName:string]:any,
}

function createSquare(config: SquareConfig):{color:string,area:number}{
    // ...
}

let mySquare = createSquare({colour:'red',width:100})
```

另外还有一种跳过检测的方式是将对象赋值给一个变量
```js
let squareOptions = {colour:'red',width:100}
let mySquare = createSquare(squareOptions)
```

- 函数类型
```js
interface SearchFunc{
    (source:string,subString:string):boolean;
}

let mysearch:SearchFunc;
mysearch = function(source:string,subString:string){
    let result = source.search(subString);
    return result > -1;
}

```

- 可索引的类型
