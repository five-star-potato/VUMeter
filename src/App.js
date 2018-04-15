import React, { Component } from 'react';
import VUMeter from './VUMeter';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <VUMeter 
                    src="https://p.scdn.co/mp3-preview/e4a8f30ca62b4d2a129cc4df76de66f43e12fa3f?cid=null" 
                    orientation='vertical'
                    width="60px"
                    height="200px"
                    barThickness="4"
                    controls={true}
                    />
            </div>
        )
    }
}

export default App;
