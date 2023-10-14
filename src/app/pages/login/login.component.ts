import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';
import '../../../assets/login-animation.js';
import { UserModel } from 'src/app/models/usuario';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  mensaje: string;
  error: string;
  usuario: UserModel = new UserModel();

  constructor(
    private _router: Router, private _fb: FormBuilder, private service: LoginService
  ) { }

  ngOnInit(): void {
  }

  // iniciarSesion(){
  //   this.loginService.login(this.usuario);
  // }

  public loginForm = this._fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  iniciarSesion(){
    console.log(this.loginForm.value);
      this._router.navigateByUrl("pages/inicio");
  }

  ngAfterViewInit() {
    (window as any).initialize();
  }

}
