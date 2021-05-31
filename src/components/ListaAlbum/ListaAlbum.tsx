import React, {Dispatch, SetStateAction} from 'react';
import {FlatList, Text} from 'react-native';
import IAlbum from '../../models/Album';
import ItemAlbum from '../ItemAlbum';

interface ListaAlbumProps {
  albums: IAlbum[];
  setAlbumSeleccionado: Dispatch<SetStateAction<IAlbum | null>>;
}

const ListaAlbum: React.FC<ListaAlbumProps> = ({
  albums,
  setAlbumSeleccionado,
}) => {
  return (
    <FlatList
      data={albums}
      renderItem={({item}) => (
        <ItemAlbum album={item} setAlbumSeleccionado={setAlbumSeleccionado} />
      )}
    />
  );
};

export default ListaAlbum;
