# Gamma API Documentation

## Overview

Gamma's API allows you to programmatically create presentations, documents, websites, and social media posts with AI-powered generation capabilities.

## Access Requirements

- **Account Level**: Pro, Ultra, Team, or Business subscription required
- **API Key Format**: `sk-gamma-xxxxxxxx`
- **Rate Limits**: Pro users can generate up to 50 presentations per day
- **Cost**: API access included with Pro subscription during beta (no additional cost)
- **Languages**: Support for 60+ languages

## Authentication

API keys should be passed using the `X-API-KEY` header (NOT Bearer token format).

```bash
X-API-KEY: sk-gamma-xxxxxxxx
```

### Getting Your API Key

1. Log into your Gamma account at [gamma.app](https://gamma.app)
2. Go to Settings > API
3. Create a new API key
4. Store it securely (treat it like a password)

## API Endpoints

### Base URL
```
https://api.gamma.app/public-api
```

### Available Endpoints

#### 1. Generate Content (POST)
**Endpoint**: `/v0.1/generate` or `/v0.2/generations`

Creates a new presentation, document, website, or social post.

**Request Method**: `POST`

**Headers**:
```json
{
  "X-API-KEY": "sk-gamma-xxxxxxxx",
  "Content-Type": "application/json"
}
```

**Request Body Parameters**:

##### Required Parameters
- `inputText` (string, required): The main content or prompt for generation (1-400,000 characters)

##### Format & Structure
- `format` (string): Output type
  - `presentation` (default)
  - `document`
  - `social` (social media post)
  - `website`

- `numCards` (integer): Number of slides/cards
  - Pro tier: 1-60
  - Ultra tier: 1-75

- `cardDimension` (string): Aspect ratio
  - `fluid` (default)
  - `16x9`
  - `4x3`

##### Text Configuration
- `textMode` (string): How to process input text
  - `generate`: AI creates new content from prompt
  - `condense`: Summarize provided content
  - `preserve`: Use text as-is with minimal changes

- `textAmount` (string): Content length per card
  - `brief`
  - `medium` (default)
  - `detailed`
  - `extensive`

- `tone` (string): Writing style (e.g., "professional", "casual", "humorous and sarcastic")
- `audience` (string): Target demographic (e.g., "students", "executives", "general audience")
- `language` (string): Output language code (e.g., "en", "es", "fr", "de")

##### Image Configuration
- `imageModel` (string): Image generation source
  - `ai` (AI-generated images)
  - `unsplash` (stock photos)
  - `giphy` (GIFs)
  - `none` (no images)

- `imageStyle` (string): Visual style for AI-generated images
  - `photographic`
  - `illustration`
  - `abstract`
  - `minimalist`

##### Advanced Options
- `editorMode` (string): Editor interface type
- `theme` (string): Custom theme name (must exist in your Gamma workspace)
- `additionalInstructions` (string): Custom directives for generation

##### Export Options
- `exportPdf` (boolean): Generate PDF export
- `exportPptx` (boolean): Generate PowerPoint export

**Example Request**:
```json
{
  "inputText": "Create a presentation about sustainable energy solutions",
  "format": "presentation",
  "numCards": 10,
  "textMode": "generate",
  "textAmount": "medium",
  "tone": "professional",
  "audience": "executives",
  "language": "en",
  "imageModel": "ai",
  "imageStyle": "photographic",
  "cardDimension": "16x9",
  "exportPdf": true,
  "exportPptx": false
}
```

**Response**:
```json
{
  "generationId": "gen_abc123xyz",
  "status": "processing",
  "message": "Generation started successfully"
}
```

#### 2. Get Generation Status (GET)
**Endpoint**: `/v0.1/generations/{generationId}` or `/v0.2/generations/{generationId}`

Retrieves the status and results of a generation request.

**Request Method**: `GET`

**Headers**:
```json
{
  "X-API-KEY": "sk-gamma-xxxxxxxx"
}
```

**Polling Recommendations**:
- Poll every 5 seconds
- Default timeout: 300 seconds (5 minutes)
- Generation typically completes in 30-90 seconds

**Response (Processing)**:
```json
{
  "generationId": "gen_abc123xyz",
  "status": "processing",
  "progress": 45
}
```

**Response (Completed)**:
```json
{
  "generationId": "gen_abc123xyz",
  "status": "completed",
  "gammaUrl": "https://gamma.app/docs/Your-Presentation-abc123",
  "editUrl": "https://gamma.app/docs/Your-Presentation-abc123/edit",
  "exportUrls": {
    "pdf": "https://gamma.app/docs/Your-Presentation-abc123/export/pdf",
    "pptx": "https://gamma.app/docs/Your-Presentation-abc123/export/pptx"
  }
}
```

**Response (Failed)**:
```json
{
  "generationId": "gen_abc123xyz",
  "status": "failed",
  "error": "Error message describing what went wrong"
}
```

## API Usage Patterns

### Basic Generation Flow

1. **Create Generation**: POST to `/v0.1/generate` with your content and preferences
2. **Get Generation ID**: Store the `generationId` from response
3. **Poll for Status**: GET `/v0.1/generations/{generationId}` every 5 seconds
4. **Check Completion**: When `status` is "completed", retrieve URLs
5. **Access Content**: Use `gammaUrl` for viewing/editing, `exportUrls` for downloads

### Python Example

```python
import requests
import time

API_KEY = "sk-gamma-xxxxxxxx"
BASE_URL = "https://api.gamma.app/public-api/v0.1"

headers = {
    "X-API-KEY": API_KEY,
    "Content-Type": "application/json"
}

# Create presentation
payload = {
    "inputText": "The future of artificial intelligence in healthcare",
    "format": "presentation",
    "numCards": 12,
    "textMode": "generate",
    "tone": "professional",
    "imageModel": "ai"
}

response = requests.post(f"{BASE_URL}/generate", headers=headers, json=payload)
generation_id = response.json()["generationId"]

# Poll for completion
while True:
    status_response = requests.get(
        f"{BASE_URL}/generations/{generation_id}",
        headers=headers
    )
    data = status_response.json()

    if data["status"] == "completed":
        print(f"Presentation ready: {data['gammaUrl']}")
        break
    elif data["status"] == "failed":
        print(f"Generation failed: {data.get('error')}")
        break

    time.sleep(5)  # Wait 5 seconds before next poll
```

## Integration Options

### No-Code Platforms
- **Zapier**: Connect Gamma to 5000+ apps
- **Make.com**: Create automated workflows
- **Workato**: Enterprise integration platform
- **N8N**: Self-hosted workflow automation

### Use Cases
- Automatically generate presentations from meeting transcripts
- Create reports from database data
- Generate social media content from blog posts
- Build websites from structured data
- Convert documents to presentations

## Best Practices

### 1. Input Text Quality
- **Be specific**: Provide clear, detailed prompts for better results
- **Structure matters**: Use bullet points, headers, and clear sections
- **Length**: 1-400,000 characters supported
- **Context**: Include relevant background information

### 2. Rate Limiting
- Respect the 50 generations/day limit for Pro users
- Implement exponential backoff for retries
- Cache generation IDs for status checking
- Don't poll more frequently than every 5 seconds

### 3. Error Handling
- Always check response status codes
- Handle timeouts gracefully (max 5 minutes recommended)
- Log generation IDs for debugging
- Implement retry logic for network failures

### 4. Security
- Never expose API keys in client-side code
- Store keys in environment variables
- Use HTTPS for all requests
- Rotate keys periodically

### 5. Optimization
- Use `textMode: "preserve"` if you have pre-written content
- Set `imageModel: "none"` for faster generation if images aren't needed
- Use appropriate `textAmount` to balance detail and generation time
- Specify `language` explicitly for non-English content

## API Migration

**Important**: If using v0.2 API, migrate to v1.0 by January 16, 2025.
The v0.2 endpoints will be deprecated after this date.

## Limitations & Considerations

### Current Limitations
- No endpoint for listing existing presentations (as of current documentation)
- No endpoint for editing existing content via API
- No endpoint for deleting generations
- Rate limits apply per user, not per API key

### Content Restrictions
- Gamma's content policy applies to API-generated content
- Inappropriate or harmful content requests will be rejected
- Quality may vary based on prompt clarity and specificity

## Support & Resources

- **Documentation**: [developers.gamma.app](https://developers.gamma.app)
- **Help Center**: [help.gamma.app](https://help.gamma.app)
- **Status Page**: Check for API availability and incidents
- **Community**: Gamma community forums

## Changelog

- **2025**: Generate API now generally available
- **Beta Release**: Initial v0.2 endpoints launched
- **Deprecation Notice**: v0.2 to be sunset January 16, 2025

## Additional Notes

### MCP Server Integration
For users of Claude Desktop or MCP-compatible clients, consider using pre-built MCP servers:
- `@raydeck/gamma-app-mcp`: NPX-installable MCP server
- `gamma-mcp-server`: TypeScript-based implementation
- Configure via MCP settings with `GAMMA_API_KEY` environment variable

### Future API Capabilities
Based on roadmap discussions, future endpoints may include:
- List user's presentations
- Update existing content
- Delete generations
- Analytics and usage data
- Collaboration features

---

**Last Updated**: 2025-11-11
**API Version**: v0.1 (v1.0 coming soon)
**Documentation Status**: Based on current beta API
