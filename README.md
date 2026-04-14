# ChelureTech (NetPulse)

**ChelureTech** is a lightweight Android utility built with [Expo](https://expo.dev/) and React Native. It shows **network status**, **local IP address**, and **basic device information** on the device itself so users can troubleshoot connectivity, verify how they are connected (Wi‑Fi, mobile data, VPN, etc.), and copy or share their IP when needed (for example, for support or local network setup).

| Field | Value |
|--------|--------|
| **App name** | ChelureTech |
| **Android package** | `com.cheluretech.netpulse` |
| **Tagline** | Global Network Solutions |
| **Current version** | 1.0.3 (see `app.json` / `package.json` for `versionCode`) |

Store listing copy and short/long Play descriptions live in [`PLAYSTORE_README.md`](./PLAYSTORE_README.md).

---

## Google Play: app purpose and value for users

Google Play sometimes asks for **more detail about what the app does** and **what value it brings to users**. You can reuse the text below in the **Google Play App Information Request** form or in internal documentation.

### What the app does (functionality)

- **Home:** Shows online/offline status, connection type (Wi‑Fi, mobile data, Ethernet, Bluetooth, VPN, or unknown), whether the OS reports the internet as reachable, and the device’s **local IP address** (via `expo-network`). Users can **refresh**, **copy** the IP to the clipboard, or **share** IP and connection type in a short message.
- **Network Info:** Lists **connection type**, **IP address**, **airplane mode** state, and **device metadata** from the device (brand, model, OS name/version, device name) for quick reference.
- **Settings:** **Dark mode**, optional **auto refresh** when returning to Home, **rate app** (opens Play Store), **Help** (in-app guidance and link to system settings), and about branding.

The app is a **read-only dashboard**: it reads information the operating system exposes and displays it in the UI. It is not a VPN, not remote access, and not a speed test or firewall.

### Value to users (why someone would install it)

- **Faster troubleshooting:** See at a glance if the device thinks it is online, on Wi‑Fi vs mobile data, and whether the internet is reported as reachable.
- **IP at hand:** Copy or share the current **local IP** without digging through Android system menus.
- **Support and setup:** Useful when configuring routers, printers, media servers, or when a support person asks for connection type or basic device details.
- **Simple UX:** One place for common network and device facts, with optional auto refresh and dark mode.

### Target audience

- General Android users who want **quick network visibility**.
- People helping **friends, family, or customers** debug “no internet” or “wrong network” issues.
- Anyone who occasionally needs their **IP or connection type** without advanced networking tools.

### Permissions (Android) and why they are needed

Declared in `app.json` for Android:

| Permission | Why it is used |
|------------|----------------|
| `ACCESS_NETWORK_STATE` | To read whether the device is connected and the **connection type** (Wi‑Fi, cellular, etc.). |
| `ACCESS_WIFI_STATE` | To support **Wi‑Fi-related** network state as reported by the OS (with network state APIs). |
| `INTERNET` | Used by the networking stack / reachability checks as implemented by the platform and `expo-network`; the app does not send user network data to a custom backend for this core flow. |

### Data and privacy (high level)

- Network and device details are **shown on the device** for the user’s own use (copy/share is **user-initiated**).
- The in-app messaging states that **device information is not shared with third parties** as part of the app’s design for this utility scope.
- For Play Console **Data safety** and policy answers, align wording with your **published privacy policy** and any analytics or SDKs you add in the future; this README reflects the **current open-source app behavior** in this repository.

---

## Development

**Requirements:** Node.js, Yarn (Berry), Android toolchain or Expo tooling as you prefer.

```bash
yarn install
yarn start
# Android: yarn android
```

Release AAB (see `package.json` script): `yarn build:aab` (runs Gradle bundle after prebuild path as configured in your environment).

---

## Related files

- [`PLAYSTORE_README.md`](./PLAYSTORE_README.md) — short/full description for the store listing.
- [`app.json`](./app.json) — Expo config, package name, Android permissions.
