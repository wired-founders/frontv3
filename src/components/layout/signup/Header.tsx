// src\components\layout\signup\Header.tsx
import Link from 'next/link'

export default function AuthHeader() {
  return (
    <header className="sticky shrink-0 top-0 z-50 flex h-[var(--header-height)] items-center justify-between border-b border-gray-800 bg-gray-900 px-4">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <h1 className="font-semibold text-white">Kordor</h1>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/signup" className="px-3 py-1.5 text-sm text-gray-300 transition-colors hover:text-white">
          Sign Up
        </Link>
        <Link
          href="/login"
          className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white transition-colors hover:bg-blue-700"
        >
          Log In
        </Link>
      </div>
    </header>
  )
}
