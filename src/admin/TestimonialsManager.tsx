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
import { testimonials as defaultTestimonials } from "../data";
import { Trash2, Edit2, Plus, Save } from "lucide-react";

export function TestimonialsManager() {
  const [items, setItems] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  useEffect(() => {
    const q = query(collection(db, "testimonials"), orderBy("order", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const importDefaults = async () => {
    for (let i = 0; i < defaultTestimonials.length; i++) {
      const item = defaultTestimonials[i];
      await setDoc(doc(db, "testimonials", `testim_${item.id}`), {
        ...item,
        order: i,
      });
    }
  };

  const saveItem = async () => {
    if (!editingItem) return;
    const isNew = !editingItem.id;
    const id = isNew ? `testim_${Date.now()}` : editingItem.id;
    await setDoc(doc(db, "testimonials", id), {
      ...editingItem,
      id: undefined,
    });
    setEditingItem(null);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Testimonials Manager</h2>
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
                name: "",
                business: "",
                text: "",
                photo: "",
                order: items.length,
              })
            }
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Add Review
          </button>
        </div>
      </div>

      {editingItem && (
        <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Client Name"
              value={editingItem.name}
              onChange={(e) =>
                setEditingItem({ ...editingItem, name: e.target.value })
              }
              className="p-2 rounded border dark:bg-gray-900"
            />
            <input
              placeholder="Business Name"
              value={editingItem.business}
              onChange={(e) =>
                setEditingItem({ ...editingItem, business: e.target.value })
              }
              className="p-2 rounded border dark:bg-gray-900"
            />
          </div>
          <input
            placeholder="Photo URL"
            value={editingItem.photo}
            onChange={(e) =>
              setEditingItem({ ...editingItem, photo: e.target.value })
            }
            className="w-full p-2 rounded border dark:bg-gray-900"
          />
          <textarea
            placeholder="Review Text"
            value={editingItem.text}
            onChange={(e) =>
              setEditingItem({ ...editingItem, text: e.target.value })
            }
            className="w-full p-2 rounded border dark:bg-gray-900"
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
            <div className="flex items-center gap-4">
              {item.photo && (
                <img
                  src={item.photo}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              <div>
                <h4 className="font-bold">
                  {item.name}{" "}
                  <span className="text-sm font-normal text-gray-500">
                    ({item.business})
                  </span>
                </h4>
                <p className="text-sm text-gray-500 line-clamp-1">
                  {item.text}
                </p>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => setEditingItem(item)}
                className="p-2 text-blue-600 bg-blue-50 rounded"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteDoc(doc(db, "testimonials", item.id))}
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
