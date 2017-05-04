# util-interface 接口兼容工具

后端接口，可能存在兼容问题，当某参数不存在时，并且我们没有在前端做兼容时，可能导致js报错，该工具完美解决了此类问题，只要你提供一套默认接口参数

## 命令

```
# 安装
npm install util-interface --save-dev
```

## 引入

```javascript
//支持CMD，AMD，UMD等多种方式引入
import interfaceRepair from 'util-interface'
interfaceRepair(默认值, 接口返回值 [, options])
```

## 例子

```javascript
/*
所有需要用到的参数，都要设置默认值
逻辑 ：
    如果默认值为数字，就将对应参数转化为数字，接口参数不存在，或转化失败（NaN），采取默认值

    如果默认值为字符串，就将对应参数转化为字符串，接口参数不存在或为undefine或null，采取默认值

    如果默认值为json，就将对应参数转化为json，接口参数不存在或为其他数据类型， 就采取默认值

    如果默认值为数组， 就将对应参数转化为数组， 接口参数不存在或为其他数据类型， 就转化为空数组
*/

// 基本例子
var def = {
    status : 1,
    msg : '调用成功',
    data : {
        data : [{
            name : '新浪用户'
        }]
    }
}
result = {
    status : 0,
    data : {
        data : [{
            name : '义薄云天黑心小王子'
        },{
            name : ''
        }]
    }
}
result = interfaceRepair(def, 接口result, options)
/*
{
    "status": 1,
    "msg": "调用成功",
    "data": {
        "data": [{
            "name": "义薄云天黑心小王子"
        }, {
            "name": "新浪用户"
        }]
    }
}
*/


/*
    将默认参数的key设置为*
*/
var def = {
    reply : {
        '*' : {
            nick : '默认用户名'
        }
    }
}
result = {
    reply : {
        '590810DC-A0DF021-40C33EB9-98C-82F' : {

        },
        'A0DF021-590810DC-40C33EB9-98C-82D' : {
            nick : '小明'
        }
    }
}
result = interfaceRepair(def, result)
/*
{
    reply : {
        '590810DC-A0DF021-40C33EB9-98C-82F' : {
            nick : '默认用户名'
        },
        'A0DF021-590810DC-40C33EB9-98C-82D' : {
            nick : '小明'
        }
    }
}
*/
```

# Options

Name             | Default | Description
:--------------- | :------ | :---------------
stringEmptyToDef | true    | 接口参数为空字符串， 是否采取默认值
