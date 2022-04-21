<template>
  <div id="app">
    <DrawChart />
    <!-- <div @drag="drag" @dragend="dragend" class="droppable-element" draggable="true"
             unselectable="on">Droppable Element (Drag me!)</div>
    <div id="content">
        <grid-layout  ref="gridlayout" :layout.sync="layout"
                      :col-num="20"
                      :row-height="10"
                      :is-draggable="true"
                      :is-resizable="true"
                      :vertical-compact="true"
                      :use-css-transforms="true"
                      :verticalCompact="false"
                      
        >
            <grid-item :key="item.i" v-for="item in layout"
                        :x="item.x"
                        :y="item.y"
                        :w="item.w"
                        :h="item.h"
                        :i="item.i"
            >
                <span class="text">{{ item.i }}</span>
            </grid-item>
        </grid-layout>
    </div>-->
<!--    <VueGridLayout />-->
  </div>
</template>

<script>
import VueGridLayout from './components/VueGridLayout.vue'
import {GridLayout, GridItem} from "vue-grid-layout"
import DrawChart from './components/DrawChart.vue'
let mouseXY = {"x": null, "y": null};
let DragPos = {"x": null, "y": null, "w": 1, "h": 1, "i": null};
export default {
  name: 'App',
  components: {
    VueGridLayout,
    GridLayout, 
    GridItem,
    DrawChart
  },
  mounted(){
    document.addEventListener("dragover", function (e) {
            mouseXY.x = e.clientX;
            mouseXY.y = e.clientY;
        }, false);
  },
  data(){
    return{
       layout: [
                {"x": 0, "y": 0, "w": 2, "h": 2, "i": "0"},
                {"x": 2, "y": 0, "w": 2, "h": 4, "i": "1"},
                {"x": 4, "y": 0, "w": 2, "h": 5, "i": "2"},
                {"x": 6, "y": 0, "w": 2, "h": 3, "i": "3"},
                {"x": 8, "y": 0, "w": 2, "h": 3, "i": "4"},
                {"x": 10, "y": 0, "w": 2, "h": 3, "i": "5"},
                {"x": 0, "y": 5, "w": 2, "h": 5, "i": "6"},
                {"x": 2, "y": 5, "w": 2, "h": 5, "i": "7"},
                {"x": 4, "y": 5, "w": 2, "h": 5, "i": "8"},
                {"x": 5, "y": 10, "w": 4, "h": 3, "i": "9"},
                {"x": 7, "y": 7, "w": 5, "h": 4, "i": "10"},
            ],
    }
  },
  methods: {
        drag: function (e) {
            let parentRect = document.getElementById('content').getBoundingClientRect();
            let mouseInGrid = false;
            if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
                mouseInGrid = true;
            }
            if (mouseInGrid === true && (this.layout.findIndex(item => item.i === 'drop')) === -1) {
                this.layout.push({
                    x: (this.layout.length * 2) % (this.colNum || 12),
                    y: this.layout.length + (this.colNum || 12), // puts it at the bottom
                    w: 1,
                    h: 1,
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
            let parentRect = document.getElementById('content').getBoundingClientRect();
            let mouseInGrid = false;
            if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
                mouseInGrid = true;
            }
            if (mouseInGrid === true) {
                // alert(`Dropped element props:\n${JSON.stringify(DragPos, ['x', 'y', 'w', 'h'], 2)}`);
                this.$refs.gridlayout.dragEvent('dragend', 'drop', DragPos.x, DragPos.y, 1, 1);
                this.layout = this.layout.filter(obj => obj.i !== 'drop');
                // UNCOMMENT below if you want to add a grid-item
                
                this.layout.push({
                    x: DragPos.x,
                    y: DragPos.y,
                    w: 2,
                    h: 2,
                    i: DragPos.i,
                });
                this.$refs.gridLayout.dragEvent('dragend', DragPos.i, DragPos.x,DragPos.y,1,1);
                try {
                    this.$refs.gridLayout.$children[this.layout.length].$refs.item.style.display="block";
                } catch {
                }
            }
        },
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:100%;
  box-sizing: border-box;
}
.droppable-element {
    width: 150px;
    text-align: center;
    background: #fdd;
    border: 1px solid black;
    margin: 10px 0;
    padding: 10px;
}
.vue-grid-layout {
    background: rgba(240, 236, 236, 0.918);
    height: 00%;

}
.vue-grid-item:not(.vue-grid-placeholder) {
    background: #ccc;
    border: 1px solid black;
}
.vue-grid-item .resizing {
    opacity: 0.9;
}
.vue-grid-item .static {
    background: #cce;
}
.vue-grid-item .text {
    font-size: 24px;
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 100%;
    width: 100%;
}
.vue-grid-item .no-drag {
    height: 100%;
    width: 100%;
}
.vue-grid-item .minMax {
    font-size: 12px;
}
.vue-grid-item .add {
    cursor: pointer;
}
.vue-draggable-handle {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    left: 0;
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
    background-position: bottom right;
    padding: 0 8px 8px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: pointer;
}
.layoutJSON {
    background: #ddd;
    border: 1px solid black;
    margin-top: 10px;
    padding: 10px;
}
.layoutJSON {
    background: #ddd;
    border: 1px solid black;
    margin-top: 10px;
    padding: 10px;
}
.columns {
    -moz-columns: 120px;
    -webkit-columns: 120px;
    columns: 120px;
}
.el-submenu__title{
    line-height: 20px;
    height: 20px;
}
</style>
