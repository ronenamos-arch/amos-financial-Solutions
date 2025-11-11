# Gamma API Integration

This directory contains comprehensive tools for working with the Gamma.app API to programmatically create presentations, websites, documents, and social media posts.

## Files Included

1. **GAMMA_API_DOCUMENTATION.md** - Complete API documentation including:
   - Authentication and setup
   - All API endpoints and parameters
   - Request/response formats
   - Best practices and examples
   - Limitations and considerations

2. **gamma_api_client.py** - Full-featured Python script with:
   - Interactive menu-driven interface
   - Create presentations with custom options
   - Generate websites and documents
   - Social media post creation
   - Status polling and monitoring
   - Error handling and retries

3. **requirements.txt** - Python dependencies

## Quick Start

### 1. Prerequisites

- Python 3.7 or higher
- Gamma Pro, Ultra, Team, or Business account
- Gamma API key

### 2. Get Your API Key

1. Visit [https://gamma.app](https://gamma.app)
2. Log in to your account
3. Go to **Settings > API**
4. Create a new API key (format: `sk-gamma-xxxxxxxx`)
5. Copy and save it securely

### 3. Installation

```bash
# Install Python dependencies
pip install -r requirements.txt

# Set your API key as environment variable (recommended)
export GAMMA_API_KEY="sk-gamma-xxxxxxxx"

# Or create a .env file
echo "GAMMA_API_KEY=sk-gamma-xxxxxxxx" > .env
```

### 4. Run the Script

```bash
# Make script executable
chmod +x gamma_api_client.py

# Run the interactive client
python gamma_api_client.py
```

If you didn't set the environment variable, the script will prompt you for your API key.

## Features

### Available Options

The script provides an interactive menu with the following options:

1. **Create Presentation** - Quick presentation generation
   - Set topic and number of slides
   - Choose tone (professional, casual, humorous)
   - Define target audience
   - Include/exclude AI-generated images
   - Export to PDF

2. **Create Website** - Website generation
   - Describe your website or provide content
   - Select tone and style
   - Include images from AI or stock photos

3. **Create Document** - Document creation
   - Generate, condense, or preserve text
   - Multiple tone options
   - Automatic formatting

4. **Create Social Media Post** - Social content
   - Quick post generation
   - Various tones and styles
   - AI-generated visuals

5. **Advanced Generation** - Full control
   - All customization options
   - Fine-tune every parameter
   - Export formats (PDF, PowerPoint)
   - Language selection (60+ languages)
   - Image sources (AI, Unsplash, Giphy, none)

6. **Check Generation Status** - Monitor progress
   - Track generation by ID
   - View completion status
   - Get URLs when ready

7. **View Account Info** - Documentation
   - API limitations and rate limits
   - Feature overview
   - Known limitations

## Usage Examples

### Example 1: Quick Presentation

```python
from gamma_api_client import GammaClient

client = GammaClient(api_key="sk-gamma-xxxxxxxx")

# Create a 15-slide presentation
result = client.create_presentation(
    topic="The Impact of AI on Modern Business",
    num_slides=15,
    tone="professional",
    audience="business executives",
    include_images=True,
    export_pdf=True
)

print(f"Presentation URL: {result['gammaUrl']}")
```

### Example 2: Generate Website

```python
result = client.create_website(
    content="A portfolio website for a freelance graphic designer showcasing modern minimalist design work",
    tone="creative",
    include_images=True
)

print(f"Website URL: {result['gammaUrl']}")
```

### Example 3: Advanced Custom Generation

```python
result = client.generate_content(
    input_text="Quarterly sales report for Q4 2024",
    format="document",
    num_cards=8,
    text_mode="condense",
    text_amount="detailed",
    tone="professional",
    audience="board members",
    language="en",
    image_model="unsplash",
    card_dimension="16x9",
    export_pdf=True,
    export_pptx=True
)

# Wait for completion
generation_id = result["generationId"]
final_result = client.poll_until_complete(generation_id)

print(f"Document: {final_result['gammaUrl']}")
print(f"PDF: {final_result['exportUrls']['pdf']}")
print(f"PowerPoint: {final_result['exportUrls']['pptx']}")
```

### Example 4: Async Generation (Don't Wait)

```python
# Start generation without waiting
result = client.create_presentation(
    topic="Machine Learning Basics",
    num_slides=20,
    wait_for_completion=False  # Returns immediately
)

generation_id = result["generationId"]
print(f"Generation started: {generation_id}")

# Check status later
status = client.get_generation_status(generation_id)
print(f"Status: {status['status']}")
```

## API Capabilities

### Content Types

- **Presentations**: Slide decks with 1-60 cards (Pro) or 1-75 (Ultra)
- **Websites**: Responsive web pages
- **Documents**: Formatted documents and reports
- **Social Posts**: Social media content

### Text Processing Modes

- **Generate**: AI creates new content from your prompt
- **Condense**: Summarize and compress your content
- **Preserve**: Use your text as-is with minimal changes

### Image Options

- **AI-generated**: Custom images created by AI
- **Unsplash**: Professional stock photography
- **Giphy**: Animated GIFs
- **None**: Text-only content

### Export Formats

- Online Gamma (always available)
- PDF export (optional)
- PowerPoint/PPTX export (optional)

### Language Support

60+ languages supported, including:
- English (en)
- Spanish (es)
- French (fr)
- German (de)
- Chinese (zh)
- Japanese (ja)
- And many more...

## Rate Limits

- **Pro Users**: 50 generations per day
- **Ultra Users**: Higher limits (check your account)
- **Polling**: Recommended every 5 seconds
- **Timeout**: Maximum 5 minutes per generation

## Current Limitations

Based on the current Gamma API (as of November 2025):

### Not Yet Available via API

1. **List Presentations**: No endpoint to retrieve all your Gammas
2. **Edit Existing Content**: Cannot modify existing presentations via API
3. **Delete Content**: No API endpoint for deletion
4. **Analytics**: No usage statistics or view counts
5. **Collaboration**: No sharing or permission management

### Workarounds

- **Accessing Your Content**: Visit [https://gamma.app](https://gamma.app) to view all Gammas
- **Editing**: Use the `editUrl` from API response to open in browser
- **Tracking**: Save generation IDs locally for future reference
- **Organization**: Use naming conventions in your prompts for better organization

## Best Practices

1. **API Key Security**
   - Never commit API keys to version control
   - Use environment variables or secure key management
   - Rotate keys periodically

2. **Rate Limiting**
   - Track your daily usage (50 per day for Pro)
   - Implement exponential backoff for retries
   - Cache generation IDs

3. **Content Quality**
   - Be specific and detailed in prompts
   - Provide structured input for better results
   - Test with different tones and styles

4. **Error Handling**
   - Always implement timeout logic
   - Handle network failures gracefully
   - Log generation IDs for debugging

5. **Performance**
   - Set `image_model="none"` for faster generation if images aren't needed
   - Use appropriate `text_amount` settings
   - Consider async generation for batch operations

## Troubleshooting

### Common Issues

**"API key not found"**
- Solution: Set `GAMMA_API_KEY` environment variable or pass to constructor

**"Rate limit exceeded"**
- Solution: You've hit the 50/day limit. Wait 24 hours or upgrade account.

**"Generation timed out"**
- Solution: Increase `max_wait_seconds` parameter or check API status

**"Invalid format"**
- Solution: Use "presentation", "document", "website", or "social"

**"403 Forbidden"**
- Solution: Verify your API key is correct and account has Pro+ subscription

### Getting Help

- **Documentation**: See `GAMMA_API_DOCUMENTATION.md`
- **Official Docs**: [https://developers.gamma.app](https://developers.gamma.app)
- **Help Center**: [https://help.gamma.app](https://help.gamma.app)
- **Support**: Contact Gamma support through their website

## Advanced Topics

### Integration with Other Tools

The Gamma API can be integrated with:

- **Zapier**: Automate presentation creation from triggers
- **Make.com**: Build complex workflows
- **N8N**: Self-hosted automation
- **Custom Apps**: Build your own presentation tools

### Batch Processing

```python
# Generate multiple presentations
topics = [
    "Introduction to Python",
    "Data Science Fundamentals",
    "Machine Learning Overview"
]

generation_ids = []
for topic in topics:
    result = client.create_presentation(
        topic=topic,
        wait_for_completion=False
    )
    generation_ids.append(result["generationId"])

# Check all statuses later
for gen_id in generation_ids:
    status = client.get_generation_status(gen_id)
    print(f"{gen_id}: {status['status']}")
```

### Custom Themes

If you have custom themes in your Gamma workspace:

```python
result = client.generate_content(
    input_text="Your content",
    format="presentation",
    theme="My Custom Theme",  # Must exist in your workspace
    # ... other parameters
)
```

## Migration Notes

**Important**: If you're using API v0.2, migrate to v1.0 by January 16, 2025.
The v0.2 endpoints will be deprecated after this date.

This script uses the v0.1 endpoint which is forward-compatible with v1.0.

## Contributing

Contributions are welcome! Areas for enhancement:

- [ ] Add support for v1.0 API when released
- [ ] Implement local caching of generation IDs
- [ ] Add batch processing utilities
- [ ] Create configuration file support
- [ ] Add logging and monitoring
- [ ] Build CLI argument parser for non-interactive use

## License

This script is provided as-is for use with your Gamma Pro+ account.

## Changelog

### 2025-11-11
- Initial release
- Full API v0.1 support
- Interactive menu interface
- All content types supported
- Comprehensive error handling

---

**Note**: This is an unofficial client. For official SDKs and updates, visit [developers.gamma.app](https://developers.gamma.app).
