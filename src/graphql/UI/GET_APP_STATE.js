import gql from 'graphql-tag'

export default gql`
query AppState{
  appState @client {
    selectedSymbol
  }
}    
`