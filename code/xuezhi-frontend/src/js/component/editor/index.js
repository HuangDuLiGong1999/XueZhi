import E from 'wangeditor'   // 引用
import React from "react";

class Editor extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            editor:null
        }
    }
    componentDidMount() {
        const elem = this.refs.editorElem; //获取editorElem盒子
        const editor = new E(elem)  //new 一个 editorElem富文本
        editor.customConfig.uploadFileName = 'upfile' //置上传接口的文本流字段
        editor.customConfig.uploadImgServer = ' '//'https://dev.xiaomon.com/api/treeroot/v1/xxx/upload/uploadImage'//服务器接口地址
        editor.create() //创建
        editor.customConfig.uploadImgHooks = {
            customInsert: function (insertImg, result, editor) {
                var url = result.url  //监听图片上传成功更新页面
                insertImg(url)
            }
        }
        this.state.editor = editor;

    }
    render() {
        return (
            <div ref="editorElem" className="editorElem"></div>
        );
    }
}
export default Editor;