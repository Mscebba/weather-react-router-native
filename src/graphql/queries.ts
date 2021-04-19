import gql from 'graphql-tag';

export const GET_CITY_LISTED = gql`
  query getCity($id: [String!], $config: ConfigInput) {
    getCityById(id: $id, config: $config) {
      id
      name
      country
      weather {
        temperature {
          actual
        }
        summary {
          icon
        }
        timestamp
      }
    }
  }
`;

export const GET_CITY_FULL_DETAIL = gql`
  query getCity($id: [String!], $config: ConfigInput) {
    getCityById(id: $id, config: $config) {
      id
      name
      country
      coord {
        lon
        lat
      }
      weather {
        summary {
          description
          title
          icon
        }
        temperature {
          actual
          feelsLike
          min
          max
        }
        wind {
          speed
          deg
        }
        clouds {
          all
          visibility
          humidity
        }
        timestamp
      }
    }
  }
`;

export const SEARCH_CITY = gql`
  query getCity($name: String!, $country: String, $config: ConfigInput) {
    getCityByName(name: $name, country: $country, config: $config) {
      id
      name
      country
      weather {
        summary {
          description
        }
        temperature {
          actual
        }
      }
    }
  }
`;
