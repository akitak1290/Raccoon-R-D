/* global fetch */

const getTransitScore = async (origin, destination) => {
  const headers = {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
    'X-Goog-FieldMask': 'routes.legs.steps,routes.legs.stepsOverview'
  }

  const date = new Date()
  date.setDate(date.getDate() + ((1 + 7 - date.getDay()) % 7)) // Next Monday
  date.setHours(14)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)

  const formattedOrigin = formatPlace(origin)
  const formattedDestination = formatPlace(destination)

  const body = {
    origin: formattedOrigin,
    destination: formattedDestination,
    travelMode: 'TRANSIT',
    computeAlternativeRoutes: false,
    transitPreferences: { routingPreference: 'FEWER_TRANSFERS' },
    arrivalTime: date.toISOString()
  }

  const response = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  })
  const data = await response.json()

  const steps = data?.routes[0]?.legs[0]?.steps
  const stepSegments = data?.routes[0]?.legs[0]?.stepsOverview?.multiModalSegments
  if (!steps || !stepSegments) {
    return null
  }

  let distanceTotal = 0
  let distanceWalk = 0
  let transfers = 0
  for (const segment of stepSegments) {
    if (segment.travelMode != 'WALK') {
      transfers++
    }
    for (let i = segment.stepStartIndex; i <= segment.stepEndIndex; i++) {
      distanceTotal += steps[i].distanceMeters
      if (segment.travelMode == 'WALK') {
        distanceWalk += steps[i].distanceMeters
      }
    }
  }

  const score =
    100 -
    Math.round(distanceTotal / 1000) * 1 -
    Math.round(distanceWalk / 1000) * 3 -
    (transfers <= 0 ? 0 : (transfers - 1) * 10)

  return score > 0 ? Math.round(score) : 0
}

const formatPlace = (place) => {
  if (!place?.placeId && !place?.position && !place?.address) {
    return null
  }

  if (place?.position) {
    return {
      location: {
        latLng: place.position
      }
    }
  }

  return place
}

export default getTransitScore
