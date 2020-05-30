import Vue from 'vue'
import {
  Button,
  Icon,
  Circle,
  Swipe,
  SwipeItem,
  Lazyload,
  Collapse,
  CollapseItem
} from 'vant'

Vue.use(Button)
Vue.use(Icon)
Vue.use(Circle)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload, {
  lazyComponent: true,
  preLoad: 1.3,
  error: require('../assets/img/timg.jpg'),
  loading: require('../assets/img/loading.jpg'),
  attempt: 1,
  listenEvents: ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove']
})
Vue.use(Collapse)
Vue.use(CollapseItem)
