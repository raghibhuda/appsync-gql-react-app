// eslint-disable
// this is an auto generated file. This will be overwritten

export const getNotes = `query GetNotes($id: ID!) {
  getNotes(id: $id) {
    id
    name
    description
  }
}
`;
export const listNotess = `query ListNotess(
  $filter: ModelNotesFilterInput
  $limit: Int
  $nextToken: String
) {
  listNotess(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
    }
    nextToken
  }
}
`;
