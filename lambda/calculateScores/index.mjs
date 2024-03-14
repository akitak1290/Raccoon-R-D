/* Lambda Function - Calculate Scores */

import getTransitScore from './transitScore.mjs'
import getPlaceTypeScore from './placeTypeScore.mjs'

export const handler = async (event) => {
  const { origin, destination, searchRadius } = event
  if (!origin || !destination) {
    return {
      statusCode: 400,
      message: 'Origin or Destination is missing'
    }
  }

  const transitScore = await getTransitScore(origin, destination)
  const groceryScore = await getPlaceTypeScore(origin, 'grocery', searchRadius ?? 1500)
  const restaurantScore = await getPlaceTypeScore(origin, 'restaurant', searchRadius ?? 1500)
  const quietScore = await getPlaceTypeScore(origin, 'quiet', searchRadius ?? 1500)

  if (transitScore == null || groceryScore == null || restaurantScore == null || quietScore == null) {
    return {
      statusCode: 400,
      message: 'Something goes wrong, please try again.'
    }
  }

  const overallScore = (transitScore + groceryScore + restaurantScore + quietScore) / 4

  return {
    statusCode: 200,
    body: {
      overall: overallScore,
      scores: {
        transit: transitScore,
        grocery: groceryScore,
        restaurant: restaurantScore,
        quietEnvironment: quietScore
      }
    }
  }
}
