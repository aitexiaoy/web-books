#### 1. Set

set类型与数组类似，但是各个成员之间无重复项。
```js
const a = new Set()

// Set可以接收一个数组，或者具有iterable接口的其他数据
const b = new Set([1,2,3,4,5,5,5])
console.log(a.size) // 5

const c = new Set(document.querySelectAll('div'))
```
set内部数据采用精确匹配，也就是2与'2'不是一个，但是NaN，undefined会被认为是一个，但是`{}`与`[]`不是同一个值。即
```js
new Set().add(undefind).add(undefind).size===1 //true
new Set().add([]).add([]).size===2 //true
```
#### 2. Set的属性与方法

属性：

`Set.prototype.constructor`: 构造函数

`Set.prototype.size`: 返回Set实例的成员总数

方法：

`Set.prototype.add(value)` : 添加某个值，返回Set结构本身

```js
const d = new Set()
d.add(1).add(2).add(2)
console.log(d.size) // 2
```

`Set.prototype.delete(value)` : 删除某一个值，返回一个布尔值，表示删除成功

`Set.prototype.has(value)`: 判断是否有某值，返回一个布尔值

`Set.prototype.clear()`: 清除所有成员

`Array.from`方法可以将Set结构转为数组，可以用此进行数组去重
```js
function dedupe(array){
	return Array.from(new Set(array))
}
```
Set的遍历方法：

`Set.prototype.keys()` : 返回键名

`Set.prototype.values()`：返回值的遍历器

`Set.prototype.entries()`: 返回键值对的遍历器

```js
const aa=new Set(['张三','李四',['刘能','张广发']])
aa.entries()
// SetIterator {"张三" => "张三", "李四" => "李四", Array(2) => Array(2)}
aa.keys()
// SetIterator {"张三", "李四", Array(2)}
aa.values()
// SetIterator {"张三", "李四", Array(2)}
```

因为Set结构没有键名，只有键值，所以`keys`与`values`方法与行为完全一致，而`entries`返回中迭代器的键名与键值也一致

`Set.prototype.forEach()` :使用回调函数遍历每个成员
```js
let set = new Set([1, 4, 9]);
set.forEach((value, key) => console.log(key + ' : ' + value))
// 1 : 1
// 4 : 4
// 9 : 9
```

Set结构也可以直接采用扩展运算符

```js

[...new Set([1,2,3,4,5,5])]
// [1,2,3,4,5]
```

#### 2. WeakSet
1. WeakSet 结构与 Set 类似，但内部成员只能是对象，而不能是其他的值
2. WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。
3. WeakSet没有size属性，因为成员是弱引用，因此也不能遍历

#### 3. Map

Object对象中的键名只能是String类型的字符串或者`Symbol`类型，内部在将对象作为键名的的时候会将键名显示的转成字符串`[object Object]`

```
const a = {1:'k'}
a['1']===a[1]==='k'

const b = {
	[a]:'ll'
}
console.log(b)
// {[object Object]: "ll"}
```
为了解决这一问题，ES6引入了Map对象，Map对象的键名没有限制，也就是Map对象的键名可以是任何形式的，字符串，对象等。
```js
const a = new Map()
a.set('1','121')
a.has(1) // fasle
```
Map对象的构造器接收数组作为参数，数组项也为一个数组，数组的第一个值为Map的键名，第二个值为键值。如果后面有更多的参数将不做解析。
```js
const map = new Map([['name','张三'],['title','Author']])
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"
```
只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心
```js
const map = new Map();

map.set(['a'], 555);
map.get(['a']) // undefined
```
属性：

`size` 返回Map结构大小

方法：

`set(key,value)`：设置成员值，如果成员值有则覆盖，没有就新增。返回新的Map对象

`get(key)`: 获得指定成员的值

`has(key)`: 判断是否用于某一元素

`delete(key)`: 删除指定key的元素

`clear()`: 清空所有成员

同样的Map结构也拥有遍历方法

`Map.prototy.keys()` ：返回键名的遍历器

`Map.prototype.values()`：返回键值的遍历器

`Map.prototype.entries()`：返回所有成员的遍历器

`Map.prototype.forEach()`：遍历Map的成员

Map 的遍历顺序就是插入顺序

#### 5. WeakMap

`WeakMap`只接受对象作为键名

`WeakMap`的键名所指向的对象，不计入垃圾回收机制

`WeakMap`没有遍历操作，也没有size属性也不支持`clear`

一个回收的例子

```js
// 手动执行一次垃圾回收，保证获取的内存使用状态准确
> global.gc();
undefined

// 查看内存占用的初始状态，heapUsed 为 4M 左右
> process.memoryUsage();
{ rss: 21106688,
  heapTotal: 7376896,
  heapUsed: 4153936,
  external: 9059 }

> let wm = new WeakMap();
undefined

// 新建一个变量 key，指向一个 5*1024*1024 的数组
> let key = new Array(5 * 1024 * 1024);
undefined

// 设置 WeakMap 实例的键名，也指向 key 数组
// 这时，key 数组实际被引用了两次，
// 变量 key 引用一次，WeakMap 的键名引用了第二次
// 但是，WeakMap 是弱引用，对于引擎来说，引用计数还是1
> wm.set(key, 1);
WeakMap {}

> global.gc();
undefined

// 这时内存占用 heapUsed 增加到 45M 了
> process.memoryUsage();
{ rss: 67538944,
  heapTotal: 7376896,
  heapUsed: 45782816,
  external: 8945 }

// 清除变量 key 对数组的引用，
// 但没有手动清除 WeakMap 实例的键名对数组的引用
> key = null;
null

// 再次执行垃圾回收
> global.gc();
undefined

// 内存占用 heapUsed 变回 4M 左右，
// 可以看到 WeakMap 的键名引用没有阻止 gc 对内存的回收
> process.memoryUsage();
{ rss: 20639744,
  heapTotal: 8425472,
  heapUsed: 3979792,
  external: 8956 }
```