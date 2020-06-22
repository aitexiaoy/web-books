## Immutable.js 常用Api

### 快速开始
```sh
npm install immutable
```
```js
const immutable = require('immutable');
const { Map } = require('immutable');
const map1 = Map({ a: 1, b: 2, c: 3 });
const map2 = map1.set('b', 50);
```

### API

#### List
List是有序的密集型集合，类似于JS的数组（Array）

#### Map
不可变Map是无序的可持久化的Collection.Keyed(key, value)键值对，存取复杂度为O(log32 N)。

#### OrderedMap
一种能够保证迭代顺序为元素进入顺序的Map。

#### Set
一种存取复杂度为O(log32 N)的无重复值的集合。
#### OrderedSet
一种能够保证迭代顺序为元素添加(add)顺序的Set。

#### Stack
Stack（栈）是一种支持复杂度为O(1)的高效添加和删除数据的集合，在栈顶添加和删除数据使用unshift(v)和shift()。

#### Range()
返回由Seq.Indexed指明的从start到end由step指定增量的数值（包含start，不包含end），默认值start为0，step为1，end为无穷大。当start与end相等时，返回一个空范围。

#### Repeat()
返回右Seq.Indexed指明的重复times次数的value，当times未定义时，返回值为无穷Seq的value。
#### Record
建立一个继承自Record的新类型。它类似于JS的对象，但需要明确指定可设置的键及其对应的值
#### Seq
相当于一系列值，但不能具体表现为某种数据结构
#### Collection
Collection是一组可迭代的键值对集合，它也是所有immutable的基类，确保它们能使用集合的方法（如map，filter）


#### fromJS()
完全地将一个JS对象转或数组转换为不可变的`Maps`或`Lists`。
```js
immutable.fromJS(json: any, reviver?: (k: any, v: Iterable<any, any>) => any): any

Immutable.fromJS({a: {b: [10, 20, 30]}, c: 40}, function (key, value) {
  var isIndexed = Immutable.Iterable.isIndexed(value);
  return isIndexed ? value.toList() : value.toOrderedMap();
});

```

#### is()
和Object.is类似的相等比较方法，比较两个Collection是否有相同的值。
```js
is(first: any, second: any): boolean
```
用于比较两个不可变数据是否相等，包括Map的键值对和Set的成员。
```js
import { Map, is } from 'immutable'
const map1 = Map({ a: 1, b: 1, c: 1 })
const map2 = Map({ a: 1, b: 1, c: 1 })
assert(map1 !== map2) 
assert(Object.is(map1, map2) === false)
assert(is(map1, map2) === true)
```
`is()`不仅仅能比较原始的字符串、数值和不可变集合比如Map和Set，也能比较实现了包含`equals()`和`hashCode()`两个方法的ValueObject 。

- 注意：和`Object.is`不同的是，`Immutable.is`假定`0`和`-0`是相同的，与ES6的Map键值相匹配。
#### hash()
hash()方法是Immutable确认两个值是否相等和决定这些值如何存储的重要依据。传入任何数据，它将返回一个31位的整形。
#### isImmutable()
返回True表示这是一个不可变数据（Collection或Record）。
```js
isImmutable(maybeImmutable: any): boolean
```
```js
const { isImmutable, Map, List, Stack } = require('immutable');
isImmutable([]); // false
isImmutable({}); // false
isImmutable(Map()); // true
isImmutable(List()); // true
isImmutable(Stack()); // true
isImmutable(Map().asMutable()); // false
```
#### isCollection()
返回True表示这是一个集合（Collection）或集合的子类。
```js
isCollection(maybeCollection: any): boolean
```
#### isKeyed()
返回True表示这是Collection.key或其子类。
```js
isKeyed(maybeKeyed: any): boolean
```
```js
const { isKeyed, Map, List, Stack } = require('immutable');
isKeyed([]); // false
isKeyed({}); // false
isKeyed(Map()); // true
isKeyed(List()); // false
isKeyed(Stack()); // false
```
#### isIndexed()
返回True表示这是Collection.isIndexed或其子类。
```js
isIndexed(maybeIndexed: any): boolean
```
```js
const { isIndexed, Map, List, Stack, Set } = require('immutable');
isIndexed([]); // false
isIndexed({}); // false
isIndexed(Map()); // false
isIndexed(List()); // true
isIndexed(Stack()); // true
isIndexed(Set()); // false
```

#### isAssociative()
返回True表示这是Keyed或者Indexed Collection。
```js
isAssociative(maybeAssociative: any): boolean
```
```js
const { isAssociative, Map, List, Stack, Set } = require('immutable');
isAssociative([]); // false
isAssociative({}); // false
isAssociative(Map()); // true
isAssociative(List()); // true
isAssociative(Stack()); // true
isAssociative(Set()); // false
```
#### isOrdered()
返回True表示这是一个Collection同时迭代索引设置正确。Collection.indexed、OrderedMap和OrderedSet会返回True。
```js
isOrdered(maybeOrdered: any): boolean
```
```js
const { isOrdered, Map, OrderedMap, List, Set } = require('immutable');
isOrdered([]); // false
isOrdered({}); // false
isOrdered(Map()); // false
isOrdered(OrderedMap()); // true
isOrdered(List()); // true
isOrdered(Set()); // false
```
#### isValueObject()
返回true表示这是个JS对象并且同时拥有equals()和hashCode()方法。
```js
isValueObject(maybeValue: any): boolean
```
#### isSeq()

#### isList()
返回true表示这是一个不可变数据List
#### isMap()
返回true表示这是一个不可变数据Map
#### isOrderedMap()
#### isStack()
#### isSet()
#### isOrderedSet()
#### isRecord()
