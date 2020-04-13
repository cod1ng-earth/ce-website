import gql from 'graphql-tag'

const GQL_CREATE_LOCALITY = gql`
  mutation CreateLocality(
    $city: String
    $untranslatedCity: String!
    $country: String
    $localizedCountryName: String
    $location: LocationInput
  ) {
    createLocality(
      data: {
        city: $city
        untranslatedCity: $untranslatedCity
        country: $country
        localizedCountryName: $localizedCountryName
        location: $location
      }
    ) {
      id
    }
  }
`

/*
{
    "city": "Berlin",
    "untranslatedCity": "Berlin",
    "country": "DE",
    "localizedCountryName": "Germany",
    "location": {"latitude": 52.52, "longitude": 13.38}
}
*/

export function createLocality(locality) {}
