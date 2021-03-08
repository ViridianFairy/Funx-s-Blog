<template>
    <div class="mdContainer" :class="{ fullPage: fullPageStatus }">
        <div class="navContainer" v-if="navStatus">
            <div class="markContainer">
                <ul class="markListGroup">
                    <li class="markListItem" @click="addStrong" title="strong"><i class="fa fa-bold"></i></li>
                    <!-- <li class="markListItem" @click="addItalic" title="italic"><i class="fa fa-italic"></i></li> -->
                    <li class="markListItem" @click="addStrikethrough" title="strikethrough"><i class="fa fa-strikethrough"></i></li>
                    <li class="markListItem" @click="addHTitle(1)" title="H1-title"><i class="fa fa-header"></i></li>
                    <li class="markListItem" @click="addHTitle(2)" title="H2-title"><i class="fa fa-header"></i></li>
                    <li class="markListItem" @click="addHTitle(3)" title="H3-title"><i class="fa fa-header"></i></li>
                    <!-- <li class="markListItem" @click="addLine" title="line"><strong></strong></li> -->
                    <li class="markListItem" @click="addQuote" title="quote"><i class="fa fa-quote-left" ></i></li>
                    <li class="markListItem" @click="addCode"><i class="fa fa-code" ></i></li>
                    <li class="markListItem" @click="addLink"><i class="fa fa-link" ></i></li>
                    <li class="markListItem" @click="addImage"><i class="fa fa-picture-o" ></i></li>
                    <li class="markListItem" @click="addTable" title="table"><i class="fa fa-table" ></i></li>
                    <li class="markListItem" @click="addUl" title="ul-list"><i class="fa fa-list-ul" ></i></li>
                    <li class="markListItem" @click="addOl" title="ol-list"><i class="fa fa-list-ol" ></i></li>
                    <li class="markListItem" @click="fullPageFn" title="fullpage"><i class="fa fa-arrows-alt" ></i></li>
                    <li class="markListItem" @click="previewFn" title="preview"><i class="fa fa-eye-slash" ></i></li>
                    <li class="markListItem" @click="previewAllFn" title="previewAll"><i class="fa fa-eye" ></i></li>
                </ul>
    
            </div>
        </div>
        <div class="mdBodyContainer" :class="{ noMenu: !navStatus }">
            <div class="editContainer" v-if="editStatus">
                <textarea name="" class="mdEditor" @keydown.9="tabFn" v-model="input"></textarea>
                <!-- v-scroll="editScroll" v-scroll="previewScroll"   -->
            </div>
            <div class="previewContainer markdown-body" v-html="compiledMarkdown"  v-if="previewStatus">
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import hljs from 'highlight.js'
    import range from '../js/rangeFn.js'
    import marked from 'marked/lib/marked'
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight: function(code) {
            return hljs.highlightAuto(code).value
        }
    });
    
    function insertContent(val, that) {
        let textareaDom = document.querySelector('.mdEditor');
        let value = textareaDom.value;
        let point = range.getCursortPosition(textareaDom);
        let lastChart = value.substring(point - 1, point);
        let lastFourCharts = value.substring(point - 4, point);
        if (lastChart != '\n' && value != '' && lastFourCharts != '    ') {
            val = '\n' + val;
            range.insertAfterText(textareaDom, val);
        } else {
            range.insertAfterText(textareaDom, val);
        }
        that.input = document.querySelector('.mdEditor').value;
    }
    export default {
        name: 'markdown',
        props: ['mdValuesP', 'fullPageStatusP', 'editStatusP', 'previewStatusP', 'navStatusP', 'icoStatusP'],
        data() {
            return {
                input: this.mdValuesP || '',
                editStatus: Boolean(this.editStatusP),
                previewStatus: Boolean(this.previewStatusP),
                fullPageStatus: Boolean(this.fullPageStatusP),
                navStatus: Boolean(this.navStatusP),
                icoStatus: Boolean(this.icoStatusP),
                maxEditScrollHeight:0,
                maxPreviewScrollHeight:0
            }
        },
        created: function() {
            if (!this.editStatus && !this.previewStatus) {
                this.editStatus = true;
                this.previewStatus = true;
            }
        },
        methods: {
            tabFn: function(evt) {
                insertContent("    ", this);
                // 屏蔽屌tab切换事件
                if (evt.preventDefault) {
                    evt.preventDefault();
                } else {
                    evt.returnValue = false;
                }
            },
            addImage: function(evt) {
                insertContent("![Vue](https://cn.vuejs.org/images/logo.png)", this);
            },
            addHTitle: function(index) {
                let tmp = '';
                switch (index) {
                    case 1:
                        tmp = '# ';
                        break;
                    case 2:
                        tmp = '## ';
                        break;
                    case 3:
                        tmp = '### ';
                        break;
                    case 4:
                        tmp = '#### ';
                        break;
                    case 5:
                        tmp = '##### ';
                        break;
                    case 6:
                        tmp = '###### ';
                        break;
                    default:
                        break;
                }
                insertContent(tmp, this);
            },
            addCode: function() {
                let textareaDom = document.querySelector('.mdEditor');
                let value = textareaDom.value;
                let point = range.getCursortPosition(textareaDom);
                let lastChart = value.substring(point - 1, point);
                insertContent('```\n\n```', this);
                if (lastChart != '\n' && value != '') {
                    range.setCaretPosition(textareaDom, point + 5);
                } else {
                    range.setCaretPosition(textareaDom, point + 4);
                }
            },
            addStrikethrough: function() {
                let textareaDom = document.querySelector('.mdEditor');
                let value = textareaDom.value;
                let point = range.getCursortPosition(textareaDom);
                let lastChart = value.substring(point - 1, point);
                insertContent('~~~~', this);
                if (lastChart != '\n' && value != '') {
                    range.setCaretPosition(textareaDom, point + 3);
                } else {
                    range.setCaretPosition(textareaDom, point + 2);
                }
            },
            addStrong: function() {
                let textareaDom = document.querySelector('.mdEditor');
                let value = textareaDom.value;
                let point = range.getCursortPosition(textareaDom);
                let lastChart = value.substring(point - 1, point);
                insertContent('****', this);
                if (lastChart != '\n' && value != '') {
                    range.setCaretPosition(textareaDom, point + 3);
                } else {
                    range.setCaretPosition(textareaDom, point + 2);
                }
            },
            addItalic: function() {
                let textareaDom = document.querySelector('.mdEditor');
                let value = textareaDom.value;
                let point = range.getCursortPosition(textareaDom);
                let lastChart = value.substring(point - 1, point);
                insertContent('**', this);
                if (lastChart != '\n' && value != '') {
                    range.setCaretPosition(textareaDom, point + 2);
                } else {
                    range.setCaretPosition(textareaDom, point + 1);
                }
            },
            setStrong: function() {
                let textareaDom = document.querySelector('.mdEditor');
                let point = range.getCursortPosition(textareaDom);
            },
            addLine: function() {
                insertContent('\n----\n', this);
            },
            addLink: function() {
                insertContent("[Vue](https://cn.vuejs.org/images/logo.png)", this);
            },
            addQuote: function() {
                let textareaDom = document.querySelector('.mdEditor');
                let value = textareaDom.value;
                let point = range.getCursortPosition(textareaDom);
                let lastChart = value.substring(point - 1, point);
                insertContent('> ', this);
                if (lastChart != '\n' && value != '') {
                    range.setCaretPosition(textareaDom, point + 3);
                } else {
                    range.setCaretPosition(textareaDom, point + 2);
                }
            },
            addTable: function() {
                insertContent('\nheader 1 | header 2\n', this);
                insertContent('---|---\n', this);
                insertContent('row 1 col 1 | row 1 col 2\n', this);
                insertContent('row 2 col 1 | row 2 col 2\n\n', this);
            },
            addUl: function() {
                insertContent('* ', this);
            },
            addOl: function() {
                insertContent('1. ', this);
            },
            previewFn: function() {
                if (!this.editStatus) {
                    this.editStatus = true;
                    this.previewStatus = !this.previewStatus;
                } else {
                    this.previewStatus = !this.previewStatus;
                }
            },
            previewAllFn: function() {
                if (!this.editStatus && this.previewStatus) {
                    this.editStatus = true;
                    this.previewStatus = true;
                } else {
                    this.editStatus = false;
                    this.previewStatus = true;
                }
            },
            fullPageFn: function() {
                this.fullPageStatus = !this.fullPageStatus;
                let maxEditScrollHeight=document.querySelector('.mdEditor').scrollHeight-document.querySelector('.mdEditor').clientHeight;
                let maxPreviewScrollHeight=document.querySelector('.previewContainer').scrollHeight-document.querySelector('.previewContainer').clientHeight;
                this.maxEditScrollHeight = maxEditScrollHeight
                this.maxPreviewScrollHeight = maxPreviewScrollHeight
            },
            previewScroll: function(e, position) {
                if(this.maxEditScrollHeight!==0){
                    let topPercent=position.scrollTop/this.maxPreviewScrollHeight;
                    document.querySelector('.mdEditor').scrollTop = this.maxEditScrollHeight*topPercent;
                }
            },
            editScroll:function(e, position){
                if(this.maxPreviewScrollHeight!==0){
                    let topPercent=position.scrollTop/this.maxEditScrollHeight;
                    document.querySelector('.previewContainer').scrollTop = this.maxPreviewScrollHeight*topPercent;
                }
            },
            happyDay:function(){
                window.open('https://github.com/ovenslove/vue-mdEditor');
            }
        },
        computed: {
            compiledMarkdown: function() {
                
                return marked(this.input, {
                    sanitize: true
                })
            }
        },
        watch: {
            mdValuesP(now,old){
               if(now){
                  this.input = now
               }
            },
            input: function() {
                let data = {};
                data.mdValue = this.input;
                
                data.htmlValue = marked(this.input, {
                    sanitize: true
                });
                this.$emit('childevent', data);
                let maxEditScrollHeight=document.querySelector('.mdEditor').scrollHeight-document.querySelector('.mdEditor').clientHeight;
                let maxPreviewScrollHeight=document.querySelector('.previewContainer').scrollHeight-document.querySelector('.previewContainer').clientHeight;
                this.maxEditScrollHeight = maxEditScrollHeight
                this.maxPreviewScrollHeight = maxPreviewScrollHeight
            }
        }
    }
</script>

<style lang="scss">
    /*引入reset文件*/
    
   //  @import "../../static/css/reset";
    
    /*引入github的markdown样式文件*/
    
   //  @import "../css/article.css";
   //  @import "http://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css";
    /*引入atom的代码高亮样式文件*/
    
     @import "../css/atelier-sulphurpool-dark.css";
    .mdContainer {
        font-size: 1.5rem;
        width: 100%;
        height: calc(100vh - 27rem);
        border:1px #eaeaea solid;
        border-radius: 6px;
        &.fullPage {
            position: fixed;
            z-index: 500;
            left: 0;
            top: 0;
            height:100%;
        }
        .navContainer {
            width: 100%;
            height: 38px;
            background: #fff;
            box-sizing: border-box;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 0 10px;
            .nameContainer {
                color: lightblue;
                margin-right: 10px;
                cursor:pointer;
            }
            .markContainer {
                width: auto;
                height: 100%;
                margin-left: 0px;
                ul.markListGroup {
                    height: 100%;
                    width: auto;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    li.markListItem {
                        
                        list-style: none;
                        width: 30px;
                        height: 30px;
                        margin: 5px 2.5px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                        font-size: 12px;
                        color: rgb(92, 92, 92);
                        transition: 0.15s all;
                        border-radius: 4px;
                        &:hover {
                            background: rgb(227, 227, 227);
                        }
                        i{
                           font-size: 1.35rem;
                        }

                    }
                }
            }
        }
        .mdBodyContainer {
            width: 100%;
            height: calc(100% - 3rem);
            background: #fff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            &.noMenu{
                height: 100%;
            }
        }
    }
    
    // 编辑区域
    .editContainer {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        border-right: 1px solid #ddd;
        background: rgb(251, 251, 251);
        padding: 10px;
        .mdEditor {
            letter-spacing:0.5px;
            line-height: 1.5;
            font-size: 1.4rem;
            font-family: Monaco,Menlo,Ubuntu Mono,Consolas,source-code-pro,monospace;
            height: 100%;
            width: 100%;
            background: transparent;
            outline: none;
            resize: none;
            color: #636363;
            border:none;
            padding: 0.4px;
        }
    }
    
    // 预览区
    .previewContainer {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background: #fff;
        overflow: auto;
        padding: 10px;
    }
</style>