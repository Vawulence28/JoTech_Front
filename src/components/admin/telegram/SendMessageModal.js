"use client";

import { useEffect, useState } from "react";

import {
  sendBroadcast,
  sendMessage,
} from "@/services/adminApi";

export default function SendMessageModal({
  open,
  onClose,
  user = null,
  templates = [],
  refresh,
}) {
  const [recipientType, setRecipientType] =
    useState("individual");

  const [title, setTitle] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [templateId, setTemplateId] =
    useState("");

  const [sending, setSending] =
    useState(false);

  useEffect(() => {
    if (!open) return;

    if (user) {
      setRecipientType("individual");
    } else {
      setRecipientType("telegram");
    }

    setTitle("");
    setMessage("");
    setTemplateId("");
  }, [open, user]);

  function chooseTemplate(id) {
    setTemplateId(id);

    const template = templates.find(
      (t) => t.id === id
    );

    if (!template) return;

    setTitle(template.title || "");
    setMessage(template.body || "");
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">

      <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">

        {/* Header */}

        <div className="border-b px-6 py-5">

          <h2 className="text-2xl font-bold">

            {user
              ? `Send Message to ${user.full_name}`
              : "Broadcast Message"}

          </h2>

          <p className="mt-2 text-sm text-slate-500">

            Messages are delivered through
            the Telegram bot immediately.

          </p>

        </div>

        {/* Body */}

        <div className="space-y-6 p-6">

          {!user && (

            <div>

              <label className="mb-2 block text-sm font-medium">

                Recipients

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
                  All Students
                </option>

                <option value="active">
                  Active Students
                </option>

              </select>

            </div>

          )}

          {/* Templates */}

          <div>

            <label className="mb-2 block text-sm font-medium">

              Message Template

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

          {/* Title */}

          <div>

            <label className="mb-2 block text-sm font-medium">

              Title

            </label>

            <input
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full rounded-lg border p-3"
              placeholder="Enter message title"
            />

          </div>

          {/* Message */}

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
              className="w-full rounded-lg border p-3"
              placeholder="Type your message..."
            />

          </div>

          {/* Preview */}

          <div className="rounded-lg border bg-slate-50 p-4">

            <h3 className="mb-3 font-semibold">

              Telegram Preview

            </h3>

            <div className="rounded-lg bg-white p-4 shadow-sm">

              <strong>

                {title || "Message Title"}

              </strong>

              <p className="mt-3 whitespace-pre-wrap">

                {message ||
                  "Your message preview appears here."}

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
                className="rounded-lg border px-5 py-2 hover:bg-slate-50 disabled:opacity-50"
                >
                Cancel
                </button>

                <button
                onClick={handleSend}
                disabled={sending}
                className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
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

async function handleSend() {
  if (!title.trim()) {
    alert("Please enter a message title.");
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
      });

      alert("Message sent successfully.");
    } else {
      await sendBroadcast({
        title,
        message,
        recipientType,
      });

      alert("Broadcast completed.");
    }

    refresh?.();

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