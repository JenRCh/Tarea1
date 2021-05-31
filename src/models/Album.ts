import Photos from "./Photos";
import Users from "./Users";

export default interface IAlbum {
  id: number;
  userId: number;
  title: string;
  photos?: Photos[];
  users?: Users[];
}
