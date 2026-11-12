// Generated from local public assets, including assets shown only after an action.
const assets:Record<string,string> = {};
export function resolveOfflineAsset(value:string|undefined):string|undefined {
 if(value===undefined || /^(?:data:|#)/i.test(value)) return value;
 const found=assets[value];
 if(!found) throw new Error('Asset offline desconocido: '+value);
 return found;
}
