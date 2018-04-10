import React from "react";

export default class StockDetails extends React.Component {
  render() {
    const downArrow = (
      <svg
        className="w1 mr2"
        style={{ fill: "currentcolor" }}
        width="16"
        height="16"
        viewBox="0 0 128 128"
      >
        <title />
        <g id="icomoon-ignore" />
        <path d="M109.657 77.657l-40 40c-3.124 3.124-8.189 3.124-11.313 0l-40-40c-3.124-3.124-3.124-8.189 0-11.314s8.19-3.124 11.314 0l26.343 26.343v-76.686c0-4.418 3.582-8 8-8s8 3.582 8 8v76.686l26.343-26.343c1.562-1.562 3.609-2.343 5.657-2.343s4.095 0.781 5.657 2.343c3.124 3.124 3.124 8.189 0 11.314z" />
      </svg>
    );

    const upArrow = (
      <svg
        className="w1 mr2"
        style={{ fill: "currentcolor" }}
        width="16"
        height="16"
        viewBox="0 0 128 128"
      >
        <title />
        <g id="icomoon-ignore" />
        <path d="M109.657 50.343l-40-40c-3.124-3.124-8.189-3.124-11.313 0l-40 40c-3.124 3.124-3.124 8.19 0 11.314s8.19 3.124 11.314 0l26.343-26.343v76.686c0 4.418 3.582 8 8 8s8-3.582 8-8v-76.686l26.343 26.343c1.562 1.562 3.609 2.343 5.657 2.343s4.095-0.781 5.657-2.343c3.124-3.124 3.124-8.189 0-11.313z" />
      </svg>
    );
    return (
      <div
        className={`cf b--black-40 bb ${
          this.props.stock.percent_change < 0 ? "dark-red" : "green"
        }`}
      >
        <dl className="fl w-20">
          <dd className="f4 fw2 ml0">{this.props.stock.symbol}</dd>
        </dl>
        <dl className="fl w-20">
          <dd className="f4 fw2 ml0">{this.props.stock.name}</dd>
        </dl>
        <dl className="fl w-20">
          <dd className={`f4 fw2 ml0 `}>
            {this.props.stock.percent_change < 0 ? downArrow : upArrow}
            {this.props.stock.percent_change}
          </dd>
        </dl>
        <dl className="fl w-20">
          <dd className="f4 fw2 ml0">{this.props.stock.price}</dd>
        </dl>
        <dl className="fl w-20">
          <dd className="f4 fw2 ml0">{this.props.stock.volume}</dd>
        </dl>
      </div>
    );
  }
}
