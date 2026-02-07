// Override parent .pnp.cjs to allow normal node_modules resolution
// This prevents esbuild from picking up the home directory PnP manifest
module.exports.setup = () => {};
module.exports.resolveToUnqualified = () => null;
module.exports.resolveRequest = () => null;
