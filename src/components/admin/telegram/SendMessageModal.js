"use client";

import { useEffect, useState } from "react";

import {
  sendMessage,
  sendBroadcast,
} from "@/services/adminApi";

export default function SendMessageModal({
  open,
  onClose,
  user = null,
  templates = [],
  refresh,
}) {
  const [recipientType, setRecipientType] =
    useState("telegram");

  const [templateId, setTemplateId] =
    useState("");

  const [title, setTitle] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [sending, setSending] =
    useState(false);

  // ==========================================
  // RESET MODAL
  // ==========================================

  useEffect(() => {
    if (!open) return;

    setTemplateId("");
    setTitle("");
    setMessage("");

    if (user) {
      setRecipientType("individual");
    } else {
      setRecipientType("telegram");
    }
  }, [open, user]);

  // ==========================================
  // TEMPLATE
  // ==========================================

  function chooseTemplate(id) {
    setTemplateId(id);

    const template = templates.find(
      (item) => item.id === id
    );

    if (!template) return;

    setTitle(template.title || "");
    setMessage(template.body || "");
  }

  // ==========================================
  // SEND
  // ==========================================

  async function handleSend() {
    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }

    if (!message.trim()) {
      alert("Please enter a message.");
      return;
    }

    try {
      setSending(true);

      if (user) {
        await sendMessage({
          userId: user.id,
          title,
          message,
          channel: "telegram",
        });

        alert("Message sent successfully.");
      } else {
        await sendBroadcast({
          recipientType,
          title,
          message,
          channel: "telegram",
        });

        alert("Broadcast sent successfully.");
      }

      await refresh?.();

      onClose?.();
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Unable to send message."
      );
    } finally {
      setSending(false);
    }
  }

  // ==========================================
  // CLOSE
  // ==========================================

  if (!open) return null;

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">

      <div className="w-full max-w-3xl rounded-xl bg-white shadow-xl">

        {/* Header */}

        <div className="border-b px-6 py-5">

          <h2 className="text-2xl font-bold">
            {user
              ? `Send Message to ${user.full_name}`
              : "Broadcast Message"}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Messages will be delivered through
            the Telegram Bot.
          </p>

        </div>

        {/* Body */}

        <div className="space-y-6 p-6">

          {!user && (

            <div>

              <label className="mb-2 block text-sm font-medium">
                Recipient Group
              </label>

              <select
                value={recipientType}
                onChange={(e) =>
                  setRecipientType(
                    e.target.value
                  )
                }
                className="w-full rounded-lg border p-3"
              >

                <option value="telegram">
                  Telegram Users
                </option>

                <option value="all">
                  All Users
                </option>

                <option value="active">
                  Active Users
                </option>

              </select>

            </div>

          )}

          <div>

            <label className="mb-2 block text-sm font-medium">
              Template
            </label>

            <select
              value={templateId}
              onChange={(e) =>
                chooseTemplate(
                  e.target.value
                )
              }
              className="w-full rounded-lg border p-3"
            >

              <option value="">
                Custom Message
              </option>

              {templates.map((template) => (

                <option
                  key={template.id}
                  value={template.id}
                >
                  {template.name}
                </option>

              ))}

            </select>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Title
            </label>

            <input
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              placeholder="Enter message title"
              className="w-full rounded-lg border p-3"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Message
            </label>

            <textarea
              rows={8}
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              placeholder="Type your message..."
              className="w-full rounded-lg border p-3"
            />

          </div>

          {/* Preview */}

          <div className="rounded-lg border bg-slate-50 p-5">

            <h3 className="mb-4 font-semibold">
              Telegram Preview
            </h3>

            <div className="rounded-lg bg-white p-4 shadow">

              <h4 className="font-bold text-lg">
                {title || "Message Title"}
              </h4>

              <p className="mt-4 whitespace-pre-wrap text-slate-700">
                {message ||
                  "Your message preview will appear here."}
              </p>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="flex items-center justify-between border-t px-6 py-5">

          <div className="text-sm text-slate-500">

            {user
              ? `Recipient: ${user.full_name}`
              : `Recipient Group: ${recipientType}`}

          </div>

          <div className="flex gap-3">

            <button
              onClick={onClose}
              disabled={sending}
              className="rounded-lg border px-5 py-2 hover:bg-slate-100 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              onClick={handleSend}
              disabled={sending}
              className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 disabled:bg-gray-400"
            >
              {sending
                ? "Sending..."
                : user
                ? "Send Message"
                : "Send Broadcast"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}