# Shopify Carbon Offset Widget

This project consists of two main parts:

1. **Backend**: A Python server that can be run via Docker.
2. **Frontend Widget**: A Preact widget that generates a static bundle, served through the `public` folder of the backend.

---

## Getting Started

### 1. Configure Backend

1. Navigate to `backend/etc/ngrok.yml`.
2. Make a copy of `ngrok.example.yml` and add your URL and token in the indicated fields.

### 2. Configure Frontend Widget

1. Make a copy of `.env.example` to `.env` inside `carbonoffset-shopify-widget`.
2. Set the ngrok URL to match the backend ngrok URL.

### 3. Build Widget

```bash
cd carbonoffset-shopify-widget
npm install
npm run build
```
This will generate the static bundle in the backend `public` folder.


### 4. Deploy Widget to Shopify

You need to create a **ScriptTag** in your Shopify store. Replace `<your-store>` and `<token store>` with your actual store name and admin token.
```
curl -X POST "https://<your-store>.myshopify.com/admin/api/2025-01/script_tags.json"
-H "X-Shopify-Access-Token: <token store>"
-H "Content-Type: application/json"
-d '{
    "script_tag": {
        "event": "onload",
        "src": "https://<ngrok-url>/public/widget/bundle.js"
    }
}'
```

Once added, open your Shopify store’s **cart page**. The widget should appear there.

---

## Running Backend with Docker

```bash
docker-compose up --build
````

Your backend should now be running and serving the widget at: `https://<ngrok-url>/public/widget/bundle.js`

---

## TODO

- [ ] Add tests backend and widget
- [ ] Remove comens at code
- [ ] Adjust the way as the widget is been inserted
- [ ] Setup linter and formater
- [ ] Adjust values retrieved from shopify
- [ ] Adjust carbon offset rounding
---

## Notes

- Make sure to repalce all variables
- The widget shoud only appears on the cart page
- The widget will be add in the class `.cart__blocks` above of subtotal. it work fo me in the theme tested.

# Overview
I focused on creating something extensible and minimally organized. To save time, much of it was created by AI and modified later, so there may be some code garbage in some places.

Since the script tag is a deprecated technology on Shopify and limited, I placed my widget on the cart screen. The flow itself has some flaws, such as assuming that the user has already made a purchase upon going to checkout. But it was necessary to work around some Shopify limitations with script tags and time.

