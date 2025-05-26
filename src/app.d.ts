/* ==========================================================================
src/app.d.ts

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/// <reference types="svelte" />
// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

declare global {
	namespace App {
		// Remove nonce from Locals as it is no longer needed
		// interface Locals {
		//   nonce: string;
		// }

		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };
