import axios from 'axios';
import React, {ReactNode, useEffect, useState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import IAlbum from '../../models/Album';
import Photos from '../../models/Photos';
import Users from '../../models/Users';
import AlbumDetalle from '../AlbumDetalle';
import ListaAlbum from '../ListaAlbum';

const AlbumContainer = () => {
  const [albums, setAlbums] = useState<IAlbum[] | null>(null);

  const [loading, setLoading] = useState(true);
  const [albumSeleccionado, setAlbumSeleccionado] =
    useState<IAlbum | null>(null);

  const cargarAlbums = async () => {
    try {
      const dataAlbums = await fetch(
        'https://jsonplaceholder.typicode.com/albums',
      );
      const dataAlbumsJSON = (await dataAlbums.json()) as IAlbum[];

      const dataPhotos = await fetch(
        'https://jsonplaceholder.typicode.com/photos',
      );
      const dataPhotosJSON = (await dataPhotos.json()) as Photos[];

      const dataUsers = await fetch(
        'https://jsonplaceholder.typicode.com/users',
      );
      const dataUsersJSON = (await dataUsers.json()) as Users[];

      const albumsFormateado = dataAlbumsJSON.map((album: IAlbum) => {
        return {
          ...album,
          photos: dataPhotosJSON.filter((photo: Photos) => {
            return album.id === photo.albumId;
          }), users : dataUsersJSON.filter((user: Users) => {
            return album.userId === user.id;
          }),
        };
      });

      setAlbums(albumsFormateado);

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const cargarAlbumsPromise = () => {
    fetch('https://jsonplaceholder.typicode.com/albums')
      .then(data => {
        data
          .json()
          .then(dataAlbums => setAlbums(dataAlbums))
          .catch(error => console.error(error));
      })
      .catch(error => console.error(error));

    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(data => {
        data
          .json()
          .then(dataPhotos => setAlbums(dataPhotos))
          .catch(error => console.error(error));
      })
      .catch(error => console.error(error));

    fetch('https://jsonplaceholder.typicode.com/users')
      .then(data => {
        data
          .json()
          .then(dataUsers => setAlbums(dataUsers))
          .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
  };

  // Es como llamar componentDidMount
  useEffect(() => {
    async function llamarCargarAlbums() {
      await cargarAlbums();
    }

    llamarCargarAlbums();
  }, []);

  const mostrarListaODetalle = (): ReactNode => {
    if (albumSeleccionado) {
      return (
        <AlbumDetalle
          album={albumSeleccionado}
          setAlbumSeleccionado={setAlbumSeleccionado}
        />
      );
    } else if (albums) {
      return (
        <ListaAlbum
          albums={albums}
          setAlbumSeleccionado={setAlbumSeleccionado}
        />
      );
    }

    return null;
  };

  return (
    <View>
      {loading ? <ActivityIndicator /> : <>{mostrarListaODetalle()}</>}
    </View>
  );
};

export default AlbumContainer;
