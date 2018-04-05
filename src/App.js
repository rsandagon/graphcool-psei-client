import React from 'react';
import { Query } from 'react-apollo';
import ALL_LATEST_STOCKS from './graphql/stocks/ALL_LATEST_STOCKS';

class App extends React.Component {

  render() {

    const loadingDiv = (<article className="vh-100 dt w-100">

      <div className="dtc v-mid tc white ph3 ph4-l">
        <blockquote className="athelas ml0 mt0 pl4 black-90 bl bw2 b--blue">
          <p className="f6 f2-m f-subheadline-l fw6 tc  f3-l ">
            Rule No.1: Never lose money. Rule No.2: Never forget rule No.1.
          </p>
          <cite className="f6 ttu tracked fs-normal">―Warren Buffet</cite>
        </blockquote>
      </div>
    </article>)

    const errorDiv = (<div className="flex items-center justify-center pa4 bg-lightest-red dark-red">
      <svg className="w1" data-icon="info" viewBox="0 0 32 32" style={{ fill: 'currentcolor' }}>
        <title>info icon</title>
        <path d="M16 0 A16 16 0 0 1 16 32 A16 16 0 0 1 16 0 M19 15 L13 15 L13 26 L19 26 z M16 6 A3 3 0 0 0 16 12 A3 3 0 0 0 16 6"></path>
      </svg>
      <span className="lh-title ml3">Query failed! Page will refresh in 5 seconds, or you may refresh it manually.</span>
    </div>)

    const header = (<div className="cf b--black-40 bb">
      <dl className="fl w-20">
        <dd className="f6 fw4 ml0">Symbol</dd>
      </dl>
      <dl className="fl w-20">
        <dd className="f6 fw4 ml0">Name</dd>
      </dl>
      <dl className="fl w-20">
        <dd className="f6 fw4 ml0">Day Change</dd>
      </dl>
      <dl className="fl w-20">
        <dd className="f6 fw4 ml0">Price</dd>
      </dl>
      <dl className="fl w-20">
        <dd className="f6 fw4 ml0">Volume</dd>
      </dl>
    </div>)

    const downArrow = (<svg className="w1 mr2" style={{ fill: 'currentcolor' }} width="16" height="16" viewBox="0 0 128 128" >
      <title></title>
      <g id="icomoon-ignore">
      </g>
      <path d="M109.657 77.657l-40 40c-3.124 3.124-8.189 3.124-11.313 0l-40-40c-3.124-3.124-3.124-8.189 0-11.314s8.19-3.124 11.314 0l26.343 26.343v-76.686c0-4.418 3.582-8 8-8s8 3.582 8 8v76.686l26.343-26.343c1.562-1.562 3.609-2.343 5.657-2.343s4.095 0.781 5.657 2.343c3.124 3.124 3.124 8.189 0 11.314z"></path>
    </svg>
    )

    const upArrow = (<svg className="w1 mr2" style={{ fill: 'currentcolor' }} width="16" height="16" viewBox="0 0 128 128" >
      <title></title>
      <g id="icomoon-ignore">
      </g>
      <path d="M109.657 50.343l-40-40c-3.124-3.124-8.189-3.124-11.313 0l-40 40c-3.124 3.124-3.124 8.19 0 11.314s8.19 3.124 11.314 0l26.343-26.343v76.686c0 4.418 3.582 8 8 8s8-3.582 8-8v-76.686l26.343 26.343c1.562 1.562 3.609 2.343 5.657 2.343s4.095-0.781 5.657-2.343c3.124-3.124 3.124-8.189 0-11.313z"></path>
    </svg>
    )

    return (
      <Query query={ALL_LATEST_STOCKS} pollInterval={5000}>
        {({ loading, error, data }) => {
          let list = [];

          if (loading) return loadingDiv;
          if (error) return errorDiv;
          if (data) {
            console.log('data:', data)

            if(!data.allLatestStocks){
              return errorDiv;
            }

            list = data.allLatestStocks.list
          }

          return ([
            <article key="header">
            <header class="bg-green sans-serif">
                <div class="mw9 center pa4 pt5-ns ph7-l">
                  <h4 class="f2 f1-m f-headline-l measure-narrow lh-title mv0">
                    <span class="lh-copy white pa1 tracked-tight">
                      PSEi Client
                    </span>
                  </h4>
                  <h4 class="f3 fw1 georgia i"> Just simple client for watching the stock market</h4>
                  <h5 class="f6 ttu tracked black-80">By Ryan Sandagon</h5>
                </div>
              </header>
              </article>,
            <article className="helvetica pa3 pa5-ns" data-name="slab-stat-small" key="content">
              <h3 className="f6 ttu tracked">Today: {(new Date()).toLocaleDateString()}</h3>
              {header}
              {list.map((stock, index) => {
                return (<div className={`cf b--black-40 bb ${stock.percent_change < 0 ? 'dark-red' : 'green'}`} key={`stock_${index}`}>
                  <dl className="fl w-20">
                    <dd className="f3 fw6 ml0">{stock.symbol}</dd>
                  </dl>
                  <dl className="fl w-20">
                    <dd className="f3 fw6 ml0">{stock.name}</dd>
                  </dl>
                  <dl className="fl w-20">
                    <dd className={`f3 fw6 ml0 `}>
                      {stock.percent_change < 0 ? downArrow : upArrow}
                      {stock.percent_change}
                    </dd>
                  </dl>
                  <dl className="fl w-20">
                    <dd className="f3 fw6 ml0">{stock.price}</dd>
                  </dl>
                  <dl className="fl w-20">
                    <dd className="f3 fw6 ml0">{stock.volume}</dd>
                  </dl>
                </div>)
              })}

            </article>
          ])
        }}
      </Query>
    )
  }
}

export default App;