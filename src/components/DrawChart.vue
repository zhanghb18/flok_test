<template>
  <div>
    <el-container>
      <el-aside width="200px">
          <el-menu>
            <el-submenu index = '1'>
              <template slot="title">图表</template>
              <el-row :gutter="0">
                <div class="chartline">
                  <el-col :span="6">
                    <el-image :src="require('../assets/chartline.png')" style="width:20px;height:20px" @drag.native="drag" @dragend.native="dragend" draggable="true" @mousedown="currentChartId=0"></el-image>
                  </el-col>
                </div>
                <div class="chartbar">
                  <el-col :span="6">
                    <el-image :src="require('../assets/chartbar.png')" style="width:20px;height:20px" @drag.native="drag" @dragend.native="dragend" draggable="true" @mousedown="currentChartId=1"></el-image>
                  </el-col>
                </div>
                <div class="chartcolumn">
                  <el-col :span="6">
                    <el-image :src="require('../assets/条形图.png')" style="width:20px;height:20px" @drag.native="drag" @dragend.native="dragend" draggable="true" @mousedown="currentChartId=2"></el-image>
                  </el-col>
                </div>
                <div class="chartmix">
                  <el-col :span="6">
                    <el-image :src="require('../assets/柱线组合图.png')" style="width:20px;height:20px" @drag.native="drag" @dragend.native="dragend" draggable="true" @mousedown="currentChartId=3"></el-image>
                  </el-col>
                </div>
              </el-row>

              <el-row :gutter="0">
                <div class="chartarea">
                  <el-col :span="6">
                    <el-image :src="require('../assets/面积图.png')" style="width:20px;height:20px" @drag.native="drag" @dragend.native="dragend" draggable="true" @mousedown="currentChartId=4"></el-image>
                  </el-col>
                </div>
                <div class="chartpie">
                  <el-col :span="6">
                    <el-image :src="require('../assets/407饼图.png')" style="width:20px;height:20px" @drag.native="drag" @dragend.native="dragend" draggable="true" @mousedown="currentChartId=5"></el-image>
                  </el-col>
                </div>
                <div class="chartrose">
                  <el-col :span="6">
                    <el-image :src="require('../assets/玫瑰图.png')" style="width:20px;height:20px" @drag.native="drag" @dragend.native="dragend" draggable="true" @mousedown="currentChartId=6"></el-image>
                  </el-col>
                </div>
                <div class="charthorizonmix">
                  <el-col :span="6">
                    <el-image :src="require('../assets/纵向组合图.png')" style="width:20px;height:20px" @drag.native="drag" @dragend.native="dragend" draggable="true" @mousedown="currentChartId=7"></el-image>
                  </el-col>
                </div>
              </el-row>

              <el-row :gutter="0">
                <div class="chartround">
                  <el-col :span="6">
                    <el-image :src="require('../assets/环图.png')" style="width:20px;height:20px" @drag.native="drag" @dragend.native="dragend" draggable="true" @mousedown="currentChartId=8"></el-image>
                  </el-col>
                </div>
              </el-row>

            </el-submenu>
          </el-menu>
        <el-menu id="data_menu" shadow="never" v-show="true" >
          <el-submenu index = '1'>
          <template slot="title">参数区</template>
          <div class="select_title">x轴</div>
          <el-select v-model="x_axis_Id">

            <el-option
              v-for="(item,index) in this.x_axis_Info"
              :value="item.name"
              :key="index"
            ></el-option>
          </el-select>


          <div class="select_title">y轴</div>
          <el-select v-model="y_axis_Id">
            <el-option
              v-for="(item,index) in this.y_axis_Info"
              :value="item.name"
              :key="index"
            ></el-option>
          </el-select>


        <div class="select_title">聚集函数</div>
          <el-select v-model="a_functions">
            <el-option
              v-for="(item,index) in this.a_functions_Info"
              :value="item.name"
              :key="index"
            ></el-option>
          </el-select>


        <div class="select_title">排序字段</div>
          <el-select v-model="data_sort">
            <el-option
              v-for="(item,index) in this.data_sort_Info"
              :value="item.name"
              :key="index"
            ></el-option>
          </el-select>


        <div class="select_title">排序方向</div>
         <el-select v-model="data_sort_dir">
            <el-option
              v-for="(item,index) in this.data_sort_dir_Info"
              :value="item.name"
              :key="index"
            ></el-option>
          </el-select>
          </el-submenu>
        </el-menu>
          <!-- <el-button @drag.native="drag" @dragend.native="dragend" draggable="true" @click="currentChartId=0">
              图1
          </el-button>
          <el-button @drag.native="drag" @dragend.native="dragend" draggable="true"  @click="currentChartId=1">
              图2
          </el-button> -->
      </el-aside>
      <el-main>
        <div id="dashboard">
          <grid-layout  ref="gridlayout" :layout.sync="layout"
            :col-num="12"
            :row-height="100"
            :is-draggable="true"
            :is-resizable="true"
            :vertical-compact="true"
            :use-css-transforms="true"
            :verticalCompact="false"
            style="height:800px"
          >
            <grid-item
              v-for="item in layout"
              :key="`Box${item.i}`"
              :static="item.static"
              :x="item.x"
              :y="item.y"
              :w="item.w"
              :h="item.h"
              :i="item.i"
              :minW="1"
              :minH="1"
            >
              <component 
                :is="'EChartComponent'" 
                :uniqueId="item.i"
                :echartOption="item.option"
              ></component>
          </grid-item>
          </grid-layout>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>

import { GridLayout, GridItem } from "vue-grid-layout";
import { debounce } from 'lodash-es'
import EChartComponent from "./EChartComponent.vue"
import EleResize from '../../resize'

let mouseXY = {"x": null, "y": null};
let DragPos = {"x": null, "y": null, "w": 1, "h": 1, "i": null};

export default {
  components: {
    GridLayout,
    GridItem,
    EChartComponent
  },
  data() {
    return {
      x_axis_Id :"",
      y_axis_Id :"",
      a_functions :"",
      data_sort :"",
      x_axis_Info: [
        {
          id: 1,
          name: "x轴1",
        },
        {
          id: 2,
          name: "x轴2",
        },
      ],
      y_axis_Info: [
        {
          id: 1,
          name: "y轴1",
        },
        {
          id: 2,
          name: "y轴2",
        },
      ],
      a_functions_Info: [
        {
          id: 1,
          name: "最大",
        },
        {
          id: 2,
          name: "最小",
        },
          {
          id: 3,
          name: "平均",
        },
          {
          id: 4,
          name: "求和",
        },
          {
          id: 5,
          name: "方差",
        },
          {
          id: 6,
          name: "标准差",
        },
      ],
      data_sort_Info: [
        {
          id: 1,
          name: "数据1",
        },
        {
          id: 2,
          name: "数据2",
        },
      ],
      data_sort_dir_Info: [
        {
          id: 1,
          name: "从大到小",
        },
        {
          id: 2,
          name: "从小到大",
        },
      ],
      dataFromServer:[
      {
        "x":0, "y":0, "w":4, "h":3,
        i: "A",
        editMode: false,
        hasDataZoom: false,
        myFunctionKeys: [
          {show: true, title: 'myTest', param: 'myTest', icon: 'image://http://echarts.baidu.com/images/favicon.png'}
        ],
        option:{
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          tooltip:{},
          series: [
            {
              data: [150, 230, 224, 218, 135, 147, 260],
              type: 'line'
            }
          ]
        }
      },
      {
        "x":0, "y":4, "w":4, "h":3,
        i: "B",
        editMode: false,
        hasDataZoom: true, 
        myFunctionKeys: [
          {show: true, title: 'myChangeData', param: 'myChangeData', icon: 'path d="M17.896,12.706v-0.005v-0.003L15.855,2.507c-0.046-0.24-0.255-0.413-0.5-0.413H4.899c-0.24,0-0.447,0.166-0.498,0.4L2.106,12.696c-0.008,0.035-0.013,0.071-0.013,0.107v4.593c0,0.28,0.229,0.51,0.51,0.51h14.792c0.28,0,0.51-0.229,0.51-0.51v-4.593C17.906,12.77,17.904,12.737,17.896,12.706 M5.31,3.114h9.625l1.842,9.179h-4.481c-0.28,0-0.51,0.229-0.51,0.511c0,0.703-1.081,1.546-1.785,1.546c-0.704,0-1.785-0.843-1.785-1.546c0-0.281-0.229-0.511-0.51-0.511H3.239L5.31,3.114zM16.886,16.886H3.114v-3.572H7.25c0.235,1.021,1.658,2.032,2.75,2.032c1.092,0,2.515-1.012,2.749-2.032h4.137V16.886z"'}
        ],
        option:{
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [150, 230, 224, 218, 135, 147, 260],
              type: 'bar'
            }
          ]
        }
      },
      {
        "x":0, "y":4, "w":4, "h":3,
        i: "条形图",
        editMode: false,
        hasDataZoom: true, 
        myFunctionKeys: [
          {show: true, title: 'myChangeData', param: 'myChangeData', icon: 'path d="M17.896,12.706v-0.005v-0.003L15.855,2.507c-0.046-0.24-0.255-0.413-0.5-0.413H4.899c-0.24,0-0.447,0.166-0.498,0.4L2.106,12.696c-0.008,0.035-0.013,0.071-0.013,0.107v4.593c0,0.28,0.229,0.51,0.51,0.51h14.792c0.28,0,0.51-0.229,0.51-0.51v-4.593C17.906,12.77,17.904,12.737,17.896,12.706 M5.31,3.114h9.625l1.842,9.179h-4.481c-0.28,0-0.51,0.229-0.51,0.511c0,0.703-1.081,1.546-1.785,1.546c-0.704,0-1.785-0.843-1.785-1.546c0-0.281-0.229-0.511-0.51-0.511H3.239L5.31,3.114zM16.886,16.886H3.114v-3.572H7.25c0.235,1.021,1.658,2.032,2.75,2.032c1.092,0,2.515-1.012,2.749-2.032h4.137V16.886z"'}
        ],
        option:{
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          series: [
            {
              data: [150, 230, 224, 218, 135, 147, 260],
              type: 'bar'
            }
          ]
        }
      },
      {
        "x":0, "y":4, "w":4, "h":3,
        i: "柱线混合图",
        editMode: false,
        hasDataZoom: true, 
        myFunctionKeys: [
          {show: true, title: 'myChangeData', param: 'myChangeData', icon: 'path d="M17.896,12.706v-0.005v-0.003L15.855,2.507c-0.046-0.24-0.255-0.413-0.5-0.413H4.899c-0.24,0-0.447,0.166-0.498,0.4L2.106,12.696c-0.008,0.035-0.013,0.071-0.013,0.107v4.593c0,0.28,0.229,0.51,0.51,0.51h14.792c0.28,0,0.51-0.229,0.51-0.51v-4.593C17.906,12.77,17.904,12.737,17.896,12.706 M5.31,3.114h9.625l1.842,9.179h-4.481c-0.28,0-0.51,0.229-0.51,0.511c0,0.703-1.081,1.546-1.785,1.546c-0.704,0-1.785-0.843-1.785-1.546c0-0.281-0.229-0.511-0.51-0.511H3.239L5.31,3.114zM16.886,16.886H3.114v-3.572H7.25c0.235,1.021,1.658,2.032,2.75,2.032c1.092,0,2.515-1.012,2.749-2.032h4.137V16.886z"'}
        ],
        option:{
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [150, 230, 224, 218, 135, 147, 260],
              type: 'bar'
            },
            {
              data: [150, 230, 224, 218, 135, 147, 260],
              type: 'line'
            }
          ]
        }
      },
      {
        "x":0, "y":4, "w":4, "h":3,
        i: "面积图",
        editMode: false,
        myFunctionKeys: [],
        option:{
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [150, 230, 224, 218, 135, 147, 260],
              type: 'line',
              areaStyle: {}
            }
          ]
        }
      },
      {
        "x":4, "y":23, "w":4, "h":3,
        i: "饼图",
        editMode: false,
        myFunctionKeys: [],
        option:{
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              type: 'pie',
              radius: '50%',
              data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      },
      {
        "x":0, "y":23, "w":4, "h":3,
        i: "玫瑰图",
        editMode: false,
        myFunctionKeys: [],
        option:{
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              type: 'pie',
              radius: ['20%', '70%'],
              data: [
                { value: 45, name: 'Search Engine' },
                { value: 50, name: 'Direct' },
                { value: 55, name: 'Email' },
                { value: 65, name: 'Union Ads' },
                { value: 70, name: 'Video Ads' }
              ],
              roseType: 'area',
              itemStyle: {
                borderRadius: 5
              }
            }
          ]
        }
      },
            {
        "x":8, "y":16, "w":4, "h":4,
        i: "纵向混合图",
        editMode: false,
        myFunctionKeys: [],
        option:{
          yAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          xAxis: {
            type: 'value'
          },
          series: [
            {
              data: [150, 230, 224, 218, 135, 147, 260],
              type: 'bar'
            },
            {
              data: [150, 230, 224, 218, 135, 147, 260],
              type: 'line'
            }
          ]
        }
      },
      {
        "x":8, "y":23, "w":4, "h":3,
        i: "环图",
        editMode: false,
        myFunctionKeys: [],
        option:{
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              type: 'pie',
              radius: ['40%', '70%'],
              data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      }
      ],
      dataToChart:[],
      currentChartId:0,
      layout: [],
      chartW:4,
      chartH:3,
      draggable: true,
      resizable: true,
      responsive: true,
      vueGridLayoutDivWidth: 0,
    };
  },
  mounted(){
    //获取drag时的鼠标坐标
    document.addEventListener("dragover", function (e) {
            mouseXY.x = e.clientX;
            mouseXY.y = e.clientY;
        }, false);

    /*detect vue-grid-layout width*/
    setTimeout(()=>{
      if(document.querySelector('.vue-grid-layout')){
        this.vueGridLayoutDivWidth = document.querySelector('.vue-grid-layout').clientWidth
        EleResize.on(document.querySelector('.vue-grid-layout'), (e) => {
          this.vueGridLayoutDivWidth = e.target.innerWidth
        })
      }
    }, 0)
  },
  computed:{
    currentBreakPoint(){
      return this.vueGridLayoutDivWidth >= 1200
        ? 'lg'
        : this.vueGridLayoutDivWidth >= 996
          ? 'md'
          : this.vueGridLayoutDivWidth >= 768
            ? 'sm'
            : this.vueGridLayoutDivWidth >= 480
              ? 'xs'
              : 'xxs'
    }
  },
  methods:{
    drag: function (e) {
        let parentRect = document.getElementById('dashboard').getBoundingClientRect();
        let mouseInGrid = false;
        if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
            mouseInGrid = true;
        }
        if (mouseInGrid === true && (this.layout.findIndex(item => item.i === 'drop')) === -1) {
          // 添加一个虚拟的块
            this.layout.push({
                x: (this.layout.length * 2) % (this.colNum || 12),
                y: this.layout.length + (this.colNum || 12), // puts it at the bottom
                w: this.chartW,
                h: this.chartH,
                i: 'drop',
            });
        }
        let index = this.layout.findIndex(item => item.i === 'drop');
        if (index !== -1) {
            try {
                this.$refs.gridlayout.$children[this.layout.length].$refs.item.style.display = "none";
            } catch {
            }
            let el = this.$refs.gridlayout.$children[index];
            el.dragging = {"top": mouseXY.y - parentRect.top, "left": mouseXY.x - parentRect.left};
            let new_pos = el.calcXY(mouseXY.y - parentRect.top, mouseXY.x - parentRect.left);
            if (mouseInGrid === true) {
              // dragEvent: function (eventName, id, x, y, h, w)
                this.$refs.gridlayout.dragEvent('dragstart', 'drop', new_pos.x, new_pos.y, 1, 1);
                DragPos.i = String(index);
                DragPos.x = this.layout[index].x;
                DragPos.y = this.layout[index].y;
            }
            if (mouseInGrid === false) {
                this.$refs.gridlayout.dragEvent('dragend', 'drop', new_pos.x, new_pos.y, 1, 1);
                this.layout = this.layout.filter(obj => obj.i !== 'drop');
            }
        }
    },
    dragend: function (e) {
        let parentRect = document.getElementById('dashboard').getBoundingClientRect();
        let mouseInGrid = false;
        if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
            mouseInGrid = true;
        }
        if (mouseInGrid === true) {
            // alert(`Dropped element props:\n${JSON.stringify(DragPos, ['x', 'y', 'w', 'h'], 2)}`);
            this.$refs.gridlayout.dragEvent('dragend', 'drop', DragPos.x, DragPos.y, 1, 1);
            this.layout = this.layout.filter(obj => obj.i !== 'drop');
            // UNCOMMENT below if you want to add a grid-item
            console.log(this.currentChartId);
            let item=this.dataFromServer[this.currentChartId];
            item.x = DragPos.x;
            item.y = DragPos.y;
            item.w = this.chartW;
            item.h = this.chartH;
            item.i = DragPos.i;
            this.layout.push(item);
            this.$refs.gridLayout.dragEvent('dragend', DragPos.i, DragPos.x,DragPos.y,1,1);
            try {
                this.$refs.gridLayout.$children[this.layout.length].$refs.item.style.display="block";
            } catch {
            }
        }
    },
  }
};

</script>

<style scoped>
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: auto;
    height: auto;
  }
  .el-row{
    height: 30px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
    height: auto;
  }
  .el-menu {
    background-color:#86bcf3;
  }
  .el-select{
    margin-bottom: 3px;
    margin-top: 5px;
  }
  .select_title {
    font-size: 14px;
  }
  .el-submenu::v-deep .el-submenu__title {
    height: 30px;
    line-height: 30px ;
  }
  .el-menu::v-deep .el-menu--inline{
    background-color: #E9EEF3;
  }
  .grid-layout {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
    height: auto;
  }
</style>
