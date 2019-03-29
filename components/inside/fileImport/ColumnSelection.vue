<template>
        <v-container>
                <template v-for="(child,index) in children" xs12 >
                    <selection
                    v-if="child.render"
                    @submit="addChild(index)"
                    @remove="removeChild(index)"
                        :key="index"
                        :excelHeaders="excelHeaders"
                    ></selection>       
                
                </template>
        </v-container>
</template>

<script>

import Selection from '@/components/inside/fileImport/Selection'
export default {
    components: {
        Selection
    },
    props: {
      excelHeaders: {
          type: Array,
          required: true
      }  
    },
    data() {
        return{
            children: [
                {
                    id:0,
                    render: true
                }
                
            ]
        }
    },
    methods: {
        addChild (index) {
            Object.assign( this.excelHeaders, this.$store.getters['fileImport/getUnselectedHeaders'])
            this.children.push({
                id : index,
                render: true
            })
        },
        removeChild (index) {
            this.children[index].render = false
            this.children[this.children.length -1 ].render = false
            
            this.addChild(this.children.length -1)
            //console.log("name: "+this.children[index])
        }

    }

}
</script>

<style>

</style>
