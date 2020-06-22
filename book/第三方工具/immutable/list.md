列表是有序索引的密集集合，很像JavaScript数组。
```js
class List<T> extends Collection.Indexed<T>
```
列表是不可变的，并且完全持久化，O（log32 N）获取和设置，以及O（1）推送和弹出。
列出实现Deque，并从end（push，pop）和beginning（unshift，shift）中有效地添加和删除。
与JavaScript数组不同，“未设置”索引与设置为的索引之间没有区别undefined。List#forEach不管它们是否被明确定义，都会访问从0到大小的所有索引。

### List()
创建一个包含所提供的iterable-like的值的新的不可变列表。

```js
List<T>(): List<T>
List<T>(iter: Iterable.Indexed<T>): List<T>
List<T>(iter: Iterable.Set<T>): List<T>
List<K, V>(iter: Iterable.Keyed<K, V>): List<any>
List<T>(array: Array<T>): List<T>
List<T>(iterator: Iterator<T>): List<T>
List<T>(iterable: Object): List<T>
```

### List.isList()

如果提供的值是List，则为true
```js
List.isList(maybeList: any): boolean
```
### List.of()
创建一个包含的新列表values。

```js
List.of<T>(...values: T[]): List<T>
```

### List#size
```js
size: number
```

### List#set()
返回包含value 的新列表index。如果index已经存在于此列表中，它将被替换。
```js
set(index: number, value: T): List<T>
```
index可能是一个负数，从列表末尾开始索引。v.set(-1, "value")设置列表中的最后一个项目。
如果index大于size，返回的List size将会足够大以包含index。

### List#delete()
返回一个新的列表，它排除了这个index，并且大小小于这个列表。上述指数的值index向下移动1以填补位置。
```js
delete(index: number): List<T>
```
别名
```js
remove()
```

等同`list.splice(index, 1)`index可能是一个负数，从列表末尾开始索引。v.delete(-1)删除列表中的最后一个项目。
* 注意：delete不能在IE8中安全使用

### List#insert()
返回带有valueat 的新列表，index其大小为1，大于此列表。上述指数的值index移动了1。
```js
insert(index: number, value: T): List<T>
```
等同`list.splice(index,0,value)`是同义词，

### List#clear()
返回一个具有0大小且没有值的新列表。
```js
clear(): List<T>
```
### List#push()
从列表中返回一个新的列表，并values附带提供的size。
```js
push(...values: T[]): List<T>
```
### List#pop()
返回一个新列表，其大小小于此列表，不包括此列表中的最后一个索引。
```js
pop(): List<T>
```
* 注意：这不同于Array#pop因为它返回一个新的列表而不是删除的值。使用last()获得此列表中最后一个值。

### List#unshift()
返回一个新的列表，并提供values预先提供的值，将其他值前移到较高的索引处。
```js
unshift(...values: T[]): List<T>
```
### List#shift()
返回一个新列表，其大小小于此列表，不包括此列表中的第一个索引，将所有其他值移至较低索引。
```js
shift(): List<T>
```
注意：这不同于`Array#shift`因为它返回一个新的列表而不是删除的值。使用`first()`获得此列表中第一个值。

### List#update()
返回一个新的`List`，其中更新值为index，返回值是调用updater现有值，或者notSetValue是否index未设置。如果使用单个参数调用，updater则使用List自身调用。
```js
update(updater: (value: List<T>) => List<T>): List<T>
update(index: number, updater: (value: T) => T): List<T>
update(index: number, notSetValue: T, updater: (value: T) => T): List<T>
```
同 `Map#update`
* 注:index可能是一个负数，从列表末尾开始索引。v.update(-1)更新列表中的最后一个项目。

### List#merge()
```js
merge(...iterables: Iterable.Indexed<T>[]): List<T>
merge(...iterables: Array<T>[]): List<T>
```
同 `Map#merge`

### List#mergeWith()
```js
mergeWith(merger: (previous?: T, next?: T, key?: number) => T,...iterables: Iterable.Indexed<T>[]): List<T>
mergeWith(merger: (previous?: T, next?: T, key?: number) => T,...iterables: Array<T>[]): List<T>
```
同 `Map#mergeWith`

### List#mergeDeep()
```js
mergeDeep(...iterables: Iterable.Indexed<T>[]): List<T>
mergeDeep(...iterables: Array<T>[]): List<T>
```
同`Map#mergeDeep`

### List#mergeDeepWith()
```js
mergeDeepWith(merger: (previous?: T, next?: T, key?: number) => T,...iterables: Iterable.Indexed<T>[]): List<T>
mergeDeepWith(merger: (previous?: T, next?: T, key?: number) => T,...iterables: Array<T>[]): List<T>
```
同 `Map#mergeDeepWith`

### List#setSize()
返回一个带有大小的新列表`size`。如果size小于此列表的大小，则新列表将排除较高索引处的值。如果size大于此列表的大小，新列表将为新近可用的索引定义未定义的值。
```js
setSize(size: number): List<T>
```
当建立一个新的列表并且最终大小被预先知道时，setSize与其一起使用withMutations可能导致更高性能的构造。


### List#setIn()
返回已经树立了新的列表value在此keyPath。如果任何键keyPath不存在，将在该键上创建一个新的不可变Map。
```js
setIn(keyPath: Array<any>, value: any): List<T>
setIn(keyPath: Iterable<any, any>, value: any): List<T>
```
索引号被用作关键字来确定列表中的路径。

### List#deleteIn()
返回已删除此值的新列表keyPath。如果任何键keyPath不存在，则不会发生变化。
```js
deleteIn(keyPath: Array<any>): List<T>
deleteIn(keyPath: Iterable<any, any>): List<T>
```
同 `removeIn()`

### List#updateIn()
```js
updateIn(keyPath: Array<any>, updater: (value: any) => any): List<T>
updateIn(keyPath: Array<any>,notSetValue: any,updater: (value: any) => any): List<T>
updateIn(keyPath: Iterable<any, any>, updater: (value: any) => any): List<T>
updateIn(keyPath: Iterable<any, any>,notSetValue: any,updater: (value: any) => any): List<T>
```
同 `Map#updateIn`

### List#mergeIn()
```js
mergeIn(keyPath: Iterable<any, any>,...iterables: Iterable.Indexed<T>[]): List<T>
mergeIn(keyPath: Array<any>, ...iterables: Iterable.Indexed<T>[]): List<T>
mergeIn(keyPath: Array<any>, ...iterables: Array<T>[]): List<T>
```
同 `Map#mergeIn`

### List#mergeDeepIn()
```js
mergeDeepIn(keyPath: Iterable<any, any>,...iterables: Iterable.Indexed<T>[]): List<T>
mergeDeepIn(keyPath: Array<any>, ...iterables: Iterable.Indexed<T>[]): List<T>
mergeDeepIn(keyPath: Array<any>, ...iterables: Array<T>[]): List<T>
```
同 `Map#mergeDeepIn`

Transient changes
### List#withMutations()
注意：并非所有方法都可用于可变集合或内部withMutations！只有set，push，pop，shift，unshift和merge可变化的使用。
```js
withMutations(mutator: (mutable: List<T>) => any): List<T>
```
同 `Map#withMutations`

### List#asMutable()
```js
asMutable(): List<T>
```
同`Map#asMutable`

### List#asImmutable()
```js
asImmutable(): List<T>
```
同 `Map#asImmutable`


### List#toSeq()
返回Seq.Indexed。
```js
toSeq(): Seq.Indexed<T>
```
继承 `Collection.Indexed#toSeq`

### List#toKeyedSeq()
从此Iterable返回一个Seq.Keyed，其索引被视为键。
```js
toKeyedSeq(): Seq.Keyed<number, T>
```
继承 `Iterable#toKeyedSeq`

如果您想要对Iterable.Indexed进行操作并保留索引那么这非常有用。
返回的Seq将具有与此Iterable相同的迭代顺序。

🌰：
```js
var indexedSeq = Immutable.Seq.of('A', 'B', 'C');
indexedSeq.filter(v => v === 'B').toString() // Seq [ 'B' ]
var keyedSeq = indexedSeq.toKeyedSeq();
keyedSeq.filter(v => v === 'B').toString() // Seq { 1: 'B' }
```
### List#toIndexedSeq()
返回一个Seq.Indexed这个Iterable的值，这是丢弃键。
```js
toIndexedSeq(): Seq.Indexed<T>
```
继承 `Iterable#toIndexedSeq`


### List#toSetSeq()
返回一个Seq.Set这个Iterable的值，这是丢弃键。
```js
toSetSeq(): Seq.Set<T>
``` 
继承 `Iterable#toSetSeq`

### List#fromEntrySeq()
如果这是一个可迭代的键值元组，它将返回这些条目的Seq.Keyed。
```js
fromEntrySeq(): Seq.Keyed<any, any>
```
继承 `Iterable.Indexed#fromEntrySeq`

### List#equals()
如果这和另一个Iterable具有值相等性，则为真，如下定义`Immutable.is()`。
```js
equals(other: Iterable<number, T>): boolean
```
继承 `Iterable#equals`

注意：这相当于`Immutable.is(this, other)`，但提供允许链式表达式。

### List#hashCode()
计算并返回此Iterable的散列标识。
```js
hashCode(): number
```
继承 `Iterable#hashCode`

在hashCode一个可迭代的用于确定潜在平等，和添加这一个当使用Set或作为一个键Map，经由不同的实例实现查找。
```js
var a = List.of(1, 2, 3);
var b = List.of(1, 2, 3);
assert(a !== b); // different instances
var set = Set.of(a);
assert(set.has(b) === true);
```
如果两个值相同hashCode，则不能保证相等（http://en.wikipedia.org/wiki/Collision_（computer_science％29）。如果两个值有不同的hashCodes，则它们不能相等。

### List#get()
返回与提供的键相关联的值，如果Iterable不包含此键，则返回notSetValue。
```js
get(key: number, notSetValue?: T): T
```
继承  `Iterable#get`

注意：一个键可能与一个undefined值相关联，所以如果notSetValue没有提供并且该方法返回undefined，那么不能保证没有找到该键。

### List#has()
如果此关键字存在Iterable，则为真，Immutable.is用于确定相等性
```js
has(key: number): boolean
```
继承  `Iterable#has`

### List#includes()
如果此值中存在值Iterable则为true ，Immutable.is用于确定相等性
```js
includes(value: T): boolean
```
继承  `Iterable#includes`

别名 `contains()`

### List#first()
Iterable中的第一个值。
```js
first(): T
```
继承  `Iterable#first`

### List#last()
Iterable中的最后一个值。
```js
last(): T
```
继承  `Iterable#last`

### List#getIn()
通过嵌套的Iterables返回键或索引路径的值。
```js
getIn(searchKeyPath: Array<any>, notSetValue?: any): any
getIn(searchKeyPath: Iterable<any, any>, notSetValue?: any): any
```
继承  `Iterable#getIn`

### List#hasIn()
如果通过嵌套的Iterables跟随键或索引路径的结果导致设置值，则返回true。
```js
hasIn(searchKeyPath: Array<any>): boolean
hasIn(searchKeyPath: Iterable<any, any>): boolean
```
继承  `Iterable#hasIn`

Conversion to JavaScript types
### List#toJS()
将此Iterable深度转换为等效的JS。
```js
toJS(): any
```
继承  `Iterable#toJS`
别名 `toJSON()`
Iterable.Indexeds，Iterable.Sets成为阵列，同时Iterable.Keyeds成为物体。

### List#toArray()
浅显地将这个迭代器转换为一个Array，这是丢弃键。
```js
toArray(): Array<T>
```
继承  `Iterable#toArray`

### List#toObject()
将此Iterable浅转换为一个Object。
```js
toObject(): {[key: string]: V}
```
继承  `Iterable#toObject`
如果键不是字符串，则抛出。

### List#toMap()
将此Iterable转换为Map，如果键不可哈希则抛出。
```js
toMap(): Map<number, T>
```
继承  `Iterable#toMap`
注意：这相当于Map(this.toKeyedSeq())，但为方便起见并允许链接表达式。

### List#toOrderedMap()
将此Iterable转换为Map，并保持迭代顺序。
```js
toOrderedMap(): OrderedMap<number, T>
```
继承  `Iterable#toOrderedMap`
注意：这相当于OrderedMap(this.toKeyedSeq())，但为方便起见并允许链接表达式。

### List#toSet()
将此Iterable转换为Set，放弃键。如果值不可哈希则抛出。
```js
toSet(): Set<T>
```
继承  `Iterable#toSet`
* 注意：这相当于Set(this)，但提供允许链式表达式。

### List#toOrderedSet()
将此Iterable转换为Set，保持迭代顺序并丢弃键。
```js
toOrderedSet(): OrderedSet<T>
```
继承  `Iterable#toOrderedSet`
注意：这相当于OrderedSet(this.valueSeq())，但为方便起见并允许链接表达式。

### List#toList()
将此Iterable转换为List，放弃键。
```js
toList(): List<T>
```
继承  `Iterable#toList`
注意：这相当于List(this)，但提供允许链式表达式。

### List#toStack()
将此Iterable转换为堆栈，丢弃键。如果值不可哈希则抛出。
```js
toStack(): Stack<T>
```
继承  `Iterable#toStack`
注意：这相当于Stack(this)，但提供允许链式表达式。

### List#keys()
这个Iterable键的迭代器。
```js
keys(): Iterator<number>
```
继承  `Iterable#keys`
注意：这将返回一个不支持Immutable JS序列算法的ES6迭代器。使用keySeq替代，如果这是你想要的。

### List#values()
这个Iterable值的迭代器。
```js
values(): Iterator<T>
```
继承  `Iterable#values`
注意：这将返回一个不支持Immutable JS序列算法的ES6迭代器。使用valueSeq替代，如果这是你想要的。

### List#entries()
这个Iterable条目的迭代器作为[key, value]元组。
```js
entries(): Iterator<Array<any>>
```
继承  `Iterable#entries`
注意：这将返回一个不支持Immutable JS序列算法的ES6迭代器。使用entrySeq替代，如果这是你想要的。

### List#keySeq()
返回此Iterable的新键的Seq.Indexed，放弃值。
```js
keySeq(): Seq.Indexed<number>
```
继承  `Iterable#keySeq`

### List#valueSeq()
返回一个Seq.Indexed这个Iterable的值，丢弃键。
```js
valueSeq(): Seq.Indexed<T>
```
继承  `Iterable#valueSeq`

### List#entrySeq()
返回一个新的Seq.Indexed键值值元组。
```js
entrySeq(): Seq.Indexed<Array<any>>
```
继承  `Iterable#entrySeq`

### List#map()
使用通过mapper函数传递的值返回相同类型的新Iterable 。
```js
map<M>(mapper: (value?: T, key?: number, iter?: Iterable<number, T>) => M,context?: any): Iterable<number, M>
```
继承  `Iterable#map`

🌰：
```js
Seq({ a: 1, b: 2 }).map(x => 10 * x)
// Seq { a: 10, b: 20 }
```
### List#filter()
仅predicate返回函数返回true 的条目返回相同类型的新Iterable 。
```js
filter(predicate: (value?: T, key?: number, iter?: Iterable<number, T>) => boolean,context?: any): Iterable<number, T>
```
继承  `Iterable#filter`

🌰：
```js
Seq({a:1,b:2,c:3,d:4}).filter(x => x % 2 === 0)
// Seq { b: 2, d: 4 }
```
### List#filterNot()
仅predicate返回函数返回false 的条目返回相同类型的新Iterable 。
```js
filterNot(predicate: (value?: T, key?: number, iter?: Iterable<number, T>) => boolean,context?: any): Iterable<number, T>
```
继承  `Iterable#filterNot`

🌰：
```js
Seq({a:1,b:2,c:3,d:4}).filterNot(x => x % 2 === 0)
// Seq { a: 1, c: 3 }
```
### List#reverse()
按相反顺序返回相同类型的新Iterable。
```js
reverse(): Iterable<number, T>
```
继承  `Iterable#reverse`

### List#sort()
返回包含相同条目的相同类型的新Iterable，通过使用a进行稳定排序comparator。
```js
sort(comparator?: (valueA: T, valueB: T) => number): Iterable<number, T>
```
继承  `Iterable#sort`
如果comparator没有提供默认比较器使用< and >。
```js
comparator(valueA, valueB):
```

返回0元素不应该交换的情况。
返回-1（或任何负数）如果valueA之前valueB
返回1（或任何正数）如果valueA后来valueB
它是纯粹的， i.e.即它必须始终为同一对值返回相同的值。
排序没有定义顺序的集合时，它们的顺序等价物将被返回。例如map.sort()返回OrderedMap。

### List#sortBy()
就像sort，但也接受一个comparatorValueMapper允许更复杂的手段进行排序的一个方法：
```js
sortBy<C>(comparatorValueMapper: (value?: T,key?: number,iter?: Iterable<number, T>) => C,comparator?: (valueA: C, valueB: C) => number): Iterable<number, T>
```
继承  `Iterable#sortBy`

🌰：
```js
hitters.sortBy(hitter => hitter.avgHits);
```
### List#groupBy()
返回Iterable.Keyed的Iterable.Keyeds，由返回值分组grouper功能。
```js
groupBy<G>(grouper: (value?: T, key?: number, iter?: Iterable<number, T>) => G,context?: any): Seq.Keyed<G, Iterable<number, T>>
```
继承  `Iterable#groupBy`
注意：这总是一个急切的操作。

### List#forEach()
该sideEffect是在可迭代的每个条目执行。
```js
forEach(sideEffect: (value?: T, key?: number, iter?: Iterable<number, T>) => any,context?: any): number
```
继承  `Iterable#forEach`
不同的是Array#forEach，如果有任何sideEffect回报的话false，迭代将停止。返回迭代的条目数（包括返回false的最后一次迭代）。

### List#slice()
返回一个新的Iterable，其类型代表这个Iterable从开始到结束的一部分。
```js
slice(begin?: number, end?: number): Iterable<number, T>
```
继承  `Iterable#slice`

如果begin是负数，它将从Iterable的末尾偏移。例如slice(-2)返回最后两个条目的Iterable。如果没有提供，则新的Iterable将在此Iterable开始时开始。
如果end是负数，它将从Iterable的末尾偏移。例如slice(0, -1)返回除最后一项之外的所有内容的Iterable。如果没有提供，那么新的Iterable将会持续到这个Iterable的结尾。
如果所请求的分片等同于当前的Iterable，那么它将自行返回。

### List#rest()
返回包含除第一个以外的所有条目的同一类型的新Iterable。
```js
rest(): Iterable<number, T>
```
继承  `Iterable#rest`

### List#butLast()
返回包含除最后一个以外的所有条目的同一类型的新Iterable。
```js
butLast(): Iterable<number, T>
```
继承  `Iterable#butLast`

### List#skip()
返回amount从此Iterable中排除第一个条目的同一类型的新Iterable。
```js
skip(amount: number): Iterable<number, T>
```
继承  `Iterable#skip`

### List#skipLast()
返回amount从此Iterable中排除最后一个条目的同一类型的新Iterable。
```js
skipLast(amount: number): Iterable<number, T>
```
继承  `Iterable#skipLast`

### List#skipWhile()
返回包含从predicate第一个返回false 时开始的相同类型的新Iterable 。
```js
skipWhile(predicate: (value?: T, key?: number, iter?: Iterable<number, T>) => boolean,context?: any): Iterable<number, T>
```
继承  `Iterable#skipWhile`

🌰：
```js
Seq.of('dog','frog','cat','hat','god')
  .skipWhile(x => x.match(/g/))
// Seq [ 'cat', 'hat', 'god' ]
```
### List#skipUntil()
返回包含从predicate第一个返回true 时开始的相同类型的新Iterable 。
```js
skipUntil(predicate: (value?: T, key?: number, iter?: Iterable<number, T>) => boolean,context?: any): Iterable<number, T>
```
继承  `Iterable#skipUntil`

🌰：
```js
Seq.of('dog','frog','cat','hat','god')
  .skipUntil(x => x.match(/hat/))
// Seq [ 'hat', 'god' ]
```
### List#take()
返回包含amount此Iterable中第一个条目的相同类型的新Iterable。
```js
take(amount: number): Iterable<number, T>
```
继承  `Iterable#take`

### List#takeLast()
返回包含amount此Iterable中最后一个条目的相同类型的新Iterable。
```js
takeLast(amount: number): Iterable<number, T>
```
继承  `Iterable#takeLast`

### List#takeWhile()
返回包含来自此Iterable的条目的相同类型的新Iterable，只要predicate返回值为true即可。
```js
takeWhile(predicate: (value?: T, key?: number, iter?: Iterable<number, T>) => boolean,context?: any): Iterable<number, T>
```
继承  `Iterable#takeWhile`

🌰：
```js
Seq.of('dog','frog','cat','hat','god')
  .takeWhile(x => x.match(/o/))
// Seq [ 'dog', 'frog' ]
```
### List#takeUntil()
返回包含来自此Iterable的条目的相同类型的新Iterable，只要predicate返回false即可。
```js
takeUntil(predicate: (value?: T, key?: number, iter?: Iterable<number, T>) => boolean,context?: any): Iterable<number, T>
```
继承  `Iterable#takeUntil`

🌰：
```js
Seq.of('dog','frog','cat','hat','god').takeUntil(x => x.match(/at/))
// ['dog', 'frog']
```

### List#concat()
用其他值返回一个具有相同类型的新Iterable，并将其连接到此类。
```js
concat(...valuesOrIterables: any[]): Iterable<number, T>
```
继承  `Iterable#concat`
对于Seqs，即使它们具有相同的密钥，所有条目也会出现在所得到的迭代中。

### List#flatten()
压扁嵌套的Iterables。
```js
flatten(depth?: number): Iterable<any, any>
flatten(shallow?: boolean): Iterable<any, any>
```
继承  `Iterable#flatten`
默认情况下会严格地将Iterable扁平化，返回一个相同类型的Iterable，但depth可以以数字或布尔值的形式提供（其中true表示浅层扁平化）。深度为0（或者显示：假）将会变得很平坦。

仅将其他的Iterable变为Flattens，而不是阵列或对象。
* 注意：flatten(true)在Iterable>上运行并返回Iterable

### List#flatMap()
平面映射Iterable，返回相同类型的Iterable。
```js
flatMap<MK, MV>(mapper: (value?: T,key?: number,iter?: Iterable<number, T>) => Iterable<MK, MV>,context?: any): Iterable<MK, MV>
flatMap<MK, MV>(mapper: (value?: T, key?: number, iter?: Iterable<number, T>) => any,context?: any): Iterable<MK, MV>
```
继承  `Iterable#flatMap`
```
Similar to iter.map(...).flatten(true).
```
### List#interpose()
返回此Iterable中separator每个项目之间的相同类型的Iterable。
```js
interpose(separator: T): Iterable.Indexed<T>
```
继承 
Iterable.Indexed#interpose

### List#interleave()
使用提供的iterables交错迭代到此迭代中，返回相同类型的Iterable 。
```js
interleave(...iterables: Array<Iterable<any, T>>): Iterable.Indexed<T>
```
继承  `Iterable.Indexed#interleave`

由此产生的Iterable包含每个的第一个项目，然后是每个项目的第二个项目等。
```js
I.Seq.of(1,2,3).interleave(I.Seq.of('A','B','C'))
// Seq [ 1, 'A', 2, 'B', 3, 'C' ]
```
最短的Iterable停止交错。
```js
I.Seq.of(1,2,3).interleave(
  I.Seq.of('A','B'),
  I.Seq.of('X','Y','Z')
)
// Seq [ 1, 'A', 'X', 2, 'B', 'Y' ]
```
### List#splice()
Splice通过用新值替换此Iterable的区域来返回新的索引Iterable。如果未提供值，则只跳过要删除的区域。
```js
splice(index: number, removeNum: number, ...values: any[]): Iterable.Indexed<T>
```
继承  `Iterable.Indexed#splice`

index可能是一个负数，从Iterable的末尾开始索引。s.splice(-2)在倒数第二项之后拼接。
```js
Seq(['a','b','c','d']).splice(1, 2, 'q', 'r', 's')
// Seq ['a', 'q', 'r', 's', 'd']
```
### List#zip()
使用提供的迭代器返回“压缩”相同类型的Iterable。
```js
zip(...iterables: Array<Iterable<any, any>>): Iterable.Indexed<any>
```
继承  `Iterable.Indexed#zip`
喜欢zipWith，但使用默认值zipper：创建一个Array。
```js
var a = Seq.of(1, 2, 3);
var b = Seq.of(4, 5, 6);
var c = a.zip(b); // Seq [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]
```
### List#zipWith()
使用自定义zipper函数返回与提供的迭代“压缩”相同类型的Iterable 。
```js
zipWith<U, Z>(zipper: (value: T, otherValue: U) => Z,otherIterable: Iterable<any, U>): Iterable.Indexed<Z>
zipWith<U, V, Z>(zipper: (value: T, otherValue: U, thirdValue: V) => Z,otherIterable: Iterable<any, U>,thirdIterable: Iterable<any, V>): Iterable.Indexed<Z>
zipWith<Z>(zipper: (...any: Array<any>) => Z,...iterables: Array<Iterable<any, any>>): Iterable.Indexed<Z>
```
继承  `Iterable.Indexed#zipWith`

🌰：
```js
var a = Seq.of(1, 2, 3);
var b = Seq.of(4, 5, 6);
var c = a.zipWith((a, b) => a + b, b); // Seq [ 5, 7, 9 ]
```
### List#reduce()
通过调用Iterable中的reducer每个条目并传递缩小的值，将Iterable减少为一个值。
```js
reduce<R>(reducer: (reduction?: R,value?: T,key?: number,iter?: Iterable<number, T>) => R,initialReduction?: R,context?: any): R
```
继承  `Iterable#reduce`

同`Array#reduce`

如果initialReduction未提供，或者为空，则将使用Iterable中的第一项。

### List#reduceRight()
反向（从右侧）减少Iterable。
```js
reduceRight<R>(reducer: (reduction?: R,value?: T,key?: number,iter?: Iterable<number, T>) => R,initialReduction?: R,context?: any): R
```
继承  `Iterable#reduceRight`
注意：类似于this.reverse()。reduce()，并提供与奇偶校验Array#reduceRight。

### List#every()
如果predicate对Iterable中的所有条目返回true，则返回true。
```js
every(predicate: (value?: T, key?: number, iter?: Iterable<number, T>) => boolean,context?: any): boolean
```
继承  `Iterable#every`

### List#some()
如果predicate对Iterable中的任何条目返回true，则返回true。
```js
some(predicate: (value?: T, key?: number, iter?: Iterable<number, T>) => boolean,context?: any): boolean
```
继承  `Iterable#some`

### List#join()
将值作为字符串连接在一起，在每个值之间插入一个分隔符。默认分隔符是","。
```js
join(separator?: string): string
```
继承  `Iterable#join`

### List#isEmpty()
如果此Iterable不包含任何值，则返回true。
```js
isEmpty(): boolean
```
继承  `Iterable#isEmpty`
对于一些懒惰的人Seq，isEmpty可能需要迭代以确定空虚。至多会发生一次迭代。

### List#count()
返回此Iterable的大小。
```js
count(): number
count(predicate: (value?: T, key?: number, iter?: Iterable<number, T>) => boolean,context?: any): number
```
继承  `Iterable#count`

不管这个Iterable是否可以懒惰地描述它的大小（有些Seqs不能），这个方法总是会返回正确的大小。例如，Seq如果需要，它会评估一个懒惰。
如果predicate提供，则返回Iterable中predicate返回值为true 的条目的计数。

### List#countBy()
返回一个Seq.Keyed计数，按grouper函数的返回值分组。
```js
countBy<G>(grouper: (value?: T, key?: number, iter?: Iterable<number, T>) => G,context?: any): Map<G, number>
```
继承  `Iterable#countBy`
注意：这不是一个懒惰的操作。

### List#find()
返回predicate返回true 的第一个值。
```js
find(predicate: (value?: T, key?: number, iter?: Iterable<number, T>) => boolean,context?: any,notSetValue?: T): T
```
继承  `Iterable#find`

### List#findLast()
返回返回值为predicatetrue 的最后一个值。
```js
findLast(predicate: (value?: T, key?: number, iter?: Iterable<number, T>) => boolean,context?: any,notSetValue?: T): T
```
继承  `Iterable#findLast`
注意：predicate每个条目都会被调用。

### List#findEntry()
返回返回值为true的第一个键值对predicate。
```js
findEntry(predicate: (value?: T, key?: number, iter?: Iterable<number, T>) => boolean,context?: any,notSetValue?: T): Array<any>
```
继承  `Iterable#findEntry`

### List#findLastEntry()
返回返回值为true的最后一个键值对predicate。
```js
findLastEntry(predicate: (value?: T, key?: number, iter?: Iterable<number, T>) => boolean,context?: any,notSetValue?: T): Array<any>
```
继承  `Iterable#findLastEntry`

注意：predicate每个条目都会被调用。

### List#findKey()
返回predicate返回true 的键。
```js
findKey(predicate: (value?: T,key?: number,iter?: Iterable.Keyed<number, T>) => boolean,context?: any): number
```
继承  `Iterable#findKey`

### List#findLastKey()
返回predicate返回true 的最后一个键。
```js
findLastKey(predicate: (value?: T,key?: number,iter?: Iterable.Keyed<number, T>) => boolean,context?: any): number
```
继承  `Iterable#findLastKey`
注意：predicate每个条目都会被调用。

### List#keyOf()
返回与搜索值关联的键，或者未定义。
```js
keyOf(searchValue: T): number
```
继承  `Iterable#keyOf`

### List#lastKeyOf()
返回与搜索值关联的最后一个键，或者未定义。
```js
lastKeyOf(searchValue: T): number
```
继承  `Iterable#lastKeyOf`

### List#max()
返回此集合中的最大值。如果任何值相当相等，则找到的第一个将被返回。
```js
max(comparator?: (valueA: T, valueB: T) => number): T
```
继承  `Iterable#max`

在comparator以同样的方式使用Iterable#sort。如果未提供，则默认比较器为>。
当两个值被认为是等价的，遇到的第一个将被返回。否则，max只要比较器是可交换的，将独立于输入的顺序进行操作。默认比较器只有在类型不相同时才>可以交换。
如果comparator返回0，且其中任一值为NaN，undefined或null，则将返回该值。

### List#maxBy()
喜欢max，但也接受一个comparatorValueMapper允许通过更复杂的手段比较：
```js
maxBy<C>(comparatorValueMapper: (value?: T,key?: number,iter?: Iterable<number, T>) => C,comparator?: (valueA: C, valueB: C) => number): T
```
继承  `Iterable#maxBy`

🌰：
```js
hitters.maxBy(hitter => hitter.avgHits);
```
### List#min()
返回此集合中的最小值。如果任何值相当相等，则找到的第一个将被返回。
```js
min(comparator?: (valueA: T, valueB: T) => number): T
```
继承  `Iterable#min`

在comparator以同样的方式使用Iterable#sort。如果未提供，则默认比较器为<。
当两个值被认为是等价的，遇到的第一个将被返回。否则，min只要比较器是可交换的，将独立于输入的顺序进行操作。默认比较器只有在类型不相同时才<可以交换。

如果comparator返回0，且其中任一值为NaN，undefined或null，则将返回该值。

### List#minBy()
喜欢min，但也接受一个comparatorValueMapper允许通过更复杂的手段比较：
```js
minBy<C>(comparatorValueMapper: (value?: T,key?: number,iter?: Iterable<number, T>) => C,comparator?: (valueA: C, valueB: C) => number): T
```
继承  `Iterable#minBy`

🌰：
```js
hitters.minBy(hitter => hitter.avgHits);
```
### List#indexOf()
返回可以在Iterable中找到给定值的第一个索引，如果不存在则返回-1。
```js
indexOf(searchValue: T): number
```
继承  `Iterable.Indexed#indexOf`

### List#lastIndexOf()
返回可以在Iterable中找到给定值的最后一个索引，如果不存在则返回-1。
```js
lastIndexOf(searchValue: T): number
```
继承  `Iterable.Indexed#lastIndexOf`

### List#findIndex()
返回Iterable中的第一个索引，其中的值满足提供的谓词函数。否则返回-1。
```js
findIndex(predicate: (value?: T, index?: number, iter?: Iterable.Indexed<T>) => boolean,context?: any): number
```
继承  `Iterable.Indexed#findIndex`

### List#findLastIndex()
返回一个值满足提供的谓词函数的Iterable中的最后一个索引。否则返回-1。
```js
findLastIndex(predicate: (value?: T, index?: number, iter?: Iterable.Indexed<T>) => boolean,context?: any): number
```
继承  `Iterable.Indexed#findLastIndex`

### List#isSubset()
如果iter包含此Iterable中的每个值，则为真。
```js
isSubset(iter: Iterable<any, T>): boolean
isSubset(iter: Array<T>): boolean
```
继承  `Iterable#isSubset`

### List#isSuperset()
如果此Iterable包含每个值，则为真iter。
```js
isSuperset(iter: Iterable<any, T>): boolean
isSuperset(iter: Array<T>): boolean
```
继承  `Iterable#isSuperset`

