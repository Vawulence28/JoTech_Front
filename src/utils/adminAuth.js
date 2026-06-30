"use client";

import { jwtDecode } from "jwt-decode";

// ==========================================
// TOKEN KEY
// ==========================================

const TOKEN_KEY = "admin_token";

// ==========================================
// SAVE TOKEN
// ==========================================

export function saveAdminToken(token) {

  if (typeof window === "undefined") {

    return;

  }

  localStorage.setItem(

    TOKEN_KEY,

    token

  );

}

// ==========================================
// GET TOKEN
// ==========================================

export function getAdminToken() {

  if (typeof window === "undefined") {

    return null;

  }

  return localStorage.getItem(

    TOKEN_KEY

  );

}

// ==========================================
// REMOVE TOKEN
// ==========================================

export function removeAdminToken() {

  if (typeof window === "undefined") {

    return;

  }

  localStorage.removeItem(

    TOKEN_KEY

  );

}

// ==========================================
// CHECK LOGIN
// ==========================================

export function isAdminLoggedIn() {

  const token =

    getAdminToken();

  if (!token) {

    return false;

  }

  try {

    const decoded =

      jwtDecode(token);

    const now =

      Date.now() / 1000;

    if (

      decoded.exp &&

      decoded.exp < now

    ) {

      removeAdminToken();

      return false;

    }

    return true;

  } catch {

    removeAdminToken();

    return false;

  }

}

// ==========================================
// GET ADMIN INFO
// ==========================================

export function getAdmin() {

  const token =

    getAdminToken();

  if (!token) {

    return null;

  }

  try {

    return jwtDecode(token);

  } catch {

    return null;

  }

}

// ==========================================
// CHECK ROLE
// ==========================================

export function isAdmin() {

  const admin =

    getAdmin();

  if (!admin) {

    return false;

  }

  return admin.role === "admin";

}

// ==========================================
// LOGOUT
// ==========================================

export function logoutAdmin() {

  removeAdminToken();

  if (typeof window !== "undefined") {

    window.location.href =

      "/admin/login";

  }

}

// ==========================================
// EXPORT
// ==========================================

export default {

  saveAdminToken,

  getAdminToken,

  removeAdminToken,

  isAdminLoggedIn,

  isAdmin,

  getAdmin,

  logoutAdmin

};