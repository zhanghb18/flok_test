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
          <el-button @click="y_axis_Id = true">选择y轴数据</el-button>
          <dialog_c v-if="dialog" :visible.sync="dialog"></dialog_c>

          <div class="select_attribute" v-if="tvalue !='' && x_axis_Id!=''">
            <div class="select_title">图表标题</div>
            <el-input
              class="input_title"
              placeholder="请输入图表标题"
              v-model="title"
              @change="getTitle"
              clearable>
            </el-input>

            <div class="select_title">x轴label</div>
            <el-input
              class="input_label"
              placeholder="请输入x轴label"
              v-model="x_label"
              @change="getXLabel"
              clearable>
            </el-input>

            <div class="select_title">y轴label</div>
            <el-input
              class="input_label"
              placeholder="请输入y轴label"
              v-model="y_label"
              @change="getYLabel"
              clearable>
            </el-input>

            <div class="select_title">显示设定</div>
            <div style="margin-bottom:5px;background:#ffffff;">
            <el-checkbox class="select_show" v-model="legend" @change="getLegend">图例</el-checkbox>
            <el-checkbox class="select_show" v-model="grid" @change="getGrid">网格</el-checkbox>
            <el-checkbox class="select_show" v-model="axis" @change="getAxis">轴线</el-checkbox>
            <el-checkbox class="select_show" v-model="scale" @change="getScale">刻度</el-checkbox>
            </div>

        <div class="select_title">聚集函数</div>
          <el-select v-model="a_functions" @change="getFunction">
            <el-option
              v-for="(item,index) in this.a_functions_Info"
              :value="item.name"
              :key="index"
            ></el-option>
          </el-select>


        <div class="select_title">排序字段</div>
          <el-select v-model="data_sort" @change="getsortname">
            <el-option
              v-for="(item,index) in this.data_sort_Info"
              :value="item.name"
              :key="index"
            ></el-option>
          </el-select>

              <div v-if="data_sort == 'y轴'">
                <div class="select_title">排序y轴</div>
                <el-select v-model="y_axis_sort_Id" @change="get_ysort_name">
                  <el-option
                    v-for="(item,index) in this.y_axis_Info"
                    :value="item.name"
                    :key="index"
                  ></el-option>
                </el-select>
              </div>

          <div v-if="data_sort_type == 'x轴' || (data_sort == 'y轴' && y_axis_sort_Id != '')">
          <div class="select_title">排序方向</div>
          <el-select v-model="data_sort_dir" @change="getsort">
              <el-option
                v-for="(item,index) in this.data_sort_dir_Info"
                :value="item.name"
                :key="index"
              ></el-option>
            </el-select>
          </div>

          </div>
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

            <div class="select_attribute" v-if="data_Id != ''">
            <div class="select_title">图表标题</div>
            <el-input
              class="input_title"
              placeholder="请输入图表标题"
              v-model="title"
              @change="getTitle"
              clearable>
            </el-input>

            <div class="select_title">显示设定</div>
            <div style="margin-bottom:5px;background:#ffffff;">
            <el-checkbox class="select_show" v-model="legend" @change="getLegend">图例</el-checkbox>
            <el-checkbox class="select_show" v-model="labelLine" @change="getLabelLine">指示线</el-checkbox>
            </div>
            </div>
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
          <el-select v-model="data_model_theme" @change="changeTypeStyle">
            <el-option
              v-for="(item,index) in this.data_model_theme_Info"
              :value="item.name"
              :key="index"
              @click.native = "changeTypeStyle"
            ></el-option>
          </el-select>


        <div class="select_title">看板定时刷新</div>
          <el-button @click="dialog = true">选项</el-button>
            <dialog_c v-if="dialog" :visible.sync="dialog"></dialog_c>
        
        <div class="select_title">看板保存</div>
          <el-button @click="save_layout">保存看板</el-button>
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
                class="e-charts-light"
                :is="'EChartComponent'" 
                :uniqueId="item.i"
                :echartOption="item.option"
                :hasDataZoom="item.hasDataZoom"
                :editMode="item.editMode"
                :myFunctionKeys="item.myFunctionKeys"
                :myTestFunctions="myTestFunctions"
                @click.native = "getId(item,index)"
                style="height:100%"
              ></component>
          </grid-item>
          </grid-layout>
        </div>
      </el-main>
    </el-container>
    <el-dialog :visible.sync="y_axis_Id">
      <el-transfer
              class="y_transfer"
              show-overflow-tooltip
                filterable
                v-model="tvalue"
                :data="transferData"
                :titles="['可选', '已选']"
              @change="getY"
              ></el-transfer>
    </el-dialog>
    <el-dialog :visible.sync="dialog"></el-dialog>
  </div>
</template>

<script>

import { GridLayout, GridItem } from "vue-grid-layout";
import EChartComponent from "./EChartComponent.vue"
import EleResize from '../../resize'
import { saveAs } from 'file-saver';

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
      data_sort_type:"",
      styles : ['e-charts-light', 'e-charts-dark'],
      styleId : 0,
      currentId:0,
      currentchart : 0,
      dialog:"false",
      pic_url:"www.baidu.com",
      canvas_type:"",
      paper_type:"",
      num1:0,
      num2:0,
      data_Id:"",
      x_axis_Id :"",
      y_axis_Id :"",
      y_axis_show :"",
      y_axis_sort_Id:"",
      title:"",
      x_label:"",
      y_label:"",
      legend: true,
      grid: true,
      axis: true,
      scale: true,
      labelLine: true,
      a_functions :"",
      data_sort :"",
      data_sort_dir:"",
      data_model_theme:"",
      tvalue:[],
      transferData:[
        {
          label: "y轴1",
          key: 1
        },
        {
          label: "y轴2",
          key: 2
        },
      ],
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
      data_Info:[],
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
          name: "x轴",
        },
        {
          id: 2,
          name: "y轴",
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
        editMode: true,
        hasDataZoom: true,
        myFunctionKeys: [
          {show: true, title: 'myTest', param: 'myTest', icon: 'image://http://echarts.baidu.com/images/favicon.png'}
        ],
        option:{
          title: {
            text: "",
            x: "center",
            textStyle: {
                fontSize: 14,
            },
          },
          legend: {
            data: ['value'],
            show: true,
            orient:"horizontal",
            right: 10,
            top: 30,
            textStyle: {
                color: '#1a1a1a',
                fontSize: 12,
            },
          },
          toolbox: {
            show : true,                                 //是否显示工具栏组件
            orient:"horizontal",                        //工具栏 icon 的布局朝向'horizontal' 'vertical'
            left: 10,
            top: 5,
            feature: {
              // dataZoom: {
              //   yAxisIndex: 'none'
              // },
              restore: {},
              saveAsImage: {
              }
            },
          },
          dataZoom: [
            {
              show: false,
              realtime: true,
              start: 0,
              end: 100
            },
            {
              type: 'inside',
              realtime: true,
              start: 0,
              end: 100
            }
          ],
          xAxis: {
            name: "",
            nameLocation: "center",
            nameTextStyle: {
              color:"black",
              fontSize:12,
              padding:10,
            },
            type: 'category',
            splitLine: {
              show: true
            },
            axisLine: {
              show: true
            },
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLabel:{//修改坐标系字体颜色
              show:true,
              textStyle:{
                color:"#222222"
              }
            },
          },
          yAxis: {
            name: "",
            nameLocation: "end",
            nameTextStyle: {
              color:"black",
              fontSize:12,
              padding:10,
            },
            type: 'value',
            splitLine: {
              show: true
            },
            axisLine: {
              show: true
            },
            axisLabel:{//修改坐标系字体颜色
              show: true,
              textStyle:{
                color:"#222222"
              }
            },
          },
          // tooltip:{},
          series: [
            {
              name: "value",
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
            {show: true, title: 'myTest', param: 'myTest', icon: 'image://http://echarts.baidu.com/images/favicon.png'}
          // {show: true, title: 'myChangeData', param: 'myChangeData', icon: 'path d="M17.896,12.706v-0.005v-0.003L15.855,2.507c-0.046-0.24-0.255-0.413-0.5-0.413H4.899c-0.24,0-0.447,0.166-0.498,0.4L2.106,12.696c-0.008,0.035-0.013,0.071-0.013,0.107v4.593c0,0.28,0.229,0.51,0.51,0.51h14.792c0.28,0,0.51-0.229,0.51-0.51v-4.593C17.906,12.77,17.904,12.737,17.896,12.706 M5.31,3.114h9.625l1.842,9.179h-4.481c-0.28,0-0.51,0.229-0.51,0.511c0,0.703-1.081,1.546-1.785,1.546c-0.704,0-1.785-0.843-1.785-1.546c0-0.281-0.229-0.511-0.51-0.511H3.239L5.31,3.114zM16.886,16.886H3.114v-3.572H7.25c0.235,1.021,1.658,2.032,2.75,2.032c1.092,0,2.515-1.012,2.749-2.032h4.137V16.886z"'}
        ],
        option:{
          title: {
            text: "",
            x: "center",
            textStyle: {
                fontSize: 14,
            },
          },
          legend: {
            data: ['value'],
            show: true,
            orient:"vertical",
            right: 10,
            top: 30,
            textStyle: {
                color: '#1a1a1a',
                fontSize: 12,
            },
          },
          toolbox: {
            show : true,                                 //是否显示工具栏组件
            orient:"horizontal",                        //工具栏 icon 的布局朝向'horizontal' 'vertical'
            left: 10,
            top: 5,
            feature: {
              // dataZoom: {
              //   yAxisIndex: 'none'
              // },
              restore: {},
              saveAsImage: {
              }
            },
          },
          dataZoom: [
            {
              show: false,
              realtime: true,
              start: 0,
              end: 100
            },
            {
              type: 'inside',
              realtime: true,
              start: 0,
              end: 100
            }
          ],
          xAxis: {
            name: "",
            nameLocation: "center",
            nameTextStyle: {
              color:"black",
              fontSize:12,
              padding:10,
            },
            type: 'category',
            splitLine: {
              show: true
            },
            axisLine: {
              show: true
            },
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLabel:{//修改坐标系字体颜色
              show:true,
              textStyle:{
                color:"#222222"
              }
            },
          },
          yAxis: {
            name: "",
            nameLocation: "end",
            nameTextStyle: {
              color:"black",
              fontSize:12,
              padding:10,
            },
            type: 'value',
            splitLine: {
              show: true
            },
            axisLine: {
              show: true
            },
            axisLabel:{//修改坐标系字体颜色
              show:true,
              textStyle:{
                color:"#222222"
              }
            },
          },
          series: [
            {
              name: "value",
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
            {show: true, title: 'myTest', param: 'myTest', icon: 'image://http://echarts.baidu.com/images/favicon.png'}
          // {show: true, title: 'myChangeData', param: 'myChangeData', icon: 'path d="M17.896,12.706v-0.005v-0.003L15.855,2.507c-0.046-0.24-0.255-0.413-0.5-0.413H4.899c-0.24,0-0.447,0.166-0.498,0.4L2.106,12.696c-0.008,0.035-0.013,0.071-0.013,0.107v4.593c0,0.28,0.229,0.51,0.51,0.51h14.792c0.28,0,0.51-0.229,0.51-0.51v-4.593C17.906,12.77,17.904,12.737,17.896,12.706 M5.31,3.114h9.625l1.842,9.179h-4.481c-0.28,0-0.51,0.229-0.51,0.511c0,0.703-1.081,1.546-1.785,1.546c-0.704,0-1.785-0.843-1.785-1.546c0-0.281-0.229-0.511-0.51-0.511H3.239L5.31,3.114zM16.886,16.886H3.114v-3.572H7.25c0.235,1.021,1.658,2.032,2.75,2.032c1.092,0,2.515-1.012,2.749-2.032h4.137V16.886z"'}
        ],
        option:{
          title: {
            text: "",
            x: "center",
            textStyle: {
                fontSize: 14,
            },
          },
          legend: {
            data: ['value'],
            show: true,
            orient:"vertical",
            right: 10,
            top: 30,
            textStyle: {
                color: '#1a1a1a',
                fontSize: 12,
            },
          },
          toolbox: {
            show : true,                                 //是否显示工具栏组件
            orient:"horizontal",                        //工具栏 icon 的布局朝向'horizontal' 'vertical'
            left: 10,
            top: 5,
            feature: {
              // dataZoom: {
              //   yAxisIndex: 'none'
              // },
              restore: {},
              saveAsImage: {
              }
            },
          },
          dataZoom: [
            {
              show: false,
              realtime: true,
              start: 0,
              end: 100
            },
            {
              type: 'inside',
              realtime: true,
              start: 65,
              end: 85
            }
          ],
          xAxis: {
            name: "",
            nameLocation: "center",
            nameTextStyle: {
              color: "black",
              fontSize: 12,
              padding: 10,
            },
            type: 'value',
            splitLine: {
              show: true
            },
            axisLine: {
              show: true
            },
            axisLabel:{//修改坐标系字体颜色
              show:true,
              textStyle:{
                color:"#222222"
              }
            },
          },
          yAxis: {
            name: "",
            nameLocation: "end",
            nameTextStyle: {
              color:"black",
              fontSize:12,
              padding:10,
            },
            type: 'category',
            splitLine: {
              show: true
            },
            axisLine: {
              show: true
            },
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLabel:{//修改坐标系字体颜色
              show:true,
              textStyle:{
                color:"#222222"
              }
            },
          },
          series: [
            {
              name: "value",
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
            {show: true, title: 'myTest', param: 'myTest', icon: 'image://http://echarts.baidu.com/images/favicon.png'}
          // {show: true, title: 'myChangeData', param: 'myChangeData', icon: 'path d="M17.896,12.706v-0.005v-0.003L15.855,2.507c-0.046-0.24-0.255-0.413-0.5-0.413H4.899c-0.24,0-0.447,0.166-0.498,0.4L2.106,12.696c-0.008,0.035-0.013,0.071-0.013,0.107v4.593c0,0.28,0.229,0.51,0.51,0.51h14.792c0.28,0,0.51-0.229,0.51-0.51v-4.593C17.906,12.77,17.904,12.737,17.896,12.706 M5.31,3.114h9.625l1.842,9.179h-4.481c-0.28,0-0.51,0.229-0.51,0.511c0,0.703-1.081,1.546-1.785,1.546c-0.704,0-1.785-0.843-1.785-1.546c0-0.281-0.229-0.511-0.51-0.511H3.239L5.31,3.114zM16.886,16.886H3.114v-3.572H7.25c0.235,1.021,1.658,2.032,2.75,2.032c1.092,0,2.515-1.012,2.749-2.032h4.137V16.886z"'}
        ],
        option:{
          toolbox: {
            show : true,                                 //是否显示工具栏组件
            orient:"horizontal",                        //工具栏 icon 的布局朝向'horizontal' 'vertical'
            left: 10,
            top: 5,
            feature: {
              // dataZoom: {
              //   yAxisIndex: 'none'
              // },
              restore: {},
              saveAsImage: {
              }
            },
          },
          dataZoom: [
            {
              show: false,
              realtime: true,
              start: 0,
              end: 100
            },
            {
              type: 'inside',
              realtime: true,
              start: 65,
              end: 85
            }
          ],
          title: {
            text: "",
            x: "center",
            textStyle: {
                fontSize: 14,
            },
          },
          legend: {
            data: ['value1', 'value2'],
            show: true,
            orient:"horizontal",
            right: 10,
            top: 30,
            textStyle: {
                color: '#1a1a1a',
                fontSize: 12,
            },
          },
          xAxis: {
            name: "",
            nameLocation: "center",
            nameTextStyle: {
              color:"black",
              fontSize:12,
              padding:10,
            },
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            splitLine: {
              show: true
            },
            axisLine: {
              show: true
            },
            axisLabel:{//修改坐标系字体颜色
              show:true,
              textStyle:{
                color:"#222222"
              }
            },
          },
          yAxis: {
            name: "",
            nameLocation: "end",
            nameTextStyle: {
              color:"black",
              fontSize:12,
              padding:10,
            },
            type: 'value',
            splitLine: {
              show: true
            },
            axisLine: {
              show: true
            },
            axisLabel:{//修改坐标系字体颜色
              show:true,
              textStyle:{
                color:"#222222"
              }
            },
          },
          series: [
            {
              name: "value1",
              data: [150, 230, 224, 218, 135, 147, 260],
              type: 'bar'
            },
            {
              name: "value2",
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
          title: {
            text: "",
            x: "center",
            textStyle: {
                fontSize: 14,
            },
          },
          legend: {
            data: ['value'],
            show: true,
            orient:"horizontal",
            right: 10,
            top: 30,
            textStyle: {
                color: '#1a1a1a',
                fontSize: 12,
            },
          },
          toolbox: {
            show : true,                                 //是否显示工具栏组件
            orient:"horizontal",                        //工具栏 icon 的布局朝向'horizontal' 'vertical'
            left: 10,
            top: 5,
            feature: {
              // dataZoom: {
              //   yAxisIndex: 'none'
              // },
              restore: {},
              saveAsImage: {
              }
            },
          },
          dataZoom: [
            {
              show: false,
              realtime: true,
              start: 0,
              end: 100
            },
            {
              type: 'inside',
              realtime: true,
              start: 65,
              end: 85
            }
          ],
          xAxis: {
            name: "",
            nameLocation: "center",
            nameTextStyle: {
              color:"black",
              fontSize:12,
              padding:10,
            },
            type: 'category',
            splitLine: {
              show: true
            },
            axisLine: {
              show: true
            },
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLabel:{//修改坐标系字体颜色
              show:true,
              textStyle:{
                color:"#222222"
              }
            },
          },
          yAxis: {
            name: "",
            nameLocation: "end",
            nameTextStyle: {
              color:"black",
              fontSize:12,
              padding:10,
            },
            type: 'value',
            splitLine: {
              show: true
            },
            axisLine: {
              show: true
            },
            axisLabel:{//修改坐标系字体颜色
              show:true,
              textStyle:{
                color:"#222222"
              }
            },
          },
          series: [
            {
              name: "value",
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
          title: {
            text: "",
            x: "center",
            textStyle: {
                fontSize: 14,
            },
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            show: true,
            orient: 'vertical',
            left: 'left',
            textStyle:{
                color:"#222222"
            }
          },
          toolbox: {
            show : true,                                 //是否显示工具栏组件
            orient:"horizontal",                        //工具栏 icon 的布局朝向'horizontal' 'vertical'
            feature: {
              // dataZoom: {
              //   yAxisIndex: 'none'
              // },
              restore: {},
              saveAsImage: {
              }
            },
          },
          series: [
            {
              type: 'pie',
              radius: '50%',
              label: {
                normal: {
                  show: true,
                }
              },
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
          title: {
            text: "",
            x: "center",
            textStyle: {
                fontSize: 14,
            },
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            show: true,
            orient: 'vertical',
            left: 'left',
            textStyle:{
                color:"#222222"
            }
          },
          toolbox: {
            show : true,                                 //是否显示工具栏组件
            orient:"horizontal",                        //工具栏 icon 的布局朝向'horizontal' 'vertical'
            feature: {
              // dataZoom: {
              //   yAxisIndex: 'none'
              // },
              restore: {},
              saveAsImage: {
              }
            },
          },
          series: [
            {
              type: 'pie',
              radius: ['20%', '70%'],
              label: {
                normal: {
                  show: true,
                }
              },
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
          title: {
            text: "",
            x: "center",
            textStyle: {
                fontSize: 14,
            },
          },
          legend: {
            data: ['value1', 'value2'],
            show: true,
            orient:"horizontal",
            right: 10,
            top: 30,
            textStyle: {
                color: '#1a1a1a',
                fontSize: 12,
            },
          },
          toolbox: {
            show : true,                                 //是否显示工具栏组件
            orient:"horizontal",                        //工具栏 icon 的布局朝向'horizontal' 'vertical'
            left: 10,
            top: 5,
            feature: {
              // dataZoom: {
              //   yAxisIndex: 'none'
              // },
              restore: {},
              saveAsImage: {
              }
            },
          },
          dataZoom: [
            {
              show: false,
              realtime: true,
              start: 0,
              end: 100
            },
            {
              type: 'inside',
              realtime: true,
              start: 65,
              end: 85
            }
          ],
          yAxis: {
            name: "",
            nameLocation: "end",
            nameTextStyle: {
              color:"black",
              fontSize:12,
              padding:10,
            },
            type: 'category',
            splitLine: {
              show: true
            },
            axisLine: {
              show: true
            },
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLabel:{//修改坐标系字体颜色
              show:true,
              textStyle:{
                color:"#222222"
              }
            },
          },
          xAxis: {
            name: "",
            nameLocation: "center",
            nameTextStyle: {
              color:"black",
              fontSize:12,
              padding:10,
            },
            splitLine: {
              show: true
            },
            axisLine: {
              show: true
            },
            type: 'value',
            axisLabel:{//修改坐标系字体颜色
              show:true,
              textStyle:{
                color:"#222222"
              }
            },
          },
          series: [
            {
              name: "value1",
              data: [150, 230, 224, 218, 135, 147, 260],
              type: 'bar'
            },
            {
              name: "value2",
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
          title: {
            text: "",
            x: "center",
            textStyle: {
                fontSize: 14,
            },
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            show: true,
            orient: 'vertical',
            left: 'left',
            textStyle: {
              color: "#222222"
            }
          },
          toolbox: {
            show : true,                                 //是否显示工具栏组件
            orient:"horizontal",                        //工具栏 icon 的布局朝向'horizontal' 'vertical'
            feature: {
              // dataZoom: {
              //   yAxisIndex: 'none'
              // },
              restore: {},
              saveAsImage: {
              }
            },
          },
          series: [
            {
              type: 'pie',
              radius: ['40%', '70%'],
              label: {
                normal: {
                  show: true,
                }
              },
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
          ],
          [
            "100",
            "120",
            "135",
            "2020-08-12T16:43:48.000+08:00",
            "5"
          ]
        ], 
        "count": 5,
        "head": [
          "Time", 
          "root.ln.wf01.wt01.status", 
          "root.ln.wf01.wt01.temperature", 
          "datetime", 
          "tablenum"
        ], 
        "show_count": 5
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
      font_color: '#222222'
    };
  },
  created() {
    this.dialog = false;
    this.y_axis_Id = false;
    this.y_axis_show = false;
    //加载数据
    var headname = this.dataFromServer.head;
    var x_axis = [];
    var y_axis = [];
    var data = this.dataFromServer.body;
    for(var i = 0; i < headname.length;i++){
      var item = {};
      item["id"] = i;
      item["name"] = headname[i];
      x_axis.push(item);
      this.datatransform[headname[i]] = [];
    }
    for(var i = 0; i < headname.length;i++){
      var item = {};
      item["key"] = i;
      item["label"] = headname[i];
      y_axis.push(item);
      this.datatransform[headname[i]] = [];
    }
    for(var i = 0; i < headname.length;i++){
      for(var j = 0; j < data.length; j++){
        this.datatransform[headname[i]].push(data[j][i]);
      }
    }
    this.x_axis_Info = x_axis;
    this.transferData = y_axis;
    this.data_Info = x_axis;
    console.log("加载数据");
    console.log(this.x_axis_Info);
    console.log(this.y_axis_Info);
    console.log(this.datatransform);

    var appData = require('../save.json');
    console.log(appData);
    //this.layout = appData;
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
            item.x_name = "";
            item.y_name = [];
            item.data_name = "";
            item.function_name = "";
            item.data_sort_name = "";
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
      //todo:y轴穿梭框的数据为tvalue，需要点击新图时赋值
      this.tvalue = e.y_name;
      this.data_Id = e.data_name;
      this.a_functions = e.function_name;
      this.data_sort_dir = e.data_sort_name;
      if(e.data_sort_axis == "x轴"){
        this.data_sort_type = "x轴"
        this.data_sort = e.x_name;
      } 
      else this.data_sort = e.data_sort_axis;
      this.y_axis_sort_Id = e.y_axis_sort_name;
      console.log(this.data_Id);
      this.typeActive = index;
      this.title = e.title
      this.x_label = e.x_label
      this.y_label = e.y_label
      this.legend = this.layout[this.currentId].option.legend.show
      this.grid = this.layout[this.currentId].option.xAxis.splitLine.show
      this.axis = this.layout[this.currentId].option.xAxis.axisLine.show
      this.scale = this.layout[this.currentId].option.xAxis.axisLabel.show
      this.labelLine = this.layout[this.currentId].option.series[0].label.normal.show
    },
    getX: function(e) {
      console.log(e);
      console.log(this.currentChartId);
      if(this.layout[this.currentId].function_name != ""){
        this.layout[this.currentId].function_name = "";
        this.a_functions = "";
        this.getY(this.layout[this.currentId].y_name);
      }
      if(this.layout[this.currentId].data_sort_name != ""){
        this.layout[this.currentId].data_sort_name = "";
        this.data_sort = "";
        this.data_sort_type = "";
        this.getY(this.layout[this.currentId].y_name);
      }
      this.layout[this.currentId].x_name = e;
      if (this.currentChartId == 0 || this.currentChartId == 1 || this.currentChartId == 4){
        this.layout[this.currentId].option.xAxis.data = this.datatransform[e];
        this.$forceUpdate();
      }
      if (this.currentChartId == 2) {
        this.layout[this.currentId].option.yAxis.data = this.datatransform[e];
        this.$forceUpdate();
      }
      if (this.currentChartId == 3) {
        this.layout[this.currentId].option.xAxis.data = this.datatransform[e];
        this.$forceUpdate();
      }
      if (this.currentChartId == 7) {
        this.layout[this.currentId].option.yAxis.data = this.datatransform[e];
        this.$forceUpdate();
      }
      this.layout[this.currentId].xdata = JSON.parse(JSON.stringify(this.datatransform[e]));
    },
    getY: function(e) {
      if(this.layout[this.currentId].function_name != ""){
        this.layout[this.currentId].function_name = "";
        this.a_functions = "";
        this.getX(this.layout[this.currentId].x_name);
      }
      if(this.layout[this.currentId].data_sort_name != ""){
        this.layout[this.currentId].data_sort_name = "";
        this.data_sort = "";
        this.data_sort_type = "";
        this.getX(this.layout[this.currentId].x_name);
      }
      this.layout[this.currentId].y_name = e;
      if (this.currentChartId == 0 || this.currentChartId == 1 || this.currentChartId == 2 || this.currentChartId == 4){
        var type = this.layout[this.currentId].option.series[0].type;
        this.layout[this.currentId].option.series = [];
        this.layout[this.currentId].option.legend.data = []
        for(var i = 0; i < e.length; i++){
          this.layout[this.currentId].option.series.push({});
          this.layout[this.currentId].option.legend.data.push(this.transferData[e[i]].label);
          this.layout[this.currentId].option.series[i].name = this.transferData[e[i]].label;
          this.layout[this.currentId].option.series[i].data = this.datatransform[this.transferData[e[i]].label];
          this.layout[this.currentId].option.series[i].type = type;
        }
        this.$forceUpdate();
      }
      if (this.currentChartId == 3 || this.currentChartId == 7) { // 柱线混合图和纵向混合图
        var type1 = this.layout[this.currentId].option.series[0].type
        var type2 = this.layout[this.currentId].option.series[1].type
        this.layout[this.currentId].option.series = [];
        this.layout[this.currentId].option.legend.data = []
        for(var i = 0; i < e.length; i++){
          this.layout[this.currentId].option.series.push({});
          this.layout[this.currentId].option.series.push({});
          this.layout[this.currentId].option.legend.data.push(this.transferData[e[i]].label);
          //添加第一种图表
          this.layout[this.currentId].option.series[2*i].name = this.transferData[e[i]].label;
          this.layout[this.currentId].option.series[2*i].data = this.datatransform[this.transferData[e[i]].label];
          this.layout[this.currentId].option.series[2*i].type = type1;
          //添加第二种图表
          this.layout[this.currentId].option.series[2*i+1].name = this.transferData[e[i]].label;
          this.layout[this.currentId].option.series[2*i+1].data = this.datatransform[this.transferData[e[i]].label];
          this.layout[this.currentId].option.series[2*i+1].type = type2;
        }
        this.$forceUpdate();
      }
      this.layout[this.currentId].ydata = JSON.parse(JSON.stringify(this.layout[this.currentId].option.series));
    },
    get_data: function(e) {
      console.log(e);
      if (this.currentChartId == 5 || this.currentChartId == 6 || this.currentChartId == 8) {
        var data = [];
        for(var i = 0; i < this.datatransform[e].length;i++){
          var item = {};
          item['value'] = this.datatransform[e][i];
          item['name'] = this.datatransform[e][i];
          data.push(item);
        }
        console.log(data);
        this.layout[this.currentId].option.series[0].data = data;
        this.layout[this.currentId].data_name = e;
        this.$forceUpdate();
      }
    },
    std_fc: function(arr){
      var sum=0;
      var s=0;
      for(var i=0;i<arr.length;i++){
          sum+=parseInt(arr[i]);
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
          sum+=parseInt(arr[i]);
      }
      var ave=sum/arr.length;
      for(var j=0;j<arr.length;j++){
          s+=Math.pow((ave-arr[j]),2);
      }
      return (s/arr.length);
    },
    average:function(arr){
      var sum=0;
      for(var i=0;i<arr.length;i++){
          sum+=parseInt(arr[i]);
      }
      var ave=sum/arr.length;
      return ave;
    },
    sum:function(arr){
      var sum=0;
      for(var i=0;i<arr.length;i++){
          sum+=parseInt(arr[i]);
      }
      return sum;
    },
    getTitle: function(e) {
      this.layout[this.currentId].title = e;
      this.layout[this.currentId].option.title.text = e;
    },
    getXLabel: function(e) {
      this.layout[this.currentId].x_label = e;
      if (this.currentChartId == 0 || this.currentChartId == 1 || this.currentChartId == 4){
        this.layout[this.currentId].option.xAxis.name = e;
      }
      if (this.currentChartId == 2) {
        this.layout[this.currentId].option.yAxis.name = e;
      }
      if (this.currentChartId == 3) {
        this.layout[this.currentId].option.xAxis.name = e;
      }
      if (this.currentChartId == 7) {
        this.layout[this.currentId].option.yAxis.name = e;
      }
    },
    getYLabel: function(e) {
      this.layout[this.currentId].y_label = e;
      if (this.currentChartId == 0 || this.currentChartId == 1 || this.currentChartId == 4){
        this.layout[this.currentId].option.yAxis.name = e;
      }
      if (this.currentChartId == 2) {
        this.layout[this.currentId].option.xAxis.name = e;
      }
      if (this.currentChartId == 3) {
        this.layout[this.currentId].option.yAxis.name = e;
      }
      if (this.currentChartId == 7) {
        this.layout[this.currentId].option.xAxis.name = e;
      }
    },
    getLegend: function(e) {
      this.layout[this.currentId].legend = e;
      this.layout[this.currentId].option.legend.show = e;
    },
    getGrid: function(e) {
      this.layout[this.currentId].grid = e;
      this.layout[this.currentId].option.xAxis.splitLine.show = e;
      this.layout[this.currentId].option.yAxis.splitLine.show = e;
    },
    getAxis: function(e) {
      this.layout[this.currentId].axis = e;
      this.layout[this.currentId].option.xAxis.axisLine.show = e;
      this.layout[this.currentId].option.yAxis.axisLine.show = e;
    },
    getScale: function(e) {
      this.layout[this.currentId].scale = e;
      this.layout[this.currentId].option.xAxis.axisLabel.show = e;
      this.layout[this.currentId].option.yAxis.axisLabel.show = e;
    },
    getLabelLine: function(e) {
      this.layout[this.currentId].labelLine = e;
      this.layout[this.currentId].option.series[0].label.normal.show = e;
      this.$forceUpdate();
    },
    getFunction: function (e) {
      console.log(e);
      var xdata;
      var ydata = [];
      var x_newdata = [];
      var y_newdata = [];
      this.data_sort = '';
      this.data_sort_dir = '';
      this.y_axis_sort_Id = '';
      if (e == "最大") {
        this.layout[this.currentId].function_name = e;
        xdata = this.layout[this.currentId].xdata;
        var y_number = this.layout[this.currentId].ydata.length;
        for(var i = 0; i < y_number; i++){
          ydata.push(this.layout[this.currentId].ydata[i].data);
        }
        console.log(y_number);
        console.log(xdata);
        console.log(ydata);
        var data = {};
        for(var i = 0; i < xdata.length; i++){
          data[xdata[i]] = [];
        }
        for(var key in data){
          x_newdata.push(key);
            for(var i = 0; i < y_number; i++) data[key].push([]);
        }
        for(var i = 0; i < xdata.length; i++){
          for(var j = 0; j < y_number; j++) {
            data[xdata[i]][j].push(ydata[j][i]);
          }
        }
        for(var i = 0; i < y_number; i++){
          var item = [];
          for(var key in data){
            item.push(Math.max.apply(null,data[key][i]));
          }
          y_newdata.push(item);
        }
        console.log(x_newdata);
        console.log(y_newdata);
        for(var i = 0; i < y_number; i++){
          this.layout[this.currentId].option.series[i].data = y_newdata[i];
        }
        if(this.currentChartId == 2 || this.currentChartId == 7){
          this.layout[this.currentId].option.yAxis.data = x_newdata;
        }
        else{
          this.layout[this.currentId].option.xAxis.data = x_newdata;
        }
        console.log(this.layout[this.currentId]);
        this.$forceUpdate();
      }
      if (e == "最小") {
        this.layout[this.currentId].function_name = e;
        xdata = this.layout[this.currentId].xdata;
        var y_number = this.layout[this.currentId].ydata.length;
        for(var i = 0; i < y_number; i++){
          ydata.push(this.layout[this.currentId].ydata[i].data);
        }
        console.log(xdata);
        console.log(ydata);
        var data = {};
        for(var i = 0; i < xdata.length; i++){
          data[xdata[i]] = [];
        }
        for(var key in data){
          x_newdata.push(key);
            for(var i = 0; i < y_number; i++) data[key].push([]);
        }
        for(var i = 0; i < xdata.length; i++){
          for(var j = 0; j < y_number; j++) {
            data[xdata[i]][j].push(ydata[j][i]);
          }
        }
        for(var i = 0; i < y_number; i++){
          var item = [];
          for(var key in data){
            item.push(Math.min.apply(null,data[key][i]));
          }
          y_newdata.push(item);
        }
        console.log(x_newdata);
        console.log(y_newdata);
        for(var i = 0; i < y_number; i++){
          this.layout[this.currentId].option.series[i].data = y_newdata[i];
        }
        if(this.currentChartId == 2 || this.currentChartId == 7){
          this.layout[this.currentId].option.yAxis.data = x_newdata;
        }
        else{
          this.layout[this.currentId].option.xAxis.data = x_newdata;
        }
      }
      if (e == "平均") {
        this.layout[this.currentId].function_name = e;
        xdata = this.layout[this.currentId].xdata;
        var y_number = this.layout[this.currentId].ydata.length;
        for(var i = 0; i < y_number; i++){
          ydata.push(this.layout[this.currentId].ydata[i].data);
        }
        console.log(xdata);
        console.log(ydata);
        var data = {};
        for(var i = 0; i < xdata.length; i++){
          data[xdata[i]] = [];
        }
        for(var key in data){
          x_newdata.push(key);
            for(var i = 0; i < y_number; i++) data[key].push([]);
        }
        for(var i = 0; i < xdata.length; i++){
          for(var j = 0; j < y_number; j++) {
            data[xdata[i]][j].push(ydata[j][i]);
          }
        }
        for(var i = 0; i < y_number; i++){
          var item = [];
          for(var key in data){
            item.push(this.average(data[key][i]));
          }
          y_newdata.push(item);
        }
        console.log(x_newdata);
        console.log(y_newdata);
        for(var i = 0; i < y_number; i++){
          this.layout[this.currentId].option.series[i].data = y_newdata[i];
        }
        if(this.currentChartId == 2 || this.currentChartId == 7){
          this.layout[this.currentId].option.yAxis.data = x_newdata;
        }
        else{
          this.layout[this.currentId].option.xAxis.data = x_newdata;
        }
      }
      if (e == "求和") {
                this.layout[this.currentId].function_name = e;
        xdata = this.layout[this.currentId].xdata;
        var y_number = this.layout[this.currentId].ydata.length;
        for(var i = 0; i < y_number; i++){
          ydata.push(this.layout[this.currentId].ydata[i].data);
        }
        console.log(xdata);
        console.log(ydata);
        var data = {};
        for(var i = 0; i < xdata.length; i++){
          data[xdata[i]] = [];
        }
        for(var key in data){
          x_newdata.push(key);
            for(var i = 0; i < y_number; i++) data[key].push([]);
        }
        for(var i = 0; i < xdata.length; i++){
          for(var j = 0; j < y_number; j++) {
            data[xdata[i]][j].push(ydata[j][i]);
          }
        }
        for(var i = 0; i < y_number; i++){
          var item = [];
          for(var key in data){
            item.push(this.sum(data[key][i]));
          }
          y_newdata.push(item);
        }
        console.log(x_newdata);
        console.log(y_newdata);
        for(var i = 0; i < y_number; i++){
          this.layout[this.currentId].option.series[i].data = y_newdata[i];
        }
        if(this.currentChartId == 2 || this.currentChartId == 7){
          this.layout[this.currentId].option.yAxis.data = x_newdata;
        }
        else{
          this.layout[this.currentId].option.xAxis.data = x_newdata;
        }
      }
      if (e == "方差") {
                this.layout[this.currentId].function_name = e;
        xdata = this.layout[this.currentId].xdata;
        var y_number = this.layout[this.currentId].ydata.length;
        for(var i = 0; i < y_number; i++){
          ydata.push(this.layout[this.currentId].ydata[i].data);
        }
        console.log(xdata);
        console.log(ydata);
        var data = {};
        for(var i = 0; i < xdata.length; i++){
          data[xdata[i]] = [];
        }
        for(var key in data){
          x_newdata.push(key);
            for(var i = 0; i < y_number; i++) data[key].push([]);
        }
        for(var i = 0; i < xdata.length; i++){
          for(var j = 0; j < y_number; j++) {
            data[xdata[i]][j].push(ydata[j][i]);
          }
        }
        for(var i = 0; i < y_number; i++){
          var item = [];
          for(var key in data){
            item.push(this.fc(data[key][i]));
          }
          y_newdata.push(item);
        }
        console.log(x_newdata);
        console.log(y_newdata);
        for(var i = 0; i < y_number; i++){
          this.layout[this.currentId].option.series[i].data = y_newdata[i];
        }
        if(this.currentChartId == 2 || this.currentChartId == 7){
          this.layout[this.currentId].option.yAxis.data = x_newdata;
        }
        else{
          this.layout[this.currentId].option.xAxis.data = x_newdata;
        }
      }
      if (e == "标准差") {
                this.layout[this.currentId].function_name = e;
        xdata = this.layout[this.currentId].xdata;
        var y_number = this.layout[this.currentId].ydata.length;
        for(var i = 0; i < y_number; i++){
          ydata.push(this.layout[this.currentId].ydata[i].data);
        }
        console.log(xdata);
        console.log(ydata);
        var data = {};
        for(var i = 0; i < xdata.length; i++){
          data[xdata[i]] = [];
        }
        for(var key in data){
          x_newdata.push(key);
            for(var i = 0; i < y_number; i++) data[key].push([]);
        }
        for(var i = 0; i < xdata.length; i++){
          for(var j = 0; j < y_number; j++) {
            data[xdata[i]][j].push(ydata[j][i]);
          }
        }
        for(var i = 0; i < y_number; i++){
          var item = [];
          for(var key in data){
            item.push(this.std_fc(data[key][i]));
          }
          y_newdata.push(item);
        }
        console.log(x_newdata);
        console.log(y_newdata);
        for(var i = 0; i < y_number; i++){
          this.layout[this.currentId].option.series[i].data = y_newdata[i];
        }
        if(this.currentChartId == 2 || this.currentChartId == 7){
          this.layout[this.currentId].option.yAxis.data = x_newdata;
        }
        else{
          this.layout[this.currentId].option.xAxis.data = x_newdata;
        }
      }
    },
    getsortname: function(e){
      this.layout[this.currentId].data_sort_axis = e;
      if(e == "x轴"){
        this.data_sort = this.layout[this.currentId].x_name;
        this.data_sort_type = "x轴";
      }
      if(e == "y轴"){
        var y_name = this.layout[this.currentId].y_name;
        var y_axis = [];
        for(var i = 0; i < y_name.length; i++){
          var item = {};
          item['id'] = i;
          item['name'] = this.transferData[y_name[i]].label;
          y_axis.push(item);
        }
        this.y_axis_Info = y_axis;
        this.data_sort_type = "y轴";
      }
    },
    get_ysort_name: function(e){
      this.layout[this.currentId].y_axis_sort_name = e;
    },
    getsort: function (e) {
      this.layout[this.currentId].data_sort_name = e;
      if (e == "从小到大"){
        var xdata;
        var ydata = [];
        var x_newdata = [];
        var y_newdata = [];
        if(this.currentChartId == 2 || this.currentChartId == 7){
          xdata = this.layout[this.currentId].option.yAxis.data;
        }
        else{
          xdata = this.layout[this.currentId].option.xAxis.data;
        }
        var y_number = this.layout[this.currentId].option.series.length;
        for(var i = 0; i < y_number; i++){
          ydata.push(this.layout[this.currentId].option.series[i].data);
        }
        var list = [];
        for(var i = 0; i < xdata.length; i++){
          var item = {};
          item['x'] = xdata[i];
          for(var j = 0; j < y_number;j++){
            item[j] = ydata[j][i];
          }
          list.push(item);
        }
        // 排序方法
        function compare(property) {//property:根据什么属性排序
          return function(a,b){
            var value1 = a[property];
            var value2 = b[property];
            /*
            * value2 - value1; ——> 降序
            * value1 - value2; ——> 升序
            */
            return value1 - value2;//升序排序
          }
        }
        if(this.data_sort_type == 'x轴'){
          list.sort(compare('x'));
        }
        else{
          for(var i = 0; i < y_number; i++){
            if(this.layout[this.currentId].option.series[i].name == this.y_axis_sort_Id) break;
          }
          list.sort(compare(i));
        }
        for(var i = 0; i < list.length;i++){
          x_newdata.push(list[i]['x']);
        }
        for(var i = 0; i < y_number; i++){
          var item = [];
          for(var j = 0; j < list.length;j++){
            item.push(list[j][i]);
          }
          y_newdata.push(item);
        }
        for(var i = 0; i < y_number; i++){
          this.layout[this.currentId].option.series[i].data = y_newdata[i];
        }
        if(this.currentChartId == 2 || this.currentChartId == 7){
          this.layout[this.currentId].option.yAxis.data = x_newdata;
        }
        else{
          this.layout[this.currentId].option.xAxis.data = x_newdata;
        }
      }
      if (e == "从大到小"){
        var xdata;
        var ydata = [];
        var x_newdata = [];
        var y_newdata = [];
        if(this.currentChartId == 2 || this.currentChartId == 7){
          xdata = this.layout[this.currentId].option.yAxis.data;
        }
        else{
          xdata = this.layout[this.currentId].option.xAxis.data;
        }
        var y_number = this.layout[this.currentId].option.series.length;
        for(var i = 0; i < y_number; i++){
          ydata.push(this.layout[this.currentId].option.series[i].data);
        }
        var list = [];
        for(var i = 0; i < xdata.length; i++){
          var item = {};
          item['x'] = xdata[i];
          for(var j = 0; j < y_number;j++){
            item[j] = ydata[j][i];
          }
          list.push(item);
        }
        // 排序方法
        function compare(property) {//property:根据什么属性排序
          return function(a,b){
            var value1 = a[property];
            var value2 = b[property];
            /*
            * value2 - value1; ——> 降序
            * value1 - value2; ——> 升序
            */
            return value2 - value1;//降序排序
          }
        }
        if(this.data_sort_type == 'x轴'){
          list.sort(compare('x'));
        }
        else{
          for(var i = 0; i < y_number; i++){
            if(this.layout[this.currentId].option.series[i].name == this.y_axis_sort_Id) break;
          }
          list.sort(compare(i));
        }
        for(var i = 0; i < list.length;i++){
          x_newdata.push(list[i]['x']);
        }
        for(var i = 0; i < y_number; i++){
          var item = [];
          for(var j = 0; j < list.length;j++){
            item.push(list[j][i]);
          }
          y_newdata.push(item);
        }
        for(var i = 0; i < y_number; i++){
          this.layout[this.currentId].option.series[i].data = y_newdata[i];
        }
        if(this.currentChartId == 2 || this.currentChartId == 7){
          this.layout[this.currentId].option.yAxis.data = x_newdata;
        }
        else{
          this.layout[this.currentId].option.xAxis.data = x_newdata;
        }
      }
    },
    changefont:function(a,b) {
      if(this.layout[a].type == 5 || this.layout[a].type == 6 || this.layout[a].type == 8){
        this.layout[a].option.legend.textStyle.color = b
      }
      else{
        this.layout[a].option.xAxis.axisLabel.textStyle.color = b
        this.layout[a].option.yAxis.axisLabel.textStyle.color = b
      }
      //     this.$forceUpdate();
    },
    changeTypeStyle:function(e) {
      console.log("点击样式：");
      if(this.data_model_theme == "浅色模式"){
        Array.from(document.querySelectorAll('.' + this.styles[1])).forEach((el) => {
          const style = this.styles[1]
          el.classList.replace(style, this.styles[0])
      })
        this.font_color='#222222'
        for(var i = 0; i < this.layout.length; i++){
            this.changefont(i,this.font_color)
        }
      }
      else if(this.data_model_theme == "深色模式"){
        Array.from(document.querySelectorAll('.' + this.styles[0])).forEach((el) => {
          const style = this.styles[0]
          el.classList.replace(style, this.styles[1])
      })
        this.font_color='#FFFFFF'
        for(var j = 0; j < this.layout.length; j++){
          this.changefont(j,this.font_color)
        }
      }
      console.log(this.typeActive);
    },
    getDataZoomTimeRange(data){
      console.log('data', data)
      const instance = data.instance
      const oriOption =  instance.getOption();
      const fetchOption = function(){
        let base = +new Date(2016, 0, 1);
        let oneDay = 24 * 3600 * 1000;
        let data = [
          [base, Math.random() * 300]
        ]
        for (let i = 1; i < 1000; i++) {
          let now = new Date((base += oneDay));
          data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])]);
        }
        return data
      }();
      const uniqueData = [ ...oriOption.series[0].data];
      [ ...fetchOption, ...oriOption.series[0].data].forEach(item=>{
        if(uniqueData.findIndex(i=>i[0] === item[0]) === -1){
          uniqueData.push(item)
        }
      })
      oriOption.series[0].data = uniqueData.sort((a,b)=>a[0]-b[0] > -1 ? 1 : -1)
      instance.setOption(oriOption);
    },
    myTestFunctions(){
      const myTest = function myTest(){
        console.log('test')
      }
      const myChangeData = function(param){
        const instance = param.scheduler.ecInstance;
        console.log('myChangeData',instance)
        const oriOption = instance.getOption();
        oriOption.series[0].data = function(){
          let base = +new Date(1991, 0, 1);
          let oneDay = 24 * 3600 * 1000;
          let data = [
            [base, Math.random() * 300]
          ]
          for (let i = 1; i < 1000; i++) {
            let now = new Date((base += oneDay));
            data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])]);
          }
          return data
        }();
        instance.setOption(oriOption);
      }
      const list = {
        myTest,
        myChangeData
      }
      return list
    },
    save_layout:function(){
      console.log("save");
      var content = JSON.stringify(this.layout);
      var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
      console.log("chenggong");
      var FileSaver=require('file-saver');
      FileSaver.saveAs(blob, "save.json");
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
  .select_xy {
    margin-bottom: 5px;
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
  .e-charts-dark{
    background-color: #777777;
  }
  .e-charts-light{
    background-color: #FFFFFF;
  }
  .el-transfer {
    text-align: left;
  }
  .el-button {
    margin-top:5px;
    width: 100%;

  }
  .select_attribute {
    margin-top: 10px;
  }
  .input_title {
    margin-top:5px;
    margin-bottom: 5px;
  }
  .input_label {
    margin-top:5px;
    margin-bottom: 5px;
  }
  .switch_legend {
    margin-top:5px;
    margin-bottom: 5px;
  }
  .select_show {
    width: 100%;
  }
</style>
