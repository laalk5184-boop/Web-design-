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
import { portfolioItems as defaultPortfolio } from "../data";
import { Trash2, Edit2, Plus, Save, X } from "lucide-react";

export function PortfolioManager() {
  const [items, setItems] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("order", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const importDefaults = async () => {
    for (let i = 0; i < defaultPortfolio.length; i++) {
      const item = defaultPortfolio[i];
      await setDoc(doc(db, "projects", `project_${item.id}`), {
        ...item,
        order: i,
      });
    }
  };

  const saveItem = async () => {
    if (!editingItem) return;
    const isNew = !editingItem.id;
    const id = isNew ? `proj_${Date.now()}` : editingItem.id;
    await setDoc(doc(db, "projects", id), {
      ...editingItem,
      id: undefined, // remove temp id
      metrics:
        typeof editingItem.metrics === "string"
          ? editingItem.metrics.split("\n").filter(Boolean)
          : editingItem.metrics,
    });
    setEditingItem(null);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Portfolio Manager</h2>
        <div className="flex gap-2">
          {items.length === 0 && (
            <button
              onClick={importDefaults}
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold"
            >
              Import Demo Data
            </button>
          )}
          <button
            onClick={() =>
              setEditingItem({
                title: "",
                industry: "",
                location: "",
                result: "",
                image: "",
                challenge: "",
                solution: "",
                metrics: [],
                order: items.length,
              })
            }
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Add Project
          </button>
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
              placeholder="Industry"
              value={editingItem.industry}
              onChange={(e) =>
                setEditingItem({ ...editingItem, industry: e.target.value })
              }
              className="p-2 rounded border dark:bg-gray-900"
            />
            <input
              placeholder="Location"
              value={editingItem.location}
              onChange={(e) =>
                setEditingItem({ ...editingItem, location: e.target.value })
              }
              className="p-2 rounded border dark:bg-gray-900"
            />
            <input
              placeholder="Result Highlight"
              value={editingItem.result}
              onChange={(e) =>
                setEditingItem({ ...editingItem, result: e.target.value })
              }
              className="p-2 rounded border dark:bg-gray-900"
            />
          </div>
          <input
            placeholder="Image URL"
            value={editingItem.image}
            onChange={(e) =>
              setEditingItem({ ...editingItem, image: e.target.value })
            }
            className="w-full p-2 rounded border dark:bg-gray-900"
          />
          <textarea
            placeholder="Challenge"
            value={editingItem.challenge}
            onChange={(e) =>
              setEditingItem({ ...editingItem, challenge: e.target.value })
            }
            className="w-full p-2 rounded border dark:bg-gray-900"
          />
          <textarea
            placeholder="Solution"
            value={editingItem.solution}
            onChange={(e) =>
              setEditingItem({ ...editingItem, solution: e.target.value })
            }
            className="w-full p-2 rounded border dark:bg-gray-900"
          />
          <textarea
            placeholder="Metrics (one per line)"
            value={
              Array.isArray(editingItem.metrics)
                ? editingItem.metrics.join("\n")
                : editingItem.metrics
            }
            onChange={(e) =>
              setEditingItem({ ...editingItem, metrics: e.target.value })
            }
            className="w-full p-2 rounded border dark:bg-gray-900 h-24"
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

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center p-4 border border-gray-100 dark:border-gray-800 rounded-xl"
          >
            <div>
              <h4 className="font-bold">{item.title}</h4>
              <p className="text-sm text-gray-500">{item.result}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditingItem(item)}
                className="p-2 text-blue-600 bg-blue-50 rounded"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteDoc(doc(db, "projects", item.id))}
                className="p-2 text-red-600 bg-red-50 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
