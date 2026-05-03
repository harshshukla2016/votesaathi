// @ts-nocheck
import * as admin from "firebase-admin";
import * as fs from "fs";

/**
 * FIREBASE ADMIN SDK (SERVER-SIDE ONLY)
 * 
 * This module initializes the Administrative layer for the VoteSaathi platform.
 * It uses a singleton pattern to ensure we only have one instance of the Admin app,
 * which is critical for Next.js hot-reloading and development environments.
 */

const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!admin.apps.length) {
  try {
    if (serviceAccountPath) {
      // Initialize with Service Account Key
      const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      console.log("🔒 Consulate Admin Mesh: Active (Credential Mode)");
    } else {
      // Fallback to ADC (Application Default Credentials) for Cloud Environments
      admin.initializeApp();
      console.log("🔒 Consulate Admin Mesh: Active (ADC Mode)");
    }
  } catch (error: unknown) {
    console.warn("⚠️ Consulate Admin Initialization Warning:", error.message);
  }
}

export const adminDb = admin.firestore();
export const adminAuth = admin.auth();
export const adminMessaging = admin.messaging();

export default admin;
