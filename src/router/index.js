import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import AppIndex from '../components/home/index'
import home from "../components/home/home";
import jotter from "../components/home/jotter";
import library from "../components/home/library";
import admin from "../components/home/admin";
import books from "../components/home/library/books";
import storage from "../request/localStorage";
import LibraryHome from "../components/home/library/LibraryHome";
import book from "../components/home/library/book";

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: login,
            meta: {
                title: "登录页面",
                requireAuth: false
            }
        },
        {
            path: "/home",
            name: "name",
            component: home,
            redirect: "/index",
            children: [
                {
                    path: '/index',
                    name: 'AppIndex',
                    component: AppIndex,
                    meta: {
                        title: "主页",
                        requireAuth: true
                    }
                },
                {
                    path: '/jotter',
                    name: 'jotter',
                    component: jotter,
                    meta: {
                        title: "笔记本",
                        requireAuth: true
                    }
                },
                {
                    path: '/library',
                    name: 'library',
                    component: library,
                    meta: {
                        title: "图书馆",
                        requireAuth: true
                    },
                    redirect: "/LibraryHome",
                    children: [
                        {
                            path: "/LibraryHome",
                            name: "LibraryHome",
                            component: LibraryHome,
                            meta: {
                                title: "图书馆主页",
                                requireAuth: true
                            }
                        },
                        {
                            path: "/books",
                            name: "books",
                            component: books,
                            meta: {
                                requireAuth: true
                            }
                        },
                        {
                            path: "/book/:bookInfo",
                            name: "book",
                            component: book,
                            meta: {
                                requireAuth: true
                            }
                        }
                    ]
                },
                {
                    path: '/admin',
                    name: 'admin',
                    component: admin,
                    meta: {
                        title: "个人中心",
                        requireAuth: true
                    }
                }
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)) {
        let token = storage.getToken();
        if (token) {
            next();
        } else {
            next({
                path: "/",
                query: {redirect: to.fullPath}
            })
        }
    } else {
        next();
    }
});

export default router;

