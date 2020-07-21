  import React from 'react';
  // import './index.scss';
  import './App.css';

  class App extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        bgColor: '#123456',
        author: '',
        text: '',
        isLoaded: false,
        apiResult: null,
        clickCount: 0
      }
      this.handleClick = this.handleClick.bind(this);

    }

    componentDidMount() {
      fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then(respone => respone.json())
      .then((resData) => {
        this.setState({
          apiResult: resData.quotes,
          author: resData.quotes[0].author,
          text: resData.quotes[0].quote,
          isLoaded: true
        })
      })
    }

    generateQuote = () => {
      const chosenQuote =  [];
      const quotes = this.state.apiResult;
      let randomNumber = Math.floor(Math.random() * this.state.apiResult.length + 1);

      quotes.forEach(function(value, index) {
        if(index === randomNumber) {
          chosenQuote.push(value);
        }
      })

      this.setState({
        text: chosenQuote[0].quote,
        author: chosenQuote[0].author
      })
    }

    changeColor = () => {
      const colors = ['#C50023', '#F09C42' , '#F1AF00', '#67BF7F'];
      let i = this.state.clickCount;

      this.setState({
        bgColor: colors[this.state.clickCount],
        clickCount: this.state.clickCount + 1
      })

      if(i >= 4) {
        this.setState({
          bgColor: colors[0],
          clickCount: 0
        })
      } 
    }

    handleClick(){
      this.generateQuote();
      this.changeColor();
    }

    shareOnTwitter = () => {
      // found on https://gist.github.com/McKinneyDigital/2884508#file-share-twitter-js
      var url = "twitter.com";
      let text = `${this.state.author} - ${this.state.text}`
      console.log('state: , ', this.state.author, this.state.text);
      window.open('http://twitter.com/share?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(text), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
    }

    render(){
      return (
      <div id='main'>
        <style>
          {`
            :root {
              --main-bg-color: ${this.state.bgColor};
              --main-text-color:   ${this.state.bgColor};
            }
          `}
        </style>
        <div id='title'> Random Quote Machine</div> 
        <div id='quote-box'>
          <p id='text'>{this.state.text}</p>
          <p id='author'> - {this.state.author}</p>
         <button id='tweet-quote' onClick={this.shareOnTwitter}> Tweeter </button>
         <button id='new-quote' onClick={this.handleClick}> New Quote </button>
       </div>
     </div>
    );
  }
  
}

export default App;
