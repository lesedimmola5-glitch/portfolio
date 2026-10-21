# LESEDI'S PORTFOLIO

A hacker-themed personal portfolio website for Lesedi — a first-year IT student.

## File Structure

```
LESEDI'S PORTFOLIO/
├── index.html          ← Main entry point (root-level, required)
├── css/
│   └── style.css       ← All styles
├── js/
│   └── main.js         ← Animations, typing effect, form validation
├── assets/             ← Add images or icons here
└── README.md
```

## Updating Placeholders

Before sharing the site, update these placeholder values in `index.html`:

| Placeholder                   | Location           | Replace with         |
|-------------------------------|--------------------|----------------------|
| `your.email@example.com`      | Contact section    | Your real email      |
| `github.com/your-username`    | Contact section    | Your GitHub URL      |
| `linkedin.com/in/your-profile`| Contact section    | Your LinkedIn URL    |

## Making the Contact Form Work (Formspree)

This is a static site — it needs a third-party service to send emails.

### Formspree (free, no backend needed)

1. Go to [formspree.io](https://formspree.io) and sign up for a free account.
2. Create a new form and copy your form endpoint (looks like `https://formspree.io/f/xxxxxxxx`).
3. In `index.html`, find the `<form>` tag and add:
   ```html
   <form ... action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. Remove the `e.preventDefault()` line in `main.js` (or keep it and use Formspree's AJAX API).

Alternatively, use [Netlify Forms](https://www.netlify.com/products/forms/) if you deploy on Netlify — it requires zero configuration changes.

## Deploying

### GitHub Pages (free)
1. Push this folder to a GitHub repository.
2. Go to Settings → Pages → Source: `main` branch / root.
3. Your site will be live at `https://your-username.github.io/repo-name`.

### Netlify (free)
1. Drag and drop this folder onto [netlify.com/drop](https://app.netlify.com/drop).
2. Netlify gives you a live URL instantly.

## Adding Real Projects
Edit the Projects section in `index.html`. Find the cards with `badge-placeholder` and:
- Update the title, description, and tech tags.
- Change the button from disabled to a real `<a href="YOUR_PROJECT_URL">` link.
- Change `badge-placeholder` class to `badge-active`.

## Customization Tips
- **Colors**: All colors are CSS variables at the top of `css/style.css` — change `--blue-primary` etc.
- **Font**: Replace `'Courier New'` in `--font-mono` with any monospace Google Font.
- **Animations**: Adjust speeds in `main.js` (`speed` variable for typing, `delay` for skill bars).
