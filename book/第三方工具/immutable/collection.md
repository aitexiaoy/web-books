Collection是具体数据结构的抽象基类。它不能直接构建。
```js
class Collection<K, V> extends Iterable<K, V>
```
讨论
实现应该扩展子类，一种Collection.Keyed，Collection.Indexed或Collection.Set。

大小
### Collection#size
```js
size: number
```
值是否平等
### Collection#equals()
如果这和另一个Iterable具有值相等性，则为真，如下定义Immutable.is()。
```js
equals(other: Iterable<K, V>): boolean
```
继承 `Iterable#equals`

* 注意:这相当于Immutable.is(this, other)，但提供允许链式表达式。

### Collection#hashCode()
计算并返回此Iterable的散列标识。
```js
hashCode(): number
```
继承 `Iterable#hashCode`

讨论
在hashCode一个可迭代的用于确定潜在平等，和添加这一个当使用Set或作为一个键Map，经由不同的实例实现查找。
```js
var a = List.of(1, 2, 3);
var b = List.of(1, 2, 3);
assert(a !== b); // different instances
var set = Set.of(a);
assert(set.has(b) === true);
```
如果两个值相同hashCode，则不能保证相等（http://en.wikipedia.org/wiki/Collision_（computer_science％29）。如果两个值有不同的hashCodes，则它们不能相等。

读取值
### Collection#get()
返回与提供的键相关联的值，如果Iterable不包含此键，则返回notSetValue。
```js
get(key: K, notSetValue?: V): V
```
继承 `Iterable#get`

* 注意:一个键可能与一个undefined值相关联，所以如果notSetValue没有提供并且该方法返回undefined，那么不能保证没有找到该键。

### Collection#has()
如果此关键字存在Iterable，则为真，Immutable.is用于确定相等性
```js
has(key: K): boolean
```
继承 `Iterable#has`

### Collection#includes()
如果此值中存在值Iterable，则为true ，Immutable.is用于确定相等性
```js
includes(value: V): boolean
```
继承 `Iterable#includes`
别号 `contains()`

### Collection#first()
Iterable中的第一个值。
```js
first(): V
```
继承 `Iterable#first`

### Collection#last()
Iterable中的最后一个值。
```js
last(): V
```
继承 `Iterable#last`

读 deep values
### Collection#getIn()
通过嵌套的Iterables返回键或索引路径的值。
```js
getIn(searchKeyPath: Array<any>, notSetValue?: any): any
getIn(searchKeyPath: Iterable<any, any>, notSetValue?: any): any
```
继承 `Iterable#getIn`

### Collection#hasIn()
如果通过嵌套的Iterables跟随键或索引路径的结果导致设置值，则返回true。
```js
hasIn(searchKeyPath: Array<any>): boolean
hasIn(searchKeyPath: Iterable<any, any>): boolean
```
继承 `Iterable#hasIn`

转换为JavaScript类型
### Collection#toJS()
将此Iterable深度转换为等效的JS。
```js
toJS(): any
```
继承 `Iterable#toJS`
别号 `toJSON()`

Iterable.Indexeds, and Iterable.Sets become Arrays, while Iterable.Keyeds become Objects.

### Collection#toArray()
浅显地将这个迭代器转换为一个Array，丢弃键。
```js
toArray(): Array<V>
```
继承 `Iterable#toArray`

### Collection#toObject()
将此Iterable浅转换为Object。
```js
toObject(): {[key: string]: V}
```
继承 `Iterable#toObject`
如果键不是字符串，则抛出。

转换为集合
### Collection#toMap()
将此Iterable转换为Map，如果键不可哈希则抛出。
```js
toMap(): Map<K, V>
```
继承 `Iterable#toMap`

* 注意:这相当于Map(this.toKeyedSeq())，但为方便起见并允许链接表达式。

### Collection#toOrderedMap()
将此Iterable转换为Map，并保持迭代顺序。
```js
toOrderedMap(): OrderedMap<K, V>
```
继承 `Iterable#toOrderedMap`
* 注意:这相当于OrderedMap(this.toKeyedSeq())，但为方便起见并允许链接表达式。

### Collection#toSet()
将此Iterable转换为Set，放弃键。如果值不可哈希则抛出。
```js
toSet(): Set<V>
```
继承 `Iterable#toSet`
* 注意:这相当于Set(this)，但提供允许链式表达式。

### Collection#toOrderedSet()
将此Iterable转换为Set，保持迭代顺序并丢弃键。
```js
toOrderedSet(): OrderedSet<V>
```
继承 `Iterable#toOrderedSet`
* 注意:这相当于OrderedSet(this.valueSeq())，但为方便起见并允许链接表达式。

### Collection#toList()
将此Iterable转换为List，放弃键。
```js
toList(): List<V>
```
继承 `Iterable#toList`
* 注意:这相当于List(this)，但提供允许链式表达式。

### Collection#toStack()
将此Iterable转换为堆栈，丢弃键。如果值不可哈希则抛出。
```js
toStack(): Stack<V>
```
继承 `Iterable#toStack`
* 注意:这相当于Stack(this)，但提供允许链式表达式。

### Collection#toSeq()
将此Iterable转换为相同类型的Seq（索引，键控或设置）。
```js
toSeq(): Seq<K, V>
```
继承 `Iterable#toSeq`

### Collection#toKeyedSeq()
从此Iterable返回一个Seq.Keyed，其索引被视为键。
```js
toKeyedSeq(): Seq.Keyed<K, V>
```
继承 `Iterable#toKeyedSeq`
如果您想要对Iterable.Indexed进行操作并保留索引，值对，这非常有用。
返回的Seq将具有与此Iterable相同的迭代顺序。

例：
```js
var indexedSeq = Immutable.Seq.of('A', 'B', 'C');
indexedSeq.filter(v => v === 'B').toString() // Seq [ 'B' ]
var keyedSeq = indexedSeq.toKeyedSeq();
keyedSeq.filter(v => v === 'B').toString() // Seq { 1: 'B' }
```
### Collection#toIndexedSeq()
返回一个Seq.Indexed这个Iterable的值，丢弃键。
```js
toIndexedSeq(): Seq.Indexed<V>
```
继承 `Iterable#toIndexedSeq`

### Collection#toSetSeq()
返回一个Seq.Set这个Iterable的值，丢弃键。
```js
toSetSeq(): Seq.Set<V>
```
继承 `Iterable#toSetSeq`

迭代器
### Collection#keys()
这个Iterable键的迭代器。
```js
keys(): Iterator<K>
```
继承 `Iterable#keys`
* 注意:这将返回一个不支持Immutable JS序列算法的ES6迭代器。使用keySeq替代，如果这是你想要的。

### Collection#values()
这个Iterable值的迭代器。
```js
values(): Iterator<V>
```
继承 `Iterable#values`
* 注意:这将返回一个不支持Immutable JS序列算法的ES6迭代器。使用valueSeq替代，如果这是你想要的。

### Collection#entries()
这个Iterable条目的迭代器作为[key, value]元组。
```js
entries(): Iterator<Array<any>>
```
继承 `Iterable#entries`
* 注意:这将返回一个不支持Immutable JS序列算法的ES6迭代器。使用entrySeq替代，如果这是你想要的。

### Collection#keySeq()
返回此Iterable的新键的Seq.Indexed，放弃值。
```js
keySeq(): Seq.Indexed<K>
```
继承 `Iterable#keySeq`

### Collection#valueSeq()
返回一个Seq.Indexed这个Iterable的值，丢弃键。
```js
valueSeq(): Seq.Indexed<V>
```
继承 `Iterable#valueSeq`

### Collection#entrySeq()
返回一个新的Seq.Indexed键值值元组。
```js
entrySeq(): Seq.Indexed<Array<any>>
```
继承 `Iterable#entrySeq`

### Collection#map()
使用通过mapper函数传递的值返回相同类型的新Iterable 。
```js
map<M>(mapper: (value?: V, key?: K, iter?: Iterable<K, V>) => M,context?: any): Iterable<K, M>
```
继承 `Iterable#map`

🌰
```js
Seq({ a: 1, b: 2 }).map(x => 10 * x)
// Seq { a: 10, b: 20 }
```
### Collection#filter()
仅predicate返回函数返回true 的条目返回相同类型的新Iterable 。
```js
filter(predicate: (value?: V, key?: K, iter?: Iterable<K, V>) => boolean,context?: any): Iterable<K, V>
```
继承 `Iterable#filter`

🌰
```js
Seq({a:1,b:2,c:3,d:4}).filter(x => x % 2 === 0)
// Seq { b: 2, d: 4 }
```
### Collection#filterNot()
仅predicate返回函数返回false 的条目返回相同类型的新Iterable 。
```js
filterNot(predicate: (value?: V, key?: K, iter?: Iterable<K, V>) => boolean,context?: any): Iterable<K, V>
```
继承 `Iterable#filterNot`

🌰
```js
Seq({a:1,b:2,c:3,d:4}).filterNot(x => x % 2 === 0)
// Seq { a: 1, c: 3 }
```
### Collection#reverse()
按相反顺序返回相同类型的新Iterable。
```js
reverse(): Iterable<K, V>
```
继承 `Iterable#reverse`

### Collection#sort()
返回包含相同条目的相同类型的新Iterable，通过使用a进行稳定排序comparator。
```js
sort(comparator?: (valueA: V, valueB: V) => number): Iterable<K, V>
```
继承 `Iterable#sort`
如果comparator没有提供a，默认比较器使用<和>。

`comparator(valueA, valueB):`
返回0元素不应该交换的情况。
返回-1（或任何负数）如果valueA之前valueB
返回1（或任何正数）如果valueA后来valueB
是纯粹的，即它必须始终为同一对值返回相同的值。
排序没有定义顺序的集合时，它们的顺序等价物将被返回。例如map.sort()返回OrderedMap。

### Collection#sortBy()
喜欢sort，但也接受一个comparatorValueMapper允许更复杂的手段进行排序的一个：
```js
sortBy<C>(comparatorValueMapper: (value?: V, key?: K, iter?: Iterable<K, V>) => C,comparator?: (valueA: C, valueB: C) => number): Iterable<K, V>
```
继承 `Iterable#sortBy`

🌰
```
hitters.sortBy(hitter => hitter.avgHits);
```
### Collection#groupBy()
返回Iterable.Keyed的Iterable.Keyeds，由返回值分组grouper功能。
```js
groupBy<G>(grouper: (value?: V, key?: K, iter?: Iterable<K, V>) => G,context?: any): Seq.Keyed<G, Iterable<K, V>>
```
继承 `Iterable#groupBy`
* 注意:这总是一个急切的操作。

副作用
### Collection#forEach()
该sideEffect是在可迭代的每个条目执行。
```js
forEach(sideEffect: (value?: V, key?: K, iter?: Iterable<K, V>) => any,context?: any): number
```
继承 `Iterable#forEach`
不同的是Array#forEach，如果有任何sideEffect回报的话false，迭代将停止。返回迭代的条目数（包括返回false的最后一次迭代）。

### Collection#slice()
返回一个新的Iterable，其类型代表这个Iterable从开始到结束的一部分。
```js
slice(begin?: number, end?: number): Iterable<K, V>
```
继承 `Iterable#slice`
如果begin是负数，它将从Iterable的末尾偏移。例如slice(-2)返回最后两个条目的Iterable。如果没有提供，则新的Iterable将在此Iterable开始时开始。
如果end是负数，它将从Iterable的末尾偏移。例如slice(0, -1)返回除最后一项之外的所有内容的Iterable。如果没有提供，那么新的Iterable将会持续到这个Iterable的结尾。

如果所请求的分片等同于当前的Iterable，那么它将自行返回。

### Collection#rest()
返回包含除第一个以外的所有条目的同一类型的新Iterable。
```js
rest(): Iterable<K, V>
```
继承 `Iterable#rest`

### Collection#butLast()
返回包含除最后一个以外的所有条目的同一类型的新Iterable。
```js
butLast(): Iterable<K, V>
```
继承 `Iterable#butLast`

### Collection#skip()
返回amount从此Iterable中排除第一个条目的同一类型的新Iterable。
```js
skip(amount: number): Iterable<K, V>
```
继承 `Iterable#skip`

### Collection#skipLast()
返回amount从此Iterable中排除最后一个条目的同一类型的新Iterable。
```js
skipLast(amount: number): Iterable<K, V>
```
继承 `Iterable#skipLast`

### Collection#skipWhile()
返回包含从predicate第一个返回false 时开始的相同类型的新Iterable 。
```js
skipWhile(predicate: (value?: V, key?: K, iter?: Iterable<K, V>) => boolean,context?: any): Iterable<K, V>
```
继承 `Iterable#skipWhile`

🌰
```js
Seq.of('dog','frog','cat','hat','god')
  .skipWhile(x => x.match(/g/))
// Seq [ 'cat', 'hat', 'god' ]
```
### Collection#skipUntil()
返回包含从predicate第一个返回true 时开始的相同类型的新Iterable 。
```js
skipUntil(predicate: (value?: V, key?: K, iter?: Iterable<K, V>) => boolean,context?: any): Iterable<K, V>
```
继承 `Iterable#skipUntil`

🌰
```js
Seq.of('dog','frog','cat','hat','god')
  .skipUntil(x => x.match(/hat/))
// Seq [ 'hat', 'god' ]
```
### Collection#take()
返回包含amount此Iterable中第一个条目的相同类型的新Iterable。
```js
take(amount: number): Iterable<K, V>
```
继承 `Iterable#take`

### Collection#takeLast()
返回包含amount此Iterable中最后一个条目的相同类型的新Iterable。
```js
takeLast(amount: number): Iterable<K, V>
```
继承 `Iterable#takeLast`

### Collection#takeWhile()
返回包含来自此Iterable的条目的相同类型的新Iterable，只要predicate返回值为true即可。
```js
takeWhile(predicate: (value?: V, key?: K, iter?: Iterable<K, V>) => boolean,context?: any): Iterable<K, V>
```
继承 `Iterable#takeWhile`

🌰
```js
Seq.of('dog','frog','cat','hat','god')
  .takeWhile(x => x.match(/o/))
// Seq [ 'dog', 'frog' ]
```
### Collection#takeUntil()
返回包含来自此Iterable的条目的相同类型的新Iterable，只要predicate返回false即可。
```js
takeUntil(predicate: (value?: V, key?: K, iter?: Iterable<K, V>) => boolean,context?: any): Iterable<K, V>
```
继承 `Iterable#takeUntil`

🌰
```js
Seq.of('dog','frog','cat','hat','god').takeUntil(x => x.match(/at/))
// ['dog', 'frog']
```

### Collection#concat()
用其他值返回一个具有相同类型的新Iterable，并将其连接到此类。
```js
concat(...valuesOrIterables: any[]): Iterable<K, V>
```
继承 `Iterable#concat`
对于Seqs，即使它们具有相同的密钥，所有条目也会出现在所得到的迭代中。

### Collection#flatten()
压扁嵌套的Iterables。
```js
flatten(depth?: number): Iterable<any, any>
flatten(shallow?: boolean): Iterable<any, any>
```
继承 `Iterable#flatten`
默认情况下会严格地将Iterable扁平化，返回一个相同类型的Iterable，但depth可以以数字或布尔值的形式提供（其中true表示浅层扁平化）。深度为0（或者浅：假）将会变得很平坦。
仅将其他的Iterable变为Flattens，而不是阵列或对象。
* 注意:flatten(true)在Iterable>上运行并返回Iterable

### Collection#flatMap()
平面映射Iterable，返回相同类型的Iterable。
```js
flatMap<MK, MV>(mapper: (value?: V, key?: K, iter?: Iterable<K, V>) => Iterable<MK, MV>,context?: any): Iterable<MK, MV>
flatMap<MK, MV>(mapper: (value?: V, key?: K, iter?: Iterable<K, V>) => any,context?: any): Iterable<MK, MV>
```
继承 `Iterable#flatMap`
类似于iter.map(...).flatten(true)。

减少值
### Collection#reduce()
通过调用Iterable中的reducer每个条目并传递减小的值，将Iterable减少为一个值。
```js
reduce<R>(reducer: (reduction?: R, value?: V, key?: K, iter?: Iterable<K, V>) => R,initialReduction?: R,context?: any): R
```
继承 `Iterable#reduce`
参考 `Array#reduce`.
如果initialReduction未提供，或者为空，则将使用Iterable中的第一项。

### Collection#reduceRight()
反向（从右侧）减少Iterable。
```js
reduceRight<R>(reducer: (reduction?: R, value?: V, key?: K, iter?: Iterable<K, V>) => R,initialReduction?: R,context?: any): R
```
继承 `Iterable#reduceRight`
* 注意:类似于this.reverse（）。reduce（），并提供与奇偶校验Array#reduceRight。

### Collection#every()
如果predicate对Iterable中的所有条目返回true，则返回true。
```js
every(predicate: (value?: V, key?: K, iter?: Iterable<K, V>) => boolean,context?: any): boolean
```
继承 `Iterable#every`

### Collection#some()
如果predicate对Iterable中的任何条目返回true，则返回true。
```js
some(predicate: (value?: V, key?: K, iter?: Iterable<K, V>) => boolean,context?: any): boolean
```
继承 `Iterable#some`

### Collection#join()
将值作为字符串连接在一起，在每个值之间插入一个分隔符。默认分隔符是","。
```js
join(separator?: string): string
```
继承 `Iterable#join`

### Collection#isEmpty()
如果此Iterable不包含任何值，则返回true。
```js
isEmpty(): boolean
```
继承 `Iterable#isEmpty`
对于一些懒惰的人Seq，isEmpty可能需要迭代以确定空虚。至多会发生一次迭代。

### Collection#count()
返回此Iterable的大小。
```js
count(): number
count(predicate: (value?: V, key?: K, iter?: Iterable<K, V>) => boolean,context?: any): number
```
继承 `Iterable#count`

不管这个Iterable是否可以懒惰地描述它的大小（有些Seqs不能），这个方法总是会返回正确的大小。例如，Seq如果需要，它会评估一个懒惰。
如果predicate提供，则返回Iterable中predicate返回值为true 的条目的计数。

### Collection#countBy()
返回一个Seq.Keyed计数，按grouper函数的返回值分组。
```js
countBy<G>(grouper: (value?: V, key?: K, iter?: Iterable<K, V>) => G,context?: any): Map<G, number>
```
继承 `Iterable#countBy`
* 注意:这不是一个惰性操作。

### Collection#find()
返回predicate返回true 的第一个值。
```js
find(predicate: (value?: V, key?: K, iter?: Iterable<K, V>) => boolean,context?: any,notSetValue?: V): V
```
继承 `Iterable#find`

### Collection#findLast()
返回返回值为predicatetrue 的最后一个值。
```js
findLast(predicate: (value?: V, key?: K, iter?: Iterable<K, V>) => boolean,context?: any,notSetValue?: V): V
```
继承 `Iterable#findLast`
* 注意:predicate每个条目都会被调用。

### Collection#findEntry()
返回返回值为true的第一个键值对predicate。
```js
findEntry(predicate: (value?: V, key?: K, iter?: Iterable<K, V>) => boolean,context?: any,notSetValue?: V): Array<any>
```
继承 `Iterable#findEntry`

### Collection#findLastEntry()
返回返回值为true的最后一个键值对predicate。
```js
findLastEntry(predicate: (value?: V, key?: K, iter?: Iterable<K, V>) => boolean,context?: any,notSetValue?: V): Array<any>
```
继承 `Iterable#findLastEntry`
* 注意:predicate每个条目都会被调用。

### Collection#findKey()
返回predicate返回true 的键。
```js
findKey(predicate: (value?: V, key?: K, iter?: Iterable.Keyed<K, V>) => boolean,context?: any): K
```
继承 `Iterable#findKey`

### Collection#findLastKey()
返回predicate返回true 的最后一个键。
```js
findLastKey(predicate: (value?: V, key?: K, iter?: Iterable.Keyed<K, V>) => boolean,context?: any): K
```
继承 `Iterable#findLastKey`
* 注意:predicate每个条目都会被调用。

### Collection#keyOf()
返回与搜索值关联的键，或者未定义。
```js
keyOf(searchValue: V): K
```
继承 `Iterable#keyOf`

### Collection#lastKeyOf()
返回与搜索值关联的最后一个键，或者未定义。
```js
lastKeyOf(searchValue: V): K
```
继承 `Iterable#lastKeyOf`

### Collection#max()
返回此集合中的最大值。如果任何值相当相等，则找到的第一个将被返回。
```js
max(comparator?: (valueA: V, valueB: V) => number): V
```
继承 `Iterable#max`

讨论
在comparator以同样的方式使用Iterable#sort。如果未提供，则默认比较器为>。

当两个值被认为是等价的，遇到的第一个将被返回。否则，max只要比较器是可交换的，将独立于输入的顺序进行操作。默认比较器只有在类型不相同时才>可以交换。

如果comparator返回0，且其中任一值为NaN，undefined或null，则将返回该值。

### Collection#maxBy()
喜欢max，但也接受一个comparatorValueMapper允许通过更复杂的手段比较：
```js
maxBy<C>(comparatorValueMapper: (value?: V, key?: K, iter?: Iterable<K, V>) => C,comparator?: (valueA: C, valueB: C) => number): V
```
继承 `Iterable#maxBy`

🌰
hitters.maxBy(hitter => hitter.avgHits);
### Collection#min()
返回此集合中的最小值。如果任何值相当相等，则找到的第一个将被返回。
```js
min(comparator?: (valueA: V, valueB: V) => number): V
```
继承 `Iterable#min`

讨论
在comparator以同样的方式使用Iterable#sort。如果未提供，则默认比较器为<。

当两个值被认为是等价的，遇到的第一个将被返回。否则，min只要比较器是可交换的，将独立于输入的顺序进行操作。默认比较器只有在类型不相同时才<可以交换。

如果comparator返回0，且其中任一值为NaN，undefined或null，则将返回该值。

### Collection#minBy()
喜欢min，但也接受一个comparatorValueMapper允许通过更复杂的手段比较：
```js
minBy<C>(comparatorValueMapper: (value?: V, key?: K, iter?: Iterable<K, V>) => C,comparator?: (valueA: C, valueB: C) => number): V
```
继承 `Iterable#minBy`

🌰
```js
hitters.minBy(hitter => hitter.avgHits);
```

### Collection#isSubset()
如果iter包含此Iterable中的每个值，则为真。
```js
isSubset(iter: Iterable<any, V>): boolean
isSubset(iter: Array<V>): boolean
```
继承 `Iterable#isSubset`

### Collection#isSuperset()
如果此Iterable包含每个值，则为真iter。
```js
isSuperset(iter: Iterable<any, V>): boolean
isSuperset(iter: Array<V>): boolean
```
继承 `Iterable#isSuperset`

Collection 代表键值对。
```js
class Collection.Keyed<K, V> extends Collection<K, V>, Iterable.Keyed<K, V>
```

### Collection.Keyed

### Collection.Keyed#size
继承 `Collection#size`
### Collection.Keyed#toSeq()
覆盖 `Iterable#toSeq`
### Collection.Keyed#toKeyedSeq()
从此Iterable返回一个Seq.Keyed，其索引被视为键。
### Collection.Keyed#toIndexedSeq()
返回一个Seq.Indexed这个Iterable的值，丢弃键。
### Collection.Keyed#toSetSeq()
返回一个Seq.Set这个Iterable的值，丢弃键。
### Collection.Keyed#equals()
### Collection.Keyed#hashCode()
计算并返回此Iterable的散列标识。
### Collection.Keyed#get()
返回与提供的键相关联的值，如果Iterable不包含此键，则返回notSetValue。
### Collection.Keyed#has()
如果此关键字存在Iterable，则为真，Immutable.is用于确定相等性
### Collection.Keyed#includes()
如果此值中存在值Iterable，则为true ，Immutable.is用于确定相等性
### Collection.Keyed#first()
Iterable中的第一个值。
### Collection.Keyed#last()
Iterable中的最后一个值。
### Collection.Keyed#getIn()
通过嵌套的Iterables返回键或索引路径的值。
### Collection.Keyed#hasIn()
如果通过嵌套的Iterables跟随键或索引路径的结果导致设置值，则返回true。
### Collection.Keyed#toJS()
将此Iterable深度转换为等效的JS。
### Collection.Keyed#toArray()
浅显地将这个迭代器转换为一个Array，丢弃键。
### Collection.Keyed#toObject()
将此Iterable浅转换为Object。
### Collection.Keyed#toMap()
将此Iterable转换为Map，如果键不可哈希则抛出。
### Collection.Keyed#toOrderedMap()
将此Iterable转换为Map，并保持迭代顺序。
### Collection.Keyed#toSet()
将此Iterable转换为Set，放弃键。如果值不可哈希则抛出。
### Collection.Keyed#toOrderedSet()
将此Iterable转换为Set，保持迭代顺序并丢弃键。
### Collection.Keyed#toList()
将此Iterable转换为List，放弃键。
### Collection.Keyed#toStack()
将此Iterable转换为堆栈，丢弃键。如果值不可哈希则抛出。
### Collection.Keyed#keys()
这个Iterable键的迭代器。
### Collection.Keyed#values()
这个Iterable值的迭代器。
### Collection.Keyed#entries()
An iterator of this Iterable's entries as [key, value] tuples.
### Collection.Keyed#keySeq()
返回此Iterable的新键的Seq.Indexed，放弃值。
### Collection.Keyed#valueSeq()
返回一个Seq.Indexed这个Iterable的值，丢弃键。
### Collection.Keyed#valueSeq()
返回一个新的Seq.Indexed键值值元组。
### Collection.Keyed#map()
使用通过mapper函数传递的值返回相同类型的新Iterable 。
### Collection.Keyed#filter()
仅predicate返回函数返回true 的条目返回相同类型的新Iterable 。
### Collection.Keyed#filterNot()
仅predicate返回函数返回false 的条目返回相同类型的新Iterable 。
### Collection.Keyed#reverse()
按相反顺序返回相同类型的新Iterable。
### Collection.Keyed#sort()
返回包含相同条目的相同类型的新Iterable，通过使用a进行稳定排序comparator。
### Collection.Keyed#sortBy()
喜欢sort，但也接受一个comparatorValueMapper允许更复杂的手段进行排序的一个：
### Collection.Keyed#groupBy()
返回Iterable.Keyed的Iterable.Keyeds，由返回值分组grouper功能。
### Collection.Keyed#forEach()
该sideEffect是在可迭代的每个条目执行。
### Collection.Keyed#slice()
返回一个新的Iterable，其类型代表这个Iterable从开始到结束的一部分。
### Collection.Keyed#rest()
返回包含除第一个以外的所有条目的同一类型的新Iterable。
### Collection.Keyed#butLast()
返回包含除最后一个以外的所有条目的同一类型的新Iterable。
### Collection.Keyed#skip()
返回amount从此Iterable中排除第一个条目的同一类型的新Iterable。
### Collection.Keyed#skipLast()
返回amount从此Iterable中排除最后一个条目的同一类型的新Iterable。
### Collection.Keyed#skipWhile()
返回包含从predicate第一个返回false 时开始的相同类型的新Iterable 。
### Collection.Keyed#skipUntil()
返回包含从predicate第一个返回true 时开始的相同类型的新Iterable 。
### Collection.Keyed#take()
返回包含amount此Iterable中第一个条目的相同类型的新Iterable。
### Collection.Keyed#takeLast()
返回包含amount此Iterable中最后一个条目的相同类型的新Iterable。
### Collection.Keyed#takeWhile()
返回包含来自此Iterable的条目的相同类型的新Iterable，只要predicate返回值为true即可。
### Collection.Keyed#takeUntil()
返回包含来自此Iterable的条目的相同类型的新Iterable，只要predicate返回false即可。
### Collection.Keyed#concat()
用其他值返回一个具有相同类型的新Iterable，并将其连接到此类。
### Collection.Keyed#flatten()
压扁嵌套的Iterables。
### Collection.Keyed#flatMap()
平面映射Iterable，返回相同类型的Iterable。
### Collection.Keyed#reduce()
通过调用Iterable中的reducer每个条目并传递缩小的值，将Iterable减少为一个值。
### Collection.Keyed#reduceRight()
反向（从右侧）减少Iterable。
### Collection.Keyed#every()
如果predicate对Iterable中的所有条目返回true，则返回true。
### Collection.Keyed#some()
如果predicate对Iterable中的任何条目返回true，则返回true。
### Collection.Keyed#join()
将值作为字符串连接在一起，在每个值之间插入一个分隔符。默认分隔符是","。
### Collection.Keyed#isEmpty()
如果此Iterable不包含任何值，则返回true。
### Collection.Keyed#count()
返回此Iterable的大小。
### Collection.Keyed#countBy()
返回一个Seq.Keyed计数，按grouper函数的返回值分组。
### Collection.Keyed#find()
返回predicate返回true 的第一个值。
### Collection.Keyed#findLast()
返回返回值为predicatetrue 的最后一个值。
### Collection.Keyed#findEntry()
Returns the first key, value entry for which the predicate returns true.
### Collection.Keyed#findLastEntry()
返回返回值为true的最后一个键值对predicate。
### Collection.Keyed#findKey()
返回predicate返回true 的键。
### Collection.Keyed#findLastKey()
返回predicate返回true 的最后一个键。
### Collection.Keyed#keyOf()
返回与搜索值关联的键，或者未定义。
### Collection.Keyed#lastKeyOf()
返回与搜索值关联的最后一个键，或者未定义。
### Collection.Keyed#max()
返回此集合中的最大值。如果任何值相当相等，则找到的第一个将被返回。
### Collection.Keyed#maxBy()
喜欢max，但也接受一个comparatorValueMapper允许通过更复杂的手段比较：
### Collection.Keyed#min()
返回此集合中的最小值。如果任何值相当相等，则找到的第一个将被返回。
### Collection.Keyed#minBy()
喜欢min，但也接受一个comparatorValueMapper允许通过更复杂的手段比较：
### Collection.Keyed#isSubset()
如果iter包含此Iterable中的每个值，则为真。
### Collection.Keyed#isSuperset()
如果此Iterable包含每个值，则为真iter。
### Collection.Keyed#flip()
返回键和值已翻转的同一类型的新Iterable.Keyed。
### Collection.Keyed#mapKeys()
使用通过mapper函数传递的键返回相同类型的新Iterable.Keyed 。
### Collection.Keyed#mapEntries()
通过mapper函数传递条目（键，值元组），返回相同类型的新Iterable.Keyed 。

