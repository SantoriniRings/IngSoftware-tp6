import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {v4} from 'uuid'
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyBBgBBljdwcrnK08n7SxGc7b8-_bcgU05E",
  authDomain: "tp6isw-d99e8.firebaseapp.com",
  projectId: "tp6isw-d99e8",
  storageBucket: "tp6isw-d99e8.appspot.com",
  messagingSenderId: "70079308001",
  appId: "1:70079308001:web:2390dd102403b8b01b57a0"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file) {
  const storageRef = ref(storage, v4());
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  console.log("URL de la imagen subida:", downloadURL);
  return downloadURL;
}

