import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuariosActions from '../actions/usuarios.actions'
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';
import { of } from "rxjs";


@Injectable()
export class UsuariosEffects {

constructor(
  private actions$: Actions, private userSERV: UsuarioService
){}

cargarUsuarios$ = createEffect(
  () => this.actions$.pipe(
    ofType( usuariosActions.cargarUsuarios ),
      //tap( data => console.log( 'EFFECT TAP', data ) ),
      mergeMap(
        () => this.userSERV.getUsers()
        .pipe(
          //tap( users => console.log('EFFECTS USERS', users))
          map( users => usuariosActions.cargarUsuariosSuccess({ usuarios: users })),
          catchError( err => of(usuariosActions.cargarUsuariosError({ payload: err })))
      )
    )
  )
);

}
