import React, { createRef } from "react"
import PropTypes from "prop-types"

class MusicPlayer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      songs: props.songs,
      playing: false,
      index: 0
    };

    this.playPause = this.playPause.bind(this);
    this.nextSong = this.nextSong.bind(this);
    this.previousSong = this.previousSong.bind(this);
    this.playSong = this.playSong.bind(this);
    this.audioPlayerRef = createRef();

  }

  playPause() {
    console.log('asd');
    console.log(this.state.songs);
    if (!this.state.playing) {
      this.audioPlayerRef.current.src = this.state.songs[this.state.index].src;
      this.audioPlayerRef.current.play();
      this.setState(prevState => {
        return { playing: true };
      });
    } else {
      this.audioPlayerRef.current.pause();
      this.setState(prevState => {
        return { playing: false };
      });
    }
  }
  playSong = (key) => {
    console.log(key);
    this.setState(prevState => {
      return { index: key, playing: true };
    });
    this.audioPlayerRef.current.src = this.state.songs[this.state.index].src;
    this.audioPlayerRef.current.play();

  }

  nextSong = () => {
    this.setState(prevState => {
      return { index: prevState.index + 1 };
    });
    this.playPause();
  }

  previousSong = () => {
    this.setState(prevState => {
      return { index: prevState.index - 1, playing: false };
    });
    this.playPause();
  }

  componentDidMount = () => {
    this.audioPlayerRef.current.addEventListener('ended', () => {
      this.setState(prevState => {
        return { playing: false };
      });
      this.nextSong();
    });
  }

  render() {
    return (
      <React.Fragment>
        <div class="container">
          <audio ref={this.audioPlayerRef}></audio>

          <div id="header" class="row fixed-top">
            <div className={'col-sm-12 text-center'}>
              {
                (this.state.playing === false)
                  ? <p>Click Play to start listening to some music</p>
                  : <p>Use Next or Previous or Scroll the Songs below</p>
              }
              <h2>{this.state.songs[this.state.index].name}</h2>
              <h4>{this.state.songs[this.state.index].artist}</h4>
              <button className={'btn btn-pirmary btn-lg'} onClick={() => { this.playPause() }}>Play/Pause</button>

              <div id="tracks">
                <a id="btnPrev" onClick={() => { this.previousSong() }}>Previous</a>
                <a id="btnNext" onClick={() => { this.nextSong() }}>Next</a>
              </div>

              <hr></hr>
            </div>


          </div>

          <div id="plwrap">
            <ul id="plList">


              {

                this.state.songs
                  .map((item, key) => {
                    return <li key={key} onClick={() => { this.playSong(key) }}>
                      <div class="plItem">
                        <span class="plNum">{item.track}</span>
                        <span class="plTitle">{item.name}</span>
                        <span class="plLength">'{item.duration}</span>
                      </div>
                    </li>
                  })
              }



            </ul>

          </div>
        </div>



      </React.Fragment>
    );
  }
}

MusicPlayer.propTypes = {
  songs: PropTypes.array
};
export default MusicPlayer
