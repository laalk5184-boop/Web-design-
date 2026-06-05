import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./Dashboard";
import { pricingPlans as defaultPricing } from "../data";
import { Trash2, Edit2, Plus, Save } from "lucide-react";

export function PricingManager() {
  const [items, setItems] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  useEffect(() => {
    const q = query(collection(db, "pricing_plans"), orderBy("order", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map((d) => ({ ...d.data(), dbId: d.id })));
    });
    return () => unsub();
  }, []);

  const importDefaults = async () => {
    for (let i = 0; i < defaultPricing.length; i++) {
      const item = defaultPricing[i];
      await setDoc(doc(db, "pricing_plans", `plan_${item.id}`), {
        ...item,
        order: i,
      });
    }
  };

  const saveItem = async () => {
    if (!editingItem) return;
    const isNew = !editingItem.dbId;
    const id = isNew ? `plan_${Date.now()}` : editingItem.dbId;
    await setDoc(doc(db, "pricing_plans", id), {
      ...editingItem,
      dbId: undefined,
      features:
        typeof editingItem.features === "string"
          ? editingItem.features.split("\n").filter(Boolean)
          : editingItem.features,
      technicalDetails:
        typeof editingItem.technicalDetails === "string"
          ? editingItem.technicalDetails.split("\n").filter(Boolean)
          : editingItem.technicalDetails,
    });
    setEditingItem(null);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Pricing Manager</h2>
        <div className="flex gap-2">
          {items.length === 0 && (
            <button
              onClick={importDefaults}
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold"
            >
              Import Demo Data
            </button>
          )}
        </div>
      </div>

      {editingItem && (
        <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Title"
              value={editingItem.title}
              onChange={(e) =>
                setEditingItem({ ...editingItem, title: e.target.value })
              }
              className="p-2 rounded border dark:bg-gray-900"
            />
            <input
              placeholder="Price (e.g. $1,500)"
              value={editingItem.price}
              onChange={(e) =>
                setEditingItem({ ...editingItem, price: e.target.value })
              }
              className="p-2 rounded border dark:bg-gray-900"
            />
            <input
              placeholder="Badge (Optional)"
              value={editingItem.badge || ""}
              onChange={(e) =>
                setEditingItem({ ...editingItem, badge: e.target.value })
              }
              className="p-2 rounded border dark:bg-gray-900"
            />
          </div>
          <textarea
            placeholder="Description"
            value={editingItem.description}
            onChange={(e) =>
              setEditingItem({ ...editingItem, description: e.target.value })
            }
            className="w-full p-2 rounded border dark:bg-gray-900"
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="highlight"
              checked={editingItem.highlight}
              onChange={(e) =>
                setEditingItem({ ...editingItem, highlight: e.target.checked })
              }
            />
            <label htmlFor="highlight">Highlight this plan</label>
          </div>

          <textarea
            placeholder="Features (one per line)"
            value={
              Array.isArray(editingItem.features)
                ? editingItem.features.join("\n")
                : editingItem.features
            }
            onChange={(e) =>
              setEditingItem({ ...editingItem, features: e.target.value })
            }
            className="w-full p-2 rounded border dark:bg-gray-900 h-32"
          />
          <textarea
            placeholder="Technical Details (one per line)"
            value={
              Array.isArray(editingItem.technicalDetails)
                ? editingItem.technicalDetails.join("\n")
                : editingItem.technicalDetails
            }
            onChange={(e) =>
              setEditingItem({
                ...editingItem,
                technicalDetails: e.target.value,
              })
            }
            className="w-full p-2 rounded border dark:bg-gray-900 h-32"
          />

          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setEditingItem(null)}
              className="px-4 py-2 text-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={saveItem}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              <Save className="w-4 h-4 inline mr-1" /> Save
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.dbId}
            className={`p-4 border ${item.highlight ? "border-blue-500" : "border-gray-100 dark:border-gray-800"} rounded-xl`}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-bold">{item.title}</h4>
                <h3 className="text-2xl font-bold">{item.price}</h3>
              </div>
              <button
                onClick={() => setEditingItem(item)}
                className="p-2 text-blue-600 bg-blue-50 rounded"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-gray-500 line-clamp-2 mt-2">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
