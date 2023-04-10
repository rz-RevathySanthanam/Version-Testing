import { gql } from '@apollo/client';

export const UrlResolverQuery = gql`
query urlResolver($url: String!){
  urlResolver(url: $url) {
    canonical_url
    entity_uid
    id
    redirectCode
    relative_url
    type
  } 
}
`;

export const cmsBlocksQuery = gql`
query cmsBlocks($identifiers: [String!]){
  cmsBlocks(identifiers: $identifiers) {
    items {
      content
      identifier
      title
    }
  } 
}
`;
