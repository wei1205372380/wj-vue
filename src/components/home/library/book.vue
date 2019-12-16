<template>
    <div class="book-paper">
        <div class="book-header">
            <div>
                <h2>{{ this.bookInfo && this.bookInfo.book.cnName }}</h2>
            </div>
            <el-row>
                <el-col :span="17">
                    <el-row>
                        <el-col :span="6">
                            <img :src="this.cover" style="width: 136px; max-height: 200px">
                        </el-col>
                        <el-col :span="7">
                            <span style="font: 13px Helvetica,Arial,sans-serif">
                                <span>作者: {{ this.author }}</span>
                                <br/>
                                <span>出版社: {{ this.bookInfo && this.bookInfo.book.publisher }}</span>
                                <br/>
                                <span>出版年: {{ this.bookInfo && this.bookInfo.book.publishDate }}</span>
                                <br/>
                                <span v-if="this.bookInfo && this.bookInfo.book.formerName">原名: {{ this.bookInfo.book.formerName }}</span>
                            </span>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="7">
                    <div style="border-left: 1px solid #666666; font: 12px Helvetica,Arial,sans-serif; padding-left: 10px; color: #666666">
                        <div>Socks评分</div>
                        <div v-if="this.bookScores && this.bookScores.length === 0">
                            还没有人评价
                        </div>
                        <div v-if="this.bookScores && this.bookScores.length != 0">
                            <div style="margin: 5px 0">
                                <el-rate disabled show-score text-color="#ff9900" v-model="bookScore"></el-rate>
                                <div style="padding-left: 5px">{{ bookScores && bookScores.length }}人评价</div>
                            </div>
                            <div style="padding: 5px 0 0 5px">
                                <div v-for="(item,i) in percentages" :key="i">
                                    <span>{{ 5 - i }}星</span>
                                    <span :style="{display: 'inline-block', height: '10px', width: item + 'px', background: '#FFD596'}"></span>
                                    <span>{{ item }}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div style="padding: 30px 0 30px">
                <div>
                    <el-row>
                        <el-col :span="1" style="font: 13px Helvetica,Arial,sans-serif;" v-if="!score">
                            <span>评价: </span>
                        </el-col>
                        <el-col :span="2" style="font: 13px Helvetica,Arial,sans-serif;" v-if="score">
                            <span>我的评价: </span>
                        </el-col>
                        <el-col :span="6">
                            <el-rate v-model="score" show-text :texts="texts" void-color="#666666" @change="submitScore()">
                            </el-rate>
                        </el-col>
                    </el-row>
                </div>
                <div>
                    <i class="el-icon-chat-round"/>
                    <el-button type="text" @click="openCommentArea()">写书评</el-button>
                    <div v-show="isShowCommentArea" style="width: 70%">
                        <el-input
                            type="textarea"
                            :autosize="{maxRows: 10}"
                            v-model="comment"
                            style="font-size: 12px">
                        </el-input>
                        <el-button size="mini" type="primary" style="margin-top: 10px; float: right" @click="submitComment()">提交</el-button>
                    </div>
                </div>

            </div>
        </div>
        <div class="book-body" style="margin-top: 30px">
            <div class="introduction">
                <div class="other-info-title">
                    内容简介
                </div>
                <div >
                    <pre style="font: 13px Helvetica,Arial, sans-serif; color: #111111">
                        {{ this.bookInfo && this.bookInfo.book.content }}
                        {{ this.bookInfo && this.bookInfo.book.content }}
                        {{ this.bookInfo && this.bookInfo.book.content }}
                        {{ this.bookInfo && this.bookInfo.book.content }}
                        {{ this.bookInfo && this.bookInfo.book.content }}
                        {{ this.bookInfo && this.bookInfo.book.content }}
                    </pre>
                </div>
            </div>
            <div>
                在线阅读功能
            </div>
            <div class="author-introduction">
                作者介绍
            </div>
        </div>
        <div class="body-foot comment-area">
            评论区
        </div>

    </div>
</template>

<script>
    import {getBookScores} from "../../../request/api";
    import {updateBookScore} from "../../../request/api";
    import {addBookComment} from "../../../request/api";

    let userId = localStorage.getItem("userId");

    export default {
        name: "book",
        data() {
            return {
                comment: "",
                isShowCommentArea: false,
                texts: ["很差", "较差", "还行", "推荐", "力荐"],
                score: 0,
                bookInfo: null,
                bookScores: null,
            }
        },
        mounted() {
            this.bookInfo = JSON.parse(this.$route.params.bookInfo);
            if (this.bookInfo) {
                getBookScores(this.bookInfo.book.id)
                    .then(response => {
                        this.bookScores = response.data.data;
                        // 判断是否包含当前用户的评分
                        this.bookScores.some((item) => {
                            if (item.userId == userId) {
                                this.score = item.score;
                                return true;
                            }
                        })
                    });
            }
        },
        computed: {
            cover() {
                return this.bookInfo && this.GLOBAL.staticResourceServer + "/picture/" + this.bookInfo.book.coverName + ".jpg";
            },
            author() {
                if (!this.bookInfo) {
                    return null;
                }
                let author = this.bookInfo.author.cnName;
                (this.bookInfo.author.formerName) && (author = author + "(" + this.bookInfo.author.formerName + ")");
                ((this.bookInfo.author.citizenship) && (this.bookInfo.author.citizenship != "中")) && (author = "[" + this.bookInfo.author.citizenship + "]" + author);
                return author;
            },
            bookScore: {
                get() {
                    if (this.bookScores) {
                        let totalScore = 0;
                        this.bookScores.forEach((item) => {
                            totalScore += item.score;
                        })
                        let num = this.bookScores.length;
                        let avgScore = Math.round((totalScore/num)*10)/10;

                        return avgScore;
                    }
                },
                set (val) {
                }
            },
            percentages() {
                if (this.bookScores) {
                    let arr = [0, 0, 0, 0, 0];
                    this.bookScores.forEach((item) => {
                        arr[item.score - 1]++;
                    })
                    let num = this.bookScores.length;
                    let styleArr = [];
                    for (let i = 0; i < arr.length; i++) {
                        let percentage = Math.round(arr[arr.length - 1 - i]*1000/num)/10;
                        styleArr.push(percentage)
                    }

                    return styleArr;
                }
            }
        },
        methods: {
            submitScore() {
                let bookScore = {
                    "userId": userId,
                    "bookId": this.bookInfo.book.id,
                    "score": this.score
                }
                updateBookScore(bookScore)
                    .then(response => {
                        this.$message({
                            message: response.data.message,
                            type: 'success',
                            duration: 1000
                        });
                    })
            },
            openCommentArea() {
                this.isShowCommentArea = true;
            },
            submitComment() {
                let bookComment = {
                    "userId": userId,
                    "bookId": this.bookInfo.book.id,
                    "comment": this.comment
                };
                addBookComment(bookComment)
                    .then(response => {
                        this.$message({
                            message: response.data.message,
                            type: 'success',
                            duration: 1000
                        });
                    })
            }
        }
    }
</script>

<style scoped>
    .book-paper {
        /*background-color: #F6F6F1;*/
        width: 800px;
        padding: 50px 30px;
    }
    .other-info-title {
        font: 16px Arial, Helvetica, SansSerif;
        color: #007722
    }
</style>
