<!-- .github/copilot-instructions.md - guidance for AI coding agents working on this repo -->
# Project-focused instructions for AI assistants

Purpose: Help an AI agent be immediately productive in this React Native / Expo app by describing the architecture, key files, developer workflows, and project-specific conventions.

1) Big picture (how the app is wired)
- This is an Expo React Native app. Entrypoint: `index.js` -> registers `App`.
- `App.js` composes global providers and navigation: it wraps `UserProvider` (frontend/context/UserContext.js) and `NavigationContainer` which mounts `AppNavigator` (frontend/navigation/AppNavigator.js).
- Navigation uses a stack navigator with `initialRouteName="Login"` and screens: `Login`, `Home`, `PlantDetails`, `Community`, `Profile`.

2) Auth & state flow (critical)
- User state is managed by `UserContext` at `frontend/context/UserContext.js`.
  - Context exports `{ user, setUser }` and persists state to AsyncStorage under the key `user`.
  - On app start, the provider loads the stored user and sets `user` if present.
- Login flow example (see `frontend/screens/LoginScreen.js`): on success the screen calls `setUser({ name, email })` and uses `navigation.replace('Home')` to switch to the main app route (prevents back-navigation to Login).

3) Navigation / screen patterns to follow
- Use `navigation.replace('Home')` from auth screens so users can't navigate back to Login.
- Pass screen params explicitly, e.g. `navigation.navigate('PlantDetails', { plant })` and read via route.params in that screen.

4) Styling & components
- Shared styles live in `frontend/styles/GlobalStyles.js` which exports `colors`, `text`, `layout`, `buttons`, `images` and a default `GlobalStyles` object. Prefer these tokens for consistent colors/spacing.
- Small presentational components live under `frontend/components/` (e.g. `CustomButton.js`, `Header.js`) — follow their simple prop patterns: `CustomButton({ title, onPress })`.

5) How to run and debug (developer workflow)
- Install dependencies and run with Expo (package.json scripts):
  - `npm install`
  - `npm start` (alias: `expo start`)
  - `npm run android` / `npm run ios` to open in device/emulator via Expo
- Logs & debugging: use the Expo CLI output for runtime logs. For native-level debugging, attach React Native Debugger or use Expo DevTools.

6) External dependencies & integrations
- Key packages: `expo`, `@react-navigation/*`, `@react-native-async-storage/async-storage`, `react-native-reanimated`, `react-native-gesture-handler`.
- AsyncStorage is used only for `user` persistence. Avoid adding other global persistence keys without documenting them here.

7) Project conventions and gotchas (specific)
- File layout: UI code is under `frontend/` (components, navigation, screens, styles). Keep platform-neutral code here.
- Use `navigation.replace` after auth to avoid stacking routes.
- The `UserContext` is the single source of truth for authentication state; do not bypass it.
- Screens commonly import `GlobalStyles` and combine layout tokens: prefer `GlobalStyles.title`, `GlobalStyles.subtitle`, and `layout.container` for consistency.

8) What to avoid changing without a follow-up
- Changing the AsyncStorage key `user` or the shape of the user object will break persistence and screen assumptions (Login, Profile). If you change it, update `UserContext` and all screens that read `user`.

9) Files to inspect for common tasks (quick jump list)
- `index.js` — Expo root registration.
- `App.js` — provider + navigation composition.
- `frontend/navigation/AppNavigator.js` — stack navigator and routes.
- `frontend/context/UserContext.js` — auth state + AsyncStorage persistence.
- `frontend/screens/LoginScreen.js` — example auth flow (setUser + navigation.replace).
- `frontend/screens/HomeScreen.js` — how navigation and GlobalStyles are used; screen examples for passing params.
- `frontend/styles/GlobalStyles.js` — design tokens used across the app.

If anything in this summary is unclear or you want more examples (for instance, typical unit-test structure, preferred prop-types, or how to add a new screen with persisted state), tell me which area to expand and I'll iterate.
