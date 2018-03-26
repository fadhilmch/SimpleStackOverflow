import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SignIn from '@/components/SignIn'
import QuestionList from '@/components/QuestionList'
import QuestionDetail from '@/components/QuestionDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'SignIn',
      component: SignIn
    }, {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          name: 'Home',
          component: QuestionList
        }, {
          path: '/:id',
          name: 'QuestionDetail',
          props: true,
          component: QuestionDetail
        }
      ]
    }
  ]
})
