import React, { Component } from 'react';
import './App.css';

class VUMeter extends Component {
    constructor(props){
        super(props)
        console.log(props)
        this.createVisualization = this.createVisualization.bind(this)
    }

    componentDidMount(){
        this.createVisualization()
    }

    createVisualization(){
        let context = new AudioContext()
        let analyser = context.createAnalyser()
        let canvas = this.refs.analyzerCanvas
        let ctx = canvas.getContext('2d')
        let audio = this.refs.audio
        audio.crossOrigin = "anonymous"
        let orientation = this.props.orientation;
        let audioSrc = context.createMediaElementSource(audio)
        audioSrc.connect(analyser)
        audioSrc.connect(context.destination)
        analyser.connect(context.destination)

        function getColor(value) {
            //value from 0 to 1
            var hue=((1-value)*200).toString(10);
            return ["hsl(",hue,",100%,50%)"].join("");
        }

        function renderFrame(){
            let freqData = new Uint8Array(analyser.frequencyBinCount)
            requestAnimationFrame(renderFrame)
            analyser.getByteFrequencyData(freqData)
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            //console.log(freqData)
            //ctx.fillStyle = '#9933ff'
            let sumFreq = freqData.reduce((a,b) => a + b, 0)

            let volPct = sumFreq / 100000.0
            let maxBars = 30
            let numBars = volPct * maxBars
            let barWidth = 5

            for (let i = 0; i < numBars; i++) {
                ctx.fillStyle = getColor(i / maxBars)
                if (orientation == "horizontal")
                    ctx.fillRect(canvas.width / maxBars * i, 0, barWidth, canvas.height)
                else 
                    ctx.fillRect(0, canvas.height - canvas.height / maxBars * i, canvas.width, barWidth)
                
            }            
        };
        renderFrame()
    }

    render() {
        return (
            <div id="mp3_player" style={{border:"1px solid gray", width: 400}}>
                <div id="audio_box">
                    <audio
                        ref="audio"
                        autoPlay={true}
                        src={this.props.src}
                        controls={this.props.controls}
                        >
                    </audio>
                </div>
                <canvas
                    ref="analyzerCanvas"
                    id="analyzer"
                    width={this.props.width}
                    height={this.props.height}
                    >
                </canvas>
            </div>
        );
    }
}
    
export default VUMeter;
        