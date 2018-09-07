import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../models/file-item';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private pruebagithub:string = "segundo";
  private CARPETA_IMAGENES = 'img';

  constructor(private db: AngularFirestore) { }

  cargarImagenesFirebase( imagenes: FileItem[] ) {

    const storageRef = firebase.storage().ref();
    //console.log('servicioFirebase' + imagenes);
    //console.log('servicioFirebase' + storageRef);
    for ( const item of imagenes ) {

      item.estaSubiendo = true;
      if ( item.progreso >= 100 ) {
        continue;
      }

      const uploadTask: firebase.storage.UploadTask =
                  storageRef.child(`${ this.CARPETA_IMAGENES }/${ item.nombreArchivo }`)
                            .put( item.archivo );

      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
              ( snapshot: firebase.storage.UploadTaskSnapshot ) => 
                item.progreso = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100,
                          
              ( error ) => console.error('Error al subir', error ),
              () => {
                console.log('Imagen cargada correctamente');
                console.log(uploadTask);
                //storageRef.getDownloadURL().then((data) => {
                //  console.log(data)
                //});
                item.url = uploadTask.snapshot.downloadURL;
                item.estaSubiendo = false;
                //this.guardarImagen({
                //  nombre: item.nombreArchivo,
                //  url: item.url
                //});
              });


    }

  }

  private guardarImagen( imagen: { nombre: string, url: string } ) {

    this.db.collection(`/${ this.CARPETA_IMAGENES }`)
            .add( imagen );

  }
}


/*
import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../models/file-item';


@Injectable()
export class CargaImagenesService {

  private CARPETA_IMAGENES = 'img';

  constructor( private db: AngularFirestore ) { }


  cargarImagenesFirebase( imagenes: FileItem[] ) {

    const storageRef = firebase.storage().ref();

    for ( const item of imagenes ) {

      item.estaSubiendo = true;
      if ( item.progreso >= 100 ) {
        continue;
      }

      const uploadTask: firebase.storage.UploadTask =
                  storageRef.child(`${ this.CARPETA_IMAGENES }/${ item.nombreArchivo }`)
                            .put( item.archivo );

      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
              ( snapshot: firebase.storage.UploadTaskSnapshot ) =>
                          item.progreso = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100,
              ( error ) => console.error('Error al subir', error ),
              () => {

                console.log('Imagen cargada correctamente');
                item.url = uploadTask.snapshot.downloadURL;
                item.estaSubiendo = false;
                this.guardarImagen({
                  nombre: item.nombreArchivo,
                  url: item.url
                });
              });


    }

  }


  private guardarImagen( imagen: { nombre: string, url: string } ) {

    this.db.collection(`/${ this.CARPETA_IMAGENES }`)
            .add( imagen );

  }

}

*/
