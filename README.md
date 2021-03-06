# cloud_music

## 项目描述

1. 介绍: 个人独立编写的仿网易云app的移动端SPA页面
2. 模块: 登录, 用户, 我的, 发现, 云村, 视频, 搜索, 音频播放, 视频播放等子模块
3. 主要技术栈
    - 前台数据处理交互
        - vue
        - vue-router
        - vuex
        - vant-ui
    - 前后台交互
        - axios
        - API接口:NeteaseCloudMusicApi
    - 模块化
        - ES6
        - babel
    - 项目构建/工程化
        - webpack
        - vue-cli
        - eslint
    - css预处理理器
        - sass

## 项目演示地址

[仿网易云](http://8.129.170.77),PC端用手机模式预览

或者扫描二维码访问

![二维码](http://8.129.170.77/music.png)

## 项目目录结构

```js
.src
+-- api
|   +-- apis.js // 相关的api地址
|   +-- fetch.js // 封装的get set请求
+-- assets
|   +-- styles
    |   +-- global.less // 全局应用和修改vant样式
    |   +-- reset.css // 重置样式
|   +-- img // 图片
+-- components // 公共组件
+-- getInfos // 获取图标
|   +-- icons.js // 存取图标信息
+-- getShareInfo // 项目路由页面
|   +-- shareEvent.js // 动态转发数据对应的名称
|   +-- shareInfo.js // 动态数据对应的名称
+-- mixins
|   +-- mixins.js // 混入
+-- plugins
|   +-- vant.js // vant-ui 配置
+-- router // 路由配置
|   +-- common.js // 初始路由
|   +-- find.js // 发现页面相关路由
|   +-- home.js // 我的页面相关路由
|   +-- index.js // 路由配置
|   +-- login.js // 登录页面相关路由
|   +-- search.js // 搜索页面相关路由
|   +-- user.js // 用户页面相关路由
+-- store // vuex 配置使用
|   +-- action.js // action
|   +-- getter.js // getter
|   +-- index.js // store 配置
|   +-- mutation-types.js // mutation-types
|   +-- mutation.js // mutation
|   +-- state.js // state
+-- utils
|   +-- actionsArray.js // 获取随机数和筛选方法
|   +-- crypto.js // 封装的加密与解密方法
|   +-- data.js // 处理日期方法
|   +-- filters.js // 封装的过滤方法
|   +-- getAstro.js // 获取星座
|   +-- randomNumberArray.js // 从数组中取出随机个
|   +-- rem.js // 全局rem配置
|   +-- throttle.js // 节流
+-- views
    +-- default // 默认的一些组建
    +-- findIndex // 发现页面相关组件
    +-- homeIndex // 我的页面相关组件
    +-- loginIndex // 登录页面相关组件
    +-- playMusic // 播放音频页面相关组件
    +-- searchIndex // 搜索页面相关组件
    +-- userInfo // 用户信息页面相关组件
    +-- videoIndex // 视频页面相关组件
    +-- villageIndex // 云村页面相关组件
+-- App.vue // 主组件
+-- main.js // 入口js
```

## 实现功能

1. 未登录的用户
    未登录的用户可以操作的页面
    - 注册页面
    - 登录页面
    - 发现页
      - 歌单广场页面
      - 排行榜页面
      - 私人FM
      - 推荐歌单
      - 推荐新碟与新歌
      - 更多新碟页面
      - 新歌推荐页面
    - 云村
      - 广场页面
    - 搜索页
      - 搜索功能
      - 热搜榜与搜索历史
    - 搜索结果页
      - 综合页
      - 单曲页
      - 视频页
      - 歌手页
      - 专辑页
      - 歌单页
      - 用户页
    - 查看歌单详情
    - 播放音频页面
    - 仅能播放搜索中视频
2. 已登录的用户
    除了拥有未登录用户可以操作的之后,还有
    - 修改密码页
    - 我的页
      - 我的电台页面
      - 我的收藏页面
        - 收藏的专辑
        - 收藏的歌手
        - 收藏的视频
      - 查看创建的歌单
      - 查看收藏的的单
      - 添加删除创建的歌单
      - 添加删除收藏的歌单
    - 发现页
      - 每日推荐
    - 云村页
      - 关注人动态消息
    - 个人信息页
    - 查看他人信息页
    - 视频页

## 部分功能

### 用户未登录

歌单&歌单广场

![歌单&歌单广场](http://8.129.170.77/gif/gif1.gif)

排行榜

![排行榜](http://8.129.170.77/gif/gif2.gif)

私人Fm

![私人Fm](http://8.129.170.77/gif/gif3.gif)

歌单&歌单广场

![歌单&歌单广场](http://8.129.170.77/gif/gif4.gif)

更多新碟

![更多新碟](http://8.129.170.77/gif/gif5.gif)

下拉刷新&新歌推荐

![下拉刷新&新歌推荐](http://8.129.170.77/gif/gif6.gif)

云村-广场

![云村-广场](http://8.129.170.77/gif/gif7.gif)

云村-动态

![云村-动态](http://8.129.170.77/gif/gif8.gif)

视频

![视频](http://8.129.170.77/gif/gif9.gif)

搜索

![搜索](http://8.129.170.77/gif/gif10.gif)

搜索

![搜索](http://8.129.170.77/gif/gif11.gif)

搜索

![搜索](http://8.129.170.77/gif/gif12.gif)

搜索

![搜索](http://8.129.170.77/gif/gif13.gif)

搜索

![搜索](http://8.129.170.77/gif/gif14.gif)

搜索

![搜索](http://8.129.170.77/gif/gif15.gif)

### 用户登录后

登录

![登录](http://8.129.170.77/gif/gif16.gif)

个人主页

![个人主页](http://8.129.170.77/gif/gif17.gif)

我的页面

![我的页面](http://8.129.170.77/gif/gif18.gif)

歌曲播放

![歌曲播放](http://8.129.170.77/gif/gif19.gif)

我的收藏&我的电台

![我的收藏&我的电台](http://8.129.170.77/gif/gif20.gif)

收藏的歌单

![收藏的歌单](http://8.129.170.77/gif/gif21.gif)

收藏歌单

![收藏歌单](http://8.129.170.77/gif/gif22.gif)

今日推荐

![今日推荐](http://8.129.170.77/gif/gif23.gif)

关注人动态

![关注人动态](http://8.129.170.77/gif/gif24.gif)

去用户信息页

![去用户信息页](http://8.129.170.77/gif/gif25.gif)

去用户信息页

![去用户信息页](http://8.129.170.77/gif/gif26.gif)

视频页

![视频页](http://8.129.170.77/gif/gif28.gif)

视频页

![视频页](http://8.129.170.77/gif/gif29.gif)

歌词翻译

![歌词翻译](http://8.129.170.77/gif/gif30.gif)

播放模式

![播放模式](http://8.129.170.77/gif/gif31.gif)

歌词翻译

![歌词翻译](http://8.129.170.77/gif/gif32.gif)

添加歌曲

![添加歌曲](http://8.129.170.77/gif/gif33.gif)
