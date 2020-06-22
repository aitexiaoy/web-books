```js
class LayzMan {
    constructor(name){
        this.tasks = []
        this.name = name
        
        let task = (name => () => {
            console.log ( `我是懒人${name}` );
            this.next ();
        }) ( name );
        
        this.tasks.push(task)

        window.setTimeout(()=>{
            this.next()
        }, 0)
    }

    next(){
        const task = this.tasks.shift()
        task&&task()
    }

    sleep=(time)=>{
        let task = (t => () =>{
            window.setTimeout(()=>{
                console.log(`休息一下:${t}秒`)
                this.next()
            },t*1000)
        })(time)
        this.tasks.push(task)
        return this
    }

    firstSleep=(time)=>{
        let task = (t => () =>{
            window.setTimeout(()=>{
                 console.log(`先休息休息一下:${t}秒`)
                 this.next()
            })
        })(time)
        this.tasks.unshift(task)
        return this
    }

    eat = (food)=>{
        let task = (food => () => {
            console.log ( `${this.name}吃${food}` );
            this.next ();
        }) ( food );
        this.tasks.push ( task );
        return this
    }
}

(new LayzMan('刘能')).eat('草').sleep(5).eat('喝汤').firstSleep(5).eat('牛奶')
```