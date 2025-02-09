import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { CadastroService } from '../../services/cadastro.service';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe],
})
export class CadastroComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cadastroService: CadastroService
  ) {
    this.registerForm = this.fb.group(
      {
        nome: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        telefone: ['', [Validators.required]],
        cpf: ['', [Validators.required]],
        instituicao: ['', [Validators.required]],
        atividadePrincipal: ['', [Validators.required]],
        formacao: ['', [Validators.required]],
        nivel: ['', [Validators.required]],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmacaoSenha: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validators: this.checkPasswords }
    );
  }

  checkPasswords(group: AbstractControl): ValidationErrors | null {
    const senha = group.get('senha')?.value;
    const confirmacaoSenha = group.get('confirmacaoSenha')?.value;
    return senha === confirmacaoSenha ? null : { notSame: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.cadastroService.registrarUsuario(this.registerForm.value).subscribe(
        (response) => {
          console.log('Cadastro realizado com sucesso', response);
        },
        (error) => {
          console.error('Erro ao realizar o cadastro', error);
        }
      );
    }
  }
}
