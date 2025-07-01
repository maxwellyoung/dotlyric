import Link from "next/link";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>DotLyric - Turn lyrics into dot-matrix animations</title>
        <meta
          name="description"
          content="Create stunning dot-matrix animations from your favorite lyrics"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="max-w-2xl text-center space-y-8">
          <h1 className="text-6xl font-bold tracking-tight">
            Dot<span className="text-gray-400">Lyric</span>
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed">
            Turn any lyric snippet into a synced dot-matrix animation.
            <br />
            Think concert LED boards meets retro aesthetics.
          </p>

          <div className="pt-8">
            <Link
              href="/editor"
              className="inline-block bg-white text-black px-8 py-4 text-lg font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              Make one →
            </Link>
          </div>

          <div className="pt-16 text-sm text-gray-500">
            <p>Silent loops • 1080×1080 • Ready for socials</p>
          </div>
        </div>
      </main>
    </>
  );
}
