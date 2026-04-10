# Publish Blog Post — Amos Financial (amosbudget.com)

Workflow for publishing a new Hebrew article to amosbudget.com.

---

## Project Facts (do NOT ask the user for these)

| Property | Value |
|---|---|
| Site URL | https://amosbudget.com |
| Article files | `articles/<slug>.html` |
| Hero images | `articles/images/<slug>-hero.png` |
| Blog index | `pages/blog.html` — insert card after `<!-- BLOG_CARDS_START -->` |
| Sitemap | `sitemap.xml` at repo root |
| Deploy branch | `main` |
| Deploy method | GitHub Actions → FTP → Hostinger `/public_html/` (auto on push to main) |
| GA ID | G-4RTCLV7Q4P |
| AdSense ID | ca-pub-5636620811297354 |
| WhatsApp | 972505500344 |
| Author | רונן עמוס - רואה חשבון |

**Categories (pick the best fit):**
- מיסים וחשבונאות
- ניהול ספרים חכם
- עסקים וטכנולוגיה
- תכנון פיננסי ומס
- כלים דיגיטליים

---

## Step 1 — Receive Input

The user provides:
- Post content in Hebrew (raw text, bullet points, outline, or full draft)
- Category (optional — you can suggest one)

---

## Step 2 — Prepare the Post

Derive the following from the content:

1. **`<TITLE>`** — Full Hebrew H1 title (SEO-rich, natural)
2. **`<SUBTITLE>`** — One-sentence hook with the main reader benefit
3. **`<DESCRIPTION>`** — Meta description, 150–160 chars, Hebrew, includes primary keyword
4. **`<SLUG>`** — 3–6 English words, hyphens only (e.g. `vat-refund-guide`). Check uniqueness: no file named `articles/<slug>.html` must already exist.
5. **`<IMAGE_FILE>`** — `<slug>-hero.png` (3–4 English words max before `-hero`)
6. **`<DATE>`** — Today's date: YYYY-MM-DD
7. **`<MONTH_YEAR_HE>`** — Hebrew month + year (e.g. `אפריל 2026`)
8. **`<READ_TIME>`** — Estimate: Hebrew word count ÷ 200, round up to nearest whole number
9. **`<CATEGORY>`** — Choose from the list above
10. **`<CTA_HEADING>`** — Short Hebrew question or hook tied specifically to the post topic. Max ~60 chars. Examples:
    - Tax refund post → `רוצה לבדוק אם מגיע לך החזר מס?`
    - Accounting costs → `רוצה לדעת כמה תחסוך עם הנהלת חשבונות אוטומטית?`
    - VAT guidance → `שאלות על מע"מ? נשמח לעזור בלי עלות.`
11. **`<CTA_SUBTEXT>`** — One natural follow-up sentence (~80–100 chars). Example: `צור קשר היום לייעוץ ראשוני ללא עלות.`
12. **Full HTML** — Generate the complete article using the template in Step 5

---

## Step 3 — Show Preview and STOP

Show the user this exact block **before creating any files**:

```
📄 File:     articles/<slug>.html
🔗 URL:      https://amosbudget.com/articles/<slug>.html
📸 Image:    <slug>-hero.png
             (upload to: articles/images/<slug>-hero.png)
🏷️ Category: <category>
⏱️ Read time: <X> דקות

--- POST PREVIEW ---

[Paste the full generated HTML here]

---
✋ STOP — Upload the image to articles/images/<slug>-hero.png, then tell me when it's done.
```

**Do NOT create, edit, or commit any files yet.**

---

## Step 4 — Wait for Confirmation

Wait for the user to confirm the image is uploaded. Do not proceed until they say so.

---

## Step 5 — Create Files and Deploy

After image confirmation, do ALL of the following in order:

### 5a. Create the article file

Create `articles/<slug>.html` using this exact template:

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><TITLE> | רונן עמוס - רואה חשבון</title>
    <meta name="description" content="<DESCRIPTION>">
    <meta name="robots" content="index, follow">
    <meta name="author" content="רונן עמוס - רואה חשבון">
    <meta name="language" content="Hebrew">

    <!-- Open Graph -->
    <meta property="og:title" content="<TITLE> | רונן עמוס">
    <meta property="og:description" content="<DESCRIPTION>">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://amosbudget.com/articles/<SLUG>.html">
    <meta property="og:image" content="https://amosbudget.com/articles/images/<SLUG>-hero.png">
    <meta property="og:locale" content="he_IL">

    <link rel="canonical" href="https://amosbudget.com/articles/<SLUG>.html">

    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-4RTCLV7Q4P"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-4RTCLV7Q4P');
    </script>

    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5636620811297354" crossorigin="anonymous"></script>

    <!-- Schema.org Article -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "<TITLE>",
      "description": "<DESCRIPTION>",
      "image": "https://amosbudget.com/articles/images/<SLUG>-hero.png",
      "author": {"@type": "Person", "name": "רונן עמוס", "jobTitle": "רואה חשבון"},
      "publisher": {"@type": "Organization", "name": "רונן עמוס - רואה חשבון", "url": "https://amosbudget.com"},
      "datePublished": "<DATE>",
      "dateModified": "<DATE>",
      "url": "https://amosbudget.com/articles/<SLUG>.html",
      "inLanguage": "he"
    }
    </script>

    <style>
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;line-height:1.7;color:#333;background:#f8f9fa}
        .container{max-width:800px;margin:0 auto;padding:0 20px}
        .article-header{background:linear-gradient(135deg,#2C5282 0%,#68D391 100%);color:white;padding:2.5rem 0}
        .back-button{display:inline-flex;align-items:center;color:white;text-decoration:none;font-size:.95rem;margin-bottom:1.5rem;padding:.6rem 1.2rem;background:rgba(255,255,255,.1);border-radius:25px;transition:all .3s ease;border:1px solid rgba(255,255,255,.2)}
        .back-button:hover{background:rgba(255,255,255,.2);transform:translateX(5px)}
        .article-title{font-size:2.5rem;font-weight:bold;margin-bottom:1rem;line-height:1.2;text-shadow:0 2px 4px rgba(0,0,0,.1)}
        .article-subtitle{font-size:1.2rem;opacity:.95;margin-bottom:1rem;font-weight:500}
        .article-meta{display:flex;align-items:center;gap:1.5rem;font-size:.9rem;opacity:.9;flex-wrap:wrap}
        .hero-image-wrap{text-align:center;background:#e2e8f0;padding-top:3rem}
        .hero-image-wrap img{max-width:100%;height:auto;border-radius:12px 12px 0 0;box-shadow:0 -10px 30px rgba(0,0,0,.1)}
        .article-content{background:white;padding:4rem 0}
        .content-body{background:white;padding:2.5rem;border-radius:20px;box-shadow:0 10px 40px rgba(0,0,0,.05);border:1px solid #edf2f7}
        h2{color:#2C5282;font-size:1.8rem;margin:3rem 0 1.5rem;padding-bottom:.5rem;border-bottom:2px solid #68D391}
        h3{color:#2d3748;font-size:1.4rem;margin:2rem 0 1rem}
        p{margin-bottom:1.5rem;font-size:1.15rem;line-height:1.8;color:#4a5568}
        ul,ol{margin:1.5rem 2rem 2rem 0}
        li{margin-bottom:1rem;font-size:1.1rem;color:#4a5568}
        strong{color:#2d3748}
        .tip-box{background:#E6FFFA;border-right:5px solid #38B2AC;padding:2rem;margin:2.5rem 0;border-radius:12px}
        .tip-box h4{color:#2C5282;margin-bottom:.5rem}
        .highlight-box{background:linear-gradient(135deg,#EBF8FF 0%,#F7FAFC 100%);border-right:4px solid #3182CE;padding:1.5rem;margin:2rem 0;border-radius:10px}
        table{width:100%;border-collapse:collapse;margin:2rem 0;font-size:1rem}
        th,td{padding:12px 15px;text-align:right;border:1px solid #ddd}
        th{background:#2C5282;color:white}
        tr:nth-child(even){background:#f8f9fa}
        .cta-section{background:linear-gradient(135deg,#2C5282 0%,#68D391 100%);color:white;padding:4rem 2rem;border-radius:20px;text-align:center;margin:4rem 0;box-shadow:0 20px 40px rgba(44,82,130,.2)}
        .cta-button{background:white;color:#2C5282;padding:1.2rem 3rem;border-radius:50px;text-decoration:none;font-weight:800;font-size:1.2rem;transition:all .3s ease;display:inline-block;box-shadow:0 10px 20px rgba(0,0,0,.1)}
        .cta-button:hover{transform:translateY(-3px);box-shadow:0 15px 30px rgba(0,0,0,.2)}
        .author-section{background:white;padding:2rem;border-radius:15px;box-shadow:0 5px 20px rgba(0,0,0,.1);margin:3rem 0;text-align:center}
        .author-section h3{color:#2C5282;margin-bottom:1rem}
        #site-footer{background:#1a365d;padding:40px 0;color:white;text-align:center}
        .footer-nav{margin-bottom:20px}
        .footer-link{color:white;text-decoration:none;margin:0 15px;font-weight:500;opacity:.8;transition:opacity .2s}
        .footer-link:hover{opacity:1;text-decoration:underline}
        @media(max-width:768px){.article-title{font-size:1.9rem}.content-body{padding:1.2rem}.cta-section{padding:2rem 1.5rem}}
    </style>
</head>
<body>

    <header class="article-header">
        <div class="container">
            <a href="../pages/blog.html" class="back-button">← חזרה לבלוג</a>
            <h1 class="article-title"><TITLE></h1>
            <p class="article-subtitle"><SUBTITLE></p>
            <div class="article-meta">
                <span>📅 <MONTH_YEAR_HE></span>
                <span>👤 רונן עמוס - רואה חשבון</span>
                <span>⏱️ זמן קריאה: <READ_TIME> דקות</span>
            </div>
        </div>
    </header>

    <div class="hero-image-wrap">
        <div class="container">
            <img src="images/<SLUG>-hero.png" alt="<TITLE> - רונן עמוס רואה חשבון">
        </div>
    </div>

    <main class="article-content">
        <div class="container">
            <div class="content-body">

                <!-- ARTICLE BODY: use h2 for main sections, h3 for sub-sections -->
                <!-- Wrap key takeaways in .tip-box or .highlight-box divs -->
                <ARTICLE_BODY>

            </div>

            <!-- CTA — WhatsApp link is fixed; heading and sub-text are customized per post topic -->
            <div class="cta-section">
                <h2 style="color:white; border-bottom:none;"><CTA_HEADING></h2>
                <p style="color:white; opacity:0.9;"><CTA_SUBTEXT></p>
                <a href="https://wa.me/972505500344?text=שלום%20רונן,%20אשמח%20לייעוץ" class="cta-button" target="_blank">
                    💬 WhatsApp לייעוץ מהיר
                </a>
            </div>

            <div class="author-section">
                <h3>על הכותב</h3>
                <p><strong>רונן עמוס</strong> — רואה חשבון מוסמך עם ניסיון נרחב בליווי עסקים קטנים ובינוניים בישראל. מתמחה בדוחות מס, דוחות כספיים שנתיים וייעוץ פיננסי שוטף.</p>
            </div>
        </div>
    </main>

    <footer id="site-footer" dir="rtl">
        <div class="footer-nav">
            <a href="../pages/privacy_policy.html" class="footer-link">מדיניות פרטיות</a>
            <a href="../pages/terms_of_service.html" class="footer-link">תקנון שימוש</a>
            <a href="mailto:ronenamos@gmail.com" class="footer-link">צור קשר</a>
        </div>
        <p>© 2026 רונן עמוס - פתרונות פיננסיים. כל הזכויות שמורות</p>
    </footer>

</body>
</html>
```

### 5b. Update the blog index

Edit `pages/blog.html` — insert the new card **immediately after** the `<!-- BLOG_CARDS_START -->` comment (line 575), before any existing cards:

```html
<article class="article-card" data-category="<CATEGORY>">
    <img src="../articles/images/<SLUG>-hero.png" alt="<TITLE>" class="article-featured-image">
    <div class="article-content">
        <h3 class="article-title"><TITLE_SHORT></h3>
        <p class="article-description"><DESCRIPTION></p>
        <div class="article-meta">
            <span class="article-category"><CATEGORY></span>
            <span>קריאה של <READ_TIME> דקות</span>
        </div>
        <a href="../articles/<SLUG>.html" class="read-more">קרא עוד ←</a>
    </div>
</article>
```

`<TITLE_SHORT>` = title trimmed to ≤ 60 chars if needed.

### 5c. Update the sitemap

Edit `sitemap.xml` — add a new `<url>` entry. Insert it in the ARTICLES section, near other article entries:

```xml
  <url>
    <loc>https://amosbudget.com/articles/<SLUG>.html</loc>
    <lastmod><DATE></lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
```

### 5d. Commit and push

```bash
git add articles/<slug>.html pages/blog.html sitemap.xml
git commit -m "publish: <slug> — <short English description of the post>"
git push -u origin main
```

If push fails (network), retry up to 4 times with 2s → 4s → 8s → 16s backoff.

---

## Step 6 — Report Done

```
✅ Published!

🔗 Live URL: https://amosbudget.com/articles/<slug>.html
   (live in ~1–2 min after GitHub Actions FTP deploy completes)

📊 Search Console: https://search.google.com/search-console
   → URL Inspection → paste URL → Request Indexing
```

---

## Rules

- **Never create placeholder images.** Always wait for user to upload the actual image.
- **Image filenames:** 3–4 English words + `-hero.png`, all lowercase, hyphens only.
- **Post date:** Always use today's date.
- **Slug uniqueness:** Check `articles/` directory before confirming slug.
- **Push to `main` only** — no intermediate branches or PRs.
- **CTA block:** The WhatsApp link is fixed — never change it. The heading (`<CTA_HEADING>`) and subtext (`<CTA_SUBTEXT>`) must be written fresh per post to match the topic.
- **No premium gating** — all posts are free, no gating logic needed.
- **No IndexNow** — not configured on this project.
