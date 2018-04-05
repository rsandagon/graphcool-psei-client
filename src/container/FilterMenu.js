import React from "react";
import Dropdown from "react-dropdown";
import { Query, Mutation } from "react-apollo";
import UPDATE_APP_STATE from "../graphql/ui/UPDATE_APP_STATE";
import GET_APP_STATE from "../graphql/ui/GET_APP_STATE";

export default class FilterMenu extends React.Component {
  render() {
    const options = ["All", "Winners", "Losers"];
    const defaultOption = options[0];
    let selectedOption = defaultOption;

    return (
      <Query query={GET_APP_STATE}>
        {({ data: { appState } }) => {
          if (appState.filter) {
            selectedOption = appState.filter;
          }

          return (
            <Mutation mutation={UPDATE_APP_STATE}>
              {(updateAppState, attrs = {}) => {
                return (
                  <div className="cf">
                    <Dropdown
                      className="fl w-20 mb3"
                      options={options}
                      onChange={selection => {
                        updateAppState({
                          variables: {
                            index: "filter",
                            value: selection.value
                          }
                        });
                      }}
                      value={selectedOption}
                      placeholder="Select an option"
                    />
                  </div>
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}
