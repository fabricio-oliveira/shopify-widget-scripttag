import { render } from "preact";
import { CarbonOptIn } from "./components/CarbonOptIn";

const target = document.querySelector(".cart__blocks");

if (target) {
	const container = document.createElement("div");
	target.prepend(container);

	render(<CarbonOptIn />, container);
}

