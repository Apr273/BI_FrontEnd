<template>
    <div>
        <div class="container">
            <div>
                <el-autocomplete v-model="name1" placeholder="请输入要查询的新闻类别" :fetch-suggestions="querySearchAsync"
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
                <el-button type="primary" icon="el-icon-search" @click="fetchData">搜索</el-button>
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

            name1: 'sports',
            name2: '2019-06-14',
            name3: '2019-06-20',

        };
    },

    methods: {
        //柱状图
        fetchData() {
        this.$axios
            .get('http://localhost:3002/news/CategoryClickCount',{
                params: {
                    category: this.name1, 
                    startDate: this.name2, 
                    endDate: this.name3,
                },
            })
            .then(response => {
              const data = response.data.data.clicks;
              this.drawChart(data);
            })
            .catch(error => {
              console.log('An error occurred:', error);
            });
        },

        drawChart(data) {
            const dates = data.map(item => item.date);
            const clickCounts = data.map(item => item.clickCount);
            const chart = this.$echarts.init(document.getElementById('Chart'));
            const option = {
            title: {
              text: '新闻类别点击量的变化',
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
            series: [
              {
                name: '点击量',
                type: 'bar',
                data: clickCounts
              }
            ]
          };

          chart.setOption(option);
        },   
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
