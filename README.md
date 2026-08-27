# OZ Handcrafted Footwear

The website for **OZ Handmade Shoe**: custom leather footwear, handmade to
order by Yahya Ruqayyah, one pair at a time.

This isn't a template with the brand's name dropped in. It started as a
single landing page and grew, piece by piece, into something closer to a
real store: a full product catalogue with individual pages, a cart and
wishlist, a size guide, an FAQ, behind-the-scenes video from the workshop,
and real customer reviews pulled straight from WhatsApp. Every product on
here is a real pair OZ has made, priced the way OZ actually prices them.

There's no backend, no database, no payment processor. Every "order,"
whether it's a single custom pair or a full cart, gets compiled into a
message and handed off to WhatsApp, because that's how this business
actually runs.

## What's on the site

- **Home** (`index.html`): the brand story, the founder, the craft process,
  the featured collection with search/filter/sort, customer reviews,
  behind-the-scenes workshop videos, and the wholesale pitch.
- **Product pages** (`products/*.html`): one page per shoe. Photo gallery,
  colour and size selection, quantity, "Add to Cart" or order straight to
  WhatsApp, plus a "you may also like" strip pulled from the same category.
- **Cart** (`cart.html`): everything added across however many products,
  sent as one combined WhatsApp order.
- **Saved items** (`saved.html`): a wishlist, for pairs someone's still
  deciding on.
- **Custom Order** (`order.html`): the general-purpose order form for
  wholesale enquiries or a fully custom pair that isn't one of the listed
  products.
- **Size Guide** (`size-guide.html`): how to measure at home, EU/UK/US
  conversion.
- **FAQ** (`faq.html`): ordering, shipping, sizing, and care, written from
  OZ's actual policies (production time, delivery areas, no payment on
  delivery, wholesale minimums, etc.).
- **Videos** (`videos.html`): the full library of workshop footage.

## How it's built

Plain HTML, Tailwind (via CDN), and vanilla JavaScript. No build step,
no framework, no npm install. Open a file and it works.

```
├── index.html
├── order.html, cart.html, saved.html, videos.html
├── faq.html, size-guide.html
├── products/                  → one HTML page per shoe
├── assets/
│   ├── js/store.js            → product catalogue + cart/wishlist logic
│   ├── brand/                 → logo, founder photo, favicon
│   ├── products/               → product photos
│   ├── reviews/                → customer review screenshots
│   └── video/                  → workshop videos + thumbnails
├── sitemap.xml, robots.txt
```

`assets/js/store.js` is the one file that actually matters if you're
editing products. It's the single source of truth for the whole catalogue
(name, price, colours, photos). Add a product there and it shows up
everywhere it needs to: the homepage grid, search/filters, the cart, the
wishlist, and "you may also like" on other product pages.

## The cart and wishlist need real hosting to work

They're stored in the visitor's browser (`localStorage`), which only
persists correctly once the site is live on an actual domain. Opening the
files straight from a folder on a computer, or previewing them somewhere
that blocks browser storage, means the cart won't remember what's in it
between pages. Once it's hosted for real, it works normally.

## Before going live

A few things still say `your-domain-here.com`: the link-preview tags
(so a nice card shows up when the site is shared on WhatsApp/Instagram)
and `sitemap.xml`. Swap those for the real domain once one's chosen.

## Contact

WhatsApp: +234 813 049 4559
Instagram: [@oz_handcrafted_footwear](https://instagram.com/oz_handcrafted_footwear)
