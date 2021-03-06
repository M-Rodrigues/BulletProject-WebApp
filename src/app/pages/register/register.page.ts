import { Router } from '@angular/router';
import { MyRes } from 'src/app/interfaces/excecoes';
import { BulletHandlerService } from './../../services/bullet-handler.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: any = { nome: null, dataNasc: null, email: null, senha: null }

  constructor(
    private usuariosService: UsuariosService,
    private bj: BulletHandlerService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  async onRegister(form: NgForm) { // TODO: validação formulário | tratar todos os erros
    let user = form.value;
    console.log(user);

    const loading = await this.loadingCtrl.create()
    loading.present()

    this.usuariosService.criarUsuario(user)
      .then((res: any) => {
        if (res.status === 0) {
          this.bj.showToastSuccess("Usuário criado com sucesso.")

          loading.dismiss()
          this.router.navigate(['login'])
        }
      })
      .catch((err: any) => {        
        console.log(err)
        loading.dismiss()
      })
  }

}
