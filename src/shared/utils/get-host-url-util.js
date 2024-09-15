export default function getHostURL(request) {
	const protocol = request.headers["x-forwarded-proto"] || "http";
  const host = request.headers["host"];
  return `${protocol}://${host}`;
}