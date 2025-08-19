import { fetchCart } from "../hooks";
import { useState, useEffect } from "preact/hooks"
import { getCarbonOffsetValue, trackOptInOrder } from "../services"



export function CarbonOptIn() {

    const [checked, setChecked] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [value, setValue] = useState<number | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchValue() {
            try {
                setLoading(true);
                const { token, total, items } = await fetchCart();
                const value = await getCarbonOffsetValue({
                    total: total,
                    items: items.map(
                        (i) => ({
                            id: i.id,
                            title: i.title,
                            quantity: i.quantity,
                            price: i.price,
                            final_price: i.final_line_price,
                            product_id: i.product_id,
                        })),
                })
                setValue(value);
                setToken(token);
            } catch (err) {
                console.error('Error try to retrieve value from API', err);
                setError(err)
            } finally {
                setLoading(false);
            }
        }

        fetchValue();
    }, []);

    useEffect(() => {
        const checkoutBtn = document.querySelector<HTMLButtonElement | HTMLAnchorElement>(
            'button[name="checkout"], a[href="/checkout"]'
        );
        if (!checkoutBtn) return;

        const handleClick = () => {
            if (!checked) return;

        };

        checkoutBtn.addEventListener("click", handleClick);
        return () => checkoutBtn.removeEventListener("click", handleClick);
    }, [checked, token, value]);

    useEffect(() => {
        const checkoutButton = document.querySelector<HTMLButtonElement | HTMLAnchorElement>(
            'button[name="checkout"], a[href="/checkout"]'
        );
        if (!checkoutButton) return;

        document.addEventListener('submit', (event) => {
            const form = event.target as HTMLFormElement;
            if (form.action.includes('/cart')) {
                if (!checked) return;
                trackOptInOrder({
                    cart_token: token,
                    value: value,
                    user_email: window?.customerData?.email ?? "anonymous",
                    merchant_url: window?.Shopify.shop ?? "unexpeceted",
                })
                    .then((d) => console.log("track order id: ", d))
                    .catch((e) => console.log("failed track order id: ", e));
            }
        })
    }, [checked, token, value]);


    return (
        <>
            {loading ? (
                <div class="skeleton" style={{
                    width: '100px',
                    height: '30px',
                    background: '#eee',
                    borderRadius: '4px'
                }} />
            ) : (

                <div
                    hidden={!!error}
                    style={{
                        border: "1px solid #ddd",
                        padding: "12px",
                        borderRadius: "8px",
                        marginTop: "12px",
                        background: "#f9f9f9"
                    }}
                >
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => {
                            const checked = (e.currentTarget as HTMLInputElement).checked
                            console.log("checked opt in", checked);
                            setChecked(checked);
                        }
                        }
                        class="w-4 h-4 accent-green-600"
                    />
                    🌱 <strong>${value.toFixed(2)}</strong> to offset my carbon footprint
                </div>
            )}
        </>
    );
}
