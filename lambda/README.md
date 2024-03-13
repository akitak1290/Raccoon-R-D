# Student Space's backend Lambda

## Introduction
This is the backend API documentation for the Lambda functions òo the Student Space application.

### API: Calculate Score

#### Input

```JS
{
  "source": {
    // Choose one of three only
    "placeId": string,
    "position": {
      {
        "latitude": number,
        "longitude": number
      }
    }
    "address": string
  },
  "destination": {
    // Choose one of three only
    "placeId": string,
    "position": {
      {
        "latitude": number,
        "longitude": number
      }
    }
    "address": string
  },
}
```

#### Output

```JS
{
  "overall": number,
  "scores": {
    "transit": number,
    "grocery": number,
    "restaurant": number,
    "quietEnvironment": number,
  },
}
```
