import gql from 'graphql-tag'

export default gql`mutation updateAppState($index: String!, $value: String!) {
    updateAppState(index: $index, value: $value) @client {
      selectedSymbol
    }
  }`