import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../shared/servicios/usuarios/usuarios.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../shared/servicios/seguridad/authentication.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(private usuarioService: UsuariosService,
              private fb: FormBuilder,
              private _routeService: Router,
              private _route: ActivatedRoute,
              private authService: AuthenticationService) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this._routeService.navigate(['/']);
    }
  }

  ngOnInit() {
    this.formLogin = this.fb.group({
      cedula: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]]
    });
  }

  get cedula() {
    return this.formLogin.controls.cedula;
  }
  get password() {
    return this.formLogin.controls.password;
  }

  login() {
    this.submitted = true;
    this.loading = true;
    this.authService.login(this.cedula.value, this.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this._routeService.navigate(['/']);
        },
        error => {
          console.log('error');
          this.loading = false;
        }
      );
  }
}
