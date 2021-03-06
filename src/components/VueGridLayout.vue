<template>
  <!-- Core Demo Start-->
  <div class="vue-grid-outside-wrapper">
    <div class="vue-grid-inside-wrapper">
      <template v-if="Array.isArray(layout) && layout.length > 0">
        <grid-layout
          :layout.sync="layout"
          :col-num="1"
          :row-height="100"
          :margin="[10, 10]"
          :is-draggable="draggable"
          :is-resizable="resizable"
          :responsive="responsive"
          :vertical-compact="true"
          :use-css-transforms="true"
          @layout-updated="layoutUpdatedEvent"
          @breakpoint-changed="breakpointChangedEvent"
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
            :minW="2"
            :minH="1"
            @move="movedEvent"
            drag-allow-from=".vue-draggable-handle"
            drag-ignore-from=".no-drag"
            :class="item.editMode ? 'activate-resizable-handle' : 'deactivate-resizable-handle'"
          >
            <div class="vue-draggable-handle" v-show="item.editMode"></div>
            <div class="no-drag">
              <span class="no-drag__title">{{ item.i }}</span>
              <input type="checkbox" :name="`edit${item.i}`" :id="`edit${item.i}`" v-model="item.editMode" hidden>
              <label class="edit-icon" :for="`edit${item.i}`">
                <img v-if="!item.editMode" class="edit-icon-image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAhElEQVRIie2TwQnAIAxF35Klh3YBdxDqPh3HQdq7gj00ooi3xkvxQ0BzeD8JfJh6ZYEbWEfAHZCkIrCPgAfgrN4qm9STG+llk0sTngAvJkH+VgMeBOobM6cFz3c22vAIbNJbKGc5JnzCfwCHEpgcorWCfwpRawDKk7cGdanBewaq8KmuHlYrZbGe+TNUAAAAAElFTkSuQmCC"/>
                <img v-else class="edit-icon-image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAbElEQVRIie2SQQ6AIAwE5xMSfSI8Vw4+Rw9q0oBIFGo8dK7AFJYFw3iIA7ymPAIrEHrLB2A+5Aswmvzfcs/eiBKyLbGyNyNUDjbJIX/6dLP2OvOrId0/NI2iKZYS8tYqVZRDVOQnjo6xGN+zAavMMBC6bhegAAAAAElFTkSuQmCC"/>
              </label>
              <component 
                :is="'EChartComponent'" 
                :uniqueId="item.i"
                :echartOption="item.option"
                :hasDataZoom="item.hasDataZoom"
                :editMode="item.editMode"
                :myFunctionKeys="item.myFunctionKeys"
                :myTestFunctions="myTestFunctions"
                @dataZoomTimeRange="getDataZoomTimeRange"
              ></component>
            </div>
          </grid-item>
        </grid-layout>
      </template>
    </div>
  </div>
  <!-- Core Demo End-->
</template>

<script>
import { GridLayout, GridItem } from "vue-grid-layout";
import { debounce } from 'lodash-es'
import EChartComponent from "./EChartComponent.vue"
import EleResize from '../../resize'

export default {
  components: {
    GridLayout,
    GridItem,
    EChartComponent
  },
  data() {
    return {
      defaultLayout: [],
      layout: [],
      draggable: true,
      resizable: true,
      responsive: true,
      vueGridLayoutDivWidth: 0,
    };
  },
  mounted(){
    const dataFromServer = [
      {
        "x":0, "y":4, "w":4, "h":4,
        i: "B",
        editMode: false,
        hasDataZoom: false,
        myFunctionKeys: [
          {show: true, title: 'myChangeData', param: 'myChangeData', icon: 'path d="M17.896,12.706v-0.005v-0.003L15.855,2.507c-0.046-0.24-0.255-0.413-0.5-0.413H4.899c-0.24,0-0.447,0.166-0.498,0.4L2.106,12.696c-0.008,0.035-0.013,0.071-0.013,0.107v4.593c0,0.28,0.229,0.51,0.51,0.51h14.792c0.28,0,0.51-0.229,0.51-0.51v-4.593C17.906,12.77,17.904,12.737,17.896,12.706 M5.31,3.114h9.625l1.842,9.179h-4.481c-0.28,0-0.51,0.229-0.51,0.511c0,0.703-1.081,1.546-1.785,1.546c-0.704,0-1.785-0.843-1.785-1.546c0-0.281-0.229-0.511-0.51-0.511H3.239L5.31,3.114zM16.886,16.886H3.114v-3.572H7.25c0.235,1.021,1.658,2.032,2.75,2.032c1.092,0,2.515-1.012,2.749-2.032h4.137V16.886z"'}
        ],
        option:{
          tooltip: {
            trigger: 'axis',
            position: function (pt) {
              return [pt[0], '10%'];
            }
          },
          title: {
            left: 'center',
            text: 'Large Ara Chart'
          },
          toolbox: {
            orient: 'vertical',
            feature: {
              dataZoom: {
                title:{
                  zoom: '縮放',
                  back: '還原'
                },
                yAxisIndex: 'none'
              },
              saveAsImage: {
                title: '下載'
              }
            },
            right:"3%"
          },
          xAxis: {
            type: 'time',
            boundaryGap: false
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
          },
          dataZoom: [
            {
              type: 'slider',
              start: 0,
              end: 100,
              showDetail: false
            }
          ],
          series: [
            {
              name: 'Fake Data',
              type: 'line',
              smooth: true,
              symbol: 'none',
              areaStyle: {},
              data: function(){
                let base = +new Date(2021, 0, 1);
                let oneDay = 24 * 3600 * 1000;
                let data = [
                  [base, Math.random() * 300]
                ]
                for (let i = 1; i < 1000; i++) {
                  let now = new Date((base += oneDay));
                  data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])]);
                }
                return data
              }()
            }
          ]
        }
      },
    ]

    this.defaultLayout = dataFromServer.map((item)=>{
      const obj = {
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
        i: item.i
      }
      return obj
    })

    this.layout = dataFromServer.map((item, index)=>{
      const newObj = {
        ...item,
        ...dataFromServer[index]
      }
      return newObj
    })

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
    movedEvent: debounce(function(i, newX, newY){
        this.defaultLayout.forEach((item)=>{
          if(item.i === i){
            item.x = newX
            item.y = newY
          }
        })
    }, 1000),
    layoutUpdatedEvent: debounce(function(newLayout){
      this.defaultLayout = newLayout.map((item)=>{
        const obj = {
          x: item.x,
          y: item.y,
          w: item.w,
          h: item.h,
          i: item.i
        }
        return obj
      })
    }, 1000),
    breakpointChangedEvent: function (newBreakpoint, newLayout) {
        console.log('newBreakpoint',newBreakpoint)
        console.log('newLayout', newLayout)
        /* disable editMode while 'vue-grid-layout' breakpoint changes */
        newLayout.forEach(item => {
          this.layout.forEach(oriItem=>{
            if(oriItem.i === item.i){
              oriItem.editMode = false
            }
          })
        })

        this.defaultLayout = newLayout.map((item)=>{
          const obj = {
            x: item.x,
            y: item.y,
            w: item.w,
            h: item.h,
            i: item.i
          }
          return obj
        })
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
    }
  }
};
</script>

<style>
.vue-grid-outside-wrapper{
  width: calc(100% - 2rem); 
  height: 100%;
  margin: 0 1rem;
}

.vue-grid-inside-wrapper{
  width: 100%; 
  height: 100%; 
  touch-action:none;
}

.vue-grid-layout {
  background: #FFF;
}

.vue-grid-item{
  box-sizing: border-box;
}

.vue-grid-item:not(.vue-grid-placeholder) {
  border: 1px solid black;
}

.vue-grid-inside-wrapper .vue-grid-placeholder {
  background: green !important;
}

.vue-draggable-handle {
    position: absolute;
    width: 16px;
    height: 16px;
    top: 0;
    right: 0;
    margin: 4px;
    padding: 0 8px 8px 0;
    background-origin: content-box;
    background-color: black;
    box-sizing: border-box;
    border-radius: 10px;
    cursor: move;
    z-index: 3;
}

.vue-grid-item .no-drag {
    height: 100%;
    width: 100%;
}

.vue-grid-item .no-drag .no-drag__title{
  display: inline-block;
  height:24px;
  line-height: 24px;
}

.vue-grid-item.deactivate-resizable-handle span[class="vue-resizable-handle"]{
  display:none;
}

.vue-grid-item.activate-resizable-handle span[class="vue-resizable-handle"]{
  z-index:2;
}

.edit-icon{
  position: absolute;
  display: inline-block;
  padding: 0px;
  height: 16px;
  margin: 4px;
  top: 0;
  right: 24px;
}

.edit-icon .edit-icon-image{
  width: 1rem;
  height: 1rem;
  cursor: pointer;
}
</style>
