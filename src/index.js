import _ from 'lodash'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import YTSearch from 'youtube-api-search'

// Header Component
import Header from './components/header'
// Search Component
import SearchBar from './components/search_bar'
// Video Component
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail'


const API_KEY = 'AIzaSyCtZkSrLR84V-S79zSgpMzgyY-SUMO8Ogc'


class App extends Component {

    constructor(props) {

        super(props)

        this.state = {
            videos: [],
            selectedVideo: null
        }
        this.videoSearch('React.js')



    }

    videoSearch(term){

        YTSearch({key: API_KEY, term: term}, (videos) =>  {
            this.setState({
                videos: videos,
                selectedVideo:videos[0]
            })
        })
    }

    render() {

        const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 500)

        return(
            <div className="App">

                <Header />
                <SearchBar onSearchTermChange={videoSearch}/>

                <div className="container page">
                    <hr/>
                    <VideoDetail video={this.state.selectedVideo} />
                    <VideoList
                        onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                        videos={this.state.videos} />
                </div>

            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#theTubeApp'))
