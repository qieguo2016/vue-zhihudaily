<template>
    <div>
        <!--  轮播图  -->
        <swipe :auto="4000" class="swipe-wrap">
            <swipe-item v-for="(item, index) in top_stories">
                <div :style="{'background-image':`url(${item.image})`}" class="image-container"></div>
                <router-link :to="`detail/${item.id}`" class="carousel-caption">
                    <h1 class="zhihu-title">
                        {{item.title}}
                    </h1>
                </router-link>
            </swipe-item>
        </swipe>

        <!--  帖子列表  -->
        <div class="list" v-for="day in list">
            <div class="list-title">
                {{day.date | date}}
            </div>
            <router-link :to="`detail/${item.id}`" v-for="item in day.stories" class="media">
                <div class="media-body">
                    {{item.title}}
                </div>
                <div class="media-right">
                    <img :src="item.images[0]" alt=""/>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import store from '../store'
    import _ from 'lodash'
    import {Swipe, SwipeItem} from 'mint-ui';

    const fetchLatest = store => store.dispatch('FETCH_LATEST')

    export default {
        components: {
            Swipe,
            SwipeItem,
        },
        created () {
            this.scrollListener = _.throttle(e => {
                if (window.innerHeight + document.body.scrollTop + 150 >= document.body.offsetHeight) {
                    this.loadMore()
                }
            }, 250)
        },
        data () {
            return {
                isLoading: false
            }
        },
        computed: {
            ...mapState({
                list: state => state.list
            }),
            top_stories () {
                let top = this.list[0]
                if (top) {
                    return top.top_stories
                }
                return []
            }
        },
        methods: {
            loadMore () {
                if (this.isLoading) {
                    return
                }
                this.isLoading = true
                store.dispatch('FETCH_BEFORE')
                     .then(() => {
                         this.isLoading = false
                     }, () => {
                         this.isLoading = false
                     })
            }
        },
        preFetch: fetchLatest,
        beforeMount () {
            if (!this.list.length) {
                fetchLatest(this.$store)
            }
        },
        activated () {
            window.addEventListener('scroll', this.scrollListener)
        },
        deactivated () {
            window.removeEventListener('scroll', this.scrollListener)
        },
        beforeRouteLeave (to, from, next) {
            sessionStorage.setItem('scrollTop', document.body.scrollTop)
            next()
        }
    }
</script>


<style>
    .view .swipe-wrap {
        height: 450px;
    }

    .image-container {
        height: 450px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }

    .zhihu-title {
        font-size: 30px;
        color: #fff;
    }

    .mint-swipe-indicators .mint-swipe-indicator {
        width: 11px;
        height: 11px;
        background: transparent;
        opacity: 1;
        border: 1px solid #ffffff;
    }

    @media (max-width: 800px) {
        .view .swipe-wrap {
            height: 200px;
        }

        .image-container {
            height: 200px;
        }

        .list {
            padding-left: 10px;
            padding-right: 10px;
        }

        .zhihu-title {
            font-size: 18px;
            margin-bottom: -5px;
        }
    }

    .list-title {
        padding-top: 15px;
        padding-bottom: 15px;
        color: #999;
        font-size: 16px;
        font-weight: bold;
    }

    .media {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        padding: 15px;
        min-height: 80px;
        border-radius: 6px;
        background-color: #fff;
        box-shadow: 0 4px 6px #ccc;
    }

    .media:hover,
    .media:focus {
        transform: scale(1.01);
        text-decoration: none;
        outline: none;
    }

    .media-body {
        color: #444;
        font-size: 16px;
        text-decoration: none;
        padding-right: 10px;
    }

    .media-right img {
        width: 100px;
        height: 100px;
    }

    .media:last-child {
        margin-bottom: 0;
    }

</style>
