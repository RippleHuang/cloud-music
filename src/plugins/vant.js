import Vue from 'vue'
import {
  Button,
  Icon,
  Circle,
  Swipe,
  SwipeItem,
  Lazyload,
  Collapse,
  CollapseItem,
  Tab,
  Tabs,
  Popup,
  Checkbox,
  CheckboxGroup,
  Toast,
  Dialog
} from 'vant'

Vue.use(Button)
Vue.use(Icon)
Vue.use(Circle)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload, {
  lazyComponent: true,
  preLoad: 1.3,
  error: require('assets/img/timg.jpg'),
  loading: require('assets/img/loading.jpg'),
  attempt: 3,
  listenEvents: ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove']
})
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Popup)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Toast)
Vue.use(Dialog)
