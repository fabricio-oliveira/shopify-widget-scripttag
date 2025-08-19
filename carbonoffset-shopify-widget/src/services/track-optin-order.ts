const endpoint = "/api/optin/track";
const apiUrl = import.meta.env.VITE_API_URL;

interface OrderPayload {
  cart_token: string
  merchant_url: string
  user_email: number | undefined
  value: number
}

export default async function (
  order: OrderPayload,
): Promise<void> {

  try {
    const response = await fetch(`${apiUrl}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(order),
    });

    console.log("track order opt in", response)
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status} `);
    }
  } catch (err) {
    throw err;
  }
}
