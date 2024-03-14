/* global fetch */

const TYPES = {
  grocery: ['supermarket', 'grocery_store'],
  restaurant: ['restaurant', 'bar', 'cafe'],
  quiet: ['park', 'library', 'cafe']
}

const getPlaceTypeScore = async (origin, type, searchRadius) => {
  const headers = {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
    'X-Goog-FieldMask': 'places.displayName'
  }

  const formattedCircle = await formatPlace(origin)

  const body = {
    locationRestriction: {
      circle: {
        center: formattedCircle,
        radius: searchRadius
      }
    },
    includedTypes: TYPES[type],
    maxResultCount: 20,
    languageCode: 'en'
  }

  const response = await fetch('https://places.googleapis.com/v1/places:searchNearby', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  })
  const data = await response.json()

  const places = data?.places
  if (!Array.isArray(places)) {
    return 0
  }
  const score = places.length * 5

  return score > 0 ? Math.round(score) : 0
}

const formatPlace = async (place) => {
  if (!place?.placeId && !place?.position && !place?.address) {
    return null
  }

  if (place?.position) {
    return place.position
  }

  if (place?.placeId) {
    const response = await fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?' +
        new URLSearchParams({ place_id: place.placeId, key: process.env.GOOGLE_API_KEY })
    )
    const location = (await response.json())?.results[0]?.geometry?.location
    return { latitude: location.lat, longitude: location.lng }
  }

  if (place?.address) {
    const response = await fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?' +
        new URLSearchParams({ address: place.address, key: process.env.GOOGLE_API_KEY })
    )
    const location = (await response.json())?.results[0]?.geometry?.location
    return { latitude: location.lat, longitude: location.lng }
  }

  return place
}

export default getPlaceTypeScore
