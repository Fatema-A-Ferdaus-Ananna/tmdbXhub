"use client";

import { addUser } from "@/actions/user";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
  const [error, setError] = useState("");
  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      //console.log("register form data", formData);

      const firstName = formData.get("firstName")?.trim();
      const lastName = formData.get("lastName")?.trim();
      const email = formData.get("email")?.trim();
      const password = formData.get("password")?.trim();
      const confirmPassword = formData.get("confirmPassword")?.trim();
      const policy = formData.get("policy");

      // Validation
      if (!firstName || !lastName) {
        throw new Error("Both first name and last name are required.");
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long.");
      }

      if (password !== confirmPassword) {
        throw new Error("Password and confirm password must match.");
      }

      const fullName = `${firstName} ${lastName}`;
      const userPolicy = policy === "on" ? true : false;

      const userDate = {
        name: fullName,
        email: email,
        password: password,
        policy: userPolicy,
      };

      const result = await addUser(userDate);
      if (result.success) {
        router.push("/login");
      } else {
        setError(result.message || "An unexpected error occurred");
      }
    } catch (error) {
      setError(error.message || "An unexpected error occurred");
    }
  }

  return (
    <>
      <div className="my-2 text-red-600">{error}</div>

      <form id="signupForm" className="space-y-4" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="First Name"
          className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-primary"
          required
          name="firstName"
        />
        <input
          type="text"
          placeholder="Last Name"
          className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-primary"
          required
          name="lastName"
        />
        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-primary"
          required
          name="email"
        />
        <input
          type="password"
          placeholder="Create Password"
          className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-primary"
          required
          name="password"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-primary"
          required
          name="confirmPassword"
        />

        <div className="text-left text-moviedb-gray text-sm">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" required name="policy" />I
            agree to the Terms of Service and Privacy Policy
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-primary-dark text-dark py-3 rounded hover:bg-primary transition duration-300"
        >
          Sign Up
        </button>
      </form>
    </>
  );
}
