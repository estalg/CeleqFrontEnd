import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../shared/servicios/seguridad/authentication.service';

@Component({
  selector: 'app-cambio-contrasenna',
  templateUrl: './cambio-contrasenna.component.html',
  styleUrls: ['./cambio-contrasenna.component.css']
})
export class CambioContrasennaComponent implements OnInit {

  formCorreo: FormGroup;
  formContrasenna: FormGroup;
  id: string;

  constructor(private fb: FormBuilder,
              private routeService: Router,
              private route: ActivatedRoute,
              private authService: AuthenticationService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    if (this.id === 'correo') {
      this.formCorreo = this.fb.group({
        correo: ['', [
          Validators.required,
          Validators.email
        ]]
      });
    } else {
      this.formContrasenna = this.fb.group({
        contrasenna: ['', [
          Validators.required
        ]],
        repetirContrasenna: ['', [
          Validators.required
        ]]
      });
    }
  }

  get correo() {
    return this.formCorreo.get('correo');
  }
  get contrasenna() {
    return this.formContrasenna.get('contrasenna');
  }
  get repetirContrasenna() {
    return this.formContrasenna.get('repetirContrasenna');
  }

  cancelar() {
    this.routeService.navigate(['/login']);
  }

  enviarCorreo() {
    this.authService.genertePasswordChangeId('jorgea1177@gmail.com').subscribe(res => {
      console.log(res);
    });
  }
}
