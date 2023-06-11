<template>
    <div>
        <div class="container">
            <div>
                <el-autocomplete v-model="name1" placeholder="请输入用户ID（必填）" :fetch-suggestions="querySearchAsync"
                    @select="handleSelect" style="margin:10px;width:500px" clearable>
                </el-autocomplete>
            </div>
            <div>
                <el-autocomplete v-model="name2" placeholder="请输入要查询的日期（必填）" :fetch-suggestions="querySearchAsync"
                    @select="handleSelect" style="margin:10px;width:500px" clearable>
                </el-autocomplete>
            
            </div>
            <div>
                <el-autocomplete v-model="name3" placeholder="请输入新闻类别（选填）" :fetch-suggestions="querySearchAsync"
                    @select="handleSelect" style="margin:10px;width:500px" clearable>
                </el-autocomplete>
              
            </div>
            <div>
                <el-autocomplete v-model.number="name4" placeholder="请输入新闻标题长度限制（选填）" :fetch-suggestions="querySearchAsync"
                    @select="handleSelect" style="margin:10px;width:500px" clearable>
                </el-autocomplete>
              
            </div>
            <div>
                <el-autocomplete v-model.number="name5" placeholder="请输入新闻内容长度限制（选填）" :fetch-suggestions="querySearchAsync"
                    @select="handleSelect" style="margin:5px;width:500px" clearable>
                </el-autocomplete>
                
                <el-button type="primary" icon="el-icon-search" @click="drawChart">搜索</el-button>
                <div id="myChart" style="margin: 10px;height: 15px; width:100%">
                </div>
            </div>

            <el-card shadow="hover" style="height: 203px">
					<template #header>
						<div class="clearfix">
							<span>{{ title1 }}</span>
						</div>
					</template>
                    <div class="content-container">
                        <p style="font-size: 16px; color: gray;">{{ content1 }}</p>
                    </div>
			</el-card>
            <el-card shadow="hover" style="height: 203px">
					<template #header>
						<div class="clearfix">
							<span>{{ title2 }}</span>
						</div>
					</template>
                    <div class="content-container">
                        <p style="font-size: 16px; color: gray;">{{ content2 }}</p>
                    </div>
			</el-card>
            <el-card shadow="hover" style="height: 203px">
					<template #header>
						<div class="clearfix">
							<span>{{ title3 }}</span>
						</div>
					</template>
                    <div class="content-container">
                        <p style="font-size: 16px; color: gray;">{{ content3 }}</p>
                    </div>
			</el-card>
            
        </div>
    </div>
</template>



<script>
export default {
    data() {
        return {
            name1: 'U146053',
            name2: '2019-06-14',
            name3: '',
            name4: '',
            name5: '5000',
            title1:'',
            content1:'',
            title2:'',
            content2:'',
            title3:'',
            content3:'',
        };
    },
    methods:{
    drawChart() {
      // 发起 API 请求，传递参数到后端
      this.$axios
        .get("http://localhost:3002/news/CombineSearch", {
          params: {
            userId: this.name1, 
            date: this.name2, 
            category: this.name3, 
            headlineLength: this.name4, 
            newsBodyLength: this.name5, 
          }
        })
        .then(res => {
            console.log("请求成功");
            this.title1 = res.data.data.news[0].title; // 将获取到的新闻标题赋值给 title
            this.title2 = res.data.data.news[1].title;
            this.title3 = res.data.data.news[2].title;
            this.content1 = res.data.data.news[0].content; // 将获取到的新闻内容赋值给 content
            this.content2 = res.data.data.news[1].content;
            this.content3 = res.data.data.news[2].content;
        })
    }
  }
};
</script>



<style scoped>
.el-card {
    font-weight: bolder;
    font-size: larger;
    margin: 10px;
    text-align: center;
    color: lightslategrey;
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

.block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.block:last-child {
  border-right: none;
}
.block .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}

.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-container {
  height: 100px; /* 设置容器的高度，可以根据需要进行调整 */
  overflow: auto; /* 启用滚动条 */
}
</style>
