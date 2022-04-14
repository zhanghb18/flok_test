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
        <el-menu id="data_menu" shadow="never" v-show="true" v-if="currentchart == 0 && currentChartId != -1">
          <el-submenu index="1">
          <template slot="title">参数区</template>
        <div v-if="currentChartId == 0 || currentChartId == 1 || currentChartId == 2 || currentChartId == 3 || currentChartId == 4 || currentChartId == 7">
          <div class="select_title" >x轴</div>
          <el-select v-model="x_axis_Id" @change="getX">

            <el-option
              v-for="(item,index) in this.x_axis_Info"
              :value="item.name"
              :key="index"
            ></el-option>
          </el-select>

          <div class="select_title">y轴</div>
          <el-select v-model="y_axis_Id" @change="getY">
            <el-option
              v-for="(item,index) in this.y_axis_Info"
              :value="item.name"
              :key="index"
            ></el-option>
          </el-select>



        <div class="select_title">聚集函数</div>
          <el-select v-model="a_functions" @change="getFunction">
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
         <el-select v-model="data_sort_dir" @change="getsort">
            <el-option
              v-for="(item,index) in this.data_sort_dir_Info"
              :value="item.name"
              :key="index"
            ></el-option>
          </el-select>

          </div>
          <div v-else>
            <div class="select_title">数据</div>
            <el-select v-model="data_Id" @change="get_data">
              <el-option
                v-for="(item,index) in this.data_Info"
                :value="item.name"
                :key="index"
              ></el-option>
            </el-select>
          </div>
            </el-submenu>

        </el-menu>


        <el-menu id="data_menu2" shadow="never" v-show="true" v-else-if="currentchart == 1 && currentChartId != -1">
          <el-submenu index = '1'>
          <template slot="title">参数区</template>
          <div class="select_title">URL:{{pic_url}}</div>
          </el-submenu>
        </el-menu>


        <el-menu id="data_menu3" shadow="never" v-show="true" v-else-if="currentchart == 2">
          <el-submenu index = '1'>
          <template slot="title">参数区</template>
          <div class="select_title">画布类型</div>
          <el-select v-model="canvas_type">

            <el-option
              v-for="(item,index) in this.canvas_type_data"
              :value="item.name"
              :key="index"
            ></el-option>
          </el-select>

            <div>
              <div v-if="canvas_type == '默认'">
                <div class="select_title">宽度</div>
                <el-input type="value" v-model.number="num1"></el-input>
                <div class="select_title">高度</div>
                <el-input type="value" v-model.number="num2"></el-input>
              </div>

              <div v-if="canvas_type == '纸张'">
                <div class="select_title">纸张类型</div>
                <el-select v-model="paper_type">
                  <el-option
                      v-for="(item,index) in this.paper_type_data"
                      :value="item.name"
                      :key="index"
                  ></el-option>
                </el-select>
              </div>
            </div>

          <div class="select_title">图表主题</div>
          <el-select v-model="data_model_theme">
            <el-option
              v-for="(item,index) in this.data_model_theme_Info"
              :value="item.name"
              :key="index"
            ></el-option>
          </el-select>


        <div class="select_title">看板定时刷新</div>
          <el-button @click="dialog = true">选项</el-button>
            <dialog_c v-if="dialog" :visible.sync="dialog"></dialog_c>
          </el-submenu>
        </el-menu>

      </el-aside>
      <el-main >
        <div id="dashboard" @mouseup="currentchart = 2">
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
              v-for="(item,index) in layout"
              :key="`Box${item.i}`"
              :static="item.static"
              :x="item.x"
              :y="item.y"
              :w="item.w"
              :h="item.h"
              :i="item.i"
              :minW="1"
              :minH="1"
              :class="{active:index==typeActive}"
            >
              <component 
                :is="'EChartComponent'" 
                :uniqueId="item.i"
                :echartOption="item.option"
                @click.native = "getId(item,index)"
              ></component>
          </grid-item>
          </grid-layout>
        </div>
      </el-main>
    </el-container>
    <el-dialog :visible.sync="dialog"></el-dialog>
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
      currentId:0,
      currentType:0,
      currentchart : 0,
      currentId :0,
      dialog:"false",
      pic_url:"www.baidu.com",
      canvas_type:"",
      paper_type:"",
      num1:0,
      num2:0,
      x_axis_Id :"",
      y_axis_Id :"",
      a_functions :"",
      data_sort :"",
      canvas_type_data: [
        {
          id: 1,
          name: "默认",
        },
        {
          id: 2,
          name: "纸张",
        },
      ],
      paper_type_data: [
        {
          id: 1,
          name: "A3",
        },
        {
          id: 2,
          name: "A4",
        },
        {
          id: 3,
          name: "A5",
        },
      ],
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
      data_model_theme_Info: [
        {
          id: 1,
          name: "深色模式",
        },
        {
          id: 2,
          name: "浅色模式",
        },
      ],
      dataOfEcharts:[
      {
        "x":0, "y":0, "w":4, "h":3,
        i: "折线图",
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
        i: "柱形图",
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
            },
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
            },
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
      dataFromServer:{
        "body": [
          [
            "10", 
            "20", 
            "30", 
            "2020-08-10T16:43:05.000+08:00", 
            "1"
          ], 
          [
            "40", 
            "50", 
            "60", 
            "2020-08-10T16:43:16.000+08:00", 
            "2"
          ], 
          [
            "70", 
            "80", 
            "90", 
            "2020-08-11T16:43:42.000+08:00", 
            "3"
          ], 
          [
            "100", 
            "110", 
            "120", 
            "2020-08-12T16:43:46.000+08:00", 
            "4"
          ]
        ], 
        "count": 4, 
        "head": [
          "Time", 
          "root.ln.wf01.wt01.status", 
          "root.ln.wf01.wt01.temperature", 
          "datetime", 
          "tablenum"
        ], 
        "show_count": 4
      }, 
      datatransform:{},
      dataToChart:[],
      currentChartId: -1,
      layout: [],
      chartW:4,
      chartH:3,
      draggable: true,
      resizable: true,
      responsive: true,
      vueGridLayoutDivWidth: 0,
    };
  },
  created() {
    this.dialog = false;
    //加载数据
    var headname = this.dataFromServer.head;
    var x_axis = [];
    var y_axis = [];
    var data = this.dataFromServer.body;
    for(var i = 0; i < headname.length;i++){
      var item = {};
      item["id"] = i + 1;
      item["name"] = headname[i];
      x_axis.push(item);
      y_axis.push(item);
      this.datatransform[headname[i]] = [];
    }
    for(var i = 0; i < headname.length;i++){
      for(var j = 0; j < data.length; j++){
        this.datatransform[headname[i]].push(data[j][i]);
      }
    }
    this.x_axis_Info = x_axis;
    this.y_axis_Info = y_axis;
    console.log("加载数据");
    console.log(this.x_axis_Info);
    console.log(this.y_axis_Info);
    console.log(this.datatransform);
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
        this.currentId = this.currentChartId
        this.currentchart = 0
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
            //let item=Object.assign({},this.dataFromServer[this.currentChartId]);
            let item = JSON.parse(JSON.stringify(this.dataOfEcharts[this.currentChartId]));
            item.x = DragPos.x;
            item.y = DragPos.y;
            item.w = this.chartW;
            item.h = this.chartH;
            item.i = DragPos.i;
            item.type = this.currentChartId;
            item.x_name = "x轴1";
            item.y_name = "y轴1";
            //item.i = this.currentChartId;
            //this.layout[this.currentChartId] = item;
            this.layout.push(item);
            console.log(this.layout);
            this.$refs.gridLayout.dragEvent('dragend', DragPos.i, DragPos.x,DragPos.y,1,1);
            try {
                this.$refs.gridLayout.$children[this.layout.length].$refs.item.style.display="block";
            } catch {
            }
        }
    },
    getId: function(e,index) {
      //console.log(e);
      this.currentId = e.i;
      this.currentChartId = e.type;
      this.currentchart = 0;
      this.x_axis_Id = e.x_name;
      this.y_axis_Id = e.y_name;
      this.typeActive = index;
    },
    getX: function(e) {
      console.log(e);
      console.log(this.currentType);
      if (e == "x轴1") {
        console.log("1");
        console.log(this.layout);
        this.layout[this.currentId].option.xAxis.data = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        this.$forceUpdate();
      }
      if (e == "x轴2") {
        console.log("2");
        //this.$set(this.layout[this.currentId].option.xAxis,data,['1','2','3','4','5','6','7']);
        this.layout[this.currentId].option.xAxis.data = ['1','2','3','4','5','6','7'];
        this.layout[this.currentId].x_name = "x轴2";
        console.log(this.layout);
        this.$forceUpdate();
      }
      if (this.currentType == 0 || this.currentType == 1){
        this.layout[this.currentId].option.xAxis.data = this.datatransform[e];
        this.layout[this.currentId].x_name = e;
        this.$forceUpdate();
      }
    },
    getY: function(e) {
      console.log(e);
      if (e == "y轴1") {
        this.layout[this.currentId].option.series[0].data = [150, 230, 224, 218, 135, 147, 260];
        this.layout[this.currentId].y_name = "y轴1";
        this.$forceUpdate();
      }
      if (e == "y轴2") {
        this.layout[this.currentId].option.series[0].data = [50, 300, 100, 342, 110, 150, 130];
        this.layout[this.currentId].y_name = "y轴2";
        this.$forceUpdate();
      }
    },
    get_data: function(e) {
      console.log(e);
      if (e == "数据1") {
        //todo
        this.$forceUpdate();
      }
      if (e == "数据2") {
        //todo
        this.$forceUpdate();
      }
    },
    std_fc: function(arr){
      var sum=0;
      var s=0;
      for(var i=0;i<arr.length;i++){
          sum+=arr[i]
      }
      var ave=sum/arr.length;
      for(var j=0;j<arr.length;j++){
          s+=Math.pow((ave-arr[j]),2);
      }
      return Math.sqrt((s/arr.length),2);
    },
    fc: function(arr){
      var sum=0;
      var s=0;
      for(var i=0;i<arr.length;i++){
          sum+=arr[i]
      }
      var ave=sum/arr.length;
      for(var j=0;j<arr.length;j++){
          s+=Math.pow((ave-arr[j]),2);
      }
      return (s/arr.length);
    },
    getFunction: function (e) {
      console.log(e);
      var data1 = [150, 230, 224, 218, 135, 147, 260];
      var data2 = [50, 300, 100, 342, 110, 150, 130];
      var data = [];
      if (e == "最大") {
        for(var i = 0; i < data1.length; i++){
          if (data1[i] < data2[i]) data.push(data2[i]);
          else data.push(data1[i]);
        }
        this.layout[this.currentId].option.series[0].data = data;
      }
      if (e == "最小") {
        for(var i = 0; i < data1.length; i++){
          if (data1[i] < data2[i]) data.push(data1[i]);
          else data.push(data2[i]);
        }
        this.layout[this.currentId].option.series[0].data = data;
      }
      if (e == "平均") {
        for(var i = 0; i < data1.length; i++){
          data.push((data1[i]+data2[i])/2);
        }
        this.layout[this.currentId].option.series[0].data = data;
      }
      if (e == "求和") {
        for(var i = 0; i < data1.length; i++){
          data.push(data1[i]+data2[i]);
        }
        this.layout[this.currentId].option.series[0].data = data;
      }
      if (e == "方差") {
        for(var i = 0; i < data1.length; i++){
          var temp = [];
          temp.push(data1[i]);
          temp.push(data2[i]);
          data.push(this.fc(temp));
        }
        this.layout[this.currentId].option.series[0].data = data;
      }
      if (e == "标准差") {
        for(var i = 0; i < data1.length; i++){
          var temp = [];
          temp.push(data1[i]);
          temp.push(data2[i]);
          data.push(this.std_fc(temp));
        }
        this.layout[this.currentId].option.series[0].data = data;
      }
    },
    getsort: function (e) {
      if (e == "从小到大"){
        if (this.layout[this.currentId].y_name == "y轴1") {
          this.layout[this.currentId].option.series[0].data = [150, 230, 224, 218, 135, 147, 260];
          this.layout[this.currentId].option.xAxis.data = ['1','2','3','4','5','6','7'];
        }
        if (this.layout[this.currentId].y_name == "y轴2") {
          this.layout[this.currentId].option.series[0].data = [50, 300, 100, 342, 110, 150, 130];
          this.layout[this.currentId].option.xAxis.data = ['1','2','3','4','5','6','7'];
        }
      }
      if (e == "从大到小"){
        if (this.layout[this.currentId].y_name == "y轴1") {
          this.layout[this.currentId].option.series[0].data = [260,147,135,218,224,230,150];
          this.layout[this.currentId].option.xAxis.data = ['7','6','5','4','3','2','1'];
        }
        if (this.layout[this.currentId].y_name == "y轴2") {
          this.layout[this.currentId].option.series[0].data = [130,150,110,342,100,300,50];
          this.layout[this.currentId].option.xAxis.data = ['7','6','5','4','3','2','1'];
        }
      }
    },
    changeTypeStyle:function(index) {
      console.log("点击样式：");
      this.typeActive=index;
      console.log(this.typeActive);
    },
  }
};

</script>

<style scoped>
  .active {
    border-color: red;
  }
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
