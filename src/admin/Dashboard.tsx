import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";
import { Settings, Users, LogOut, CheckCircle, Clock } from "lucide-react";
import { PortfolioManager } from "./PortfolioManager";
import { TestimonialsManager } from "./TestimonialsManager";
import { PricingManager } from "./PricingManager";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Request Google Sheets / Drive scope
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/spreadsheets");
provider.addScope("https://www.googleapis.com/auth/drive.file");

export function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [spreadsheetId, setSpreadsheetId] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, async (u) => {
      setUser(u);
    });
  }, []);

  const login = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(res);
      setToken(credential?.accessToken || null);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!user) return;

    // Fetch Settings
    getDoc(doc(db, "settings", "global")).then((snap) => {
      if (snap.exists()) {
        setSpreadsheetId(snap.data().spreadsheetId || null);
      }
    });

    // Listen Leads
    const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setLeads(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return () => unsub();
  }, [user]);

  // Google Sheets integration
  const createSpreadSheetAndSync = async () => {
    if (!token) return alert("Session expired, please login again.");
    setIsSyncing(true);

    try {
      let sheetId = spreadsheetId;
      if (!sheetId) {
        // Create new Sheet using Sheets API
        const res = await fetch(
          "https://sheets.googleapis.com/v4/spreadsheets",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              properties: { title: "AutoLead Pro - Leads" },
              sheets: [{ properties: { title: "Leads" } }],
            }),
          },
        );
        const data = await res.json();
        sheetId = data.spreadsheetId;

        // Add Header Row
        await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A1:F1?valueInputOption=USER_ENTERED`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              values: [
                [
                  "Date",
                  "Name",
                  "Email",
                  "WhatsApp",
                  "Business",
                  "Inquiry Type",
                ],
              ],
            }),
          },
        );

        // Save to DB
        await setDoc(
          doc(db, "settings", "global"),
          { spreadsheetId: sheetId },
          { merge: true },
        );
        setSpreadsheetId(sheetId);
      }

      // Sync Unsynced leads
      const unsynced = leads.filter((l) => !l.syncedToSheets);
      if (unsynced.length > 0) {
        const values = unsynced.map((l) => [
          new Date(l.createdAt?.toMillis() || Date.now()).toLocaleString(),
          l.name || "",
          l.email || "",
          l.whatsapp || "",
          l.business || "",
          l.inquiryType || "",
        ]);

        await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A1:append?valueInputOption=USER_ENTERED`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ values }),
          },
        );

        // Mark as synced
        for (const lead of unsynced) {
          await updateDoc(doc(db, "leads", lead.id), { syncedToSheets: true });
        }
      }
    } catch (e) {
      console.error(e);
      alert("Sync failed!");
    } finally {
      setIsSyncing(false);
    }
  };

  if (!user || !token) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl max-w-md w-full text-center">
          <h1 className="text-3xl font-bold font-heading mb-2 text-gray-900 dark:text-white">
            AutoLead Pro
          </h1>
          <p className="text-gray-500 mb-8">Admin Dashboard Login</p>
          <button
            onClick={login}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-3 transition-colors"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  const unsyncedCount = leads.filter((l) => !l.syncedToSheets).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold font-heading text-gray-900 dark:text-white mb-2">
              AutoLead Pro Dashboard
            </h1>
            <p className="text-gray-500">Welcome, {user.email}</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={createSpreadSheetAndSync}
              disabled={isSyncing}
              className={`px-5 py-2.5 ${unsyncedCount > 0 ? "bg-green-600 hover:bg-green-700" : "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400"} text-white rounded-xl font-semibold flex items-center gap-2`}
            >
              {isSyncing ? (
                "Syncing..."
              ) : (
                <>
                  <Settings className="w-5 h-5" />
                  {spreadsheetId
                    ? `Sync to Google Sheets (${unsyncedCount} new)`
                    : "Initialize Google Sheets"}
                </>
              )}
            </button>
            <button
              onClick={() => {
                signOut(auth);
                setToken(null);
              }}
              className="px-5 py-2.5 bg-red-100 hover:bg-red-200 text-red-600 dark:bg-red-900/30 dark:hover:bg-red-900/50 rounded-xl font-semibold flex items-center gap-2 transition-colors"
            >
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </div>
        </div>

        {spreadsheetId && (
          <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-2xl border border-blue-100 dark:border-blue-900/50 flex flex-wrap gap-4 items-center">
            <Users className="w-5 h-5" />
            <span>Google Sheets is connected.</span>
            <a
              href={`https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`}
              target="_blank"
              rel="noreferrer"
              className="underline font-medium hover:text-blue-800"
            >
              Open Spreadsheet
            </a>
          </div>
        )}

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-gray-100 dark:border-gray-800">
          <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Recent Leads
            </h2>
            <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-semibold">
              {leads.length} total
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 uppercase font-semibold text-xs border-b border-gray-100 dark:border-gray-800">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Business</th>
                  <th className="px-6 py-4">Inquiry</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {lead.createdAt?.toDate
                        ? lead.createdAt.toDate().toLocaleDateString()
                        : "Just now"}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {lead.name}
                      </p>
                      <p className="text-xs">
                        {lead.email} | {lead.whatsapp}
                      </p>
                    </td>
                    <td className="px-6 py-4 font-medium">{lead.business}</td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded text-xs font-semibold">
                        {lead.inquiryType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {lead.syncedToSheets ? (
                        <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2.5 py-1 rounded-full text-xs font-semibold">
                          <CheckCircle className="w-3.5 h-3.5" /> Synced
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2.5 py-1 rounded-full text-xs font-semibold">
                          <Clock className="w-3.5 h-3.5" /> Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
                {leads.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No leads yet. They will appear here automatically.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <PortfolioManager />
        <TestimonialsManager />
        <PricingManager />
      </div>
    </div>
  );
}
