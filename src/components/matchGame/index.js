import {Component} from 'react'
import TabItem from '../tabItem'
import ImageItem from '../imageItem'
import './index.css'

class MatchGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'FRUIT',
      gameRunning: true,
      score: 0,
      seconds: 60,
      selectedImageId: props.imagesList[0].id,
    }
  }

  componentDidMount() {
    this.timerId = setInterval(this.tick, 1000)
  }

  tick = () => {
    const {seconds, gameRunning} = this.state
    if (seconds === 0) {
      this.setState({
        gameRunning: false,
      })
    }
    if (seconds > 0 && gameRunning) {
      this.setState(prevState => ({
        seconds: prevState.seconds - 1,
      }))
    }
  }

  playAgain = () => {
    const {imagesList} = this.props
    this.setState({
      gameRunning: true,
      seconds: 60,
      score: 0,
      selectedImageId: imagesList[0].id,
      selectedTab: 'FRUIT',
    })
  }

  onSelectTab = tabId => {
    this.setState({
      selectedTab: tabId,
    })
  }

  imageSelected = id => {
    const {selectedImageId} = this.state
    const {imagesList} = this.props
    if (selectedImageId === id) {
      const randomNum = Math.ceil(Math.random() * imagesList.length)
      console.log(randomNum)
      const randomImageId = imagesList[randomNum].id
      console.log(randomImageId)
      this.setState(prevState => ({
        selectedImageId: randomImageId,
        score: prevState.score + 1,
      }))
    } else {
      this.setState({gameRunning: false})
    }
  }

  render() {
    const {
      score,
      seconds,
      selectedTab,
      gameRunning,
      selectedImageId,
    } = this.state
    const {tabsList, imagesList} = this.props

    const filteredImages = imagesList.filter(
      eachImage => eachImage.category === selectedTab,
    )
    const randomThumbnail = imagesList.find(
      eachImage => eachImage.id === selectedImageId,
    )

    return (
      <>
        <nav className="navbar-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            alt="website logo"
            className="website-logo"
          />
          <ul className="time-score-container">
            <li>
              <header>
                <p className="score-heading">
                  Score:<span className="score"> {score}</span>
                </p>
              </header>
            </li>
            <li className="timer-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
                className="timer-icon"
              />
              <p className="seconds">{seconds} sec</p>
            </li>
          </ul>
        </nav>

        <div className="bg-container">
          {gameRunning ? (
            <div className="thumbnail-image-container">
              <img
                src={randomThumbnail.imageUrl}
                alt="match"
                className="thumbnail"
              />
              <ul className="tabs-container">
                {tabsList.map(eachTab => (
                  <TabItem
                    onSelectTab={this.onSelectTab}
                    tab={eachTab}
                    key={eachTab.tabId}
                    isActive={selectedTab === eachTab.tabId}
                  />
                ))}
              </ul>
              <ul className="images-container">
                {filteredImages.map(eachImage => (
                  <ImageItem
                    image={eachImage}
                    key={eachImage.id}
                    imageSelected={this.imageSelected}
                    imageOfThumbnail={selectedImageId === eachImage.id}
                  />
                ))}
              </ul>
            </div>
          ) : (
            <div className="score-card-bg-container">
              <div className="score-inner-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
                  alt="trophy"
                  className="trophy"
                />
                <p className="your-score">Your Score</p>
                <p className="result-score">{score}</p>
                <button
                  type="button"
                  className="play-again-button"
                  onClick={this.playAgain}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                    alt="reset"
                    className="reset-icon"
                  />
                  <p>PLAY AGAIN</p>
                </button>
              </div>
            </div>
          )}
        </div>
      </>
    )
  }
}
export default MatchGame
