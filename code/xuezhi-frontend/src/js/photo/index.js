import React,{Component} from 'react'
import Mavatar from 'mavatar'
let avatar;


export default class Photo extends Component {
    componentDidMount() {
        avatar = new Mavatar({
            el: '#avatar',
            backgroundColor: '#ff6633'
        });
    }
    handleClip = (e) => {
        avatar.imageClipper((dataurl) => {
            console.log(dataurl);
        });
    }
    handleReset = (e) => {
        avatar.resetImage();
    }
    render() {
        return (
            <div>
                <div id="avatar" />
                <button onClick={this.handleClip}>裁剪</button>
                <button onClick={this.handleReset}>重置</button>
            </div>
        );
    }
}