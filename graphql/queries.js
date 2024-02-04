import { gql } from '@apollo/client';

const GET_ORDERS = gql`
query {
  orders {
    data {
      id
      attributes {
        email
        amount
        createdAt
        dishes
      }
    }
  }
}
`

const GET_ALL_SLUGS = gql`
query {
    restaurants {
      data {
        attributes {
          urlSlug
        }
      }
    }
  }
`;

const GET_RESTAURANTS = gql`
    query {
      restaurants {
        data {
          id
          attributes {
            name
            cuisine
            description
            urlSlug
            image {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;

const GET_RESTAURANT_DISHES = gql`
  query ($slugUrl: String!) {
    restaurants(filters: { urlSlug: { eq: $slugUrl } }) {
      data {
        attributes {
            name
          dishes {
            data {
              attributes {
                name
                price
                description
                image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export { GET_RESTAURANTS, GET_RESTAURANT_DISHES, GET_ALL_SLUGS, GET_ORDERS };