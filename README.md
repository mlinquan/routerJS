# routerJS

According to pathname load and execute on demand JS, CSS resources.

## How to use.
#### html
```html
<!DOCTYPE html>
<html lang="zh-CN" dir="ltr">
<head>
<meta charset="utf-8">
<title>routerJS</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
<meta name="renderer" content="webkit">
<link rel="shortcut icon" href="/favicon.ico">
<script src="/js/routerJS.js"></script>
<script src="/js/service.js"></script>
</head>

<body>

</body>
</html>
```

#### service.js
```js
var service = new routerJS('routerjs.com');
var service2 = new routerJS('test.routerjs.com');

service.config({
  jsPath: '//static.routerjs.com/js/',// Is remote, Must set 'Access-Control-Allow-Origin' header.
  cssPath: '//static.routerjs.com/css/',
  jsMap: {
    'lib': {
      path: 'lib.js'
    }
  },
  onStart: function() {
    //show loading bar.
  },
  cb: function() {
    //render this page and hide loading bar.
  }
});

service.set('*', {
  'js': {
      path:'common.js',
      require: 'lib'
  },
  'css': 'common.css'
})
.set('/', {
  'js': {
      path:'index.js',
      require: 'common'
  },
  'css': 'common.css'
})
.set('/login', {
  'js': {
      path:'login.js',
      require: 'common'
  },
  'css': 'login.css'
})
.set('/join', {
  'js': {
      path:'join.js',
      require: 'common'
  },
  'css': 'login.css'
})
.run();//important
```

## Config
- `routerJS.debug`

Type : `Boolean`

Default : `false`


- `routerJS.history`

Type : `Boolean`

Default : `false`


- `routerJS.storage`


Type : `Boolean`

Default : `true`


## Item Options

## Public Params

- `routerJS.loadedCSS`
- `routerJS.loadedJS`
- `routerJS.isVirgin`
- `routerJS.isRedirect`

- `routerJS.prevDepth`
- `routerJS.samePathDepth`

Same pathname depth with previous pages