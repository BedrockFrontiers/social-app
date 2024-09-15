export default function isLogged(me) {
	return me && Object.keys(me).length > 0;
}