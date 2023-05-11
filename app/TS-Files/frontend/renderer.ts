// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.

console.log(
  `This app is using Chrome (v${window.API.processVersion.chrome()}), Node.js (v${window.API.processVersion.node()}), and Electron (v${window.API.processVersion.electron()})`
);

// preload attached everything to window.
console.log(window);

const userObject = [{}, {}, {}, {}];

const applyID = async (array: {}[]): Promise<void> => {

  const arrayWithId = await Promise.all(
    array.map(async (x) => await window.API.backend.generateId())
  );
  console.log("Your new array", arrayWithId);
};

document.getElementById("test1")?.addEventListener("click", () => {
  applyID(userObject);
});

const checkType = async (value: any): Promise<void> => {
  const isString = await window.API.backend.isString(value);
  console.log(isString ? "This is a string!" : "No, this is not a string");
};

// Only for testing purposes of sending a value down to index.js
document.getElementById("test2")?.addEventListener("click", () => {
  checkType("This is a string");
});