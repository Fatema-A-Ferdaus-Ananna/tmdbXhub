"use client";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

export default function SocialMediaShareSection({ movieDetails }) {
  const { title, poster_path, overview, id } = movieDetails;

  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/movie/${id}`;

  return (
    <div className="py-2 flex flex-wrap gap-4">
      <FacebookShareButton url={shareUrl} quote={title}>
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center  hover:shadow-[0_0_5px_rgba(255,255,255,0.5)] hover:scale-110 hover:bg-white hover:bg-opacity-10 transition-all duration-300">
            <i className="fa fa-facebook text-white"></i>
          </div>

          <p className="text-sm">Facebook</p>
        </div>
      </FacebookShareButton>

      <TwitterShareButton url={shareUrl} title={title}>
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center  hover:shadow-[0_0_5px_rgba(255,255,255,0.5)] hover:scale-110 hover:bg-white hover:bg-opacity-10 transition-all duration-300">
            <i className="fa fa-twitter text-white"></i>
          </div>
          <p className="text-sm">X</p>
        </div>
      </TwitterShareButton>

      <LinkedinShareButton url={shareUrl} title={title}>
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center  hover:shadow-[0_0_5px_rgba(255,255,255,0.5)] hover:scale-110 hover:bg-white hover:bg-opacity-10 transition-all duration-300">
            <i className="fa fa-instagram text-white"></i>
          </div>
          <p className="text-sm">LinkedIn</p>
        </div>
      </LinkedinShareButton>
    </div>
  );
}
