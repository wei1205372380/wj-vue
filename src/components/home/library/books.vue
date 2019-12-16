<template>
    <div class="bookMain" style="margin-top: 50px">
        <ul style="list-style: none">
            <li>
                <div class="bookShow" style="width: 1020px; height: 810px">
                    <el-row v-for="(rowBooks,i) in currentPageBooks" :key="i" class="bookRow">
                        <el-col v-for="(book,j) in rowBooks" :key="j" :span="4" class="bookCell">
                            <bookCard :book-info="book"/>
                        </el-col>
                    </el-row>
                </div>
            </li>
            <li>
                <div class="pagination">
                    <el-pagination
                        style="text-align: center"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="pageSize"
                        layout="prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </li>
        </ul>

    </div>
</template>

<script>
    import bookCard from "./bookCard";
    import { getBookDetails } from "../../../request/api";

    export default {
        name: "bookMain",
        components: {bookCard},
        data() {
            return {
                bookDetailsList: [],
                currentPage: 1,
                pageSize: 18,
                total: 0
            }
        },
        mounted() {
            getBookDetails(this.$route.query.tagId)
                .then(response => {
                    this.bookDetailsList = response.data.data;
                    this.total = this.bookDetailsList.length;
                })
        },
        computed: {
            currentPageBooks() {
                return this.getShowBooks(this.currentPage);
            }
        },
        methods: {
            getShowBooks(currentPage) {
                if (this.bookDetailsList.length === 0) {
                    return null;
                }
                let numberOfBooks = this.bookDetailsList.length;
                let showBooks = [];
                let firstIndex = (currentPage - 1)*this.pageSize;
                let i,j;
                outer:
                for (i = 0; i < 3; i++) {
                    let rowBooks = [];
                    for (j = 0; j < 6; j++) {
                        rowBooks.push(this.bookDetailsList[firstIndex]);
                        firstIndex++;
                        if (firstIndex === numberOfBooks) {
                            showBooks.push(rowBooks)
                            break outer;
                        }
                    }
                    showBooks.push(rowBooks);
                }
                return showBooks;
            },
            handleSizeChange() {

            },
            handleCurrentChange() {

            }
        }
    }
</script>

<style scoped>
    .bookMain {
        display: flex;
        justify-content: center;
    }
    .bookRow {
        width: 100%;
        height: 270px;
    }
    .bookCell {
        width: 170px;
        height: 100%;
    }
</style>
