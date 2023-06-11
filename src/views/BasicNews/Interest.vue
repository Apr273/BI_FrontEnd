<template>
    <div>
        <div class="container">
            <div>
                <el-autocomplete v-model="name1" placeholder="请输入用户ID" :fetch-suggestions="querySearchAsync"
                    @select="handleSelect" style="margin:10px;width:500px" clearable>
                </el-autocomplete>
            </div>
            <div>
                <el-autocomplete v-model="name2" placeholder="请输入开始时间" :fetch-suggestions="querySearchAsync"
                    @select="handleSelect" style="margin:10px;width:500px" clearable>
                </el-autocomplete>
            </div>
            <div class="handle-box">
                <el-autocomplete v-model="name3" placeholder="请输入结束时间" :fetch-suggestions="querySearchAsync"
                    @select="handleSelect" style="margin:10px;width:500px" clearable>
                </el-autocomplete>
                <el-button type="primary" icon="el-icon-search" @click="drawChart">搜索</el-button>
            </div>
            <div style="margin: 10px;height: 10px; width:100%"></div>
            <div id="Chart" style="margin: 10px;height: 500px; width:100%"></div>
        </div>

    </div>
</template>

<script>
export default {
    name: "format",
    data() {
        return {
            Chart: null,
            name1: 'U146053',
            name2: '2019-06-14',
            name3: '2019-06-17',
            resList: [],
            timeout: null,
        };
    },

    methods: {
        //多线图
        drawChart() {
            this.$axios
                .get('http://localhost:3002/news/UserCategoryClickCount',{
                    params: {
                        userId: this.name1, 
                        startDate: this.name2, 
                        endDate: this.name3,
                    },
                })
                .then(response => {
                    // 处理返回的数据
                    var data = response.data.data;
                    // 提取日期
                    var dates = [];
                    for (var i = 0; i < data.clicks.length; i++) {
                        var date = data.clicks[i].date;
                        if (!dates.includes(date)) {
                            dates.push(date);
                        }
                    }
                    // 构建图表数据
                    var seriesData = [];
                    for (var j = 0; j < data.categories.length; j++) {
                            var category = data.categories[j];
                            var clickCounts = [];
                    for (var k = 0; k < dates.length; k++) {
                            var date = dates[k];
                            var clickCount = 0;
                        for (var l = 0; l < data.clicks.length; l++) {
                            if (data.clicks[l].category === category && data.clicks[l].date === date) {
                                 clickCount = data.clicks[l].clickCount;
                                break;
                                }
                        }
                        clickCounts.push(clickCount);
                    }
                    seriesData.push({
                        name: category,
                        type: 'line',
                        data: clickCounts
                    });
                }

                // 使用 ECharts 绘制多线图
                var chart = this.$echarts.init(document.getElementById('Chart'));
                var option = {
                    title: {
                        text: '用户浏览兴趣的变化',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        },
                    },
                     xAxis: {
                        name: '时间',
                        type: 'category',
                        data: dates
                    },
                    yAxis: {
                        name: '点击量',
                        type: 'value'
                    },
                    series: seriesData
                };
                chart.setOption(option);
                })
                .catch(function(error) {
                    console.error(error);
                });
            },
        },

        mounted() {
    },
};
</script>

<style scoped>
.handle-select {
    width: 150px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}

.table {
    width: 100%;
    font-size: 14px;
}

.red {
    color: #ff0000;
}

.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
