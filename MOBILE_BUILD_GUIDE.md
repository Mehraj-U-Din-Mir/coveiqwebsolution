# 📱 Mobile APK Build Guide - Mehraj Portfolio

This guide converts your React portfolio into a native Android APK for Google Play Store deployment.

## 🛠 Prerequisites

Before you start, install these tools on your computer:

### 1. Java JDK 21
Download from: https://www.oracle.com/java/technologies/downloads/
Or use OpenJDK: https://adoptium.net/

Verify installation:
```bash
java -version
```

### 2. Android Studio (Latest)
Download from: https://developer.android.com/studio

During setup, install:
- Android SDK (API 35)
- Android SDK Build-Tools
- Android Emulator
- Google Play Services

### 3. Set Environment Variables

**Windows:**
```bash
setx ANDROID_HOME "%LOCALAPPDATA%\Android\Sdk"
setx PATH "%PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\cmdline-tools\latest\bin"
```

**Mac/Linux:**
```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/cmdline-tools/latest/bin
```

### 4. Node.js (already installed for web dev)

---

## 🚀 Build Steps (Step-by-Step)

### Step 1: Install Dependencies

Open terminal in your project folder and run:

```bash
cd mehraj-portfolio
npm install
```

This installs all web + Capacitor dependencies.

### Step 2: Build Web Assets

```bash
npm run build
```

This creates a `dist/` folder with optimized production files.

### Step 3: Add Android Platform

```bash
npx cap add android
```

This creates the `android/` native project folder.

### Step 4: Sync Web Code to Android

```bash
npx cap sync android
```

This copies your built web files into the Android project.

### Step 5: Open in Android Studio

```bash
npx cap open android
```

Android Studio will open. Wait for Gradle sync to complete (first time takes ~5-10 minutes).

---

## 📦 Build APK (Debug - for testing)

### Option A: Via Android Studio (GUI)

1. In Android Studio, click **Build → Build Bundle(s) / APK(s) → Build APK(s)**
2. Wait for build to complete
3. APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

### Option B: Via Command Line

```bash
cd android
./gradlew assembleDebug
```

APK will be at: `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 🔐 Build Signed Release APK (for Play Store)

### Step 1: Generate Keystore (do this ONCE per app)

```bash
cd android/app
keytool -genkey -v -keystore mehraj-portfolio.keystore -alias mehraj -keyalg RSA -keysize 2048 -validity 10000
```

**Important:** Save this `.keystore` file and password safely. You need it for every update.

### Step 2: Configure Signing in Android Studio

1. In Android Studio: **Build → Generate Signed Bundle / APK**
2. Select **APK** (or AAB for Play Store)
3. Choose your keystore file
4. Enter keystore password and alias
5. Select **release** build variant
6. Check both signature versions: **V1 (Jar Signature)** and **V2 (Full APK Signature)**
7. Click **Finish**

### Step 3: Find Your Release APK

```
android/app/build/outputs/apk/release/app-release.apk
```

---

## 📤 Upload to Google Play Store

### 1. Create Google Play Developer Account
- Go to: https://play.google.com/console
- One-time fee: $25
- Verify your identity

### 2. Create New App
- Click **Create app**
- Enter app name: "Mehraj Portfolio"
- Select language and app category

### 3. Complete Store Listing
Fill in all required sections:
- App description
- Screenshots (upload images from your phone)
- Feature graphic
- Privacy policy (can use a simple hosted page)
- Content rating questionnaire

### 4. Upload APK
- Go to **Production → Create new release**
- Upload your `app-release.apk` file
- Review and confirm

### 5. Submit for Review
- Click **Start rollout to Production**
- Google reviews within 1-3 days
- Once approved, your app is live!

---

## 🔄 Update Your App (Future Releases)

When you make changes to your portfolio:

```bash
# 1. Rebuild web assets
npm run build

# 2. Sync to Android
npx cap sync android

# 3. Open Android Studio
npx cap open android

# 4. Build new signed APK using same keystore
# Build → Generate Signed Bundle/APK
```

**Important:** You MUST use the same keystore file for updates, or Google will reject the upload.

---

## 🐛 Troubleshooting

### "Command not found: cap"
```bash
npm install -g @capacitor/cli
```

### Gradle sync fails
In Android Studio: **File → Sync Project with Gradle Files**

### "SDK location not found"
Set `ANDROID_HOME` environment variable correctly (see Prerequisites).

### App shows white screen
Make sure you ran `npm run build` before `npx cap sync`.

### 3D animations lag on mobile
The Three.js background may be heavy on older devices. Consider reducing particle count in `Hero.jsx` for mobile builds.

---

## 📱 Mobile Optimization Tips

1. **Test on real device** - Emulators may not show accurate performance
2. **Reduce 3D effects** - Lower particle count for smoother mobile experience
3. **Add touch feedback** - Buttons should have visible tap states
4. **Test offline** - Ensure app works without internet
5. **Check permissions** - Your portfolio doesn't need special permissions

---

## 📁 Important Files Summary

| File | Purpose |
|------|---------|
| `capacitor.config.ts` | App ID, name, splash screen settings |
| `android/app/build.gradle` | Android build configuration |
| `android/app/src/main/AndroidManifest.xml` | App permissions & metadata |
| `android/app/build/outputs/apk/` | Built APK files |

---

**Good luck with your Play Store launch! 🚀**
