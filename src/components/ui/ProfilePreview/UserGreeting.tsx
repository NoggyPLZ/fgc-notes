"use client";
export default function UserGreeting({ username }: { username: string }) {
  return (
    <div className="text-center w-[80%] mx-auto">
      <p className="text-center text-sm dark:text-gray-100 text-gray-800">
        Welcome back,
      </p>
      <h4 className="text-xl dark:text-rose-500 text-rose-500 font-semibold truncate">
        {username && username}
      </h4>
    </div>
  );
}
