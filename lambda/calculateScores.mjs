/* Lambda Function - Calculate Scores */
/* global fetch */

export const handler = async (event) => {
  const origin = event?.origin
  const destination = event?.destination
  if (!origin || !destination) {
    return {
      statusCode: 400,
      message: 'Origin or Destination is missing'
    }
  }

  const transitScore = await getTransitScore(origin, destination)

  if (!transitScore) {
    return {
      statusCode: 400,
      message: 'Cannot get route'
    }
  }

  return {
    statusCode: 200,
    body: { scores: { transit: transitScore } }
  }
}

const getTransitScore = async (origin, destination) => {
  const headers = {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
    'X-Goog-FieldMask': 'routes.legs.steps,routes.legs.stepsOverview'
  }

  const date = new Date()
  date.setDate(date.getDate() + ((1 + 7 - date.getDay()) % 7)) // Next Monday
  date.setHours(10)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)

  const body = {
    origin: origin,
    destination: destination,
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
