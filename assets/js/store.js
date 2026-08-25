/* =========================================================
   OZ Handcrafted Footwear — shared store engine
   Single source of truth for the product catalog, plus cart,
   wishlist and "recently viewed" state (backed by localStorage).

   Every page includes this file and sets `ASSET_BASE` first:
     - "" on root pages (index.html, cart.html, etc.)
     - "../" on pages inside /products/

   NOTE ON STORAGE: this uses localStorage so the cart/wishlist
   persist as a visitor browses between pages. That only works
   once the site is actually hosted (opening files directly from
   a folder, or previewing inside some tools, can restrict this) —
   on a real domain it works normally.
   ========================================================= */

const WHATSAPP_NUMBER = "2348130494559";

const PRODUCTS_CATALOG = [
  { id: "suede-cross-slide", name: "The Suede Cross Slide", cat: "men", type: "sandal",
    priceMin: 35000, priceMax: 40000, priceNote: "depending on size",
    colours: ["Mustard Suede", "Rust Brown Suede"],
    blurb: "Double sole with a leather-wrapped base and a full suede upper.",
    images: ["p1-1.jpg", "p1-2.jpg", "p1-3.jpg", "p1-4.jpg"] },

  { id: "grey-double-sole-slide", name: "Grey Slide on Double Sole", cat: "men", type: "sandal",
    priceMin: 25000, priceMax: 30000, priceNote: "depending on size",
    colours: ["Grey"],
    blurb: "Adjustable double-strap buckle slide on a black double sole.",
    images: ["p2-1.jpg"] },

  { id: "buckle-cross-slide", name: "The Buckle Cross Slide", cat: "men", type: "sandal",
    priceMin: 25000, priceMax: 30000, priceNote: "depending on size",
    colours: ["Black"],
    blurb: "Cross-strap leather slide with a side buckle, on a double sole.",
    images: ["p3-1.jpg", "p3-2.jpg"] },

  { id: "grey-thong-slide", name: "The Grey Thong Slide", cat: "men", type: "sandal",
    priceMin: 35000, priceMax: 40000, priceNote: "depending on size",
    colours: ["Grey"],
    blurb: "Double crafted sole — the floor is wrapped in white leather, the top made with grey leather.",
    images: ["p4-1.jpg", "p4-2.jpg"] },

  { id: "oxblood-cross-slide", name: "The Oxblood Cross Slide", cat: "unisex", type: "sandal",
    priceMin: 20000, priceMax: 25000, priceNote: "depending on size",
    colours: ["Oxblood"],
    blurb: "Oxblood leather cross slide, made with a foreign sole.",
    images: ["p5-1.jpg", "p5-2.jpg"] },

  { id: "female-slide", name: "Female Slide", cat: "women", type: "sandal",
    priceMin: 16500, priceMax: 16500, priceNote: "",
    colours: ["Fuchsia"],
    blurb: "Textured fuchsia slide with a statement buckle and pink footbed.",
    images: ["p6-1.jpg"] },

  { id: "black-bold-loafer", name: "The Black Bold Loafer", cat: "men", type: "loafer",
    priceMin: 45000, priceMax: 55000, priceNote: "depending on size",
    colours: ["Black"],
    blurb: "Woven-panel loafer finished with a silver horsebit buckle.",
    images: ["p7-1.jpg"] },

  { id: "double-sole-slippers", name: "Double-Sole Slippers", cat: "unisex", type: "sandal",
    priceMin: 25000, priceMax: 30000, priceNote: "depending on size",
    colours: ["Navy"],
    blurb: "Navy leather thong slide with a knot detail, on a double sole.",
    images: ["p8-1.jpg"] },

  { id: "floral-slippers", name: "Floral Slippers", cat: "women", type: "sandal",
    priceMin: 16500, priceMax: 16500, priceNote: "",
    colours: ["Pink Floral"],
    blurb: "Pink floral-print thong slide.",
    images: ["p9-1.jpg"] },

  { id: "male-slide-foreign-sole", name: "Male Slide on Foreign Sole", cat: "men", type: "sandal",
    priceMin: 20000, priceMax: 25000, priceNote: "depending on size",
    colours: ["Black"],
    blurb: "Overlap-strap leather slide with buckle, on a foreign sole.",
    images: ["p10-1.jpg"] },

  { id: "combo-slide-double-sole", name: "Combo Slide on Double Sole", cat: "unisex", type: "sandal",
    priceMin: 25000, priceMax: 30000, priceNote: "depending on size",
    colours: ["Black & Brown"],
    blurb: "Two-tone combo buckle slide, on a double sole.",
    images: ["p11-1.jpg"] },

  { id: "female-slippers", name: "Female Slippers", cat: "women", type: "sandal",
    priceMin: 15000, priceMax: 15000, priceNote: "",
    colours: ["Black"],
    blurb: "Black thong slide with a gold horsebit buckle, woven-pattern sole.",
    images: ["p12-1.jpg"] },

  { id: "double-sole-slide-detention", name: "Double Sole Slide Detention", cat: "men", type: "sandal",
    priceMin: 25000, priceMax: 30000, priceNote: "depending on size",
    colours: ["Black"],
    blurb: "Black slide with a gold emblem detail, on a double sole.",
    images: ["p13-1.jpg"] },

  { id: "chunky-sole-derby", name: "Black cover shoes with a double-crafted sole", cat: "men", type: "derby",
    priceMin: 50000, priceMax: 55000, priceNote: "depending on size",
    colours: ["Black"],
    blurb: "Black lace-up derby with a double-crafted chunky sole.",
    images: ["p14-1.jpg"] },
];

function ozNaira(n) { return "₦" + Number(n).toLocaleString("en-NG"); }
function ozAsset(path) { return (typeof ASSET_BASE !== "undefined" ? ASSET_BASE : "") + path; }
function ozProductImg(p) { return ozAsset("assets/products/" + p.images[0]); }
function ozProductUrl(p) { return ozAsset("products/" + p.id + ".html"); }
function ozFindProduct(id) { return PRODUCTS_CATALOG.find(p => p.id === id); }

/* ---------------- Safe storage wrapper ----------------
   Falls back to an in-memory object if localStorage is blocked
   (e.g. some preview/sandbox contexts) so the page never breaks —
   it just won't persist between page loads in that situation. */
const ozMemoryStore = {};
function ozStorageGet(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return ozMemoryStore[key] || null;
  }
}
function ozStorageSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    ozMemoryStore[key] = value;
  }
}

/* ---------------- Cart ---------------- */
const CART_KEY = "oz_cart_v1";
function ozGetCart() { return ozStorageGet(CART_KEY) || []; }
function ozSetCart(items) { ozStorageSet(CART_KEY, items); ozUpdateCartBadges(); }
function ozAddToCart(productId, colour, size, qty) {
  const cart = ozGetCart();
  const existing = cart.find(i => i.id === productId && i.colour === colour && i.size === size);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, colour, size, qty });
  }
  ozSetCart(cart);
}
function ozRemoveFromCart(index) {
  const cart = ozGetCart();
  cart.splice(index, 1);
  ozSetCart(cart);
}
function ozUpdateCartQty(index, qty) {
  const cart = ozGetCart();
  if (cart[index]) { cart[index].qty = Math.max(1, qty); ozSetCart(cart); }
}
function ozCartCount() { return ozGetCart().reduce((sum, i) => sum + i.qty, 0); }
function ozClearCart() { ozSetCart([]); }

/* ---------------- Wishlist ---------------- */
const WISHLIST_KEY = "oz_wishlist_v1";
function ozGetWishlist() { return ozStorageGet(WISHLIST_KEY) || []; }
function ozIsWished(productId) { return ozGetWishlist().includes(productId); }
function ozToggleWishlist(productId) {
  let list = ozGetWishlist();
  if (list.includes(productId)) {
    list = list.filter(id => id !== productId);
  } else {
    list.push(productId);
  }
  ozStorageSet(WISHLIST_KEY, list);
  ozUpdateCartBadges();
  return list.includes(productId);
}

/* ---------------- Recently viewed ---------------- */
const RECENT_KEY = "oz_recent_v1";
function ozTrackRecentlyViewed(productId) {
  let list = ozGetWishlist ? ozStorageGet(RECENT_KEY) || [] : [];
  list = list.filter(id => id !== productId);
  list.unshift(productId);
  list = list.slice(0, 8);
  ozStorageSet(RECENT_KEY, list);
}
function ozGetRecentlyViewed(excludeId) {
  const list = ozStorageGet(RECENT_KEY) || [];
  return list.filter(id => id !== excludeId).map(ozFindProduct).filter(Boolean);
}

/* ---------------- Badge sync (cart count + wishlist count in navbars) ---------------- */
function ozUpdateCartBadges() {
  document.querySelectorAll("[data-cart-count]").forEach(el => {
    const n = ozCartCount();
    el.textContent = n;
    el.classList.toggle("hidden", n === 0);
  });
  document.querySelectorAll("[data-wishlist-count]").forEach(el => {
    const n = ozGetWishlist().length;
    el.textContent = n;
    el.classList.toggle("hidden", n === 0);
  });
}

document.addEventListener("DOMContentLoaded", ozUpdateCartBadges);
