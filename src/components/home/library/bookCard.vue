<template>
    <div style="width: 80%; height: 90%" class="book">
        <el-tooltip placement="right" effect="light" popper-class="book_tooltip">
            <div slot="content" class="more-meta" style="width: 280px">
                <h3 class="title">{{ bookShowInfo.name }}</h3>
                <p>
                    <span class="author">{{ bookShowInfo.author }} / </span>
                    <span class="year">{{ bookShowInfo['publishDate'] }} / </span>
                    <span class="publisher">{{ bookShowInfo.publisher }}</span>
                </p>
                <p class="abstract">
                    {{ bookShowInfo.content }}
                </p>
            </div>
            <div class="cover" style="width: 100%; height: 80%; overflow: hidden">
                <a href="javascript:void(0)" :title="bookShowInfo.name" @click="toBook()">
                    <img :src="bookShowInfo['cover']" width="100%" height="100%" :alt="bookShowInfo.name">
                </a>
            </div>
        </el-tooltip>
        <div class="info">
            <div class="title longText" style="width: 100%; height: 10%">
                <a href="javascript:void(0)" :title="bookShowInfo.name" @click="toBook()" style="font-size: 13px; text-decoration:none">{{ bookShowInfo.name }}</a>
            </div>
            <div class="author longText" style="font-size: 13px; width: 100%; height: 10%">
                {{ bookShowInfo.author }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "book",
        data() {
            return {

            }
        },
        props: ["bookInfo"],
        methods: {
            toBook() {
                this.$router.push({name: "book", params: {bookInfo: JSON.stringify(this.bookInfo)}})
            }
        },
        computed: {
            bookShowInfo() {
                let name = this.bookInfo.book.cnName;
                let author = this.bookInfo.author.cnName;
                (this.bookInfo.author.formerName) && (author = author + "(" + this.bookInfo.author.formerName + ")");
                ((this.bookInfo.author.citizenship) && (this.bookInfo.author.citizenship != "中")) && (author = "[" + this.bookInfo.author.citizenship + "]" + author);
                let cover = this.GLOBAL.staticResourceServer + "/picture/" + this.bookInfo.book.coverName + ".jpg";
                let publishDate = this.bookInfo.book.publishDate;
                let publisher = this.bookInfo.book.publisher;
                let content = this.bookInfo.book.content;
                if (content.length > 300) {
                    content = content.substring(0, 300) + "...";
                }

                console.log(cover);

                let bookShowInfo = {};
                this.$set(bookShowInfo, "name", name);
                this.$set(bookShowInfo, "author", author);
                this.$set(bookShowInfo, "cover", cover);
                this.$set(bookShowInfo, "publishDate", publishDate);
                this.$set(bookShowInfo, "publisher", publisher);
                this.$set(bookShowInfo, "content", content);

                return bookShowInfo;
            }
        }
    }
</script>

<style scoped>
    .longText {
        overflow: hidden; /* 不显示超出部分 */
        white-space: nowrap; /* 设置文本不换行，直到遇到<br>标签为止 */
        text-overflow: ellipsis; /* 当文本溢出包含元素时，用省略号(...)代替 */
    }
</style>
<style>
    .book_tooltip {
        color: #666;
        background-color: #f9f9f7 !important;
        border-color: #f9f9f7 !important;
    }
</style>
