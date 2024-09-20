import Link from "next/link";

export default function BuzzText({ content, limitText = false }) {
  const regex = /(@[\w\u00C0-\u017F]+|#[\w\u00C0-\u017F]+|https?:\/\/[^\s]+|^>.*)/gm;

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
      if (part.startsWith('@')) {
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

  return <div className="whitespace-pre-wrap">
    {limitText ? (
      <>
        {renderText(content.slice(0, 400))}...
      </>
    ) : (
      <>
        {renderText(content)}
      </>
    )}
  </div>;
}
