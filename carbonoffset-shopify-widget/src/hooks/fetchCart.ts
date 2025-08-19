// NOTE: some relavant information like category and weight isn't available at /cart.js
export interface CartItem {
    id: string;
    title: string;
    quantity: number;
    price: number;
    product_id: number;
    final_line_price: number;
}

export default async function () {
    const res = await fetch("/cart.js");
    if (!res.ok) throw new Error(`GET failed: ${res.status}`);

    const cart = await res.json();
    console.log("Cart: ", cart)

    return { token: cart.token, items: cart.items, total: cart.total_price };
}
