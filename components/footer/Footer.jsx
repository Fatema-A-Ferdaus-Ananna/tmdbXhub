import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-10 flex justify-center items-center bg-gradient-to-t from-moviedb-black to-black text-gray-400 text-xs">
      <div className="w-1/2 flex flex-col justify-center items-center gap-1">
        <span>Developer Contact & Info</span>
        <div className="flex gap-4 justify-center items-center">
          <Link
            href={`${process.env.GITHUB_URL}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-github text-lg"></i>
          </Link>
          <span>|</span>
          <Link
            href={`${process.env.LINKEDIN_URL}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-linkedin  text-lg"></i>
          </Link>
          <span>|</span>
          <a href="mailto:fatema.a.ferdaus@gmail.com">
            <i className="fa fa-envelope  text-base"></i>
          </a>
        </div>
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center border-l border-gray-400 gap-1">
        <span className="mb-2">Contribution</span>
        <div className="flex gap-4">
          <Link href="https://www.themoviedb.org/" className="hover:underline">
            TMDB Website
          </Link>
          <span>|</span>
          <Link
            href="https://developer.themoviedb.org/reference/intro/getting-started"
            className="hover:underline"
          >
            API Documentation
          </Link>
        </div>
      </div>
    </footer>
  );
}
