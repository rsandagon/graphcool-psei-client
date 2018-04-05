import React from "react";
import { Query } from "react-apollo";
import StockDetails from "./container/StockDetails";
import FilterMenu from "./container/FilterMenu";

import ALL_LATEST_STOCKS from "./graphql/stocks/ALL_LATEST_STOCKS";
import GET_APP_STATE from "./graphql/ui/GET_APP_STATE";

class App extends React.Component {
  state = {};
  firstTime = true;

  constructor(props) {
    super(props);
    this.state = {
      filter: "All"
    };

    this._onSelect = this._onSelect.bind(this);
    this._sortList = this._sortList.bind(this);
  }

  _onSelect(selection) {
    this.setState({ filter: selection.value });
  }

  _sortList(filter, list) {
    //very crude filtering
    let filterList = [];
    if (filter === "Winners") {
      filterList = list.sort((a, b) => {
        return b.percent_change - a.percent_change;
      });
    } else if (filter === "Losers") {
      filterList = list.sort((a, b) => {
        return a.percent_change - b.percent_change;
      });
    } else {
      filterList = list;
    }
    return filterList;
  }
  render() {
    const loadingScreen = (
      <article className="vh-100 dt w-100">
        <div className="dtc v-mid tc white ph3 ph4-l">
          <blockquote className="athelas ml0 mt0 pl4 black-90 bl bw2 b--blue">
            <p className="f6 f2-m f-subheadline-l fw2 tc  f3-l ">
              Rule No.1: Never lose money. Rule No.2: Never forget rule No.1.
            </p>
            <cite className="f6 ttu tracked fs-normal">―Warren Buffet</cite>
          </blockquote>
        </div>
      </article>
    );

    const errorDiv = (
      <div className="flex items-center justify-center pa4 bg-lightest-red dark-red">
        <svg
          className="w1"
          data-icon="info"
          viewBox="0 0 32 32"
          style={{ fill: "currentcolor" }}
        >
          <title>info icon</title>
          <path d="M16 0 A16 16 0 0 1 16 32 A16 16 0 0 1 16 0 M19 15 L13 15 L13 26 L19 26 z M16 6 A3 3 0 0 0 16 12 A3 3 0 0 0 16 6" />
        </svg>
        <span className="lh-title ml3">
          Query failed! Page will refresh in 5 seconds, or you may refresh it
          manually.
        </span>
      </div>
    );

    const tableHeader = (
      <div className="cf b--black-40 bb">
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
      </div>
    );

    const renderHeader = (
      <article key="header">
        <header className="bg-green sans-serif">
          <div className="mw9 center pa4 pt5-ns ph7-l">
            <h4 className="f2 f1-m f-headline-l measure-narrow lh-title mv0">
              <span className="lh-copy white pa1 tracked-tight">
                PSEi Client
              </span>
            </h4>
            <h4 className="f3 fw1 georgia i">
              {" "}
              Just a simple client for watching the stock market
            </h4>
            <h5 className="f6 ttu tracked black-80">By Ryan Sandagon</h5>
          </div>
        </header>
      </article>
    );

    const renderDate = (
      <h3 className="f6 ttu tracked">
        Today: {new Date().toLocaleDateString()}
      </h3>
    );

    return (
      <Query query={GET_APP_STATE}>
        {({ loading, error, data }) => {
          let filter = "All";

          if (data.appState) {
            filter = data.appState.filter;
          }

          return [
            <Query
              query={ALL_LATEST_STOCKS}
              pollInterval={10000}
              key="query-latest-stocks"
            >
              {({ loading, error, data }) => {
                let filteredList = [];

                if (loading && this.firstTime) return loadingScreen;
                if (error) return errorDiv;
                if (data) {
                  if (!data.allLatestStocks) {
                    return errorDiv;
                  }

                  this.firstTime = false;
                  filteredList = this._sortList(
                    filter,
                    data.allLatestStocks.list.slice()
                  );
                }

                return [
                  renderHeader,
                  <article
                    className="helvetica pa3 pa5-ns"
                    data-name="slab-stat-small"
                    key="content"
                  >
                    <FilterMenu />
                    {renderDate}
                    {tableHeader}
                    {filteredList.map((stock, index) => {
                      return (
                        <StockDetails stock={stock} key={`stock_${index}`} />
                      );
                    })}
                  </article>
                ];
              }}
            </Query>
          ];
        }}
      </Query>
    );
  }
}

export default App;
