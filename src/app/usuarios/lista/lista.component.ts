import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import { cargarUsuarios } from 'src/app/store/actions';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [
  ]
})
export class ListaComponent implements OnInit {

  usuarios: Usuario[] = [];
loading: boolean = false;
error: any;

  constructor(
    private store: Store<AppState>

  ) { }

  ngOnInit() {
    this.store.select('usuarios')
    /*.pipe(
      filter( ({users}) => users.length>0 )
    )*/
    .subscribe( ({ users, loading, error }) => {
      console.log(users);
      this.usuarios = users
      this.loading = loading
      this.error = error
    })


    this.store.dispatch( cargarUsuarios() )
    /* this.userSERVICE.getUsers()
    .subscribe( users => {
      console.log(users);
      this.usuarios = users
    }) */
  }

}
