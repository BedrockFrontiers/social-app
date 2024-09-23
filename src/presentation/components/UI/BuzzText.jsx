"use client";

import Link from "next/link";
import Twemoji from "react-twemoji";

export default function BuzzText({ content }) {
  const regex = /(\*\*[^*]+\*\*|_[^_]+_|@[\w\u00C0-\u017F]+|#[\w\u00C0-\u017F]+|https?:\/\/[^\s]+|^>.*)/gm;

  function getDomainAndPath (url) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.hostname + parsedUrl.pathname;
    } catch (error) {
      console.error("Invalid URL:", error);
      return url;
    }
  }

  function renderText(content) {
    const parts = content.split(regex);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index}>{part.slice(2, -2)}</strong>
        );
      } else if (part.startsWith('_') && part.endsWith('_')) {
        return (
          <em key={index}>{part.slice(1, -1)}</em>
        );
      } else if (part.startsWith('@')) {
        return (
          <Link className="text-blue-600 hover:underline" href={`/profile/${part}`} key={index}>
            {part}
          </Link>
        );
      } else if (part.startsWith('>')) {
        return (
          <blockquote key={index} className="border-l-2 border-zinc-600 pl-2 text-gray-600">
            {part.substring(1).trim()}
          </blockquote>
        );
      } else if (part.startsWith('#')) {
        return (
          <Link className="text-blue-600 hover:underline" href={`/hashtag/${part.substring(1)}`} key={index}>
            {part}
          </Link>
        );
      } else if (part.startsWith("http")) {
        const displayText = getDomainAndPath(part);
        return (
          <Link className="text-blue-600 hover:underline" href={part} key={index}>
            {displayText}
          </Link>
        );
      } else {
        return part;
      }
    });
  }

  return <div className="whitespace-pre-wrap break-words max-w-lg">
    <Twemoji options={{ className: "twemoji", ext: ".svg", folder: "svg" }}>
      {renderText(content)}
    </Twemoji>
  </div>;
}
