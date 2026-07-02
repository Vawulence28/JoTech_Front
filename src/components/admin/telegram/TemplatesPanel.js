"use client";

import { useState } from "react";

import {
  createMessageTemplate,
  deleteMessageTemplate,
} from "@/services/adminApi";

export default function TemplatesPanel({
  templates = [],
  refresh,
}) {
  const [name, setName] = useState("");

  const [title, setTitle] = useState("");

  const [body, setBody] = useState("");

  const [category, setCategory] =
    useState("General");

  const [saving, setSaving] =
    useState(false);

  async function saveTemplate() {
    if (!name.trim()) {
      return alert(
        "Template name is required."
      );
    }

    if (!title.trim()) {
      return alert(
        "Template title is required."
      );
    }

    if (!body.trim()) {
      return alert(
        "Template body is required."
      );
    }

    try {
      setSaving(true);

      await createMessageTemplate({
        name,
        title,
        body,
        category,
      });

      setName("");
      setTitle("");
      setBody("");
      setCategory("General");

      refresh?.();

      alert(
        "Template created successfully."
      );
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Unable to create template."
      );
    } finally {
      setSaving(false);
    }
  }

  async function removeTemplate(id) {
    if (
      !confirm(
        "Delete this template?"
      )
    ) {
      return;
    }

    try {
      await deleteMessageTemplate(id);

      refresh?.();

      alert(
        "Template deleted."
      );
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Unable to delete template."
      );
    }
  }

  return (
    <div className="rounded-xl bg-white shadow">

      <div className="border-b px-6 py-5">

        <h2 className="text-xl font-semibold">
          Message Templates
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Save reusable Telegram messages
          for announcements, reminders,
          maintenance notices and more.
        </p>

      </div>

      <div className="space-y-4 p-6">

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Template Name"
          className="w-full rounded-lg border p-3"
        />

        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          placeholder="Telegram Title"
          className="w-full rounded-lg border p-3"
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
          className="w-full rounded-lg border p-3"
        >
          <option>
            General
          </option>

          <option>
            Announcement
          </option>

          <option>
            Reminder
          </option>

          <option>
            Welcome
          </option>

          <option>
            Maintenance
          </option>

          <option>
            Promotion
          </option>

        </select>

        <textarea
          rows={6}
          value={body}
          onChange={(e) =>
            setBody(e.target.value)
          }
          placeholder="Template message..."
          className="w-full rounded-lg border p-3"
        />

        <button
          disabled={saving}
          onClick={saveTemplate}
          className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700 disabled:bg-slate-400"
        >
          {saving
            ? "Saving..."
            : "Save Template"}
        </button>

      </div>

      <div className="border-t">

        <div className="max-h-[450px] overflow-y-auto">

          {templates.length === 0 ? (

            <div className="p-6 text-center text-slate-500">
              No templates available.
            </div>

          ) : (

            templates.map(
              (template) => (

                <div
                  key={template.id}
                  className="border-b p-5"
                >

                  <div className="flex items-start justify-between">

                    <div>

                      <div className="flex items-center gap-2">

                        <h3 className="font-semibold">
                          {template.name}
                        </h3>

                        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">
                          {template.category}
                        </span>

                      </div>

                      <p className="mt-2 font-medium">
                        {template.title}
                      </p>

                      <p className="mt-2 whitespace-pre-wrap text-sm text-slate-600">
                        {template.body}
                      </p>

                    </div>

                    <button
                      onClick={() =>
                        removeTemplate(
                          template.id
                        )
                      }
                      className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              )
            )

          )}

        </div>

      </div>

    </div>
  );
}