#!/usr/bin/env python3
"""
Gamma API Client
A comprehensive script for interacting with Gamma.app API to create presentations,
websites, documents, and manage your Gamma content.

Requirements:
- Python 3.7+
- requests library (pip install requests)
- Gamma Pro, Ultra, Team, or Business account
- Valid Gamma API key

Setup:
1. Get your API key from https://gamma.app (Settings > API)
2. Set GAMMA_API_KEY environment variable or store in .env file
3. Run: python gamma_api_client.py
"""

import os
import sys
import time
import json
import requests
from typing import Dict, Optional, List
from enum import Enum


class GammaAPIError(Exception):
    """Custom exception for Gamma API errors"""
    pass


class Format(Enum):
    """Content format types"""
    PRESENTATION = "presentation"
    DOCUMENT = "document"
    WEBSITE = "website"
    SOCIAL = "social"


class TextMode(Enum):
    """Text processing modes"""
    GENERATE = "generate"  # AI creates new content
    CONDENSE = "condense"  # Summarize content
    PRESERVE = "preserve"  # Use text as-is


class TextAmount(Enum):
    """Content length per card"""
    BRIEF = "brief"
    MEDIUM = "medium"
    DETAILED = "detailed"
    EXTENSIVE = "extensive"


class ImageModel(Enum):
    """Image source options"""
    AI = "ai"
    UNSPLASH = "unsplash"
    GIPHY = "giphy"
    NONE = "none"


class ImageStyle(Enum):
    """Visual styles for AI images"""
    PHOTOGRAPHIC = "photographic"
    ILLUSTRATION = "illustration"
    ABSTRACT = "abstract"
    MINIMALIST = "minimalist"


class CardDimension(Enum):
    """Aspect ratio options"""
    FLUID = "fluid"
    WIDE = "16x9"
    STANDARD = "4x3"


class GammaClient:
    """Client for interacting with Gamma API"""

    def __init__(self, api_key: Optional[str] = None):
        """
        Initialize Gamma API client

        Args:
            api_key: Gamma API key (if not provided, reads from GAMMA_API_KEY env var)
        """
        self.api_key = api_key or os.getenv("GAMMA_API_KEY")
        if not self.api_key:
            raise GammaAPIError(
                "API key not found. Set GAMMA_API_KEY environment variable or pass api_key parameter."
            )

        self.base_url = "https://api.gamma.app/public-api/v0.1"
        self.headers = {
            "X-API-KEY": self.api_key,
            "Content-Type": "application/json"
        }

    def generate_content(
        self,
        input_text: str,
        format: str = "presentation",
        num_cards: int = 10,
        text_mode: str = "generate",
        text_amount: str = "medium",
        tone: Optional[str] = None,
        audience: Optional[str] = None,
        language: str = "en",
        image_model: str = "ai",
        image_style: Optional[str] = None,
        card_dimension: str = "fluid",
        theme: Optional[str] = None,
        export_pdf: bool = False,
        export_pptx: bool = False,
        additional_instructions: Optional[str] = None,
        editor_mode: Optional[str] = None
    ) -> Dict:
        """
        Generate new Gamma content (presentation, website, document, or social post)

        Args:
            input_text: Main content or prompt (1-400,000 characters)
            format: Output type (presentation, document, website, social)
            num_cards: Number of slides/cards (1-60 for Pro, 1-75 for Ultra)
            text_mode: Processing mode (generate, condense, preserve)
            text_amount: Content length (brief, medium, detailed, extensive)
            tone: Writing style (e.g., "professional", "casual")
            audience: Target demographic (e.g., "students", "executives")
            language: Output language code (e.g., "en", "es", "fr")
            image_model: Image source (ai, unsplash, giphy, none)
            image_style: Visual style for AI images (photographic, illustration, etc.)
            card_dimension: Aspect ratio (fluid, 16x9, 4x3)
            theme: Custom theme name (must exist in workspace)
            export_pdf: Generate PDF export
            export_pptx: Generate PowerPoint export
            additional_instructions: Custom generation directives
            editor_mode: Editor interface type

        Returns:
            Dict with generationId and status
        """
        if not input_text or len(input_text) < 1:
            raise GammaAPIError("input_text must be at least 1 character")
        if len(input_text) > 400000:
            raise GammaAPIError("input_text must not exceed 400,000 characters")

        payload = {
            "inputText": input_text,
            "format": format,
            "numCards": num_cards,
            "textMode": text_mode,
            "textAmount": text_amount,
            "language": language,
            "imageModel": image_model,
            "cardDimension": card_dimension,
            "exportPdf": export_pdf,
            "exportPptx": export_pptx
        }

        # Add optional parameters if provided
        if tone:
            payload["tone"] = tone
        if audience:
            payload["audience"] = audience
        if image_style:
            payload["imageStyle"] = image_style
        if theme:
            payload["theme"] = theme
        if additional_instructions:
            payload["additionalInstructions"] = additional_instructions
        if editor_mode:
            payload["editorMode"] = editor_mode

        try:
            response = requests.post(
                f"{self.base_url}/generate",
                headers=self.headers,
                json=payload,
                timeout=30
            )
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            raise GammaAPIError(f"API request failed: {str(e)}")

    def get_generation_status(self, generation_id: str) -> Dict:
        """
        Get the status of a generation request

        Args:
            generation_id: The generation ID returned from generate_content()

        Returns:
            Dict with status, URLs, and other generation details
        """
        try:
            response = requests.get(
                f"{self.base_url}/generations/{generation_id}",
                headers=self.headers,
                timeout=10
            )
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            raise GammaAPIError(f"Failed to get generation status: {str(e)}")

    def poll_until_complete(
        self,
        generation_id: str,
        max_wait_seconds: int = 300,
        poll_interval: int = 5
    ) -> Dict:
        """
        Poll generation status until complete or timeout

        Args:
            generation_id: The generation ID to poll
            max_wait_seconds: Maximum time to wait (default: 300 seconds / 5 minutes)
            poll_interval: Seconds between polls (default: 5 seconds)

        Returns:
            Dict with final generation status and URLs

        Raises:
            GammaAPIError: If generation fails or times out
        """
        start_time = time.time()
        print(f"\nPolling generation status (ID: {generation_id})...")

        while True:
            elapsed = time.time() - start_time
            if elapsed > max_wait_seconds:
                raise GammaAPIError(f"Generation timed out after {max_wait_seconds} seconds")

            status_data = self.get_generation_status(generation_id)
            status = status_data.get("status")

            if status == "completed":
                print("\nGeneration completed successfully!")
                return status_data
            elif status == "failed":
                error_msg = status_data.get("error", "Unknown error")
                raise GammaAPIError(f"Generation failed: {error_msg}")
            elif status == "processing":
                progress = status_data.get("progress", "unknown")
                print(f"  Status: Processing... (Progress: {progress}%, Elapsed: {int(elapsed)}s)")
            else:
                print(f"  Status: {status} (Elapsed: {int(elapsed)}s)")

            time.sleep(poll_interval)

    def create_presentation(
        self,
        topic: str,
        num_slides: int = 10,
        tone: str = "professional",
        audience: str = "general audience",
        include_images: bool = True,
        export_pdf: bool = False,
        wait_for_completion: bool = True
    ) -> Dict:
        """
        Simplified method to create a presentation

        Args:
            topic: Presentation topic or prompt
            num_slides: Number of slides (1-60)
            tone: Presentation tone/style
            audience: Target audience
            include_images: Whether to include AI-generated images
            export_pdf: Whether to generate PDF export
            wait_for_completion: Whether to wait for generation to complete

        Returns:
            Dict with generation details and URLs (if wait_for_completion=True)
        """
        image_model = "ai" if include_images else "none"

        result = self.generate_content(
            input_text=topic,
            format="presentation",
            num_cards=num_slides,
            text_mode="generate",
            tone=tone,
            audience=audience,
            image_model=image_model,
            card_dimension="16x9",
            export_pdf=export_pdf
        )

        generation_id = result.get("generationId")
        if wait_for_completion:
            return self.poll_until_complete(generation_id)

        return result

    def create_website(
        self,
        content: str,
        tone: str = "professional",
        include_images: bool = True,
        wait_for_completion: bool = True
    ) -> Dict:
        """
        Simplified method to create a website

        Args:
            content: Website content or description
            tone: Writing tone/style
            include_images: Whether to include images
            wait_for_completion: Whether to wait for generation to complete

        Returns:
            Dict with generation details and URLs (if wait_for_completion=True)
        """
        image_model = "ai" if include_images else "none"

        result = self.generate_content(
            input_text=content,
            format="website",
            text_mode="generate",
            tone=tone,
            image_model=image_model
        )

        generation_id = result.get("generationId")
        if wait_for_completion:
            return self.poll_until_complete(generation_id)

        return result

    def create_document(
        self,
        content: str,
        text_mode: str = "generate",
        tone: str = "professional",
        wait_for_completion: bool = True
    ) -> Dict:
        """
        Simplified method to create a document

        Args:
            content: Document content or outline
            text_mode: Processing mode (generate, condense, preserve)
            tone: Writing tone/style
            wait_for_completion: Whether to wait for generation to complete

        Returns:
            Dict with generation details and URLs (if wait_for_completion=True)
        """
        result = self.generate_content(
            input_text=content,
            format="document",
            text_mode=text_mode,
            tone=tone,
            image_model="unsplash"
        )

        generation_id = result.get("generationId")
        if wait_for_completion:
            return self.poll_until_complete(generation_id)

        return result


def print_menu():
    """Display main menu"""
    print("\n" + "=" * 60)
    print("GAMMA API CLIENT - Main Menu")
    print("=" * 60)
    print("1. Create Presentation")
    print("2. Create Website")
    print("3. Create Document")
    print("4. Create Social Media Post")
    print("5. Advanced Generation (Custom Options)")
    print("6. Check Generation Status")
    print("7. View Account Info & Limitations")
    print("8. Exit")
    print("=" * 60)


def get_api_key() -> str:
    """Get API key from environment or user input"""
    api_key = os.getenv("GAMMA_API_KEY")
    if not api_key:
        print("\nGAMMA_API_KEY environment variable not found.")
        api_key = input("Enter your Gamma API key: ").strip()
        if not api_key:
            print("Error: API key is required")
            sys.exit(1)
    return api_key


def create_presentation_interactive(client: GammaClient):
    """Interactive presentation creation"""
    print("\n--- Create Presentation ---")
    topic = input("Enter presentation topic/prompt: ").strip()
    if not topic:
        print("Error: Topic is required")
        return

    num_slides = input("Number of slides (default: 10): ").strip()
    num_slides = int(num_slides) if num_slides.isdigit() else 10

    tone = input("Tone (professional/casual/humorous, default: professional): ").strip() or "professional"
    audience = input("Target audience (default: general audience): ").strip() or "general audience"

    include_images = input("Include AI images? (y/n, default: y): ").strip().lower() != 'n'
    export_pdf = input("Export to PDF? (y/n, default: n): ").strip().lower() == 'y'

    print("\nCreating presentation...")
    try:
        result = client.create_presentation(
            topic=topic,
            num_slides=num_slides,
            tone=tone,
            audience=audience,
            include_images=include_images,
            export_pdf=export_pdf
        )

        print("\n" + "=" * 60)
        print("SUCCESS! Presentation created")
        print("=" * 60)
        print(f"View/Edit: {result.get('gammaUrl') or result.get('editUrl')}")
        if export_pdf and result.get('exportUrls', {}).get('pdf'):
            print(f"PDF Export: {result['exportUrls']['pdf']}")
        print("=" * 60)

    except GammaAPIError as e:
        print(f"\nError: {e}")


def create_website_interactive(client: GammaClient):
    """Interactive website creation"""
    print("\n--- Create Website ---")
    print("Describe your website or provide content:")
    content = input("> ").strip()
    if not content:
        print("Error: Content is required")
        return

    tone = input("Tone (professional/casual/creative, default: professional): ").strip() or "professional"
    include_images = input("Include images? (y/n, default: y): ").strip().lower() != 'n'

    print("\nCreating website...")
    try:
        result = client.create_website(
            content=content,
            tone=tone,
            include_images=include_images
        )

        print("\n" + "=" * 60)
        print("SUCCESS! Website created")
        print("=" * 60)
        print(f"View/Edit: {result.get('gammaUrl') or result.get('editUrl')}")
        print("=" * 60)

    except GammaAPIError as e:
        print(f"\nError: {e}")


def create_document_interactive(client: GammaClient):
    """Interactive document creation"""
    print("\n--- Create Document ---")
    print("Enter document content or outline:")
    content = input("> ").strip()
    if not content:
        print("Error: Content is required")
        return

    print("\nText mode:")
    print("1. Generate - AI creates new content from your input")
    print("2. Condense - Summarize your content")
    print("3. Preserve - Use your text as-is")
    mode_choice = input("Select mode (1-3, default: 1): ").strip()

    mode_map = {"1": "generate", "2": "condense", "3": "preserve"}
    text_mode = mode_map.get(mode_choice, "generate")

    tone = input("Tone (professional/casual/academic, default: professional): ").strip() or "professional"

    print("\nCreating document...")
    try:
        result = client.create_document(
            content=content,
            text_mode=text_mode,
            tone=tone
        )

        print("\n" + "=" * 60)
        print("SUCCESS! Document created")
        print("=" * 60)
        print(f"View/Edit: {result.get('gammaUrl') or result.get('editUrl')}")
        print("=" * 60)

    except GammaAPIError as e:
        print(f"\nError: {e}")


def create_social_post_interactive(client: GammaClient):
    """Interactive social media post creation"""
    print("\n--- Create Social Media Post ---")
    content = input("Enter post content or topic: ").strip()
    if not content:
        print("Error: Content is required")
        return

    tone = input("Tone (casual/professional/humorous, default: casual): ").strip() or "casual"

    print("\nCreating social media post...")
    try:
        result = client.generate_content(
            input_text=content,
            format="social",
            text_mode="generate",
            tone=tone,
            image_model="ai"
        )

        generation_id = result.get("generationId")
        result = client.poll_until_complete(generation_id)

        print("\n" + "=" * 60)
        print("SUCCESS! Social post created")
        print("=" * 60)
        print(f"View/Edit: {result.get('gammaUrl') or result.get('editUrl')}")
        print("=" * 60)

    except GammaAPIError as e:
        print(f"\nError: {e}")


def advanced_generation_interactive(client: GammaClient):
    """Advanced generation with all options"""
    print("\n--- Advanced Generation ---")

    content = input("Enter content/prompt: ").strip()
    if not content:
        print("Error: Content is required")
        return

    print("\nFormat: 1=Presentation, 2=Website, 3=Document, 4=Social")
    format_choice = input("Select format (1-4): ").strip()
    format_map = {"1": "presentation", "2": "website", "3": "document", "4": "social"}
    format_type = format_map.get(format_choice, "presentation")

    num_cards = input("Number of cards/slides (default: 10): ").strip()
    num_cards = int(num_cards) if num_cards.isdigit() else 10

    print("\nText mode: 1=Generate, 2=Condense, 3=Preserve")
    mode_choice = input("Select mode (1-3, default: 1): ").strip()
    mode_map = {"1": "generate", "2": "condense", "3": "preserve"}
    text_mode = mode_map.get(mode_choice, "generate")

    print("\nText amount: 1=Brief, 2=Medium, 3=Detailed, 4=Extensive")
    amount_choice = input("Select amount (1-4, default: 2): ").strip()
    amount_map = {"1": "brief", "2": "medium", "3": "detailed", "4": "extensive"}
    text_amount = amount_map.get(amount_choice, "medium")

    tone = input("Tone (optional): ").strip() or None
    audience = input("Audience (optional): ").strip() or None
    language = input("Language code (default: en): ").strip() or "en"

    print("\nImage model: 1=AI, 2=Unsplash, 3=Giphy, 4=None")
    image_choice = input("Select image source (1-4, default: 1): ").strip()
    image_map = {"1": "ai", "2": "unsplash", "3": "giphy", "4": "none"}
    image_model = image_map.get(image_choice, "ai")

    export_pdf = input("Export PDF? (y/n): ").strip().lower() == 'y'
    export_pptx = input("Export PowerPoint? (y/n): ").strip().lower() == 'y'

    print("\nGenerating content...")
    try:
        result = client.generate_content(
            input_text=content,
            format=format_type,
            num_cards=num_cards,
            text_mode=text_mode,
            text_amount=text_amount,
            tone=tone,
            audience=audience,
            language=language,
            image_model=image_model,
            export_pdf=export_pdf,
            export_pptx=export_pptx
        )

        generation_id = result.get("generationId")
        result = client.poll_until_complete(generation_id)

        print("\n" + "=" * 60)
        print("SUCCESS! Content created")
        print("=" * 60)
        print(f"View/Edit: {result.get('gammaUrl') or result.get('editUrl')}")
        if result.get('exportUrls'):
            if result['exportUrls'].get('pdf'):
                print(f"PDF: {result['exportUrls']['pdf']}")
            if result['exportUrls'].get('pptx'):
                print(f"PowerPoint: {result['exportUrls']['pptx']}")
        print("=" * 60)

    except GammaAPIError as e:
        print(f"\nError: {e}")


def check_status_interactive(client: GammaClient):
    """Check status of a generation"""
    print("\n--- Check Generation Status ---")
    generation_id = input("Enter generation ID: ").strip()
    if not generation_id:
        print("Error: Generation ID is required")
        return

    try:
        result = client.get_generation_status(generation_id)
        print("\n" + "=" * 60)
        print("Generation Status")
        print("=" * 60)
        print(json.dumps(result, indent=2))
        print("=" * 60)
    except GammaAPIError as e:
        print(f"\nError: {e}")


def view_account_info():
    """Display account information and API limitations"""
    print("\n" + "=" * 60)
    print("ACCOUNT INFO & API LIMITATIONS")
    print("=" * 60)
    print("\nAPI Access Requirements:")
    print("- Gamma Pro, Ultra, Team, or Business subscription required")
    print("- Get API key from: https://gamma.app (Settings > API)")
    print("- API format: sk-gamma-xxxxxxxx")
    print("\nRate Limits:")
    print("- Pro users: 50 generations per day")
    print("- Ultra users: Higher limits (check your account)")
    print("- Poll interval: Every 5 seconds recommended")
    print("- Timeout: 5 minutes (300 seconds) recommended")
    print("\nSupported Features:")
    print("- Create presentations, websites, documents, social posts")
    print("- AI-generated content from prompts")
    print("- 60+ languages supported")
    print("- AI images, Unsplash photos, Giphy GIFs")
    print("- Export to PDF and PowerPoint")
    print("\nCurrent API Limitations:")
    print("- No endpoint to list existing presentations")
    print("- No endpoint to edit existing content via API")
    print("- No endpoint to delete generations")
    print("- Edit existing content via web interface only")
    print("\nWorkarounds:")
    print("- Save generation IDs for future reference")
    print("- Use editUrl from response to manually edit in browser")
    print("- Access all your Gammas at: https://gamma.app")
    print("\nAPI Documentation:")
    print("- https://developers.gamma.app")
    print("- See GAMMA_API_DOCUMENTATION.md in this directory")
    print("=" * 60)


def main():
    """Main application loop"""
    print("\n" + "=" * 60)
    print("GAMMA API CLIENT")
    print("Programmatic Access to Gamma.app")
    print("=" * 60)

    # Get API key
    try:
        api_key = get_api_key()
        client = GammaClient(api_key)
        print("\nAPI client initialized successfully!")
    except Exception as e:
        print(f"\nError: {e}")
        sys.exit(1)

    # Main menu loop
    while True:
        print_menu()
        choice = input("\nSelect option (1-8): ").strip()

        if choice == "1":
            create_presentation_interactive(client)
        elif choice == "2":
            create_website_interactive(client)
        elif choice == "3":
            create_document_interactive(client)
        elif choice == "4":
            create_social_post_interactive(client)
        elif choice == "5":
            advanced_generation_interactive(client)
        elif choice == "6":
            check_status_interactive(client)
        elif choice == "7":
            view_account_info()
        elif choice == "8":
            print("\nThank you for using Gamma API Client!")
            sys.exit(0)
        else:
            print("\nInvalid option. Please select 1-8.")

        input("\nPress Enter to continue...")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nExiting... Goodbye!")
        sys.exit(0)
    except Exception as e:
        print(f"\nUnexpected error: {e}")
        sys.exit(1)
