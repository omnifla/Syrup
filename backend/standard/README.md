# Syrup API Documentation

## Overview
The Syrup API provides a standardized interface for coupon code providers to integrate with the Syrup browser extension. This document outlines the required endpoints and data structures that providers must implement to be compatible with Syrup.

[Refer to @ImGajeed76 backend](https://github.com/ImGajeed76/discountdb-api)

## Base URL Configuration
The API endpoints must be accessible under the `/syrup` path, but providers have complete flexibility in choosing their base URL. The base URL can be any valid HTTP/HTTPS URL where you host your API. Examples include:

```
https://api.provider.com/syrup/
https://my.database.com/v1/syrup/
https://coupons.example.org/api/syrup/
```

This flexibility allows providers to integrate the Syrup endpoints into their existing API infrastructure. The only requirement is that all Syrup endpoints must be accessible under the `/syrup` path segment of whatever base URL you choose.

## Authentication
Authentication in the Syrup API is entirely optional. The extension includes an API key via the `X-Syrup-API-Key` header in all requests, but providers can choose whether to implement authentication or not.

Key characteristics of the authentication system:
- The API key is configured by users in the Syrup extension settings, alongside the base URL
- By default, the API key is empty
- Providers can choose to:
    - Completely ignore the API key header
    - Implement basic validation (e.g., check against a whitelist)
    - Use it as part of a more complex authentication system
- If authentication is implemented, invalid keys should return 401 Unauthorized
- Missing or empty API keys should be handled according to the provider's authentication policy

## Data Structures

### Coupon
The Coupon structure represents a single coupon code and its metadata. Each field serves a specific purpose:

```jsonc
{
    "id": "string",           // Unique identifier for the coupon
    "title": "string",        // Display title with discount amount
    "description": "string",  // Detailed coupon information
    "code": "string",         // The actual coupon code
    "score": number,          // Relevance/reliability score
    "merchant_name": "string" // Store/website name
}
```

Field Details:
- `id`: Recommended to use incremental numbers for database performance. This makes database indexing and lookups more efficient.
- `title`: Must include the actual discount amount. This is crucial for user understanding and decision-making. Examples:
    - "20% Off Everything"
    - "$30 Off Orders Over $100"
    - "Free Shipping on Orders Over $50"
    - "Buy One Get One Free"
    - "Save $15 on First Purchase"
- `description`: Can include additional information such as:
    - Exclusions or restrictions
    - Minimum purchase requirements
    - Product category limitations
    - Additional terms and conditions
- `code`: The actual coupon code that users will input at checkout
- `score`: A number indicating the coupon's relevance and reliability. Providers can implement their own scoring system.
- `merchant_name`: Should match the commonly known name of the merchant (not necessarily the domain name)

### VersionInfo
The VersionInfo structure helps track API compatibility:

```jsonc
{
    "version": "string", // Semantic versioning recommended
    "provider": "string" // Provider's name or identifier
}
```

## Endpoints

### Get API Version
Returns information about the API implementation.

```
GET /syrup/version
```

#### Response
```jsonc
{
    "version": "1.0.0",
    "provider": "ExampleProvider"
}
```

### List Coupons
Returns a paginated list of coupons for a specific domain.

```
GET /syrup/coupons
```

#### Query Parameters
| Parameter | Type   | Required | Description                                     |
|-----------|--------|----------|-------------------------------------------------|
| domain    | string | Yes      | The website domain to fetch coupons for         |
| limit     | number | No       | Maximum number of coupons to return (default: 20)|
| offset    | number | No       | Number of coupons to skip (default: 0)          |

#### Response Headers
| Header                | Description                                           |
|----------------------|-------------------------------------------------------|
| X-RateLimit-Limit    | The maximum number of requests allowed per time window|
| X-RateLimit-Remaining| The number of requests remaining in the time window   |
| X-RateLimit-Reset    | The time when the rate limit window resets (Unix timestamp)|

#### Response Body
```jsonc
{
    "coupons": [
        {
            "id": "123",
            "title": "20% Off Everything",
            "description": "Save 20% on your entire purchase",
            "code": "SAVE20",
            "score": 0.95,
            "merchant_name": "Example Store"
        }
    ],
    "total": 100
}
```

### Report Valid Coupon
Report that a coupon code was successfully used.

```
POST /syrup/coupons/valid/{id}
```

#### Path Parameters
| Parameter | Type   | Description           |
|-----------|--------|-----------------------|
| id        | string | The ID of the coupon |

#### Response
Empty response with HTTP 200 status code.

### Report Invalid Coupon
Report that a coupon code failed to work.

```
POST /syrup/coupons/invalid/{id}
```

#### Path Parameters
| Parameter | Type   | Description           |
|-----------|--------|-----------------------|
| id        | string | The ID of the coupon |

#### Response
Empty response with HTTP 200 status code.

## Rate Limiting
The rate limiting system is designed to be transparent to clients while giving providers flexibility in implementation. Key aspects:

Response Headers:
- `X-RateLimit-Limit`: Maximum requests per time window (e.g., "1000")
- `X-RateLimit-Remaining`: Requests remaining in current window (e.g., "997")
- `X-RateLimit-Reset`: Unix timestamp for window reset (e.g., "1609459200")

When rate limit is exceeded, return 429 Too Many Requests status code with a `X-RateLimit-RetryAfter` header in seconds.

## Error Handling
The API uses standard HTTP status codes with specific meanings in the context of the Syrup API:

- 200 Success: Request processed successfully
- 400 Bad Request:
    - Invalid domain format
    - Invalid pagination parameters
    - Missing required parameters
- 401 Unauthorized:
    - Invalid API key (only if authentication is implemented)
    - Expired API key
- 404 Not Found:
    - Invalid coupon ID
    - No coupons found for domain
- 429 Too Many Requests:
    - Rate limit exceeded
    - Include Retry-After header
- 500 Internal Server Error:
    - Database errors
    - Integration errors
    - System failures

Error responses should include a descriptive message when possible:
```jsonc
{
    "error": "Invalid domain format",
    "message": "Domain must be a valid hostname without protocol or path"
}
```

## Scoring Guidelines
The scoring system helps users identify the most reliable and relevant coupons. Providers implement their own scoring algorithm and can use any numerical range they prefer. Common factors to consider:

- Success rate in validations
- Recent usage patterns
- Total number of validations
- Discount amount
- Coupon age

Codes must be returned sorted by their score. A higher score means it's a better coupon.

## Security Best Practices
While implementing the Syrup API, providers should consider these security aspects:

Input Validation:
- Sanitize domain parameters
- Validate pagination parameters
- Escape special characters in coupon codes
- Validate API keys if authentication is implemented

Data Protection:
- Sanitize error messages to avoid information leakage
- Use secure methods for storing API keys
