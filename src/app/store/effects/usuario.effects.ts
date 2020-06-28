import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuariosActions from '../actions'
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';
import { of } from "rxjs";


@Injectable()
export class UsuarioEffects {

constructor(
  private actions$: Actions, private userSERV: UsuarioService
){}

cargarUsuario$ = createEffect(
  () => this.actions$.pipe(
    ofType( usuariosActions.cargarUsuario ),
      //tap( data => console.log( 'EFFECT TAP', data ) ),
      mergeMap(
        ( action ) => this.userSERV.getUserById( action.id)
        .pipe(
          //tap( users => console.log('EFFECTS USERS', users))
          map( user => usuariosActions.cargarUsuarioSuccess({ usuario: user })),
          catchError( err => of(usuariosActions.cargarUsuarioError({ payload: err })))
      )
    )
  )
);

}
