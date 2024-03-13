/* Lambda Function - Calculate Scores */
/* global fetch */

export const handler = async (event) => {
  const body = JSON.parse(event.body)
  const origin = body.origin;
  const destination = body.destination;
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

  const body = {
    origin: origin,
    destination: destination,
    travelMode: 'TRANSIT',
    computeAlternativeRoutes: false,
    arrivalTime: '2024-03-18T13:00:00.000Z'
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
  let transitTimes = 0
  for (const segment of stepSegments) {
    if (segment.travelMode != 'WALK') {
      transitTimes++
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
    (transitTimes <= 0 ? 0 : (transitTimes - 1) * 5)

  return score > 0 ? score : 0
}
