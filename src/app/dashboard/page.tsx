"use client";

import { logout } from "@/actions/actions";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link href={"/select"}>Select a game</Link>
      <Button style="cancel" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}
