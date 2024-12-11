import DataUriParser from "datauri/parser.js"

import path from "path";

/*************  ✨ Codeium Command ⭐  *************/
/******  d1371679-3b5d-4d68-8fb3-a126bee313a1  *******/
const getDataUri = (file) => {
    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer);
}

export default getDataUri;