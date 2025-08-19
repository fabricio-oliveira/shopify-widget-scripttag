const endpoint = "/api/carbonoffset/value";
const apiUrl = import.meta.env.VITE_API_URL;

// NOTE price as integer with two decimal place
interface CartItem {
  id: string;
  title: string;
  quantity: number;
  price: number;
  final_price: number;
  product_id: number;
}

interface CartPayload {
  items: CartItem[];
  total: number;
}

export default async function (payload: CartPayload): Promise<number> {
  console.log("post carbon-offset payload", payload);
  const res = await fetch(`${apiUrl}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`GET failed: ${res.status}`);

  const body: { value: number } = await res.json();
  if (isNaN(body.value)) throw new Error("Invalid value payload");

  console.log("post carbon-offset respose", body);
  return body.value;
}
