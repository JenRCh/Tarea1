import React, {Dispatch, SetStateAction} from 'react';
import {View, Text, Button, Image, StyleSheet} from 'react-native';
import IAlbum from '../../models/Album';

interface AlbumDetalleProps {
  album: IAlbum;
  setAlbumSeleccionado: Dispatch<SetStateAction<IAlbum | null>>;
}

const AlbumDetalle: React.FC<AlbumDetalleProps> = ({
  album,
  setAlbumSeleccionado,
}) => {
  const imageURL = album.photos ? album.photos[0].url : '';
  const name = album.users ? album.users[0].name : '';
  const website = album.users ? album.users[0].website : '';
  return (
    <View>
      <Text style={styles.textName} >{name}</Text>
      <Image style={styles.image} source={{uri: imageURL}} />
      <Text style={styles.textTitle} >{album.title}</Text>
      <Text style={styles.textWebsite}>Website: {website}</Text>
      <Button title="Atrás" onPress={() => setAlbumSeleccionado(null)} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  textName: {
    color: 'black',
    fontSize: 28,
    padding: 24,
    alignItems: 'center',
  },
  textTitle: {
    color: 'black',
    fontSize: 24,
    padding: 10,
  },
  textWebsite: {
    color: 'blue',
    fontSize: 20,
    padding: 10,
  }
});

export default AlbumDetalle;
