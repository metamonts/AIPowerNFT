<template>
    <div :id="'main'+ItemId" :style="{ width, height }"></div>
</template>
<script setup>
import { ref, onMounted ,toRefs} from "vue";
import * as echarts from "echarts";

const props = defineProps({
    dataRader: {
        type: Object,
        default: {
            "GPU": 100,
            "CPU": 20,
            "Congest": 90,
            "NetDelay": 30,
            "Model": 75,
        },
    },
    ItemId:{
        type:String,
        default:'1'
    },
    width: {
        type: String,
        default: "360px",
    },
    height: {
        type: String,
        default: "360px",
    },
})
const { dataRader ,ItemId}=toRefs(props)
function init() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"+ItemId.value));
    // 指定图表的配置项和数据
    var option = {
        radar: {
            // shape: 'circle',
            indicator: [
                { name: 'GPU', max: 200 },
                { name: 'CPU', max: 200 },
                { name: 'Congest', max: 200 },
                { name: 'NetDelay', max: 200 },
                { name: 'Model', max: 200 },
            ]
        },
        series: [
            {
                areaStyle: {
                    color: {
                        //线性渐变
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: '#B9E9FF' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#7676FF' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                },
                name: 'Budget vs spending',
                type: 'radar',
                data: [
                    {
                        value: [dataRader.value.GPU,dataRader.value.CPU, dataRader.value.Congest, dataRader.value.NetDelay, dataRader.value.Model],
                        name: 'Allocated Budget'
                    }
                ]
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}
onMounted(
    () => {
        init()
    }
)
</script>
<style scoped></style>
